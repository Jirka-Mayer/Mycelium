<?php

namespace Mycelium\ShroomConcerns;

use Illuminate\Support\Str;

trait GeneratesSlug
{
    /**
     * Setter for the shroom title
     * @param string $title
     */
    public function setTitleAttribute($title)
    {
        $this->attributes["title"] = $title;

        $this->updateSlug();
    }

    /**
     * Update slug based on the title
     * @return void
     */
    protected function updateSlug()
    {
        $slug = Str::slug($this->title);

        // if already taken
        if (static::find($this->composeShroomId($this->cluster, $slug)))
        {
            $index = 2;

            while (static::find($this->composeShroomId($this->cluster, $slug . "-" . $index)))
            {
                $index++;
            }

            $this->slug = $slug . "-" . $index;
            return;
        }

        $this->slug = $slug;
    }
}