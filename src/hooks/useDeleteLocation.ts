import { deleteLocation } from "@/api/Location"
import { TOAST_TYPE } from "@/constants/ToastType"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const useDeleteLocation = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: number) => deleteLocation(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Location supprimée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la suppression de la location !"
            })
        }
    })

    return mutation;
}