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
import { getAllSeller, getAllShopProduct } from '../../../api';

const VendorProduct = () => {
    const [sellers, setSellers] = useState([]);
    const [shopProducts, setShopProducts] = useState([])
    console.log('shopProducts', shopProducts)
    const userid = useSelector((state) => state?.user?.loggedUserDetails?.userid);
    const matchedSeller = sellers?.find(seller => seller?.user?.id === userid);
    const storages = useSelector((state) => state?.storage?.list);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const user = {
        isShop: true,
    }
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
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

    //======================= Table =======================

    const restaurantData = [
        {
            "productId": "001",
            "name": "Product A",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "category": "Breakfast",
            "subcategory": "South Indian",
            "createdDate": "2024-02-12",
            "MRP": 50,
            "quantity": 100
        },
        {
            "productId": "002",
            "name": "Product B",
            "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "category": "Lunch",
            "subcategory": "Thali",
            "createdDate": "2024-02-10",
            "MRP": 100,
            "quantity": 80
        },
        {
            "productId": "003",
            "name": "Product C",
            "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "category": "Drinks",
            "subcategory": "Soft Drink",
            "createdDate": "2024-02-08",
            "MRP": 75,
            "quantity": 120
        }
    ];


    const action = (row) => <div className='flex space-x-2'>
        <Link to={`/product-list/product-details/${row?.product_id}`} state={row} className='items-center p-1 bg-sky-100 rounded-xl hover:bg-sky-200'>
            <Eye size={24} className='text-sky-400' />
        </Link>
        {/* <ViewProduct /> */}
        <AddProduct title='Edit Product' row={row} getProducts={getProducts} />
        <button className='items-center p-1 bg-red-100 rounded-xl hover:bg-red-200'>
            <Trash size={24} className='text-red-400' />
        </button>
    </div>



    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.product_image_1 == null || row?.product_image_1 == '' || row?.product_image_1 == undefined ? userImg : row?.product_image_1} className="object-cover w-full h-full rounded-full" alt={row.first_name} />
            </div>
        );
    };



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
        { field: 'product_description', header: 'Description', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { filed: 'action', header: 'Action', body: action, sortable: true },
    ]

    const restaurantColumns = [
        { field: 'productId', header: 'ID', sortable: false },
        { field: 'name', header: 'Product Name', sortable: false },
        { field: 'description', header: 'Description', sortable: false },
        { field: 'category', header: 'Category', sortable: false },
        { field: 'subcategory', header: 'Sub-Category', sortable: false },
        { field: 'createdDate', header: 'Create Date', sortable: true },
        { field: 'MRP', header: 'MRP', sortable: true },
        { field: 'quantity', header: 'Quantity', sortable: false },
        { filed: 'action', header: 'Action', body: action, sortable: true }
    ]

    const getProducts = () => {
        getAllShopProduct().then(res => {
            setShopProducts(res)
        })
    }

    useEffect(() => {
        getAllSeller().then(res => {
            setSellers(res)
        })
        getProducts()
    }, [])

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
                    <h2 className='col-span-5 text-xl font-semibold'>Product List</h2>
                    <AddProduct title='Add Product' getProducts={getProducts} sellerId={matchedSeller?.vendor_id} />
                </div>
                <div className='mt-4'>
                    {user?.isShop == true ?
                        <Table data={shopProducts} columns={shopColumns} /> :
                        <Table data={restaurantData} columns={restaurantColumns} />
                    }
                </div>
            </div>
        </>
    )
}

export default VendorProduct