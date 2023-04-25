import { Link } from 'react-router-dom'

const DisplayAnimal = ({ id, userId, link, username, name, type, image, description }) => {


  return (
    <>
      <div className='animal-card' key={id}>
        <Link key={id} to={`/animals/${id}`}>
          <div className='animal-image' style={{ backgroundImage: `url('${image}')` }}></div>
          <div className="thing">
            <div className='name'>{name}</div>
            <div className='type'>{type}</div>
            <div className='description'>{description}</div>
            {/* <div className='animal-image' style={{ backgroundImage: `url('${image}')` }}></div> */}
          </div>
        </Link>
      </div>
    </>
  )
}

export default DisplayAnimal