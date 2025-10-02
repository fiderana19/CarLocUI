import { patchLocation } from "@/api/Location"
import { TOAST_TYPE } from "@/constants/ToastType"
import { EditLocation } from "@/types/Location"
import { showToast } from "@/utils/Toast"
import { useMutation } from "@tanstack/react-query"

export const usePatchLocation = ({action} : {action: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: EditLocation) => patchLocation(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Location modifiée !"
            })
        },
        onError: () => {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la modification de la location !"
            })
        }
    })

    return mutation;
}