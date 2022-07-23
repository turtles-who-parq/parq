import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

// this view will be rendering steps and render payment info + Review + Successful order

const Checkout = () => {
  const onClick = (e) => {
    e.preventDefault();
    console.log('--------- sending checking out session --------');

    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parking: [
          { id: 1, day: 1 },
          { id: 2, day: 3 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log(url);
        // window.location = url;
      })
      .catch((e) => {
        console.log('----Error in Creating Stripe Payment-----');
        console.error(e.error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={onClick}> Create Checkout</Button>
      <Outlet />
    </div>
  );
};

export default Checkout;
