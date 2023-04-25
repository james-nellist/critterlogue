import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DisplayAnimal from './pages/DisplayAnimal'

const Home = () => {
  const [animal, setAnimal] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const response = await axios.get('/api/animals/')
        const animalData = response.data.reverse()
        setAnimal(animalData)
      } catch (err) {
        setError(err)
      }
    }
    getAnimals()
  }, [])

  return (
    <>
      <div className='homepage'>
        {animal.length > 0 ?
          animal.map(animal => {
            const { id, name, type, description, image } = animal
            return (
              <div key={id}>
                <DisplayAnimal
                  id={id}
                  name={name}
                  type={type}
                  description={description}
                  image={image}
                />
                <Link to={`/animals/${id}/`}/>
              </div>
            )
          })
          :
          <>
            <h1>error</h1>
          </>
        }
      </div>
    </>
  )
}





export default Home