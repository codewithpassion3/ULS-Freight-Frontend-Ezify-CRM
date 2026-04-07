import apiClient from "../client";

export type PackagePayload = {
    name: string;
    measurementUnit: "METRIC" | "IMPERIAL";
    shipmentType: "PALLET" | "PACKAGE" | "LTL" | "TRUCKLOAD" | "AIR" | "OCEAN" | "RAIL" | "INTERMODAL" | "OTHER";
    weight: number;
    quantity: number;
    length: number;
    height: number;
    width: number;
    nmfc?: string;
    unitsOnPallet?: number;
    palletUnitType?: string;
    description?: string;
    freightClass?: string;
}

export type CreatePackagePayload = PackagePayload & {
    shipmentType: "PALLET" | "PACKAGE" | "LTL" | "TRUCKLOAD" | "AIR" | "OCEAN" | "RAIL" | "INTERMODAL" | "OTHER";
}

export type UpdatePackagePayload = PackagePayload & {
    id: string;
}

export const createPackage = async (payload: CreatePackagePayload) => {
    const response = await apiClient.post("/line-item-units", payload);
    return response.data;
};

export const updatePackage = async (payload: UpdatePackagePayload) => {
    const response = await apiClient.patch(`/line-item-units/${payload.id}`, payload);
    return response.data;
};

export const deletePackage = async (id: string) => {
    const response = await apiClient.delete(`/line-item-units/${id}`);
    return response.data;
};
interface GetAllPackagesPayload {
    search: string;
    page?: number;
    limit?: number;
    type?: string;
}
export const getAllPackages = async ({ search, page, limit, type }: GetAllPackagesPayload) => {
    const response = await apiClient.get("/line-item-units?", { params: { search, page, limit, type } });
    return response.data;
};

export const getSinglePackage = async (id: string) => {
    const response = await apiClient.get(`/line-item-units/${id}`);
    return response.data;
};
