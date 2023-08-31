function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180)
}

export default function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371 // Radius of the Earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const preciseDistance = earthRadiusKm * c // Distance in kilometers

  const distance = preciseDistance.toFixed(2)

  return distance
}

// const lat1 = 52.52 // Latitude of point 1
// const lon1 = 13.405 // Longitude of point 1
// const lat2 = 48.8566 // Latitude of point 2
// const lon2 = 2.3522 // Longitude of point 2

// const distance = calculateHaversineDistance(lat1, lon1, lat2, lon2)
// console.log(`Distance between the two points: ${distance.toFixed(2)} km`)
