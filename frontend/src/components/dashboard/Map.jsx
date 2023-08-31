import { useMapEvents } from 'react-leaflet/hooks'
import { useEffect } from 'react'

function Map() {
  const map = useMapEvents({
    dragend: (e) => {
      console.log('mapCenter', e.target.getCenter())
      console.log('map bounds', e.target.getBounds())
      console.log(e.target)
    },
    zoomend: (e) => {
      console.log('mapCenter', e.target.getCenter())
      console.log('map bounds', e.target.getBounds())
    },
    zoomlevelschange: (e) => {
      console.log('mapCenter', e.target.getCenter())
      console.log('map bounds', e.target.getBounds())
    },
  })

  useEffect(() => {
    // Get the initial boundaries after the map has mounted
    if (map) {
      const initialBounds = map.getBounds()
      console.log('initial map bounds', initialBounds)
    }
  }, [map])
  return null
}
export default Map
