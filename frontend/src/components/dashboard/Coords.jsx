import { useMapEvents } from 'react-leaflet/hooks'
import { useEffect } from 'react'

function Coords({ setCenterCoords, setBoundsCoords }) {
  const map = useMapEvents({
    dragend: (e) => {
      const center = e.target.getCenter()
      const { lat, lng } = center
      setCenterCoords([lat, lng])
      const bounds = e.target.getBounds()
      const { lat: latBound, lng: lngBound } = bounds._northEast
      setBoundsCoords([latBound, lngBound])
    },
    zoomend: (e) => {
      const center = e.target.getCenter()
      const { lat, lng } = center
      setCenterCoords([lat, lng])
      const bounds = e.target.getBounds()
      const { lat: latBound, lng: lngBound } = bounds._northEast
      setBoundsCoords([latBound, lngBound])
    },
    zoomlevelschange: (e) => {
      const center = e.target.getCenter()
      const { lat, lng } = center
      setCenterCoords([lat, lng])
      const bounds = e.target.getBounds()
      const { lat: latBound, lng: lngBound } = bounds._northEast
      setBoundsCoords([latBound, lngBound])
    },
  })

  useEffect(() => {
    // Get the initial boundaries after the map has mounted
    if (map) {
      const initialBounds = map.getBounds()
      const { lat, lng } = initialBounds._northEast
      setBoundsCoords([lat, lng])
    }
  }, [map])
}

export default Coords
