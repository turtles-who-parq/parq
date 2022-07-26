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

export default function Map2({ origin, location, API_KEY }) {
  console.log('API_KEY==>', API_KEY);
  console.log('origin==>', origin);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: location,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log('results.routes[0].legs[0].distance==>', results.routes[0].legs[0].distance);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  if (API_KEY)
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={7}
          options={options}
          onLoad={() => {
            calculateRoute();
          }}
        >
          {/* {homeMarker && (
            <Marker
              position={home}
              icon={{
                url: 'http://maps.google.com/mapfiles/kml/pal3/icon23.png',
              }}
            />
          )} */}

          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </LoadScript>
    );
}
