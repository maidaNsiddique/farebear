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
    city: 'f-7 ',
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
