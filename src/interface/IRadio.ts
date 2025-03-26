export interface IRadioStation {
    changeuuid: string;
    stationuuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    iso_3166_2: string | null;
    state: string;
    language: string;
    languagecodes: string;
    votes: number;
    lastchangetime: string;
    lastchangetime_iso8601: string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    lastchecktime_iso8601: string;
    lastcheckoktime: string;
    lastcheckoktime_iso8601: string;
    lastlocalchecktime: string;
    lastlocalchecktime_iso8601: string;
    clicktimestamp: string | null;
    clicktimestamp_iso8601: string | null;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat: number | null;
    geo_long: number | null;
    geo_distance: number | null;
    has_extended_info: boolean;
}
  
export interface IRadioListParams {
    name?: string;
    country?: string;
    language?: string;
    limit?: number;
    offset?: number;
}

export interface IRadioCard {
    radio: IRadioStation;
};