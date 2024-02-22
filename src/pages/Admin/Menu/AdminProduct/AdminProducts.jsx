import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";
import { formBtn1, formBtn2, inputClass } from '../../../../utils/CustomClass';
import { toast } from 'react-toastify';
import Table from '../../../../components/Table/Table';
import { Link, NavLink } from 'react-router-dom';
import { Edit, Eye, Trash } from 'iconsax-react';
// import ViewProduct from '../../../../components/Modals/Vendors/ViewProduct';
import { getAllSeller, editVendorProduct, getProductsByAdmin, VerifyProductAdmin } from '../../../../api';
import Switch from 'react-js-switch';
import userImg from '../../../../assets/user.jpg';
import EditAdminProduct from '../../../../components/Modals/Vendors/EditAdminProduct';



const AdminProduct = () => {
    const [sellers, setSellers] = useState([]);
    const [shopProducts, setShopProducts] = useState([])
    const userDetails = useSelector((state) => state?.user?.loggedUserDetails);
    console.log('userDetails', userDetails)
    // const matchedSeller = sellers?.find(seller => seller?.user?.id === userid);
    const storages = useSelector((state) => state?.storage?.list);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);

    console.log('Logged User Details = ', LoggedUserDetails);


    const getProducts = () => {
        getProductsByAdmin().then(res => {
            console.log('admin products = ', res)
            setShopProducts(res)
        })
    }

    useEffect(() => {
        // getAllSeller().then(res => {
        //     setSellers(res)
        // })
        getProducts()
    }, [])

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

    const onSubmit = async (data) => {
        var updatedData = { ...data, vendor: props?.row?.vendor }
        console.log('called')
        editVendorProduct(props?.row?.product_id, updatedData).then(res => {
            if (res?.status == 'success') {
                props?.getProducts()
                toast.success('Product updated successfully')
                toggle();
            }
        })


        // if (props?.title == 'Edit Product') {
        //     if (data?.product_image_1 != props?.row?.product_image_1) {
        //         await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
        //         data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
        //     } else {
        //         data.product_image_1 = props?.row?.product_image_1
        //     }
        //     if (data?.product_image_2 != props?.row?.product_image_2) {
        //         await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
        //         data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
        //     } else {
        //         data.product_image_2 = props?.row?.product_image_2
        //     }
        //     if (data?.product_image_3 != props?.row?.product_image_3) {
        //         await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
        //         data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
        //     } else {
        //         data.product_image_3 = props?.row?.product_image_3
        //     }
        //     if (data?.product_image_4 != props?.row?.product_image_4) {
        //         await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
        //         data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
        //     } else {
        //         data.product_image_4 = props?.row?.product_image_4
        //     }
        //     if (data?.product_image_5 != props?.row?.product_image_5) {
        //         await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
        //         data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
        //     } else {
        //         data.product_image_5 = props?.row?.product_image_5
        //     }
        //     if (data?.product_video_url != props?.row?.product_video_url) {
        //         await ImageUpload(data?.product_video_url[0], "shopProduct", "Image5", data?.product_name)
        //         data.product_video_url = `${productLink}${data?.product_name}_Image5_${data?.product_video_url[0]?.name}`
        //     } else {
        //         data.product_video_url = props?.row?.product_video_url
        //     }
        // } else {
        //     if (data?.product_image_1.length != 0) {
        //         await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
        //         data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
        //     } else {
        //         data.product_image_1 = ''
        //     }
        //     if (data?.product_image_2.length != 0) {
        //         await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
        //         data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
        //     } else {
        //         data.product_image_2 = ''
        //     }
        //     if (data?.product_image_3.length != 0) {
        //         await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
        //         data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
        //     } else {
        //         data.product_image_3 = ''
        //     }
        //     if (data?.product_image_4.length != 0) {
        //         await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
        //         data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
        //     } else {
        //         data.product_image_4 = ''
        //     }
        //     if (data?.product_image_5.length != 0) {
        //         await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
        //         data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
        //     } else {
        //         data.product_image_5 = ''
        //     }
        //     if (data?.product_video_url.length != 0) {
        //         await ImageUpload(data?.product_video_url[0], "shopProduct", "Image5", data?.product_name)
        //         data.product_video_url = `${productLink}${data?.product_name}_Image5_${data?.product_video_url[0]?.name}`
        //     } else {
        //         data.product_video_url = ''
        //     }
        // }
        // if (props?.title == 'Edit Product') {

        // }
        // else {
        //     var updatedData = { ...data, vendor: props?.sellerId }
        //     console.log(updatedData)
        //     EditAdminProduct(updatedData).then((res) => {
        //         if (res?.status == 'success') {
        //             props?.getProducts()
        //             toast.success('Product Added Successfully')
        //             toggle();
        //         } else {
        //             toast.error('Error while creating product')
        //         }
        //     })
        // }
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
        <EditAdminProduct title='Edit Product' row={row} getProducts={getProducts} />
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


    // =============================== verify user switch =============================
    const switchVerify = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.product_isverified_byadmin}
                    onChange={() => verifyActions(row)}
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
        { field: 'product_actual_price', header: 'MRP', sortable: true },
        { field: 'final_price', header: 'Final Price', sortable: true },
        { field: 'product_available_qty', header: 'Available Quantity', sortable: true },
        { field: 'product_brand', header: 'Brand', sortable: true },
        { field: 'product_shelflife', header: 'Self Life', sortable: true },
        { field: 'product_description', header: 'Description', sortable: true },
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
                    <EditAdminProduct title='Add Product' getProducts={getProducts} sellerId={matchedSeller?.vendor_id} />
                </div>
                <div className='mt-4'>
                    <Table data={shopProducts} columns={userDetails?.role == 'franchise' ? restaurantColumns : Columns} />
                </div>
            </div>
        </>
    )
}

export default AdminProduct