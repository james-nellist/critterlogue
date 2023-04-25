import { useState } from 'react'
import ImageUploadField from './UploadImage.js'
import axios from 'axios'
import { getToken, getEmail } from '../../helpers/auth'
import { useNavigate, useParams } from 'react-router-dom'
import DisplayAnimal from './DisplayAnimal'


const CreateAnimal = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [ formFields, setFormFields ] = useState({
    notes: '',
    image: '',
    animal: id,
    email: getEmail(),
  })

  const [ error, setError ] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/sightings/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/animals/${formFields.animal}/`)
      formFields.text = ''
    } catch (err) {
      console.log(err)
      setError('Please fill the fields and make sure you are logged in to create a post :)')
    }
  }

  return (
    <div className='form-container'>
      <div className="form-border">
        <form onSubmit={handleSubmit}>
          <h2>Add a sighting</h2>

          < ImageUploadField
            setFormFields={setFormFields}
            formFields={formFields}
          />
          {/* <label htmlFor="animal">
            <textarea name='animal' cols="21" rows="2" placeholder="animal id" value={id} onChange={handleChange} type='hidden'/>
          </label> */}
          <input type='hidden' value={formFields.animal} />
          {console.log('mail',formFields.email)}
          {/* <input type='hidden' value={formFields.email} /> */}
          <label htmlFor="notes">
            <textarea name='notes' cols="21" rows="2" placeholder="write note" value={formFields.notes} onChange={handleChange} />
          </label>
          <button type="submit">Add</button>
          {error && <p className='text-center'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateAnimal