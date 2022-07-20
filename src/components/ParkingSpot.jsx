import React from 'react';
import topoBackground from '../../public/images/topoBackground.png';

const ParkingSpot = ({ address }) => {
  const onSpotClick = e => {
    console.log(address);
  };

  return (
    <div className='parkingSpotTile' onClick={onSpotClick}>
      <img className='tileTopo' src={topoBackground} width='100%'></img>
      <span>
        <h1 className='spotAddress'>{address}</h1>
      </span>
    </div>
  );
};

export default ParkingSpot;
