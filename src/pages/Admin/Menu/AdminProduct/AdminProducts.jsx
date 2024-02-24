import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";
import { formBtn1, formBtn2, inputClass } from '../../../../utils/CustomClass';
import { toast } from 'react-toastify';
import Table from '../../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { Eye, Trash } from 'iconsax-react';
import { editVendorProduct, getProductsByAdmin, VerifyProductAdmin } from '../../../../api';
import Switch from 'react-js-switch';
import userImg from '../../../../assets/user.jpg';
import AddProduct from '../../../../components/Modals/Vendors/AddProduct';



const AdminProduct = () => {
    const [shopProducts, setShopProducts] = useState([])
    const storages = useSelector((state) => state?.storage?.list);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const getProducts = () => {
        getProductsByAdmin().then(res => {
            setShopProducts(res)
        })
    }
    useEffect(() => {
        getProducts()
    }, [])
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

    const onSubmit = async (data) => {
        var updatedData = { ...data, vendor: props?.row?.vendor }
        editVendorProduct(props?.row?.product_id, updatedData).then(res => {
            if (res?.status == 'success') {
                props?.getProducts()
                toast.success('Product updated successfully')
                toggle();
            }
        })
    }
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    //======================= Table =======================

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



    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2">
                <Switch
                    value={row?.product_isverified_byfranchise}
                    disabled={true}
                    // onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

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
    // =============================== verify user switch =============================
    const switchVerify = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.product_isverified_byadmin}
                    onChange={() => verifyActions(row)}
                    disabled={row?.markup_percentage == 0 || row?.markup_percentage == undefined ? true : false}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.product_image_1 == null || row?.product_image_1 == '' || row?.product_image_1 == undefined ? userImg : row?.product_image_1} className="object-cover w-full h-full rounded-full" alt={row.user?.first_name} />
            </div>
        );
    };


    const Columns = [
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
        { field: 'product_shelflife', header: 'Self Life', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { filed: 'action', header: 'Action', body: action, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
    ]

    const restaurantColumns = [
        { field: 'profile_pic', header: 'Image', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'product_name', header: 'Product Name', sortable: true },
        { field: 'product_actual_price', header: 'MRP', sortable: true },
        { field: 'product_available_qty', header: 'Quantity', sortable: true },
        { field: 'product_brand', header: 'Brand', sortable: true },
        { field: 'product_shelflife', header: 'Self Life', sortable: true },
        { field: 'product_description', header: 'Description', sortable: true },
        { field: 'product_Manufacturer_Name', header: 'Manufacturer Name', sortable: true },
        { field: 'product_country_of_origin', header: 'Country Of Origin', sortable: true },
        { filed: 'action', header: 'Action', body: action, sortable: true },
        // { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
    ]



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
                </div>
                <div className='mt-4'>
                    <Table data={shopProducts} columns={LoggedUserDetails?.role == 'franchise' ? restaurantColumns : Columns} />
                </div>
            </div>
        </>
    )
}

export default AdminProduct