export type CreateLocation = {
    nom_loc: string;
    design_voiture: string;
    nbr_jours: number;
    taux_journalier: number;
}

export type EditLocation = {
    numloc: number;
    nom_loc: string;
    design_voiture: string;
    nbr_jours: number;
    taux_journalier: number;
}