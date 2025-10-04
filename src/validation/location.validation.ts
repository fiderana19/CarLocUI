import * as yup from 'yup'

export const CreateLocationValidation = yup.object({
    nom_loc: yup.string().required("Nom du locataire requis !"),
    design_voiture: yup.string().required("Designation de la voiture requise !"),
    nbr_jours: yup.number().required("Durée requis !"),
    taux_journalier: yup.number().required("Le montant du taux journalier requis !")
})

export const EditLocationValidation = yup.object({
    numloc: yup.number().required("Id requis !"),
    nom_loc: yup.string().required("Nom du locataire requis !"),
    design_voiture: yup.string().required("Designation de la voiture requise !"),
    nbr_jours: yup.number().required("Durée requis !"),
    taux_journalier: yup.number().required("Le montant du taux journalier requis !")
})