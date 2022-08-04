import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps';

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


function MapArea(){
    const YOUR_CLIENT_ID = 'qsmjpz291d'

    return(
        <div className="maparea">
            <RenderAfterNavermapsLoaded
            clientId={YOUR_CLIENT_ID}>
                <NaverMap 
                mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
            style={{
                width: '100%',
                height: '100%',
            }}
            defaultCenter={{ lat: 37.5013068, lng: 127.0396597 }}
            defaultZoom={18}/>
            </RenderAfterNavermapsLoaded>
        </div>
    )
}

export default MapArea