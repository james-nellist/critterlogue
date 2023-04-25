import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DisplayAnimal from './DisplayAnimal.js'

const SingleAnimal = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [animals, setAnimal] = useState(null)
  const [user, setUser] = useState(null)
  const [linkUrl, setLinkUrl] = useState()
  const [error, setError] = useState('')

  const [sightingFields, setSightingFields] = useState({
    text: '',
  })


  useEffect(() => {
    const getAnimal = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${id}/`)
        setAnimal(data)
      } catch (err) {
        setError(err)
      }
    }
    getAnimal()
  }, [sightingFields, animals, linkUrl])

  return (
    <main className='homepage single-post-page'>
      {animals ?
        <>
          <DisplayAnimal
            id={animals.id}
            name={animals.name}
            description={animals.description}
            image={animals.image}
          />
          <div className='block2-mid'>
            <h5>Sightings</h5>
            <Link className='sighting-link' to={`/animals/${animals.id}/sightings`} as={Link}> add a sighting </Link>
            <div className='comments-scroll'>
              {/* {console.log('animal sightingsd',animals.sightings)} */}
              {/* {console.log('user', user)} */}
              {animals.sightings.map(sighting => {

                const { image, notes, id, owner } = sighting
                const dateSighted = sighting.date_sighted
                return (
                  <div key={sighting.id} className='comment'>
                    <div className='single-post-username'><div style={{ backgroundImage: `url('${image}')` }} className='profile-picture'></div><></></div>
                    <div className='comment-margin'>{dateSighted.slice(0, 10).split('-').reverse().join('-')}</div>
                    <div className='comment-margin'>{notes}</div>
                    {/* <div className='comment-margin'>{id}</div> */}

                  </div>
                )
              })}
            </div>
          </div>
          <Link to={`/animals/${animals.id}/sightings`} as={Link}></Link></>
        :
        <>
          <h1>error</h1>
        </>
      }

    </main>
  )
}


export default SingleAnimal