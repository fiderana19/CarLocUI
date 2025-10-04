import { getLocationById } from "@/api/Location"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetLocationById = (id: number) => {
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: [QueryCacheKey.LOCATIONS, id],
        queryFn: () => getLocationById(id),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperation du location !"
            })
        }
    }, [error])

    return {
        data: data?.data[0],
        isLoading,
        refetch
    }
}