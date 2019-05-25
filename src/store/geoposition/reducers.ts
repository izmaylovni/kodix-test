import { ICoordinates } from "../../types";
import { getCurrentCoordinates } from "../../helpers/geoposition";

export interface IGeoState {
  currentPosition: ICoordinates
}

const InitialGeoState = {
  currentPosition: getCurrentCoordinates()
}

export default (state: IGeoState = InitialGeoState) => {
  return state
}