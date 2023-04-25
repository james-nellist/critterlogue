import { useState } from 'react'
import ImageUploadField from './UploadImage.js'
import axios from 'axios'
import { getToken } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'


const CreateAnimal = () => {

  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState({
    name: '',
    type: '',
    description: '',
    image: '',
  })

  const [ error, setError ] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(formFields)
      // console.log('new response')
      const response = await axios.post('/api/animals/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(response)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Please fill both fields and make sure you are logged in to create a post :)')
    }
  }

  return (
    <div className='form-container'>
      <div className="form-border">
        <form action="" onSubmit={handleSubmit}>
          <h2>Create Animal</h2>

          < ImageUploadField
            setFormFields={setFormFields}
            formFields={formFields}
          />
          <label htmlFor="name"></label>
          <input type="text" name="name" placeholder='name' onChange={handleChange} value={formFields.name} />
          <label htmlFor="email"></label>
          <input type="text" name="type" placeholder="type" onChange={handleChange} value={formFields.type} />
          <label htmlFor="description'">
            <textarea name='description' cols="21" rows="2" placeholder="write description" value={formFields.caption} onChange={handleChange} />
          </label>
          
          <button type="submit">Post</button>
          {error && <p className='text-center'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateAnimal