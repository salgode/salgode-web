import axios from 'axios'

const uploadFile = async ref => {
  const file = ref.current.files[0]

  const fileParts = file.name.split('.')
  const fileName = fileParts[0]
  const fileType = fileParts[1]
  //let typeAllowed = ['jpg', 'jpeg', 'png', 'gif'];

  try {
    // Luego debemos cambiar la url a la de produccion
    const res = await axios.post(
      `https://1gcqbk02ib.execute-api.us-east-1.amazonaws.com/playground/upload/image`,
      {
        file_name: fileName + '.' + fileType.toLowerCase(),
        file_type: fileType,
      }
    )
    try {
      const data = res.data.image_urls.upload
      const signedRequest = data
      const options = {
        headers: {
          'Content-Type': fileType,
        },
      }
      await axios.put(signedRequest, file, options)
      return res.data
    } catch (error) {
      return { err: error }
    }
  } catch (error) {
    return { err: error }
  }
}

export default uploadFile
