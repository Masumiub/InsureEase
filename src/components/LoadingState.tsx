import React from 'react'
import Lottie from "lottie-react";
import Img from '../../public/assets/loader.json'


export default function LoadingState() {
  return (
    <div className='w-full md:w-10/12 h-screen mx-auto'>
        <Lottie className="w-45 mx-auto my-40" animationData={Img} loop={true} ></Lottie>
    </div>
  )
}
