import React from 'react';
import CardSwap from '../card/CardSwap.card';
import { Card } from '../ui/card';

export const WhatWeDo = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CardSwap
        cardDistance={60}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={false}
      >
        <Card className="bg-amber-50">
          <h3>Card 1</h3>
          <p>Your content here</p>
        </Card>
        <Card className="bg-amber-50">
          <h3>Card 2</h3>
          <p>Your content here</p>
        </Card>
        <Card className="bg-amber-50">
          <h3>Card 3</h3>
          <p>Your content here</p>
        </Card>
      </CardSwap>
    </div>
  );
};
