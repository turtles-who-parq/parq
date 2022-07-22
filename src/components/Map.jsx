import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { mapStyles } from '../../public/styles/mapsStyles';

const containerStyle = {
  width: '100%',
  height: '100%',
  float: 'left',
};

const options = {
  styles: mapStyles,
};

export default function Map({ home, zoom, homeMarker, listings, API_KEY }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const markerElems = listings.map((listing, i) => {
    const position = {
      lat: listing.coordinates.lat,
      lng: listing.coordinates.lng,
    };

    // const onMarkerClick = e => {
    //   console.log(listing.address);
    // };

    return <Marker key={i} position={position} />;
  });

  // async function calculateRoute() {
  //   // if (originRef.current.value === '' || destiantionRef.current.value === '') {
  //   //   return;
  //   // }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: {
  //       lat: 43.65088,
  //       lng: -79.36576,
  //     },
  //     destination: '609 King St W, Toronto, ON M5V 1M5',
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   console.log('results.routes[0].legs[0].distance==>', results.routes[0].legs[0].distance);
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);
  // }
  if (API_KEY)
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={home}
          zoom={zoom}
          options={options}
          // onLoad={() => {
          //   calculateRoute();
          // }}
        >
          {homeMarker && (
            <Marker
              position={home}
              icon={{
                url: 'http://maps.google.com/mapfiles/kml/pal3/icon23.png',
              }}
            />
          )}
          {markerElems}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </LoadScript>
    );
}
