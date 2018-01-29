<?php

namespace Mycelium;

use Illuminate\Http\Request;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Arr;
use Illuminate\Contracts\View\Factory as View;
use Illuminate\Auth\Access\AuthorizationException;
use Mycelium\Services\Mycelium;

/**
 * HTTP Controller trait for serving a single shroom
 */
trait ServesShroom
{
    /**
     * Shroom instance for access within the controller
     * @var \Mycelium\Shroom|null
     */
    protected $shroom = null;

    /**
     * Render the shroom for viewing
     * @return \Illuminate\Http\Response
     */
    public function view(Container $app)
    {
        if ($app->call([$this, "isUserAnEditor"]))
            return $app->call([$this, "viewAsEditor"]);
        else
            return $app->call([$this, "viewAsVisitor"]);
    }

    /**
     * Render the shroom for viewing for a visitor
     * @return \Illuminate\Http\Response
     */
    public function viewAsVisitor(Container $app, Mycelium $mycelium, View $view)
    {
        $app->call([$this, "obtainShroom"]);

        $app->call([$this, "guardViewing"]);

        if (!$this->shroom->transparent && !$this->shroom->isPublished())
            return new AuthorizationException(
                "You are not allowed to view this page."
            );

        $mycelium->editing(false);
        $mycelium->editor(false);

        return $view->make(
            $app->call([$this, "shroomView"]),
            $app->call([$this, "getDataForViewing"])
        );
    }

    /**
     * Render the shroom for viewing for an editor
     * @return \Illuminate\Http\Response
     */
    public function viewAsEditor(Container $app, Mycelium $mycelium, View $view)
    {
        $app->call([$this, "obtainShroom"]);

        $app->call([$this, "guardViewing"]);

        if (!$this->shroom->transparent && !$this->shroom->isPublished())
            return new AuthorizationException(
                "You are not allowed to view this page."
            );

        $mycelium->editing(false);
        $mycelium->editor(true);

        return $view->make(
            $app->call([$this, "shroomView"]),
            $app->call([$this, "getDataForViewing"])
        );
    }

    /**
     * Render the shroom for editing
     * @return \Illuminate\Http\Response
     */
    public function edit(Container $app, Mycelium $mycelium, View $view)
    {
        $app->call([$this, "obtainShroom"]);

        if (!$app->call([$this, "isUserAnEditor"]))
            throw new AuthorizationException(
                "You don't have permissions to edit this page."
            );

        $mycelium->editing(true);
        $mycelium->editor(true);

        return $view->make(
            $app->call([$this, "shroomView"]),
            $app->call([$this, "getDataForEditing"])
        );
    }

    /**
     * Save changes made during editing
     * @return \Illuminate\Http\Response
     */
    public function saveEdit(Application $app, Request $request)
    {
        $app->call([$this, "obtainShroom"]);

        if (!$app->call([$this, "isUserAnEditor"]))
            throw new AuthorizationException;

        $this->editShroomData($app, $request);

        // Ignore title changes, a single shroom cannot have a title.
        // That's only possible for cluster shrooms, since
        // it would change shroom's id.

        $this->shroom->save();

        return ["success" => true];
    }

    /**
     * Edits data of the shroom
     * @return void
     */
    protected function editShroomData(Application $app, Request $request)
    {
        /*
            $request->get(...) somehow removes \n at the
            end of strings, which is important for quill.js
         */
        $data = Arr::get(
            json_decode($request->getContent(), true),
            "data",
            []
        );

        /*
            But when testing, the request content is empty.
            And I don't need \n for testing
         */
        if ($app->environment("testing"))
            $data = $request->get("data", []);

        // edit all given data
        foreach ($data as $key => $value)
            $this->shroom->data("master")->put($key, $value);
    }

    /**
     * Handle authorization for viewing
     * @return void
     */
    public function guardViewing()
    {
        // allow
    }

    /**
     * Return true if the user requesting this page is an editor
     * @return boolean
     */
    public function isUserAnEditor()
    {
        return false;
    }

    /**
     * Is the served shroom transparent?
     * (This means that it's displayed to visitors even if not published)
     */
    public function isShroomTransparent()
    {
        return false;
    }

    /**
     * Slug identifying the shroom
     * @return string
     */
    public function shroomSlug()
    {
        return "shroom-slug";
    }

    /**
     * View used for shroom rendering
     * @var string
     */
    public function shroomView()
    {
        return "shroom-view";
    }

    /**
     * Pass additional properties to the rendering view
     * @return array
     */
    public function getDataForViewing()
    {
        // override this when needed
        return [];
    }

    /**
     * Pass additional properties to the editing view
     * @return array
     */
    public function getDataForEditing()
    {
        // override this when needed
        return [];
    }

    /**
     * Obtains the rendered shroom instance
     * @return Mycelium\Shroom
     */
    public function obtainShroom(Container $app)
    {
        $this->shroom = null;

        // find or create shroom
        if ($this->shroomExists())
            $this->shroom = Shroom::find($this->shroomSlug());
        else
            $this->shroom = $this->createShroom();

        // set transparency
        $this->shroom->transparent = $this->isShroomTransparent();

        // bind to the container
        $app->instance("mycelium.shroom", $this->shroom);
    }

    /**
     * Returns true if the rendered shroom exists
     * @return boolean
     */
    protected function shroomExists()
    {
        return Shroom::find($this->shroomSlug()) !== null;
    }

    /**
     * Create the shroom for this rendering
     * @return Mycelium\Shroom
     */
    protected function createShroom()
    {
        return Shroom::create([
            // title for a single shroom stays null
            // it's used only in clusters

            "id" => $this->shroomSlug()
        ]);
    }

    ////////////
    // Spores //
    ////////////

    /**
     * Handles new spore upload
     */
    public function uploadSpore(Request $request, Container $app)
    {
        // initialize shroom instance
        $app->call([$this, "obtainShroom"]);

        // check rights
        if (!$app->call([$this, "isUserAnEditor"]))
            throw new AuthorizationException;

        // handle a part upload
        return $this->shroom->sporePartUploaded($request->file("resource"), [
            "type" => $request->input("type"),
            "partCount" => $request->input("partCount", 1),
            "partIndex" => $request->input("partIndex", 0),
            "uploadId" => $request->input("uploadId")
        ]);
    }

    /**
     * Handles request for a resource
     */
    public function getResource($handle, Mycelium $mycelium, Container $app)
    {
        return $this->getResourceWithParams(null, $handle, $mycelium, $app);
    }

    /**
     * Handles request for a resource with parameters
     */
    public function getResourceWithParams($params, $handle, Mycelium $mycelium, Container $app)
    {
        // initialize shroom instance
        $app->call([$this, "obtainShroom"]);

        // get public revision
        $revision = $this->shroom->revision("public");
        if ($revision === null)
            abrot(404);

        // check that the spore exists
        if (!$revision->spores->has($handle))
            abort(404);

        // get the spore as collection
        $spore = collect($revision->spores[$handle]);

        // resolve the spore handler
        $handler = $mycelium->resolveSporeHandler($spore["type"], $this->shroom);

        // set spore reference
        $handler->setSpore($spore);

        // set parameters to the handler
        $handler->setParams($params);

        // call the handler
        return $app->call([$handler, "handleDownload"]);
    }
}