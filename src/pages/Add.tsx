import React, { lazy, Suspense } from 'react';
const Navigation = lazy(() => import('@/components/Navigation/Navigation'));
import Board from '../assets/images/board.jpg'
import { Controller, useForm } from 'react-hook-form'
import { CreateLocation } from '@/types/Location';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateLocationValidation } from '../validation/location.validation';
import { handleNumberKeyPress } from '@/utils/handleKeyPress';
import { usePostLocation } from '@/hooks/usePostLocation';
import { useGetAllLocation } from '@/hooks/useGetAllLocation';
import { useGetStats } from '@/hooks/useGetStats';
import { useNavigate } from 'react-router-dom';
import { HttpStatus } from '@/constants/Http_status';
import { LoadingOutlined } from '@ant-design/icons';

const Add: React.FC = () => {
    const { handleSubmit: create, control, formState: { errors } } = useForm<CreateLocation>({
        resolver: yupResolver(CreateLocationValidation)
    });
    const { refetch: refetchLocation } = useGetAllLocation();
    const { refetch: refetchStats } = useGetStats();
    const { mutateAsync: postLocation, isPending: createLoading } = usePostLocation({action() {
        refetchLocation();
        refetchStats();
    },});
    const navigate = useNavigate();

    const submit = async (data: CreateLocation) => {
        const response = await postLocation(data);
        if(response?.status === HttpStatus.CREATED || response?.status === HttpStatus.OK) {
            navigate('/locations')
        }
    }

    return(
        <div className='px-20 pt-20 pb-5 bg-gray-50'>
            <Suspense
                fallback={<div className='text-2xl'><LoadingOutlined className='mx-auto' /></div>}
            >
                <Navigation />
            </Suspense>
            <div>
                <div className='text-3xl font-extrabold mt-5'>
                    Nouvelle location de voiture
                </div>
                <div className='flex my-5 justify-between gap-10'>
                    <div className='w-1/2 h-full  border rounded'>
                        <img src={Board} alt="Board" className='h-full  border rounded' />
                    </div>
                    <div className='w-1/2'>
                        <form onSubmit={create(submit)} className='w-80 mx-auto bg-white p-10 border rounded' >
                            <Label className='mb-1'>Nom du locataire :</Label>
                            <Controller 
                                control={control}
                                name='nom_loc'
                                render={({ field: { value, onChange } }) => (
                                    <Input value={value} onChange={onChange} className={`${errors?.nom_loc && 'border border-red-500 text-red-500 rounded'}`} />
                                )}
                            />
                            { errors?.nom_loc && <div className='text-red-500 text-left w-full text-xs'>{ errors?.nom_loc?.message }</div> }
                            <Label className='mb-1 mt-4'>Designation de la voiture :</Label>
                            <Controller 
                                control={control}
                                name='design_voiture'
                                render={({ field: { value, onChange } }) => (
                                    <Input value={value} onChange={onChange} className={`${errors?.design_voiture && 'border border-red-500 text-red-500 rounded'}`} />
                                )}
                            />
                            { errors?.design_voiture && <div className='text-red-500 text-left w-full text-xs'>{ errors?.design_voiture?.message }</div> }
                            <Label className='mb-1 mt-4'>Taux journalier :</Label>
                            <Controller 
                                control={control}
                                name='taux_journalier'
                                render={({ field: { value, onChange } }) => (
                                    <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`${errors?.taux_journalier && 'border border-red-500 text-red-500 rounded'}`} />
                                )}
                            />
                            { errors?.taux_journalier && <div className='text-red-500 text-left w-full text-xs'>{ errors?.taux_journalier?.message }</div> }
                            <Label className='mb-1 mt-4'>Durée de la location(jours) :</Label>
                            <Controller 
                                control={control}
                                name='nbr_jours'
                                render={({ field: { value, onChange } }) => (
                                    <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`${errors?.nbr_jours && 'border border-red-500 text-red-500 rounded'}`} />
                                )}
                            />
                            { errors?.nbr_jours && <div className='text-red-500 text-left w-full text-xs'>{ errors?.nbr_jours?.message }</div> }
                            <Button type='submit' className='mt-4 w-full'>
                                { createLoading && <LoadingOutlined /> }
                                AJOUTER
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;