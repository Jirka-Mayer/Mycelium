<?php

use Mycelium\Update\Update;
use Mycelium\Update\UpdateException;

/**
 * Moves revision properties (comittedAt and title) into the revision file
 * (from database so from the overview.json file)
 */
class MoveRevisionPropertiesIntoRevisionFilesUpdate extends Update
{
    public function run()
    {
        if (!$this->storage->exists("overview.json"))
            throw new UpdateException("The overview file does not exist.");

        $overview = json_decode($this->storage->get("overview.json"), true);

        if (!is_array($overview))
            throw new UpdateException("The overview file is corrupted.");

        $overview = collect($overview);

        $revisions = $overview->get("revisions", []);

        foreach ($revisions as $index => $revision)
            $this->updateRevision($index, $revision);

        // save overview without those properties
        $overview->forget("revisions");

        $this->storage->put(
            "overview.json",
            json_encode($overview->toArray(), JSON_PRETTY_PRINT)
        );
    }

    public function updateRevision($index, $properties)
    {
        $filename = "revisions/revision-{$index}.json";

        if (!$this->storage->exists($filename))
            throw new UpdateException("The revision '{$index}' file does not exist.");

        $revision = json_decode($this->storage->get($filename), true);

        if (!is_array($revision))
            throw new UpdateException("Revision file '{$index}' is corrupted.");

        $revision = collect($revision);
        $properties = collect($properties);

        // copy properties
        $revision->put("title", $properties->get("title", ""));
        $revision->put("commitedAt", $properties->get("commitedAt", null));

        $this->storage->put(
            $filename,
            json_encode($revision->toArray(), JSON_PRETTY_PRINT)
        );
    }
}