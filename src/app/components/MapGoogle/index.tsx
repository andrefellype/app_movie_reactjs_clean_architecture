/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const markerBlack = '/icon_map/marker_black.png'
const markerBlue = '/icon_map/marker_blue.png'
const markerGreen = '/icon_map/marker_green.png'
const markerPurple = '/icon_map/marker_purple.png'
const markerRed = '/icon_map/marker_red.png'
const markerYellow = '/icon_map/marker_yellow.png'

class GoogleMapComponent extends React.Component<{
    keyMapGoogle: string, positionMap: { lat: number, lng: number }, zoomMap?: number, markerMain: { lat: number, lng: number }, iconMain?: string,
    markerList?: { title: string, lat: number, lng: number, pinMap: string, actionClick: () => void }[], clickableMain?: boolean, visibilityOtherMarker?: "on" | "off", style?: object
}> {

    public static PIN_MAP_BLACK = "pin_map_black"

    public static PIN_MAP_BLUE = "pin_map_blue"

    public static PIN_MAP_GREEN = "pin_map_green"

    public static PIN_MAP_PURPLE = "pin_map_purple"

    public static PIN_MAP_RED = "pin_map_red"

    public static PIN_MAP_YELLOW = "pin_map_yellow"

    render() {
        const { keyMapGoogle, positionMap, zoomMap = 14, markerMain = null, iconMain = '/icon_map/marker_purple.png', markerList = null, clickableMain = false, visibilityOtherMarker = "off", ...other } = this.props

        function getPinMap(pinMap: string | undefined): string {
            if (pinMap === GoogleMapComponent.PIN_MAP_BLACK) {
                return markerBlack
            }
            if (pinMap === GoogleMapComponent.PIN_MAP_BLUE) {
                return markerBlue
            }
            if (pinMap === GoogleMapComponent.PIN_MAP_GREEN) {
                return markerGreen
            }
            if (pinMap === GoogleMapComponent.PIN_MAP_PURPLE) {
                return markerPurple
            }
            if (pinMap === GoogleMapComponent.PIN_MAP_YELLOW) {
                return markerYellow
            }
            return markerRed
        }

        function getMarker() {
            if (typeof markerList !== "undefined" && markerList !== null) {
                return markerList
            }
            return []
        }

        return (
            <LoadScript googleMapsApiKey={keyMapGoogle}>
                <GoogleMap {...other} mapContainerStyle={{ width: '100%', height: '100%' }} center={positionMap} zoom={zoomMap}
                    options={{
                        streetViewControl: false, scaleControl: true, fullscreenControl: false, disableDoubleClickZoom: true, clickableIcons: true,
                        styles: [{ featureType: "poi.business", elementType: "labels", stylers: [{ visibility: visibilityOtherMarker }] }],
                    }}>
                    {markerMain && <Marker clickable={clickableMain} icon={iconMain} title="Minha posição"
                        position={markerMain} />}
                    {getMarker().map((markerItem, key) => (<Marker key={key} icon={getPinMap(markerItem.pinMap)}
                        onClick={markerItem.actionClick}
                        title={markerItem.title} position={{ lat: markerItem.lat, lng: markerItem.lng }} />))}
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default GoogleMapComponent