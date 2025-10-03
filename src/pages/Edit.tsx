import Navigation from '@/components/Navigation/Navigation';
import Board from '../assets/images/board.jpg'
import React from 'react';
import Typewriter from '@/components/TypeWritter';

const Edit: React.FC = () => {

    return(
        <div className='px-20 pt-20 pb-5'>
            <Navigation />
            <div>
                <div className='text-4xl font-bold mt-10 mb-20'>
                    <Typewriter text='CARLOC, là où on loue des voitures de luxe.' />
                    
                </div>
                <div className='relative'>
                    <img src={Board} alt="Home banner" className='h-80 w-full object-cover border-2 border-black rounded' />
                    <div className='absolute text-right bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black to-transparent font-bold'>
                        GESTION DES LOCATIONS DE VOITURE 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;