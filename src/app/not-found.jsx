'use client';
import Link from 'next/link';
import Lottie from "lottie-react";
import ErrorImg from '../../public/assets/Website maintenance, website problems, 404.json'


const notFoundPage404 = () => {
    return (
<div className='mx-auto flex flex-col justify-center text-center my-30'>
            <div className='mx-auto'>
            
            <Lottie className="w-[270px] md:w-[500px] lg:w-[800px] mx-auto" animationData={ErrorImg}  loop={true} ></Lottie>
            </div>

            <div className='mt-10 text-center mx-auto'> 
                <h2 className='text-2xl md:text-5xl lg:text-7xl'>404! Page not found!</h2>
                <Link href='/' className="btn btn-neutral mt-8">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default notFoundPage404;