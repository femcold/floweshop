// src/Components/OrderCreationStep.js
import React from 'react';

const OrderCreationStep = ({ stepNumber, stepTitle, children }) => {
  return (
    <div>
      <h2>Step {stepNumber}: {stepTitle}</h2>
      {children}
    </div>
  );
};

export default OrderCreationStep;
