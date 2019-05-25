import { ICoordinates } from '../types'

export const getCurrentCoordinates = (): ICoordinates => {
  return {
    latitude: 55.7536232,
    longitude: 37.6199775
  }
}

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export const getDistance = (firstCoordinates: ICoordinates, secondCoordinates: ICoordinates) => {
  const {
    latitude: lat1,
    longitude: lon1
  } = firstCoordinates

  const {
    latitude: lat2,
    longitude: lon2
  } = secondCoordinates

  if (!lat1 || !lon1 || !lat2 || !lon2) return NaN

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(+lat2 - +lat1);  // deg2rad below
  var dLon = deg2rad(+lon2 - +lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(+lat1)) * Math.cos(deg2rad(+lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg: number) => deg * (Math.PI / 180)