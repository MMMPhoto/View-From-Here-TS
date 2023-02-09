// import { FC, useRef, useEffect, useState, Children, isValidElement, cloneElement } from "react";
// import { Photo } from "../../types/Photo";

// type Markers = Photo[];

// const Map: FC<{ markers: Markers, center: google.maps.LatLngLiteral, zoom: number }> = (markers, center, zoom) {
//   const ref = useRef();

//   useEffect(() => {
//     new window.google.maps.Map(ref.current, { 
//       center,
//       zoom,
//     });
//   });

//   return (
//     <div ref={ref} id="map">
//     {markers.map(marker) => {
//       if (isValidElement(child)) {
//         return cloneElement(child, { map });
//       }
//     </div>

//   )
// };

// export default Map;

// // const Map: FC<{on}> = ({ onClick, onIdle, children, style, ...options }) => {
// //   const ref = useRef(null);
// //   const [map, setMap] = useState();

// //   useEffect(() => {
// //     if (ref.current && !map) {
// //       setMap(new window.google.maps.Map(ref.current, {}));
// //     }
// //   }, [ref, map]);

// //   useEffect(() => {
// //     if (map) {
// //       map.setOptions(options);
// //     }
// //   }, [map, options]);

// //   useEffect(() => {
// //     if (map) {
// //       ["click", "idle"].forEach((eventName) =>
// //         window.google.maps.event.clearListeners(map, eventName)
// //       );

// //       if (onClick) {
// //         map.addListener("click", onClick);
// //         console.log('clicked!');
// //       }

// //       if (onIdle) {
// //         map.addListener("idle", () => onIdle(map));
// //       }
// //     }
// //   }, [map, onClick, onIdle]);

// //   return (
// //     <div ref={ref} style={style} >
// //         {Children.map(children, (child) => {
// //           if (isValidElement(child)) {
// //             return cloneElement(child, { map });
// //           }
// //         })};
// //     </div>
// //   );
// // };

// // export default Map;
