import React from 'react';
import Topbar from '../components/navbar';
import SustainabilityForm from '../components/SustainabilityForm'; // Adjust the path as needed

const MyRestaurant: React.FC = () => {
  return (
    <div>
      <Topbar />
      <SustainabilityForm />
    </div>
  );
};

export default MyRestaurant;
