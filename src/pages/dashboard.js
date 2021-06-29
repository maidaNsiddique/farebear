import React, { useState } from 'react'
import './dashboard.css'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

const MapComponent = withGoogleMap((props) => {
  console.log(props.source)
  console.log(props.destination)
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{
      lat: 33.7166,
      lng: 73.042
    }}>
      <Marker position={props.source} />
      <Marker position={props.destination} />
    </GoogleMap>
  )
})

const Dashboard = (props) => {
  const { 
    handleLogout
    }=props;
  const [sourceName, setSourceName] = useState('')
  const [destinationName, setDestinationName] = useState('')
  const [uberRate, setUberRate] = useState(0)
  const [careemRate, setcareemRate] = useState(0)
  const [taxiRate, setTaxiRate] = useState(0)
  const [duration, setDuration] = useState('')
  const [sourceDetails, setSourceDetails] = useState({})
  const [destinationDetails, setDestinationDetails] = useState({})
  const [locations, setLocations] = useState([
    {
      city: 'f-8/3',
      latitude: 33.7166,
      longitude: 73.042,
    },
    {
      city: 'f-8/4',
      latitude: 33.7089,
      longitude: 73.045,
    },
    {
      city: 'f-7',
      latitude: 33.72119,
      longitude: 73.0561,
    },
    {
      city: 'g-7',
      latitude: 33.70634,
      longitude: 73.06955,
    },
    {
      city: 'blue area',
      latitude: 33.7234,
      longitude: 73.07885,
    },
    {
      city: 'i-8',
      latitude: 33.4319,
      longitude: 73.03417,
    },
    {
      city: 'g-8/3',
      latitude: 33.7013,
      longitude: 73.0532,
    },
    {
      city: 'g-7/2',
      latitude: 33.7051,
      longitude: 73.0626,
    },
  ])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }

  const getDistanceMatrix = () => {
    let sourceLat, sourceLong
    let destinationLat, destinationLong

    locations.forEach((element) => {
      if (element.city === sourceName) {
        sourceLat = element.latitude
        sourceLong = element.longitude
      }
    })

    locations.forEach((element) => {
      if (element.city === destinationName) {
        destinationLat = element.latitude
        destinationLong = element.longitude
      }
    })

    setSourceDetails({ lat: sourceLat, lng: sourceLong })
    setDestinationDetails({ lat: destinationLat, lng: destinationLong })

    let careem = {
      initial: 20,
      service: 20,
      minute: 0.33,
      kilometer: 0.9,
      minFare:95,
      maxFare: '',
      cancellation: 50,
    }

    let uber = {
      initial: 25,
      service: 20,
      minute: 0.33,
      kilometer: 0.7,
      minFare: 100.0,
      maxFare: '',
      cancellation: 50,
    }

    let taxi = {
      flag: 335,
      kilometer: 1.93,
      minute: 0.57,
    }

    let uberPrice, careemPrice, taxiPrice

    let dist = calculateDistance(
      sourceLat,
      sourceLong,
      destinationLat,
      destinationLong,
    )

    uberPrice =
      (dist/ 1000) * uber.kilometer +
      (duration / 60) * uber.minute +
      uber.initial +
      uber.service
    uberPrice =
      uberPrice > uber.minFare ? uberPrice.toFixed(2) : uber.minFare.toFixed(2)

    careemPrice =
      (dist / 1000) * careem.kilometer +
      (duration / 60) * careem.minute +
      careem.initial +
      careem.service
    careemPrice =
      careemPrice > careem.minFare ? careemPrice.toFixed(2) : careem.minFare.toFixed(2)

    taxiPrice =
      taxi.flag +
      (dist/ 1000) * taxi.kilometer +
      (duration / 60) * 0.15 * taxi.minute
    taxiPrice = taxiPrice.toFixed(2)
    setUberRate(Math.floor(Math.random() * (200 - 100) + 100))
    setcareemRate(Math.floor(Math.random() * (200 - 100) + 90))
    setTaxiRate(Math.floor(Math.random() * (400 - 180) + 180))
  }
 

  return (
    <div>
      <div className='sidebar'>
        <div className='menu'>
          <h2>Maida</h2>
          <ul>
            <li>
              <a href='https://res.cloudinary.com/ddsxxnsah/image/upload/v1624865398/farebear-aboutus.png' target="_blank" >
                <i className='fas fa-user'></i>About us
              </a>
            </li>
            <li>
              <a href="/">
              <i className='fas fa-sync-alt'></i>Reload
              </a>
            </li>
            <li>
              <a onClick={handleLogout} >
                <i className='fas fa-sign-out-alt'></i>Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='locationcont'>
        <div >
          <input
            className='loc'
            id='source'
            type='text'
            align='center'
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder='Current Location'
            required
          />
          <input
            className='loc'
            id='destination'
            type='text'
            align='center'
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            placeholder='Drop-off Location'
            required
          />
        </div>
        <div>
          <button className='btnn' onClick={getDistanceMatrix}>
            Search
          </button>
        </div>
      </div>
      <div className='wrapper'>
        <div>
        <a href='https://www.uber.com/pk/en/' target="_blank"> <span className='farecont'>Uber: Rs. {uberRate} </span> </a>
        <a href='https://identity.careem.com/login' target="_blank" > <span className='farecont'>Careem: Rs. {careemRate}</span> </a>
          <span className='farecont'>Taxi: Rs. {taxiRate}</span>
        </div>
        <div id='ma'>
          <div id='msg'></div>
          <MapComponent
            source={sourceDetails}
            destination={destinationDetails}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ width: '390px', height: '550px' }} />}
            mapElement={<div style={{ height: `100%`, borderRadius:'1.5em' }} />}
          />
        </div>
      </div>
    </div>
  )
}
export default Dashboard
