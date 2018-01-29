const Promise = require("promise")
const axios = require("axios")

const PART_SIZE = 1024 * 1024 // 1 MB

/**
 * Handles spore upload by parts
 */
class SporeUploader
{
    /**
     * Perform the upload
     * @param {File} file The file to be uploaded
     * @param {string} type Spore handler type
     */
    static upload(file, type)
    {
        return new Promise((resolve, reject) => {

            let partCount = Math.ceil(file.size / PART_SIZE)
            let currentPart = -1
            let uploadId = Math.random().toString(36).substring(2)

            // closure for the upload (to make it able to access the context)
            // argument is the returned spore object from the last part upload
            let uploadNextPart = (spore) => {

                currentPart += 1

                // last part has been send
                if (currentPart >= partCount)
                {
                    console.warn("Upload done, handle: " + spore.handle)
                    resolve(spore)
                    return
                }

                // part boundaries
                let start = currentPart * PART_SIZE
                let end = (currentPart + 1) * PART_SIZE
                
                if (end > file.size)
                    end = file.size

                // upload the part
                SporeUploader.uploadFilePart(
                    file, type, start, end, currentPart, partCount, uploadId
                )
                .then((spore) => {
                    uploadNextPart(spore)
                })
            }

            // start uploading
            console.warn("Starting spore upload... " + uploadId)
            uploadNextPart(null)
        })
    }

    /**
     * Private method for uploading a part of a file
     */
    static uploadFilePart(file, type, start, end, partIndex, partCount, uploadId)
    {
        return new Promise((resolve, reject) => {

            let formData = new FormData()

            // file content and name
            formData.append("resource", file.slice(start, end, file.type), file.name)

            // spore type (handler)
            formData.append("type", type)

            // part information
            formData.append("partIndex", partIndex)
            formData.append("partCount", partCount)

            // id of the upload
            formData.append("uploadId", uploadId)

            console.warn("Uploading part " + partIndex + "/" + partCount)

            axios({
                method: "post",
                url: "upload-resource",
                data: formData,
                config: { headers: {"Content-Type": "multipart/form-data"} }
            })
            .then((response) => {
                if (response.data.success !== true)
                {
                    console.error(response.data.message)
                    reject(response.data.message)
                }

                resolve(response.data.spore)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
        })
    }

    /**
     * Shows the file dialog and lets the user choose a file
     * @param {Document} document DOM Document object
     */
    static fileDialog(document)
    {
        return new Promise((resolve, reject) => {
            
            // create a file input element
            let fileInput = document.createElement("input")
            fileInput.type = "file"

            // register change handler
            fileInput.onchange = () => {
                
                // allow only a single file
                if (fileInput.files.length != 1)
                    reject()

                resolve(fileInput.files[0])
            }

            // open the dialog
            fileInput.click()
        })
    }
}

module.exports = SporeUploader