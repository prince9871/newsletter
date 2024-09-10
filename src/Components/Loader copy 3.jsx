import React from 'react'
// import { ClipLoader } from 'react-spinners'
import './loader.css'
import Lottie from 'lottie-react'
import animationData from './Animation - 1724911042928.json'
// import { CardHeader } from '@chakra-ui/react'

const Loader = () => {
  return (
    <>
      <div style={styles.loaderContainer}>
        {/* <ClipLoader color='#36d7b7' size={50} />{' '} */}
        {/* Spinner ka color aur size customize kar sakta hai */}
        {/* <div className='spinner'>
        <div className='first' />
        <div className='second' />
      </div> */}
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 150, height: 150 }}
        />
         <div style={styles.textContainer}>
          <h2>NEX Loading...</h2>
          <p>Please wait while we load your content</p>
        </div>
      </div>
      {/* <CardHeader>NEX Loading...</CardHeader> */}
    </>
  )
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Puri screen ka height le raha hai for centering
    backgroundColor: '#fff' /* White background for the preloader */
  },
  textContainer: {
    marginTop: '20px', // Space between the animation and text
    textAlign: 'center', // Center-align the text
    color: '#333', // Text color (change as needed)
  }
}

export default Loader
