var map
const cityDetails = [
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
]
function initMap() {
  let sourceLat, sourceLong
  let destinationLat, destinationLong

  const source = document.getElementById('source').value
  const destination = document.getElementById('destination').value

  cityDetails.forEach((element) => {
    if (element.city === source) {
      sourceLat = element.latitude
      sourceLong = element.longitude
    }
  })

  cityDetails.forEach((element) => {
    if (element.city === destination) {
      destinationLat = element.latitude
      destinationLong = element.longitude
    }
  })

  const center = { lat: sourceLat, lng: sourceLong }
  const options = { zoom: 10, scaleControl: true, center: center }

  map = new google.maps.Map(document.getElementById('map'), options)

  const sourceDetails = { lat: sourceLat, lng: sourceLong }
  const destinationDetails = { lat: destinationLat, lng: destinationLong }
  // const sourceDetails = { lng: 73.0479, lat: 33.6844 };
  // const destinationDetails = { lng: 74.5229, lat: 32.4945 };

  console.log(sourceDetails)
  console.log(destinationDetails)

  let mk1 = new google.maps.Marker({ position: sourceDetails, map: map })
  let mk2 = new google.maps.Marker({ position: destinationDetails, map: map })
}
