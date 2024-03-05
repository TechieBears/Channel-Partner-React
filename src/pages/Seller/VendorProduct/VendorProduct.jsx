import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import { toast } from 'react-toastify';
import Table from '../../../components/Table/Table';
import { Link, NavLink } from 'react-router-dom';
import AddProduct from '../../../components/Modals/Vendors/AddProduct';
import { Edit, Eye, Trash } from 'iconsax-react';
import ViewProduct from '../../../components/Modals/Vendors/ViewProduct';
import { deleteFoodItem, getAllSeller, getAllShopProduct, getRestaurantFood } from '../../../api';
import Switch from 'react-js-switch';
import AddRestItem from '../../../components/Modals/Vendors/AddRestItem';

const VendorProduct = () => {
    const [data, setData] = useState([])
    console.log('data', data)
    const user = useSelector((state) => state?.user?.loggedUserDetails);
    const storages = useSelector((state) => state?.storage?.list);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const loadOptions = (_, callback) => {
        const uniqueNames = new Set();
        const uniqueProducts = storages
            ?.filter(
                (res) =>
                    res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
            )
            .map((res) => ({ label: res.name, value: res.name }));
        callback(uniqueProducts || []);
    };

    const onSubmit = (data) => {
        console.log('data', data)
    }
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    const getRestFood = () => {
        try {
            getRestaurantFood().then(res => {
                setData(res)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = (row) => {
        try {
            deleteFoodItem(row?.food_id).then(res => {
                if (res?.status == 'success') {
                    toast?.success('Food Items deleted successfully')
                    getRestFood()
                }
            })
        } catch (e) {
            console.log('error occured while deleting food item')
        }
    }

    //======================= Table =======================
    const action = (row) => <div className='flex space-x-2'>
        <Link to={`/product-list/product-details/${row?.product_id}`} state={row} className='items-center p-1 bg-sky-100 rounded-xl hover:bg-sky-200'>
            <Eye size={24} className='text-sky-400' />
        </Link>
        <AddProduct title='Edit Product' row={row} getProducts={getProducts} />
        <button className='items-center p-1 bg-red-100 rounded-xl hover:bg-red-200'>
            <Trash size={24} className='text-red-400' />
        </button>
    </div>
    //======================= Table =======================
    const restAction = (row) => <div className='flex space-x-2'>
        <Link to={`/product-list/product-details/${row?.product_id}`} state={row} className='items-center p-1 bg-sky-100 rounded-xl hover:bg-sky-200'>
            <Eye size={24} className='text-sky-400' />
        </Link>
        <AddRestItem title='edit' button='edit' data={row} getRestFood={getRestFood} />
        <button onClick={(row) => deleteItem(row)} className='items-center p-1 bg-red-100 rounded-xl hover:bg-red-200'>
            <Trash size={24} className='text-red-400' />
        </button>
    </div>

    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
               {user?.vendor_type == 'seller' && <img src={row?.product_image_1 == null || row?.product_image_1 == '' || row?.product_image_1 == undefined ? userImg : row?.product_image_1} className="object-cover w-full h-full rounded-full" alt={row.first_name} />}
               {user?.vendor_type == 'restaurant' && <img src={row?.food_image_1 == null || row?.food_image_1 == '' || row?.food_image_1 == undefined ? userImg : row?.food_image_1} className="object-cover w-full h-full rounded-full" alt={row.food_name} />}
            </div>
        );
    };

    const adminVerification = (row) =>
    (<div className="flex items-center justify-center gap-2">
        <Switch
            value={row?.product_isverified_byadmin}
            disabled={true}
            size={50}
            backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
            borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
    </div>)


    const franchiseVerification = (row) =>
    (<div className="flex items-center justify-center gap-2">
        <Switch
            value={row?.product_isverified_byfranchise}
            disabled={true}
            size={50}
            backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
            borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
    </div>)


    const shopColumns = [
        { field: 'product_id', header: 'ID', sortable: false },
        { field: 'Product Image', header: 'Image', body: representativeBodyTemplate, sortable: true, style: true },
        { field: 'product_name', header: 'Product Name', sortable: true },
        { field: 'product_actual_price', header: 'MRP', sortable: true },
        { field: 'product_category', header: 'Category', body: (row) => (row?.product_category?.category_name), sortable: true },
        { field: 'product_subcategory', header: 'Sub-Category', body: (row) => <h6>{row?.product_subcategory?.subcat_name == '' ? '---' : row?.product_subcategory?.subcat_name}</h6>, sortable: true },
        { field: 'product_available_qty', header: 'Quantity', sortable: true },
        { field: 'product_brand', header: 'Brand', sortable: true },
        { field: 'product_shelflife', header: 'Self Life', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { field: 'product_country_of_origin', header: 'Status', body: (row) => <h6>{row?.product_isactive == true ? 'Available' : 'Out Of Stock'}</h6>, sortable: true },
        { field: 'product_isverified_byadmin', header: 'Admin Verification', body: adminVerification, sortable: true },
        { field: 'product_isverified_byfranchise', header: 'Franchise Verification', body: franchiseVerification, sortable: true },
        { filed: 'action', header: 'Action', body: action, sortable: true },
    ]

    const restaurantColumns = [
        { field: 'food_msbcode', header: 'Food MSB Code', sortable: false },
        { field: 'food_image_1', header: 'Image', body: representativeBodyTemplate, sortable: true, style: true },
        { field: 'food_name', header: 'Food Name', sortable: false },
        { field: 'food_category', header: 'Category', body: (row) => <h6>{row?.food_category?.category_name}</h6>, sortable: false },
        { field: 'food_subcategory', header: 'Sub-Category', body: (row) => <h6>{row?.food_subcategory?.subcat_name}</h6>, sortable: false },
        { field: 'food_veg_nonveg', header: 'Type', sortable: false },
        { field: 'food_details', header: 'Details', sortable: false },
        { field: 'food_actual_price', header: 'MRP', sortable: true },
        { field: 'food_isverified_byadmin', header: 'Admin Verification', body: adminVerification, sortable: true },
        { field: 'food_isverified_byfranchise', header: 'Franchise Verification', body: franchiseVerification, sortable: true },
        { filed: 'action', header: 'Action', body: restAction, sortable: true }
    ]

    const getProducts = () => {
        getAllShopProduct(LoggedUserDetails?.sellerId).then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        // if (user?.vendor_type != "restaurant"){
        //     getAllSeller().then(res => {
        //         setSellers(res)
        //     })
        //     getProducts()
        // }else{
        //     getrestaurantProducts();
        // }

        if (user?.vendor_type == 'restaurant') {
            getRestFood()
        }
    }, []);


    return (
        <>
            <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:items-center lg:flex-row"
                >
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                        <div className="">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <AsyncSelect
                                        placeholder="Search By Name"
                                        cacheOptions
                                        defaultOptions
                                        value={field.value}
                                        defaultValue={
                                            field.value
                                                ? { label: field.value, value: field.value }
                                                : null
                                        }
                                        loadOptions={loadOptions}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <select
                                name="City"
                                className={`${inputClass} !bg-slate-100`}
                                {...register("location")}
                            >
                                <option value="">City</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button
                            type="submit"
                            className={`${formBtn1} w-full text-center`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2} w-full text-center`}
                            onClick={filterReset}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <div className='p-4 m-4 bg-white sm:m-5 rounded-xl'>
                <div className='grid items-center grid-cols-6'>
                    <h2 className='col-span-5 text-xl font-semibold'>{user?.vendor_type == 'restaurant' ? 'Item List' : 'Product List'}</h2>
                    {user?.isverified_byadmin == true && user?.vendor_type == 'restaurant' ? <AddRestItem title='Add Item' getRestFood={getRestFood} /> : user?.vendor_type == 'seller' ? <AddProduct title='Add Product' getProducts={getProducts} /> : ''}
                    {/* <AddRestItem title='Add Item' button='add'  /> */}
                    {/* <AddProduct title='Add Product' getProducts={getProducts} />  */}
                </div>
                <div className='mt-4'>
                    <Table data={data} columns={user?.vendor_type == 'restaurant' ? restaurantColumns : shopColumns} />
                </div>
            </div>
        </>
    )
}

export default VendorProduct