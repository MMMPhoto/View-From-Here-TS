import { FC } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from './Map';
import Marker from "./Marker";
import { Photo } from "../../types/Photo";

const apiKey: string = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string);

const startCenter: object = { lat: -25.363, lng: 131.044 };
const startZoom: number = 5;
const mapStyle: object = { flexGrow: "1", height: "100%" };

type Markers = Array<object>;

const MapWrapper: FC<{markers: Markers}> = (markers) => {

    const render = (status: Status) => {
        switch (status) {
          case Status.LOADING:
            return <h1>Loading</h1>;
          case Status.FAILURE:
            return <h1>Error</h1>;
          case Status.SUCCESS:
            return (
                    <Map
                        center={startCenter}
                        zoom={startZoom}
                        style={mapStyle}
                    >
                    {/* {markers.map((marker, index) => {
                        return <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />;
                    })}; */}
                    </Map>
            );
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
            <Wrapper apiKey={apiKey} render={render} />
        </div>
    );
};

export default MapWrapper;
