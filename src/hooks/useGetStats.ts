import { getStats } from "@/api/Location"
import { QueryCacheKey } from "@/api/QueryCacheKey"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useGetStats = () => {
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: [QueryCacheKey.STATS],
        queryFn: () => getStats(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la recuperation des statistiques !"
            })
        }
    }, [error])

    return {
        data: data?.data,
        isLoading,
        refetch
    }
}