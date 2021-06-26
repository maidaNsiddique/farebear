import React, { useState } from 'react'
import './dashboard.css'

import { GoogleMap, Marker } from 'react-google-maps'

const MapComponent = (props) => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={props.source} />
      <Marker position={props.destination} />
    </GoogleMap>
  )
}

function Dashboard() {
  const [sourceName, setSourceName] = useState('')
  const [destinationName, setDestinationName] = useState('')
  const [distance, setDistance] = useState('')
  const [distanceMeters, setDistanceMeters] = useState('')
  const [duration, setDuration] = useState('')
  const [durationSecs, setDurationSecs] = useState('')
  const [showOptions, setShowOptions] = useState(false)
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
  const getDistanceMatrix = async (origin, destination) => {
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

    let service = new window.google.maps.DistanceMatrixService()

    service.getDistanceMatrix(
      {
        origins: [sourceDetails], //origin
        destinations: [destinationDetails], //destination
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(Date.now()), // for the time N milliseconds from now.
          trafficModel: 'bestguess',
        },
      },
      function (response, status) {
        setDistance(response.rows[0].elements[0].distance['text'])
        setDistanceMeters(response.rows[0].elements[0].distance['value'])
        setDuration(response.rows[0].elements[0].duration_in_traffic['text'])
        setDurationSecs(
          response.rows[0].elements[0].duration_in_traffic['value'],
        )
        setShowOptions(true)
      },
    )
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
          <button className='btn' onclick='initMap()'>
            Search
          </button>
        </div>
      </div>
      <div className='wrapper'>
        <div>
          <p>Main Area</p>
        </div>
        <div id='map'>
          <div id='msg'></div>
          <MapComponent
            source={sourceDetails}
            destination={destinationDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
