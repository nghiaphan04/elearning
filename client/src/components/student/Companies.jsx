/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
    return (
        <div className='pt-16'>
        
            <p className='text-base text-gray-500'>Companies and organizations</p>
            <div className='flex flex-wrap justify-center items-center 
            gap-6 md:gap-10 mt-5'>
                <img src={assets.h} alt="logo1" 
                className='w-20 md:w-28'/>
                <img src={assets.h} alt="logo2" 
                className='w-20 md:w-28'/>
                <img src={assets.h} alt="logo3" 
                className='w-20 md:w-28'/>
                <img src={assets.h} alt="logo4" 
                className='w-20 md:w-28'/>
                <img src={assets.h} alt="logo5" 
                className='w-20 md:w-28'/>
               
            </div>
        </div>
    );
}

export default Companies;
