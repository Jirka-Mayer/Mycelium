<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use DB;
use Carbon\Carbon;

trait HasFilesystem
{
    /**
     * Filesystem for saving shrooms
     * @var \Illuminate\Contracts\Filesystem
     */
    protected static $filesystem = null;

    /**
     * Local shroom filesystem
     * (with root in the shroom directory)
     *
     * Any changes to the shroom folder should go through this
     */
    protected $localFilesystem = null;

    /**
     * Returns the local shroom filesystem
     */
    public function storage()
    {
        if ($this->localFilesystem === null)
        {
            $this->localFilesystem = app("filesystem")->createLocalDriver([
                "root" => static::$filesystem->path(
                    $this->getDirectoryName()
                )
            ]);
        }

        return $this->localFilesystem;
    }

    /**
     * Prepare directory name and location based on the id
     * Called before save
     * @return void
     */
    protected function prepareStorageDirectory()
    {
        // handle ID change
        if ($this->idChanged)
        {
            // move the old directory if exists
            if (static::$filesystem->exists($this->getDirectoryName($this->actualId)))
            {
                // there's no folder at the destination
                if (static::$filesystem->exists($this->getDirectoryName()))
                    throw new Exception("You cannot change id, a shroom folder with target id already exists.");

                static::$filesystem->move(
                    $this->getDirectoryName($this->actualId),
                    $this->getDirectoryName()
                );
            }

            // remove filesystem to get it to change root
            $this->localFilesystem = null;

            $this->idChanged = false;
        }

        // create directory if needed
        static::$filesystem->makeDirectory($this->getDirectoryName());

        /*
            from now on we can use local filesystem
         */

        // copy the version file if needed
        // (but don't touch it otherwise, HasVersion trait handles the rest!)
        if (!$this->storage()->exists("version.json"))
        {
            $this->storage()->put(
                "version.json",
                file_get_contents(
                    __DIR__ . "/../../assets/updates/default-shroom-version-file.json"
                )
            );
        }
    }

    /**
     * Returns directory name relative to mycelium storage for a given ID
     * You can append extra path to it
     * If no ID provided, curently set in this instance will be used
     * @param  string|null $id
     * @param  string|null $append
     * @return string
     */
    public function getDirectoryName($id = null)
    {
        if ($id === null)
            $id = $this->id;

        return static::getShroomDirectoryName($id);
    }

    /**
     * Static core of the getDirectoryName function
     */
    public static function getShroomDirectoryName($id)
    {
        return "shrooms/" . $id;
    }

    /**
     * Sets the filesystem instance
     * @param \Illuminate\Contracts\Filesystem $filesystem
     */
    public static function setFilesystem(Filesystem $filesystem)
    {
        static::$filesystem = $filesystem;
    }

    /**
     * Returns the set filesystem isntance
     * @return \Illuminate\Contracts\Filesystem|null
     */
    public static function getFilesystem()
    {
        return static::$filesystem;
    }

    /**
     * Returns size on disk in bytes
     */
    public function getSize()
    {
        $size = 0;

        $files = $this->storage()->allFiles();

        foreach ($files as $file)
            $size += $this->storage()->size($file);

        return $size;
    }

    /**
     * Insert a shroom into database from filesystem
     */
    public static function insertIntoDatabase($id)
    {
        /*
            Note: I'm no using the shroom because of all those
            attributes, casts and bindings. I just want to copy the
            data directly from the overview file.
         */
        
        // check the shroom folder exists
        if (!static::getFilesystem()
            ->exists(static::getShroomDirectoryName($id) . "/overview.json")
        )
        {
            throw new \Exception("Cannot push shroom '{$id}' to database from folder that does not contain a shroom.");
        }

        // get overview file content
        $overview = json_decode(
            static::getFilesystem()->get(
                static::getShroomDirectoryName($id) . "/overview.json"
            ),
            true
        );

        if ($overview === null)
            throw new \Exception(
                "The overview file '{$id}/overview.json' is corrupted.");

        // to collection
        $overview = collect($overview);

        // get table name
        $table = (new static)->table;

        // helper
        $parseDate = function ($key) use ($overview) {
            $val = $overview->get($key, null);
            if ($val === null)
                return null;
            return new Carbon($val);
        };

        // delete shroom from database if present
        DB::table($table)->where("id", $id)->delete();

        // insert a new clean record
        DB::table($table)->insert([
            "id" => $id,
            "title" => $overview->get("title", null),
            "created_at" => $parseDate("created_at"),
            "updated_at" => $parseDate("updated_at"),
            "public_revision" => $overview->get("public_revision", null),
            "deleted_at" => $parseDate("deleted_at"),
        ]);
    }
}