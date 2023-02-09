// import { FC } from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import Map from './Map';
// import Marker from "./Marker";
// import { Photo } from "../../types/Photo";

// const apiKey: string = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string);

// const startCenter: google.maps.LatLngLiteral = { lat: -25.363, lng: 131.044 };
// const startZoom: number = 5;
// const mapStyle: object = { flexGrow: "1", height: "100%" };

// type Markers = Array<object>;

// const MapWrapper: FC<{ markers: Markers }> = (markers) => {

//     const render = (status: Status) => {
//         if (Status.LOADING) {
//           return <h1>Loading</h1>;
//         } else if (Status.FAILURE) {
//           return <h1>Error</h1>;
//         } else if (Status.SUCCESS) {
//           return (
//             <Map
//                 center={startCenter}
//                 zoom={startZoom}
//                 // style={mapStyle}
//             >
//             {markers &&
//                 \markers.map((marker, index) => {
//                 <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />;
//               }) : markers
//             };
//             </Map>
//           )
//         }
            
//         }
//     };

//     return (
//         <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
//             <Wrapper apiKey={apiKey} render={render} />
//         </div>
//     );
// };

// export default MapWrapper;
