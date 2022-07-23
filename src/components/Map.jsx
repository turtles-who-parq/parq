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

  // const homeMarker = (
  //   <Marker
  //     key={-1}
  //     position={center}
  //     color={'yellow'}
  //     icon={{
  //       url: 'http://maps.google.com/mapfiles/kml/pal3/icon23.png',
  //     }}
  //   />
  // );

  const markerElems = listings.map((listing, i) => {
    const position = {
      lat: listing.coordinates.lat,
      lng: listing.coordinates.lng,
    };
    return <Marker key={i} position={position} />;
  });

  if (API_KEY)
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={home}
          zoom={zoom}
          options={options}
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
