import Navigation from '@/components/Navigation/Navigation';
import React from 'react';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useGetAllLocation } from '@/hooks/useGetAllLocation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetStats } from '@/hooks/useGetStats';
import StatCard from '@/components/StatCard';
import { useDeleteLocation } from '@/hooks/useDeleteLocation';

const Location: React.FC = () => {
    const { data: locations, isLoading: locationLoading, refetch: refetchLocations } = useGetAllLocation();
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetStats();
    const { mutateAsync: deleteLoc, isPending: deleteLoading } = useDeleteLocation({action() {
        refetchLocations();
        refetchStats();
    },});

    const submitDelete = async (id: number) => {
        await deleteLoc(id);
    }

    return(
        <div className='px-20 pt-20 pb-5 bg-gray-50 min-h-screen'>
            <Navigation />
            <div>
                <div className='flex justify-between items-center my-5'>
                    <div className='text-xl font-bold'>Les locations</div>
                    <Link to='/add'>
                        <Button>
                            <PlusOutlined />
                            Nouvelle location
                        </Button>
                    </Link>
                </div>
                <div className='flex gap-4'>
                    <div className='border w-1/5 p-4 rounded bg-white'>
                        <div className='font-bold'>Statistiques</div>
                        {
                            statsLoading && <LoadingOutlined />
                        }
                        {
                            stats &&
                            <div>
                                <StatCard title='Somme total' value={stats[0]?.sum} />
                                <StatCard title='Prix de location maximum' value={stats[0]?.max} />
                                <StatCard title='Prix de location minimum' value={stats[0]?.min} />
                            </div>
                        }
                    </div>
                    <div className='border w-4/5 p-4 rounded bg-white'>
                        <div className='font-bold'>Liste des locations</div>
                        {
                            locationLoading && <LoadingOutlined />
                        }
                        {
                            locations &&
                            <table className='w-full divide-y divide-gray-200 my-2'>
                                <thead>
                                    <tr>
                                        <th className='px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Locataire</th>
                                        <th className='px-2  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Voiture</th>
                                        <th className='px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Durée</th>
                                        <th className='px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Taux journalier</th>
                                        <th className='px-2  py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Loyer</th>
                                        <th className='px-1 py-4  bg-gray-50'></th>
                                    </tr>
                                </thead> 
                                <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    locations.map((location: any, index: any) => {
                                        return <tr key={index}>
                                            <td className='p-2 whitespace-nowrap text-sm leading-5 text-gray-900'> { location?.nom_loc } </td>
                                            <td className='p-2 md:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900 w-10 truncate'> { location?.design_voiture }  </td>
                                            <td className='p-2 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { location?.nbr_jours } jour(s) </td>
                                            <td className='p-2 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { location?.taux_journalier.toLocaleString('fr-FR') } MGA </td>
                                            <td className='p-2 whitespace-nowrap text-sm leading-5 text-gray-900 text-center'> { location?.loyer.toLocaleString('fr-FR') } MGA </td>
                                            <td className='px-1 py-2 whitespace-nowrap text-sm leading-5 text-gray-900'>
                                                <div className='flex gap-1 justify-end'>
                                                    <Link to={`/edit/${location?.numloc}`}>
                                                        <Button size={'icon'}><EditOutlined /></Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant={'destructive'} size={'icon'}>
                                                                { deleteLoading && <LoadingOutlined /> }
                                                                <DeleteOutlined />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                            Suppression d'une location
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                            Voulez-vous vraiment supprimer la location de {location?.nom_loc} {" "}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <Button
                                                            variant={"destructive"}
                                                            onClick={() => submitDelete(location?.numloc)}
                                                            >
                                                            Confirmer
                                                            </Button>
                                                        </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </td>
                                        </tr>
                                    })                                
                                }
                                </tbody>
                            </table>  
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location;