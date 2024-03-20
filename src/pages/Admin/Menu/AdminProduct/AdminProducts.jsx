import { Eye, Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Switch from 'react-js-switch';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import { GetFranchisee, GetFranchiseeVendors, VerifyProductAdmin, editAdminFinalFood, getCategory, getGalleryImages, getProductsByAdmin, getRestarant, getRestaurantCategory, getRestaurantFoodAdmin, getRestaurantSubCategory, getSubCategory, makeFeatureProduct } from '../../../../api';
import userImg from '../../../../assets/user.jpg';
import AddProduct from '../../../../components/Modals/Vendors/AddProduct';
import AddRestItem from '../../../../components/Modals/Vendors/AddRestItem';
import Table from '../../../../components/Table/Table';
import { formBtn1, formBtn2, inputClass } from '../../../../utils/CustomClass';
import axios from 'axios';
import { environment } from '../../../../env';
import { setCategoryCount, setProductCount, setSubCategoryCount } from '../../../../redux/Slices/masterSlice';



const AdminProduct = (props) => {
    const [shopProducts, setShopProducts] = useState([])
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const [franchiseOptions, setFranchiseOptions] = useState()
    const [vendorOptions, setVendorOptions] = useState()
    const [categoryOptions, setCategoryOptions] = useState()
    const [subcategoryOptions, setSubCategoryOptions] = useState()
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const dispatch = useDispatch()
    const GetFranchiseeData = () => {
        try {
            GetFranchisee().then((res) => {
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.user?.first_name + " " + data?.user?.last_name + `(${data?.msb_code})`,
                        value: data?.user?.id,
                    }))
                    setFranchiseOptions(newData)
                }
            })
        } catch (error) {
            console.log("🚀 ~ file: AdminProducts.jsx:39 ~ GetFranchiseeData ~ error:", error)
        }
    }

    const GetVendorData = () => {
        try {
            GetFranchiseeVendors().then((res) => {
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.shop_name + `(${data?.user?.pincode})`,
                        value: data?.vendor_id,
                    }))
                    setVendorOptions(newData)
                }
            })
        } catch (error) {
            console.log("🚀 ~ file: AdminProducts.jsx:55 ~ GetVendorData ~ error:", error)
        }
    }

    const GetVendorDataByRestaurant = () => {
        try {
            getRestarant().then((res) => {
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.vendor?.shop_name + `(${data?.vendor?.msb_code})`,
                        value: data?.vendor?.vendor_id,
                    }))
                    setVendorOptions(newData)
                }

            })
        } catch (error) {
            console.log("🚀 ~ file: AdminProducts.jsx:69 ~ GetVendorDataByRestaurant ~ catch:", error)
        }
    }

    // =================== Fetch Media Gallery Images =================
    const fetchData = () => {
        try {
            getCategory().then((res) => {
            })
        } catch (error) {
            console.log("🚀 ~ file: AdminProducts.jsx:66 ~ GetCategory ~ error:", error)
        }
    }

    const getProducts = () => {
        try {
            getProductsByAdmin().then(res => {
                setShopProducts(res)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getRestaurantFoodItems = () => {
        try {
            getRestaurantFoodAdmin().then(res => {
                setShopProducts(res)
            });
        } catch (error) {
            console.log(error);
        }
    }

    //===================== Categories and sub category calls of restaurant and Shops ===============

    const shopCat = () => {
        try {
            getCategory().then(res => {
                setCategory(res)
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.category_name,
                        value: data?.category_name,
                    }))
                    setCategoryOptions(newData)
                }
            })
        } catch (error) {
            console.log('error fetch', error)
        }
    }

    const shopSubCat = () => {
        try {
            getSubCategory().then(res => {
                setsubCategory(res)
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.subcat_name,
                        value: data?.subcat_name,
                    }))
                    setSubCategoryOptions(newData)
                }
            })
        } catch (error) {
            console.log('error fetch', error)
        }
    }

    const restCat = () => {
        try {
            getRestaurantCategory().then(res => {
                setCategory(res)
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.category_name,
                        value: data?.category_name,
                    }))
                    setCategoryOptions(newData)
                }
            })
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const restSubCat = () => {
        try {
            getRestaurantSubCategory().then(res => {
                setsubCategory(res)
                if (res?.length > 0) {
                    const newData = res.map((data) => ({
                        label: data?.subcat_name,
                        value: data?.subcat_name,
                    }))
                    setSubCategoryOptions(newData)
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        reset({
            product_name: '',
            product_msbcode: '',
            franchise_msbcode: '',
            vendor_msbcode: '',
            product_category: '',
            product_subcategory: ''
        })
        if (!props?.isrestaurant) {
            getProducts()
            shopCat();
            shopSubCat();
            GetVendorData()

        }
        if (props?.isrestaurant) {
            getRestaurantFoodItems();
            restCat();
            restSubCat();
            GetVendorDataByRestaurant()
        }
    }, [props.isrestaurant]);

    useEffect(() => {
        GetFranchiseeData()
        fetchData();

    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = async (data) => {
        const { product_name, product_msbcode, franchise_msbcode, vendor_msbcode, product_category, product_subcategory } = data
        if (product_name != '' || product_msbcode != '' || franchise_msbcode != '' || franchise_msbcode != undefined || vendor_msbcode != '' || vendor_msbcode != undefined || product_category != '' || product_category != undefined || product_subcategory != '' || product_subcategory != undefined) {
            try {

                let restauranturl = `${environment.baseUrl}app/all_fooditems?product_name=${product_name}&product_msbcode=${product_msbcode}&franchise_msbcode=${franchise_msbcode?.value ? franchise_msbcode?.value : ''}&vendor_msbcode=${vendor_msbcode?.value ? vendor_msbcode?.value : ''}&product_category=${product_category?.value ? product_category?.value : ''}&product_subcategory=${product_subcategory?.value ? product_subcategory?.value : ''}`

                let url = `${environment.baseUrl}app/all_products?product_name=${product_name}&product_msbcode=${product_msbcode}&franchise_msbcode=${franchise_msbcode?.value ? franchise_msbcode?.value : ''}&vendor_msbcode=${vendor_msbcode?.value ? vendor_msbcode?.value : ''}&product_category=${product_category?.value ? product_category?.value : ''}&product_subcategory=${product_subcategory?.value ? product_subcategory?.value : ''}`
                await axios.get((props?.isrestaurant === false || props?.isrestaurant === undefined) ? url : restauranturl).then((res) => {
                    setShopProducts(res?.data)
                    toast.success("Filters applied successfully")
                }).catch((err) => {
                    console.log("🚀 ~ file: Resturant.jsx:75 ~ awaitaxios.get ~ err:", err)
                })
            } catch (err) {
                console.log("🚀 ~ file: Resturant.jsx:76 ~ onSubmit ~ err:", err)
            }
        } else {
            toast.warn("No Selected Value !")
        }
    }


    const handleClear = () => {
        reset({
            product_name: '',
            product_msbcode: '',
            franchise_msbcode: '',
            vendor_msbcode: '',
            product_category: '',
            product_subcategory: ''
        })
        toast.success("Filters clear successfully")
        setShopProducts()
        if (!props?.isrestaurant) {
            getProducts()
        }
        if (props?.isrestaurant) {
            getRestaurantFoodItems();
        }
    }


    //======================= Product Actions =======================
    const productaction = (row) => <div className='flex space-x-2'>
        <Link to={`/product-list/product-details/${row?.product_id}`} state={row} className='items-center p-1 bg-sky-100 rounded-xl hover:bg-sky-200'>
            <Eye size={24} className='text-sky-400' />
        </Link>
        {/* <ViewProduct /> */}
        <AddProduct title='Edit Product' row={row} getProducts={getProducts} category={category} subCategory={subCategory} />
        {/* <button className='items-center p-1 bg-red-100 rounded-xl hover:bg-red-200'>
            <Trash size={24} className='text-red-400' />
        </button> */}
    </div>


    //======================= Product Actions =======================
    const fooditemaction = (row) => <div className='flex space-x-2'>
        <Link to={`/food-list/food-details/${row?.food_id}`} state={row} className='items-center p-1 bg-sky-100 rounded-xl hover:bg-sky-200'>
            <Eye size={24} className='text-sky-400' />
        </Link>
        {/* <ViewProduct /> */}
        <AddRestItem title='edit' button='edit' data={row} category={category} subCategory={subCategory} getRestaurantFoodItems={getRestaurantFoodItems} />
        {/* <button className='items-center p-1 bg-red-100 rounded-xl hover:bg-red-200'>
            <Trash size={24} className='text-red-400' />
        </button> */}
    </div>

    const verifyActions = (row) => {
        const payload = { productId: row?.product_id, product_isverified_byadmin: !row?.product_isverified_byadmin, product_isverified_byfranchise: row?.product_isverified_byfranchise }
        if (row?.markup_percentage != undefined || row.markup_percentage != 0) {
            try {
                VerifyProductAdmin(payload).then((form) => {
                    console.log(payload)
                    if (form.message == "product is verified successfully") {
                        toast.success('Product Verification Changed !');
                        getProducts()
                    }
                    else {
                        console.log("err");
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const itemVerifyAdmin = (row) => {
        const payload = {
            food_id: row?.food_id,
            food_isverified_byadmin: !row?.food_isverified_byadmin,
        }
        if (row?.markup_percentage != undefined || row?.markup_percentage != 0) {
            try {
                editAdminFinalFood(row?.food_id, payload).then(res => {
                    if (res?.status == 'success') {
                        toast?.success('Verification Status Changed')
                        getRestaurantFoodItems();
                    } else {
                        console.log('error', res?.message)
                    }
                }
                )
            } catch (e) {
                console.log(e)
            }
        }
    }

    const featureItem = (row) => {
        // console.log('called')
        const payload = {
            food_id: row?.food_id,
            featured: !row?.featured,
        }
        if (row?.markup_percentage != undefined || row?.markup_percentage != 0) {
            try {
                editAdminFinalFood(row?.food_id, payload).then(res => {
                    if (res?.status == 'success') {
                        toast?.success(res?.message)
                        getRestaurantFoodItems();
                    } else {
                        console.log('error', res?.message)
                    }
                }
                )
            } catch (e) {
                console.log(e)
            }
        }
    }

    const verifyFeatured = (row) => {
        const payload = { productId: row?.product_id, featured: !row?.featured }
        if (row?.markup_percentage != undefined || row?.markup_percentage != 0) {
            try {
                makeFeatureProduct(payload).then((form) => {
                    console.log(payload)
                    if (form.message == "product status changed to featured") {
                        toast.success(form.message);
                        getProducts()
                    }
                    else {
                        console.log("err");
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    };
    // =============================== PRODUCTS SWITCHES  =============================
    const switchVerify = (row) => {
        return (
            <div className="text-transparent hover:text-red-500">
                <Switch
                    value={row?.product_isverified_byadmin}
                    onChange={() => verifyActions(row)}
                    disabled={LoggedUserDetails?.role == 'franchise' || row?.markup_percentage == 0 || row?.markup_percentage == undefined || row?.final_price == 0 ? true : false}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
                {row?.markup_percentage == 0 || row?.markup_percentage == undefined || row?.final_price == 0 ? <h6 className='text-xs '>Please Add Markup</h6> : null}
            </div>
        )
    }

    // =============================== verify Vendor Product switch =============================
    const switchFeatured = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.featured}
                    onChange={() => verifyFeatured(row)}
                    disabled={LoggedUserDetails?.role == 'franchise' || row?.markup_percentage == 0 || row?.markup_percentage == undefined ? true : false}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

    // =============================== FOOD ITEMS Admin Verify SWITCHES =============================
    const switchVerifyRes = (row) => {
        return (
            <div className="text-transparent hover:text-red-500">
                <Switch
                    value={row?.food_isverified_byadmin}
                    onChange={() => itemVerifyAdmin(row)}
                    disabled={LoggedUserDetails?.role == 'franchise' || row?.markup_percentage == 0 || row?.markup_percentage == undefined || row?.final_price == 0 ? true : false}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
                {row?.markup_percentage == 0 || row?.markup_percentage == undefined || row?.final_price == 0 ? <h6 className='text-xs '>Please Add Markup</h6> : null}
            </div>
        )
    }

    // ================== Feature Restaurant Food Items =================

    const switchFeaturedRes = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.featured}
                    onChange={() => featureItem(row)}
                    disabled={LoggedUserDetails?.role == 'franchise' || row?.markup_percentage == 0 || row?.markup_percentage == undefined ? true : false}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }
    // =============================== FOOD ITEMS SWITCHES =============================


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.product_image_1 == null || row?.product_image_1 == '' || row?.product_image_1 == undefined ? userImg : row?.product_image_1} className="object-cover w-full h-full rounded-full" alt={row.user?.first_name} />
            </div>
        );
    };

    // =================== table user profile column ========================
    const representativeBodyTemplateRes = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.food_image_1 == null || row?.food_image_1 == '' || row?.food_image_1 == undefined ? userImg : row?.food_image_1} className="object-cover w-full h-full rounded-full" alt={row.food_name} />
            </div>
        );
    };


    const ProductColumns = [
        { field: 'product_msbcode', header: 'Product MSB Code' },
        { field: 'profile_pic', header: 'Image', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'product_name', header: 'Product Name', sortable: true },
        { field: 'product_category', header: 'Product Category', body: (row) => <h6>{row?.product_category?.category_name}</h6>, sortable: true },
        { field: 'product_subcategory', header: 'Product Sub-Category', body: (row) => <h6>{row?.product_subcategory?.subcat_name}</h6>, sortable: true },
        { field: 'product_actual_price', header: 'MRP', sortable: true },
        { field: 'final_price', header: 'Final Price', sortable: true },
        { field: 'product_available_qty', header: 'Available Quantity', sortable: true },
        { field: 'shop_name', header: 'Vendor Name', body: (row) => <h6>{row?.vendor?.shop_name}</h6>, sortable: true },
        { field: 'pincode', header: 'PINCODE', body: (row) => <h6>{row?.vendor?.user?.pincode}</h6>, sortable: true },
        { field: 'product_brand', header: 'Brand', sortable: true },
        { field: 'email', header: 'Vendor Email',  body: (row) => <h6>{row?.vendor?.user?.email}</h6>, sortable: true },
        { field: 'product_shelflife', header: 'Self Life', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { filed: 'action', header: 'Action', body: productaction, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true, style: true },
        { field: 'featured', header: 'Featured Products', body: switchFeatured, sortable: true, style: true },
    ]

    const FoodItemColumns = [
        { field: 'food_msbcode', header: 'Food MSB Code', sortable: true },
        { field: 'food_image_1', header: 'Image', body: representativeBodyTemplateRes, sortable: false, style: true },
        { field: 'food_name', header: 'Food Name', sortable: true },
        { field: 'product_category', header: 'Food Category', body: (row) => <h6>{row?.food_category?.category_name}</h6>, sortable: true },
        { field: 'product_subcategory', header: 'Food Sub-Category', body: (row) => <h6>{row?.food_subcategory?.subcat_name}</h6>, sortable: true },
        { field: 'food_actual_price', header: 'MRP', sortable: true },
        { field: 'final_price', header: 'Final Price', sortable: true },
        { field: 'shop_name', header: 'Restaurant Name', body: (row) => <h6>{row?.vendor?.shop_name}</h6>, sortable: true },
        { field: 'pincode', header: 'PINCODE', body: (row) => <h6>{row?.vendor?.user?.pincode}</h6>, sortable: true },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.vendor?.user?.email}</h6>, sortable: true },
        { filed: 'action', header: 'Action', body: fooditemaction, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerifyRes, sortable: true },
        { field: 'featured', header: 'Featured Products', body: switchFeaturedRes, sortable: true },
    ]

    const restaurantColumns = [
        { field: 'profile_pic', header: 'Image', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'product_name', header: 'Product Name', sortable: true },
        { field: 'product_actual_price', header: 'MRP', sortable: true },
        { field: 'product_available_qty', header: 'Quantity', sortable: true },
        { field: 'product_brand', header: 'Brand', sortable: true },
        { field: 'product_shelflife', header: 'Expiry Details', sortable: true },
        { field: 'product_description', header: 'Description', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { filed: 'action', header: 'Action', body: productaction, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
    ]



    return (
        <>
            <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:items-center lg:flex-row"
                >
                    <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder={`${props?.isrestaurant === true ? 'Search By Restaurant Name' : 'Search By Product Name'}`}
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('product_name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='MSB Code'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('product_msbcode')}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name="vendor_msbcode"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (

                                    <Select
                                        value={value}
                                        options={vendorOptions}
                                        className="text-gray-900 w-100"
                                        placeholder="Vendor"
                                        onChange={onChange}
                                        inputRef={ref}
                                        maxMenuHeight={200}
                                        styles={{
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#9CA3AF', // Light gray color
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name="product_category"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        value={value}
                                        options={categoryOptions}
                                        className="text-gray-900 w-100"
                                        placeholder="Category"
                                        onChange={onChange}
                                        inputRef={ref}
                                        maxMenuHeight={200}
                                        styles={{
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#9CA3AF', // Light gray color
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name="product_subcategory"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        value={value}
                                        options={subcategoryOptions}
                                        className="text-gray-900 w-100"
                                        placeholder="SubCategory"
                                        onChange={onChange}
                                        inputRef={ref}
                                        maxMenuHeight={200}
                                        styles={{
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#9CA3AF', // Light gray color
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        <button
                            type="submit"
                            className={`${formBtn1}`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2}`}
                            onClick={() => handleClear()}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <div className='p-4 m-4 bg-white sm:m-5 rounded-xl'>
                <div className='grid items-center grid-cols-6'>
                    <h2 className='col-span-5 text-xl font-semibold'>{props?.isrestaurant ? "Food Items" : "Product List"}</h2>
                </div>
                <div className='mt-4'>
                    {props?.isrestaurant ? <Table data={shopProducts} columns={FoodItemColumns} /> :
                        <Table data={shopProducts} columns={LoggedUserDetails?.role == 'franchise' ? restaurantColumns : ProductColumns} />}
                </div>
            </div>
        </>
    )
}

export default AdminProduct