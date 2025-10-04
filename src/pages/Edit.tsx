import Navigation from '@/components/Navigation/Navigation';
import Board from '../assets/images/board.jpg'
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { HttpStatus } from '@/constants/Http_status';
import { useGetAllLocation } from '@/hooks/useGetAllLocation';
import { useGetStats } from '@/hooks/useGetStats';
import { EditLocation } from '@/types/Location';
import { handleNumberKeyPress } from '@/utils/handleKeyPress';
import { EditLocationValidation } from '@/validation/location.validation';
import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGetLocationById } from '@/hooks/useGetLocationById';
import { usePatchLocation } from '@/hooks/usePatchLocation';

const Edit: React.FC = () => {
    const req = useParams();
    const Id = req.id;
    const { data: location, isLoading: locLoading } = useGetLocationById(Number(Id));
    const { handleSubmit: create, control, formState: { errors }, setValue } = useForm<EditLocation>({
        resolver: yupResolver(EditLocationValidation)
    });
    const { refetch: refetchLocation } = useGetAllLocation();
    const { refetch: refetchStats } = useGetStats();
    const { mutateAsync: editLocation, isPending: editLoading } = usePatchLocation({action() {
        refetchLocation();
        refetchStats();
    },});
    const navigate = useNavigate();

    useEffect(() => {
        setValue('numloc', Number(Id));
    }, [req])

    const submit = async (data: EditLocation) => {
        const response = await editLocation(data);
        if(response?.status === HttpStatus.CREATED || response?.status === HttpStatus.OK) {
            navigate('/locations')
        }
    }

    return(
        <div className='px-20 pt-20 pb-5 bg-gray-50'>
            <Navigation />
            <div>
                <div className='text-3xl font-extrabold mt-5'>
                    Modifier une location de voiture
                </div>
                <div className='flex my-5 justify-between gap-10'>
                    <div className='w-1/2'>
                        {
                            locLoading && <LoadingOutlined className='text-3xl' />
                        }
                        {
                            location &&
                            <form onSubmit={create(submit)} className='w-80 mx-auto bg-white p-10 border rounded' >
                                <Label className='mb-1'>Nom du locataire :</Label>
                                <Controller 
                                    defaultValue={location?.nom_loc}
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
                                    defaultValue={location?.design_voiture}
                                    name='design_voiture'
                                    render={({ field: { value, onChange } }) => (
                                        <Input value={value} onChange={onChange} className={`${errors?.design_voiture && 'border border-red-500 text-red-500 rounded'}`} />
                                    )}
                                />
                                { errors?.design_voiture && <div className='text-red-500 text-left w-full text-xs'>{ errors?.design_voiture?.message }</div> }
                                <Label className='mb-1 mt-4'>Taux journalier :</Label>
                                <Controller 
                                    control={control}
                                    defaultValue={location?.taux_journalier}
                                    name='taux_journalier'
                                    render={({ field: { value, onChange } }) => (
                                        <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`${errors?.taux_journalier && 'border border-red-500 text-red-500 rounded'}`} />
                                    )}
                                />
                                { errors?.taux_journalier && <div className='text-red-500 text-left w-full text-xs'>{ errors?.taux_journalier?.message }</div> }
                                <Label className='mb-1 mt-4'>Durée de la location(jours) :</Label>
                                <Controller 
                                    control={control}
                                    defaultValue={location?.nbr_jours}
                                    name='nbr_jours'
                                    render={({ field: { value, onChange } }) => (
                                        <Input value={value} onChange={onChange} onKeyPress={handleNumberKeyPress} className={`${errors?.nbr_jours && 'border border-red-500 text-red-500 rounded'}`} />
                                    )}
                                />
                                { errors?.nbr_jours && <div className='text-red-500 text-left w-full text-xs'>{ errors?.nbr_jours?.message }</div> }
                                <Button type='submit' className='mt-4 w-full'>
                                    { editLoading && <LoadingOutlined /> }
                                    MODIFIER
                                </Button>
                            </form>
                        }
                    </div>
                    <div className='w-1/2 h-full  border rounded'>
                        <img src={Board} alt="Board" className='h-full  border rounded' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;