import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

// function NaverMapComponent() {
//     const id = this.props.itemData.id;
//     console.log(id)
//     return (
//     <NaverMap
//         mapDivId={"react-naver-map"}
//         style={{
//             width: '100%',
//             height: '100vh'
//             }}
//             defaultCenter={{ lat: 37.554722, lng: 126.970833 }}
//             defaultZoom={10}
//         />
//     );
// }

// function MapArea() {
//   const YOUR_CLIENT_ID = "qsmjpz291d";
//   const navermaps = window.naver.maps;

//   return (
//     <div className="maparea">
//       <RenderAfterNavermapsLoaded clientId={YOUR_CLIENT_ID}>
//         <NaverMap
//           mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//           defaultCenter={{ lat: 37.5013068, lng: 127.0396597 }}
//           defaultZoom={18}
//         //   onClick={function (e) {
//         //     console.log(e.coord);
//         //   }}
//         >
//           <Marker
//             position={new navermaps.LatLng(37.5013068, 127.0396597)}
//             onClick={() => {
//               alert("여기는 멀티캠퍼스 입니다.");
//             }}
//           />
//         </NaverMap>
//       </RenderAfterNavermapsLoaded>
//     </div>
//   );
// }

const YOUR_CLIENT_ID = "qsmjpz291d";

class MapArea extends React.Component {
  state = {
    markers: [{ id: 1, lat: 36.0208521, lng: 129.3578551 }],
  };

  handleMapClick = (e) => {
    console.log(this.state);
    const lat = e.latlng.lat();
    const lng = e.latlng.lng();
    this.setState((state) => ({
      markers: [...state.markers, { id: +new Date(), lat, lng }],
    }));
  };

  render() {
    const { markers } = this.state;
    const navermaps = window.naver.maps;

    return (
      <div className="maparea">
        <RenderAfterNavermapsLoaded clientId={YOUR_CLIENT_ID}>
          <NaverMap
            mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
            style={{
              width: "100%",
              height: "100%",
            }}
            defaultCenter={{ lat: 37.5013068, lng: 127.0396597 }}
            defaultZoom={18}
            onClick={this.handleMapClick}
          >
            {markers.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  position={new navermaps.LatLng(marker.lat, marker.lng)}
                />
              );
            })}
            <Marker
              position={new navermaps.LatLng(37.5013068, 127.0396597)}
              onClick={() => {
                alert("여기는 멀티캠퍼스 입니다.");
              }}
            />
          </NaverMap>
        </RenderAfterNavermapsLoaded>
      </div>
    );
  }
}

export default MapArea;
