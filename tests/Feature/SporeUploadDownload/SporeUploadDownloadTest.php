<?php

namespace MyceliumTests\Feature\SporeUploadDownload;

use Tests\Feature\FeatureTestCase;
use Mycelium\Shroom;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Image;

class SporeUploadDownloadTest extends FeatureTestCase
{
    public $feature = "SporeUploadDownload";

    /**
     * @test
     */
    public function spore_can_be_uploaded()
    {
        // upload a file in a single part
        $file = UploadedFile::fake()->create("avatar.jpg");
        Image::canvas(1920, 1080, "#ccc")->save($file->getRealPath());

        $response = $this->json("POST", "/upload-resource", [
            "resource" => $file,
            "type" => "image",
            "uploadId" => Str::random(11),
        ]);

        $response->assertJson([
            "success" => true,
            "spore" => [
                "type" => "image",
                "extension" => "jpg"
            ]
        ]);

        $shroom = Shroom::find("index");
        $handle = $shroom->revision("master")->spores->first()["handle"];

        $this->assertTrue($shroom->storage()->exists("spores/{$handle}"));
    }

    /**
     * @test
     */
    public function spore_can_be_uploaded_multipart()
    {
        $firstPart = UploadedFile::fake()->create("document.pdf");
        $secondPart = UploadedFile::fake()->create("document.pdf");
        
        file_put_contents($firstPart->path(), "Hello ");
        file_put_contents($secondPart->path(), "world!");
        
        $uploadId = Str::random(11);

        $response = $this->json("POST", "/upload-resource", [
            "resource" => $firstPart,
            "type" => "file",
            "uploadId" => $uploadId,
            "partCount" => 2,
            "partIndex" => 0
        ]);

        $response->assertJson([
            "success" => true,
            "spore" => null
        ]);

        $response = $this->json("POST", "/upload-resource", [
            "resource" => $secondPart,
            "type" => "file",
            "uploadId" => $uploadId,
            "partCount" => "2",
            "partIndex" => "1"
        ]);

        $response->assertJson([
            "success" => true,
            "spore" => [
                "type" => "file",
                "extension" => "pdf"
            ]
        ]);

        $shroom = Shroom::find("index");
        $handle = $shroom->revision("master")->spores->first()["handle"];

        $this->assertEquals(
            "Hello world!",
            $shroom->storage()->get("spores/{$handle}")
        );
    }

    /**
     * @test
     */
    public function spore_can_be_downloaded()
    {
        // upload spore
        $file = UploadedFile::fake()->create("message.txt");        
        file_put_contents($file->path(), "Hello world!");

        $this->json("POST", "/upload-resource", [
            "resource" => $file,
            "type" => "file",
            "uploadId" => Str::random(11)
        ]);

        $shroom = Shroom::find("index");
        $handle = $shroom->revision("master")->spores->first()["handle"];

        // download now
        $response = $this->get("/resource/{$handle}");        
        $response->assertStatus(200);
        $this->assertEquals("text/plain", $response->headers->get("Content-type"));
        $this->assertEquals("text/plain", $response->headers->get("Content-type"));

        /*
            You cannot actually test the downladed file content for some reason...
            $response->getContent() will return false,
            but the response is a BinaryFileResponse
         */

        // non existing file
        $response = $this->get("/resource/file/non-existing-file");
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function image_can_be_downloaded_from_cache()
    {
        $file = UploadedFile::fake()->create("avatar.jpg");
        Image::canvas(500, 500, "#ccc")->save($file->getRealPath());

        $this->json("POST", "/upload-resource", [
            "resource" => $file,
            "type" => "image",
            "uploadId" => Str::random(11),
        ]);

        $handle = Shroom::find("index")->revision("master")->spores->first()["handle"];

        // download existing cache
        $response = $this->get("/resource/w480/{$handle}");
        $this->assertEquals("image/jpeg", $response->headers->get("Content-type"));
        $response->assertStatus(200);

        // non-existing cache
        $response = $this->get("/resource/w123/{$handle}");
        $response->assertStatus(404);
    }
}