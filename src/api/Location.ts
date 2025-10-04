import { CreateLocation, EditLocation } from "@/types/Location";
import { axiosInstance } from "./Config";

const LOCATION_API_URL = `${import.meta.env.VITE_BASE_URL}/location`;

export const getAllLocations = async () => {
    return await axiosInstance.get(`${LOCATION_API_URL}/all`);
}

export const getLocationById = async (id: number) => {
    return await axiosInstance.get(`${LOCATION_API_URL}/get/${id}`);
}

export const postLocation = async (data: CreateLocation) => {
    return await axiosInstance.post(`${LOCATION_API_URL}/create`, data);
}

export const patchLocation = async (data: EditLocation) => {
    return await axiosInstance.patch(`${LOCATION_API_URL}/edit/${data.numloc}`, data);
}

export const deleteLocation = async (id: number) => {
    return await axiosInstance.delete(`${LOCATION_API_URL}/delete/${id}`);
}

export const getStats = async () => {
    return await axiosInstance.get(`${LOCATION_API_URL}/details`);
}