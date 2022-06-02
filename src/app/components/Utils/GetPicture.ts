/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
const GetPicture = function (filesElement) {
    const files = filesElement.current?.files
    if (typeof files !== "undefined" && files !== null) {
        let picture: File | null = null
        if (files && files.length > 0) {
            picture = files[0]
        }
        return picture
    }
    return null
}

export default GetPicture