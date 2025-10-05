import Board from '../assets/images/board.jpg'
import React, { lazy, Suspense } from 'react';
const Navigation = lazy(() => import('@/components/Navigation/Navigation'));
const Typewriter = lazy(() => import('@/components/TypeWritter'));
import { LoadingOutlined } from '@ant-design/icons';

const Home: React.FC = () => {

    return(
        <div className='px-20 pt-20 pb-5'>
            <Suspense
                fallback={<div className='text-2xl'><LoadingOutlined className='mx-auto' /></div>}
            >
                <Navigation />
            </Suspense>
            <div>
                <div className='text-4xl font-bold mt-10 mb-20'>
                    <Suspense
                        fallback={<div className='text-2xl'><LoadingOutlined className='mx-auto' /></div>}
                    >
                        <Typewriter text='CARLOC, là où on loue des voitures de luxe.' />
                    </Suspense>                    
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

export default Home;