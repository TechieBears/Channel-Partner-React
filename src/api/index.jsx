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


// ====================Seller Login Api===================

export const vendorlogin = async (data) => {
    const url = `${environment.baseUrl}vendor/vendor_login`;
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
        console.log('category data == ', response.data.data);
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
        console.log('subcategory data == ', response.data.data);
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
        console.log('products data == ', response.data);
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Menu SubCategory by CatId Api =========== */
export const getSubCategorybyCatId = async (id) => {
    const url = `${environment.baseUrl}app/get-subcategory/${id}`;
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
export const getProductsbySubCat = async (id) => {
    const url = `${environment.baseUrl}app/get-subcategoryproducts/${id}`;
    try {
        const response = await axios.get(url)
        console.log('products = ', response.data);
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Menu SubCategory by CatId Api =========== */
export const createCategory = async (data) => {
    // const url = `${environment.baseUrl}movable-category`;
    const url = `${environment.baseUrl}app/category-list`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


export const createSubCategory = async (data) => {
    // const url = `${environment.baseUrl}movable-category`;
    const url = `${environment.baseUrl}app/get-subcategory`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const createProduct = async (data) => {
    const url = `${environment.baseUrl}app/product-list`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editProduct = async (id, data) => {
    const url = `${environment.baseUrl}app/edit-product-list/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteProduct = async (id) => {
    const url = `${environment.baseUrl}app/edit-product-list/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    } catch (err) {
        console.log(err);
    }
}

/* ================== Menu SubCategory by CatId Api =========== */
export const getAllOrders = async (id) => {
    const url = `${environment.baseUrl}app/get_orderedetails`;
    try {
        const response = await axios.get(url)
        console.log('orders = ', response.data.data);
        return response.data.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Create Franchisee Api =========== */
export const CreateFranchisee = async (data) => {
    const url = `${environment.baseUrl}franchise/create-franchise`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Get Franchisee Api =========== */
export const GetFranchisee = async (data) => {
    const url = `${environment.baseUrl}franchise/create-franchise`;
    try {
        const response = await axios.get(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Create Franchisee Vendors Api =========== */
export const CreateFranchiseeVendors = async (data) => {
    const url = `${environment.baseUrl}vendor/create_vendor`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Edit Franchisee Vendors Api =========== */
export const EditFranchiseeVendors = async (id, data) => {
    const url = `${environment.baseUrl}vendor/edit_vendor/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Get Franchisee Vendors Api =========== */
export const GetFranchiseeVendors = async (data) => {
    const url = `${environment.baseUrl}vendor/create_vendor`;
    try {
        const response = await axios.get(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Get Franchisee Deatails Api =========== */
export const getFranchiseDetails = async (id) => {
    const url = `${environment.baseUrl}franchise/get_franchise_details_by_userId/${id}`;
    try {
        const response = await axios.get(url, id)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

/* ================== Edit Franchisee Deatails Api =========== */
export const editfranchise = async (id, data) => {
    const url = `${environment.baseUrl}franchise/edit-franchise/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


/* ================== Get all Customers Api =========== */
export const getAllCustomers = async () => {
    const url = `${environment.baseUrl}app/all_customers`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};


//  ===================  Activate/Deactivate User by Toggle Api ===============
export const deactivateUser = async (data) => {
    const url = `${environment.baseUrl}app/deactivate_user`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};































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

// export const getPartnerStorage = async id => {
//     const url = `${environment.baseUrl}user-storage/${id}`;
//     try {
//         const response = await axios.get(url)
//         return response.data
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

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
export const editCategory = async (id, data) => {
    const url = `${environment.baseUrl}app/edit-category/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const editSubCategory = async (id, data) => {
    const url = `${environment.baseUrl}app/edit-subcategory/${id}`;
    try {
        const response = await axios.put(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const delCategory = async (id) => {
    const url = `${environment.baseUrl}app/edit-category/${id}`;
    try {
        const response = await axios.delete(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const deleteSubCategory = async (id) => {
    const url = `${environment.baseUrl}app/edit-subcategory/${id}`;
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
    const url = `${environment.baseUrl}app/get-banners`;
    try {
        const response = await axios.get(url)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};

export const addHomeBanners = async (data) => {
    const url = `${environment.baseUrl}app/get-banners`;
    try {
        const response = await axios.post(url, data)
        return response.data
    }
    catch (err) {
        console.log(err);
    }
};
export const editHomeBanners = async (id, data) => {
    const url = `${environment.baseUrl}app/edithome-slides/${id}`;
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

export const addPolicy = async (data) => {
    const url = `${environment.baseUrl}app/privacy-policy`
    try {
        const response = await axios.post(url, data);
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const getPolicy = async () => {
    const url = `${environment.baseUrl}app/privacy-policy`
    try {
        const response = await axios.get(url);
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const addSubAdmin = async (data) => {
    const url = `${environment.baseUrl}app/registration`
    try {
        const response = await axios.post(url, data);
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const getSubAdmin = async () => {
    const url = `${environment.baseUrl}app/subadmin-details`
    try {
        const response = await axios.get(url);
        return response.data.data
    }
    catch (error) {
        console.log(error)
    }
}

export const addDeliveryBoy = async (data) => {
    const url = `${environment.baseUrl}delivery/create_deliveryboy`
    try {
        const response = await axios.get(url, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const createDeliveryBoy = async (data) => {
    const url = `${environment.baseUrl}delivery/create_deliveryboy`
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getDeliveryBoy = async (data) => {
    const url = `${environment.baseUrl}delivery/create_deliveryboy`
    try {
        const response = await axios.get(url, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getDeliveryBoys = async (data) => {
    const url = `${environment.baseUrl}delivery/create_deliveryboy`
    try {
        const response = await axios.get(url, data);
        return response.data;
    } catch (error) {
        console.log(error)
        console.log('error creating product', error)
    }
}

// ================= Add Product =================
export const addProduct = async (data) => {
    const url = `${environment.baseUrl}vendor/add_shop_product`
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log('error creating product', error)
    }
}

// ======================== Get All Product ===============

export const getAllShopProduct = async () => {
    const url = `${environment.baseUrl}vendor/add_shop_product`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('error getting product', error)
    }
}

// ============== get All Seller ================

export const getAllSeller = async () => {
    const url = `${environment.baseUrl}vendor/create_vendor`
    try {
        const response = await axios.get(url);
        return response.data
    } catch (err) {
        console.log('error while getting vendor', err)
    }
}

export const getProductById = async (id) => {
    const url = `${environment.baseUrl}vendor/edit_product/${id}`;
    try {
        const response = await axios.get(url, id);
        // console.log('response', response)
        return response.data
    } catch (err) {
        console.log('error while getting vendor by id', err)
    }
}

export const editVendorProduct = async (id, data) => {
    const url = `${environment.baseUrl}vendor/edit_product/${id}`;
    try {
        const response = await axios.put(url, data);
        console.log('responseeeeeeeeeeeeeeeeeeeeeeeee', response)
        return response.data
    } catch (err) {
        console.log('error while getting vendor by id', err)
    }
}