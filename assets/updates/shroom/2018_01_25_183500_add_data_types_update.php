<?php

use Mycelium\Update\Update;
use Mycelium\Update\UpdateException;

/**
 * Adds types to data objects in shroom data
 *
 * - currently only text and rich-text, both get
 *     converted to rich text
 *     - text is plain string, will be rich text after this update
 * - tables get stored not as serialized json string, but json objects instead
 *
 * No recursion needed for rich-text (text-boxes don't yet exist)
 */
class AddDataTypesUpdate extends Update
{
    public function run()
    {
        // get all revisions
        $revisions = $this->storage->files("revisions");

        // update each revision
        foreach ($revisions as $revision)
            $this->updateRevision($revision);
    }

    /**
     * Updates a single revision file
     */
    protected function updateRevision($path)
    {
        // get revision contet
        $revision = json_decode($this->storage->get($path), true);

        if ($revision === null)
            throw new UpdateException("Revision {$path} was not JSON parsed.");

        // make sure data key exists
        if (!array_key_exists("data", $revision))
            $revision["data"] = [];

        // go over all data records
        foreach ($revision["data"] as &$record)
        {
            // string (plain text) to rich-text
            if (is_string($record))
            {
                $record = $this->convertPlainTextToRichText($record);
                continue;
            }

            // object with "ops" (rich-text)
            if (is_array($record) && array_key_exists("ops", $record))
            {
                $record = $this->convertRichText($record);
                continue;
            }
        }

        // save revision content
        $this->storage->put($path, json_encode($revision, JSON_PRETTY_PRINT));
    }

    /**
     * Converts plain-text data record to rich-text
     */
    protected function convertPlainTextToRichText(string $record)
    {
        return [
            "@type" => "mycelium::rich-text",
            "ops" => [
                ["insert" => $record]
            ]
        ];
    }

    /**
     * Converts rich-text (adds type and converts tables)
     */
    protected function convertRichText(array $record)
    {
        // add type
        $record["@type"] = "mycelium::rich-text";

        // go over all operations
        foreach ($record["ops"] as &$op)
        {
            // skip non-insert ones (should not appear anyway)
            if (!array_key_exists("insert", $op))
                continue;

            // skip if not an embed
            if (!is_array($op["insert"]))
                continue;

            // is a table?
            if (array_key_exists("table", $op["insert"]))
            {
                // if not string, skip
                if (!is_string($op["insert"]["table"]))
                    continue;

                // convert the table
                $op["insert"]["table"] = $this->convertTable($op["insert"]["table"]);
            }
        }

        return $record;
    }

    /**
     * Converts table from serialized JSON object to JSON object
     */
    protected function convertTable(string $table)
    {
        $converted = json_decode($table, true);

        if ($converted === null && $table !== "null")
        {
            throw new UpdateException(
                "Error while converting table - json_decode error.");
        }

        return $converted;
    }
}