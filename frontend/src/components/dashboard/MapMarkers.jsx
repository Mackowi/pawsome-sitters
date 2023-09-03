import * as L from 'leaflet'
import pinHome from '../../assets/home.png'
import pinPrimary from '../../assets/pinPrimary.png'
import pinSecondary from '../../assets/pinSecondary.png'

const LeafIcon = L.Icon.extend({
  options: {},
})

export const homeIcon = new LeafIcon({
  iconUrl: pinHome,
  iconAnchor: [16, 32],
  iconSize: [32, 32],
  popupAnchor: [0, -28],
})

export const primaryIcon = new LeafIcon({
  iconUrl: pinPrimary,
  iconAnchor: [16, 32],
  iconSize: [32, 32],
  popupAnchor: [0, -28],
})

export const secondaryIcon = new LeafIcon({
  iconUrl: pinSecondary,
  iconAnchor: [16, 32],
  iconSize: [32, 32],
  popupAnchor: [0, -28],
})
