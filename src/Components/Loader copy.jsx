import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <ClipLoader color="#36d7b7" size={50} /> {/* Spinner ka color aur size customize kar sakta hai */}
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Puri screen ka height le raha hai for centering
  },
};

export default Loader;
