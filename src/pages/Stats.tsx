import React, { lazy, Suspense, useEffect, useState } from 'react';
const Navigation = lazy(() => import('@/components/Navigation/Navigation'));
import { useGetStats } from '@/hooks/useGetStats';
import ReactApexChart from 'react-apexcharts';
import { LoadingOutlined } from '@ant-design/icons';

const Stats: React.FC = () => {
    const [chartData, setChartData] = useState<{ options: any; series: number[], labels: string[] }>({
        options: {
            labels: []
        },
        series: [],
        labels: []
    })
    const { data: chart, isLoading: chartLoading } = useGetStats();

    useEffect(() => {
        if(chart) {
            const newCharData = {
                options: {
                    labels: ['Location total', 'Location minimum', 'Location Maximum'],
                    colors: ['#37AFE1', '#FF5D6E', '#FFEB55']
                },
                series: [chart[0].sum, chart[0].min, chart[0].max],
                labels: ['Total', 'Minimum', 'Maximum'],
                colors: ['#37AFE1', '#FF5D6E', '#FFEB55']
            }
            setChartData(newCharData);

            console.log(newCharData)
        }
    }, [chart])

    return(
        <div className='px-20 pt-20 pb-5'>
            <Suspense
                fallback={<div className='text-2xl'><LoadingOutlined className='mx-auto' /></div>}
            >
                <Navigation />
            </Suspense>
            <div>
                <div className='text-2xl font-bold my-4'>
                    Diagramme de statistique des locations                    
                </div>
                <div className='w-1/2 mx-auto'>
                { chartLoading && <LoadingOutlined className='text-3xl' /> }
                    {
                        chartData &&
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="pie"
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Stats;