import { ICoordinates } from '../types'

export const getCurrentCoordinates = (): ICoordinates => {
  return {
    latitude: 55.7536232,
    longitude: 37.6199775
  }
}

export const getDistance = (firstCoordinates: ICoordinates, secondCoordinates: ICoordinates): Promise<number> => {
  const { ymaps } = window

  const {
    latitude: lat1,
    longitude: lon1
  } = firstCoordinates

  const {
    latitude: lat2,
    longitude: lon2
  } = secondCoordinates

  const multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      referencePoints: [
        [lon1, lat1],
        [lon2, lat2]
      ],
      params: {
        results: 2
      }
    },
    {
      boundsAutoApply: true
    }
  )

  return new Promise((resolve) => {
    multiRoute.model.events.add('requestsuccess', () => {
      const route = multiRoute.getRoutes().get(0)
      resolve(route ? route.properties.get('distance').value / 1000 : 0)
    })
  })
}