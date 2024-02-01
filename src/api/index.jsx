import axios from "axios";
import { environment } from "../env";



// ====================Login Api===================

export const login = async (data) => {
    const url = `${environment.baseUrl}app/admin-login`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Menu Category Api =========== */
export const getCategory = async () => {
    const url = `${environment.baseUrl}app/category-list`;
    try {
        const response = await axios.get(url)
        console.log('data == ', response.data.data);
        return response.data.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Menu SubCategory Api =========== */
export const getSubCategory = async () => {
    const url = `${environment.baseUrl}app/get-subcategory`;
    try {
        const response = await axios.get(url)
        console.log('data == ', response.data.data);
        return response.data.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Menu SubCategory Api =========== */
export const getProducts = async () => {
    const url = `${environment.baseUrl}app/product-list`;
    try {
        const response = await axios.get(url)
        console.log('data == ', response.data);
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Menu SubCategory by CatId Api =========== */
// export const getSubCategory = async () => {
//     const url = `${environment.baseUrl}app/get-subcategory`;
//     try {
//         const response = await axios.get(url)
//         console.log('data == ', response.data.data);
//         return response.data.data
//     }
//     catch (err) {
//         console.log(err);
//     }
// };













// ====================Storage Api===================

export const getStorages = async () => {
    const url = `${environment.baseUrl}storage`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleStorages = async (id) => {

    const url = `${environment.baseUrl}edit-storage/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createStorage = async (data) => {
    const url = `${environment.baseUrl}storage`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const updateStorage = async (id, data) => {
    const url = `${environment.baseUrl}edit-storage/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const deleteStorage = async (id) => {
    const url = `${environment.baseUrl}edit-storage/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ===================== Master Api ======================= */

/* ==================City Api =========== */
export const getCity = async () => {
    const url = `${environment.baseUrl}city`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createCity = async (data) => {
    const url = `${environment.baseUrl}city`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editCity = async (id, data) => {
    const url = `${environment.baseUrl}edit-city/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteCityName = async (id) => {
    const url = `${environment.baseUrl}edit-city/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================ Designation Api ============== */

export const getDesignation = async () => {
    const url = `${environment.baseUrl}designation`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createDesignation = async (data) => {
    const url = `${environment.baseUrl}designation`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editDesignation = async (id, data) => {
    const url = `${environment.baseUrl}edit-designation/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const deleteDesignationName = async (id) => {
    const url = `${environment.baseUrl}edit-designation/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================ Temperature Api ============== */

export const getTemperature = async () => {
    const url = `${environment.baseUrl}temperature`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createTemperature = async (data) => {
    const url = `${environment.baseUrl}temperature`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editTemperature = async (id, data) => {
    const url = `${environment.baseUrl}edit-temperature/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const deleteTempRange = async (id) => {
    const url = `${environment.baseUrl}edit-temperature/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================ Product Api ============== */

export const getProduct = async () => {
    const url = `${environment.baseUrl}product`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createProduct = async (data) => {
    const url = `${environment.baseUrl}product`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editProduct = async (id, data) => {
    const url = `${environment.baseUrl}edit-product/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteProductName = async (id) => {
    const url = `${environment.baseUrl}edit-product/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}


/* =============== User API ================= */

export const createUser = async (data) => {
    const url = `${environment.baseUrl}registration/`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getUser = async () => {
    const url = `${environment.baseUrl}registration/`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editUser = async (id, data) => {
    const url = `${environment.baseUrl}edit-user/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delUser = async (id) => {
    const url = `${environment.baseUrl}edit-user/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


// ================================ Storage Availability =======================

export const createAvailabalStorage = async (data) => {
    const url = `${environment.baseUrl}storage-available`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getAvailabelStorage = async () => {
    const url = `${environment.baseUrl}storage-available`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleAvailabelStorage = async (id, data) => {
    const url = `${environment.baseUrl}edit-storage-available/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editAvailabelStorage = async (id, data) => {
    const url = `${environment.baseUrl}edit-storage-available/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delAvailabelStorage = async (id) => {
    const url = `${environment.baseUrl}edit-storage-available/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


export const filAvailabelStorage = async (data) => {
    const url = `${environment.baseUrl}storage-available-filter?name=${data?.name}&type=${data?.type}&location=${data?.location}&user=${data?.user}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

// =================================== Partner Storage ===============================

export const getPartnerStorage = async id => {
    const url = `${environment.baseUrl}user-storage/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleAvailabel = async (id) => {
    const url = `${environment.baseUrl}user-storage-available/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

// =================================== Product ===============================


export const createStoreProduct = async (data) => {
    const url = `${environment.baseUrl}flexistore-product`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getStoreProduct = async () => {
    const url = `${environment.baseUrl}flexistore-product`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleStoreProduct = async (id) => {
    const url = `${environment.baseUrl}edit-flexistore-product/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editStoreProduct = async (id, data) => {
    const url = `${environment.baseUrl}edit-flexistore-product/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delStoreProduct = async (id) => {
    const url = `${environment.baseUrl}edit-flexistore-product/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getUserStoreProduct = async id => {
    const url = `${environment.baseUrl}user-flexistore-product/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


export const filStoreProduct = async (data) => {
    const url = `${environment.baseUrl}flexistore-product-filter?name=${data?.name}&category=${data?.category}&user=${data?.user}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

// =================================== Store Category ===============================

export const createStoreCategory = async (data) => {
    const url = `${environment.baseUrl}flexistore-category`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getStoreCategory = async () => {
    const url = `${environment.baseUrl}flexistore-category`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleStoreCategory = async (id, data) => {
    const url = `${environment.baseUrl}edit-flexistore-category/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editStoreCategory = async (id, data) => {
    const url = `${environment.baseUrl}edit-flexistore-category/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delStoreCategory = async (id) => {
    const url = `${environment.baseUrl}edit-flexistore-category/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

//============================================ Visit Booking ===============================
export const getVisitBooking = async () => {
    const url = `${environment.baseUrl}visit-booking`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
}

export const getSingleVisitBooking = async (id) => {
    const url = `${environment.baseUrl}get-visit-booking/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delVisitBooking = async (id) => {
    const url = `${environment.baseUrl}edit-visit-booking/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const filVisitBooking = async (data) => {
    const url = `${environment.baseUrl}visit-booking-filter?name=${data?.name}&location=${data?.location}&user=${data?.user}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

//============================================ Movable Product ===============================

export const getMovableProduct = async () => {
    const url = `${environment.baseUrl}movable-product`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleMovableProduct = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-product/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovableProduct = async (data) => {
    const url = `${environment.baseUrl}movable-product`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editMovableProduct = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-product/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delMovableProduct = async (id) => {
    const url = `${environment.baseUrl}edit-movable-product/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getUserMovableProduct = async id => {
    const url = `${environment.baseUrl}user-movable-product/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delUserMovableProduct = async (id) => {
    const url = `${environment.baseUrl}edit-user-movable-product/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const filMovableProduct = async (data) => {
    const url = `${environment.baseUrl}movable-product-filter?name=${data?.name}&city=${data?.city}&user=${data?.user}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ===================== Movable Master Api ======================= */

/* ================== Movable City Api =========== */
export const getMovableCity = async () => {
    const url = `${environment.baseUrl}movable-city`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovableCity = async (data) => {
    const url = `${environment.baseUrl}movable-city`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editMovableCity = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-city/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteMovableCityName = async (id) => {
    const url = `${environment.baseUrl}edit-movable-city/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================== Movable Temprature Api =========== */
export const getMovableTemp = async () => {
    const url = `${environment.baseUrl}movable-temp`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovableTemp = async (data) => {
    const url = `${environment.baseUrl}movable-temp`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editMovableTemp = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-temp/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteMovableTempName = async (id) => {
    const url = `${environment.baseUrl}edit-movable-temp/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}


/* ================== Movable Capacity Api =========== */
export const getMovableCapacity = async () => {
    const url = `${environment.baseUrl}movable-capacity`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovableCapacity = async (data) => {
    const url = `${environment.baseUrl}movable-capacity`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editMovableCapacity = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-capacity/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteMovableCapacity = async (id) => {
    const url = `${environment.baseUrl}edit-movable-capacity/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================ MovableCustomized Api ============== */

export const getMovableCustomized = async () => {
    const url = `${environment.baseUrl}movable-customized`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovableCustomized = async (data) => {
    const url = `${environment.baseUrl}movable-customized`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleMovableCustomized = async (id) => {
    const url = `${environment.baseUrl}edit-movable-customized/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const editMovableCustomized = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-customized/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const deleteMovableCustomized = async (id) => {
    const url = `${environment.baseUrl}edit-movable-customized/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================== Movable Price Api =========== */
export const getAllMovablePrice = async () => {
    const url = `${environment.baseUrl}movable-price`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const getSingleMovablePrice = async (id) => {
    const url = `${environment.baseUrl}edit-movable-price/${id}`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createMovablePrice = async (data) => {
    const url = `${environment.baseUrl}movable-price`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editMovablePrice = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-price/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteMovablePrice = async (id) => {
    const url = `${environment.baseUrl}edit-movable-price/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================== Movable Category Api =========== */
// export const getMovableCategory = async () => {
//     const url = `${environment.baseUrl}movable-category`;
//     try {
//         const response = await axios.get(url)
//         return response.data
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

export const createMovableCategory = async (data) => {
    const url = `${environment.baseUrl}movable-category`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const editMovableCategory = async (id, data) => {
    const url = `${environment.baseUrl}edit-movable-category/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delMovableCategory = async (id) => {
    const url = `${environment.baseUrl}edit-movable-category/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};



/* ================== Banner Api =========== */


export const getHomeBanners = async () => {
    const url = `${environment.baseUrl}banner`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const addHomeBanners = async (data) => {
    const url = `${environment.baseUrl}banner`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const editHomeBanners = async (id, data) => {
    const url = `${environment.baseUrl}edit-banner/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delHomeBanners = async (id) => {
    const url = `${environment.baseUrl}edit-banner/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};