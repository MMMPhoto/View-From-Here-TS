// import { useRef, useEffect, useState } from "react";

// const Marker = (options) => {
//   const [marker, setMarker] = useState();
//   const contentRef = useRef(null);

//   useEffect(() => {
//     if (!marker) {
//       setMarker(new window.google.maps.Marker());
//     }

//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   useEffect(() => {
//     if (marker) {
//       const infowindow = new window.google.maps.InfoWindow({
//         content: `daver`
//       });
//       marker.setOptions(options);

//       marker.addListener("click", () => {
//         infowindow.open({
//           anchor: marker,
//           shouldFocus: false
//         });
//       });
//     }
//   }, [marker, options]);

//   return null;
// };

// export default MarMarker;
