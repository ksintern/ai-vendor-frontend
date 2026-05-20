import axiosInstance from "../api/axiosInstance"


// -----------------------------------
// SEARCH VENDORS
// -----------------------------------

export const searchVendors = async (filters = {}) => {

    try {

        const response = await axiosInstance.get(

            "/vendors/search",

            {
                params: filters
            }
        )

        return response.data

    } catch (error) {

        console.error(
            "Vendor search failed:",
            error
        )

        throw error
    }
}


// -----------------------------------
// GET ALL VENDORS
// -----------------------------------

export const getAllVendors = async () => {

    try {

        const response = await axiosInstance.get(
            "/vendors/"
        )

        return response.data

    } catch (error) {

        console.error(
            "Fetching vendors failed:",
            error
        )

        throw error
    }
}