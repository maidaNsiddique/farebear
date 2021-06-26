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

function Dashboard() {
  const [sourceName, setSourceName] = useState('')
  const [destinationName, setDestinationName] = useState('')
  const [uberRate, setUberRate] = useState(0)
  const [lyftRate, setLyftRate] = useState(0)
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
      city: 'lahore',
      latitude: 31.5204,
      longitude: 74.3587,
    },
    {
      city: 'sialkot',
      latitude: 32.4945,
      longitude: 74.5229,
    },
    {
      city: 'multan',
      latitude: 30.1575,
      longitude: 71.5249,
    },
    {
      city: 'rawalpindi',
      latitude: 33.5651,
      longitude: 73.0169,
    },
    {
      city: 'peshawar',
      latitude: 34.0151,
      longitude: 71.5249,
    },
    {
      city: 'faisalabad',
      latitude: 31.4504,
      longitude: 73.135,
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

    let lyft = {
      initial: 2.5,
      service: 2.5,
      minute: 0.33,
      kilometer: 0.65,
      minFare: 5.0,
      maxFare: 400,
      cancellation: 5.0,
    }

    let uber = {
      initial: 2.5,
      service: 2.0,
      minute: 0.33,
      kilometer: 0.7,
      minFare: 6.0,
      maxFare: '',
      cancellation: 5.0,
    }

    let taxi = {
      flag: 3.35,
      kilometer: 1.93,
      minute: 0.57,
    }

    let uberPrice, lyftPrice, taxiPrice

    let distance = calculateDistance(
      sourceLat,
      sourceLong,
      destinationLat,
      destinationLong,
    )

    uberPrice =
      (distance / 1000) * uber.kilometer +
      (duration / 60) * uber.minute +
      uber.initial +
      uber.service
    uberPrice =
      uberPrice > uber.minFare ? uberPrice.toFixed(2) : uber.minFare.toFixed(2)

    lyftPrice =
      (distance / 1000) * lyft.kilometer +
      (duration / 60) * lyft.minute +
      lyft.initial +
      lyft.service
    lyftPrice =
      lyftPrice > lyft.minFare ? lyftPrice.toFixed(2) : lyft.minFare.toFixed(2)

    taxiPrice =
      taxi.flag +
      (distance / 1000) * taxi.kilometer +
      (duration / 60) * 0.15 * taxi.minute
    taxiPrice = taxiPrice.toFixed(2)

    setUberRate(uberPrice)
    setLyftRate(lyftPrice)
    setTaxiRate(taxiPrice)
  }

  return (
    <div>
      <div className='sidebar'>
        <div className='menu'>
          <h2>Maida</h2>
          <ul>
            <li>
              <a href='dashboard.html'>
                <i className='fas fa-home'></i>Home
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='fas fa-arrow-circle-left'></i>Previous
              </a>
            </li>
            <li>
              <a href='login.html'>
                <i className='fas fa-sign-out-alt'></i>Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='locationcont'>
        <div className='current'>
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
        <div className='button'>
          <button className='btn' onClick={getDistanceMatrix}>
            Search
          </button>
        </div>
      </div>
      <div className='wrapper'>
        <div>
          <p>Main Area</p>
          <span>Uber: {uberRate}</span>
          <span>Lyft: {lyftRate}</span>
          <span>Taxi: {taxiRate}</span>
        </div>
        <div id='map'>
          <div id='msg'></div>
          <MapComponent
            source={sourceDetails}
            destination={destinationDetails}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
