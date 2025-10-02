import { postLocation } from "@/api/Location"
import { TOAST_TYPE } from "@/constants/ToastType"
import { CreateLocation } from "@/types/Location"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePostLocation = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: CreateLocation) => postLocation(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Location ajoutée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'ajout de la location !"
            })
        }
    })

    return mutation;
}