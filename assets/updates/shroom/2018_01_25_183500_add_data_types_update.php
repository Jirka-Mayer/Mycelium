<?php

use Mycelium\Update\Update;

/**
 * Adds types to data objects in shroom data
 *
 * - currently only text and rich-text, both get
 *     converted to rich text
 *     - text is plain string, will be rich text after this update
 * - tables get stored not as strialized json string, but json objects
 */
class AddDataTypesUpdate extends Update
{
    public function run()
    {
        
    }
}