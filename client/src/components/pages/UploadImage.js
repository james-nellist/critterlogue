import axios from 'axios'
import { useState } from 'react'

const ImageUploadField = ({ formFields, setFormFields }) => {

  const [ error, setError ] = useState('')

  const handleUpload = async (e) => {
    const cloudName = 'dcf8cr025'
    const uploadPreset = 'w6zhsclv'

    const image = e.target.files[0]
    console.log(image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`, formData)
      // console.log('IMAGE RESPONSE',data)
      setFormFields({ ...formFields, image: data.secure_url })
    } catch (err) { 
      setError(err)
    }
  }

  return (
    <div className='field'>
      {/* <label>Image</label> */}
      { formFields.image ? 
        <img style={{ height: '200px' }} src={formFields.image} /> 
        : 
        <input style={{ fontSize: '14px' }} type="file" onChange={handleUpload}/>
      }
      {error && <p className='text-center'>{error}</p>}
    </div>
  )
}



export default ImageUploadField