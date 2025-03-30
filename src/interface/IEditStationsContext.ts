export interface IEditStationsContext {
  editedStations: Record<string, string>;
  editStationName: (stationuuid: string, newName: string) => void;
}
