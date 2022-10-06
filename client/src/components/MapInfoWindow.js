import { InfoWindow } from "@react-google-maps/api";


const MapInfoWindow = (marker) => {
    return (
        <InfoWindow key={marker.id} anchor={marker.position} >
            <h6>{marker.title}</h6>
        </InfoWindow>
    )
}

export default MapInfoWindow;

                