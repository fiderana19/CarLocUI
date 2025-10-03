import React from 'react';

type CardProps = {
    title?: string;
    value?: any;
}

const StatCard: React.FC<CardProps> = ({ title, value }) => {
    return(
        <div className='bg-gray-400 p-1 rounded my-2'>
            <div className='px-1'>{ title }</div>
            <div className='bg-white rounded p-2 text-right font-semibold'>{ value.toLocaleString('fr-FR') } MGA </div>
        </div>
    )
}

export default StatCard;