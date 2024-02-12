// import React, { useEffect } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import AsyncSelect from 'react-select/async';
// import { formBtn1, formBtn2 } from '../../../utils/CustomClass';
// import Table from '../../../components/Table/Table';
// import { useDispatch, useSelector } from 'react-redux';
// import { delStoreProduct, filStoreProduct, getStoreCategory, getUserStoreProduct } from '../../../api';
// import { NavLink } from 'react-router-dom';
// import { ArrowSwapVertical, Box, Eye, NotificationBing, ShoppingCart } from 'iconsax-react';
// import { toast } from 'react-toastify';
// import { setStoreCategory } from '../../../redux/Slices/masterSlice';
// import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';
// import ItemDots from '../../../utils/ItemDots';
// import PriceFormater from '../../../utils/PriceFormater';


// const VendorDashbaord = () => {
//     const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
//     const flexiCategory = useSelector((state) => state?.master?.storeCategory)
//     const user = useSelector((state) => state.user.loggedUserDetails)
//     const productList = useSelector((state) => state?.flexiStore?.flexiStoreList)
//     const dispatch = useDispatch()
//     const [open, setOpen] = React.useState(false);
//     const [delId, setDelId] = React.useState(0);


//     // ================================ Fetch Store Product List =========================
//     const flexiProductList = () => {
//         getUserStoreProduct(user?.userid).then(res => {
//             dispatch(setFlexiStoreList(res))
//         }).catch(err => {
//             console.error('Error', err);
//         })
//     }

//     // ========================= fetch data from api ==============================
//     const MovableCategoryList = () => {
//         getStoreCategory().then(res => {
//             dispatch(setStoreCategory(res))
//         }).catch(err => {
//             console.error('Error', err);
//         })
//     }

//     // ================================ Dropdown List =========================

//     const loadOptions = (_, callback) => {
//         const uniqueNames = new Set();
//         const uniqueProducts = productList?.filter(res => res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name))
//             .map(res => ({ label: res.name, value: res.name }));
//         callback(uniqueProducts || []);
//     }

//     // =============================== submit data  =====================================
//     const onSubmit = (data) => {
//         let payload = {
//             name: data?.search?.value == undefined ? '' : data?.search?.value,
//             city: data?.city?.value == undefined ? '' : data?.city?.value
//         }
//         payload.user = user?.userid
//         if (data?.search?.value != undefined || data?.city != '') {
//             try {
//                 filStoreProduct(payload).then((res) => {
//                     dispatch(setFlexiStoreList(res));
//                     toast.success("Filters applied successfully")
//                 })
//             } catch (error) {
//                 console.log(error)
//             }
//         } else {
//             toast.warn("No Selected Value !!!")
//         }

//     }

//     // ================================ filter reset ============================
//     const filterReset = () => {
//         reset()
//         flexiProductList()
//         toast.success("Filters clear")
//     }


//     // ============================= delete Availability data ==========================

//     const toggleModalBtn = (id) => {
//         setOpen(!open)
//         setDelId(id)
//     }
//     const deleteData = () => {
//         delStoreProduct(delId).then((res) => {
//             if (res?.message === 'Data deleted successfully') {
//                 flexiProductList()
//                 toast.success(res?.message);
//                 setOpen(!open)
//             }
//         })
//     }

//     // ============================ Availability table action ===========================
//     const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
//         <NavLink to={`/flexiDashboardView/${row?.id}`} className="bg-green-100 px-1.5 py-2 rounded-sm"><Eye size="20" className='text-green-500' /></NavLink>
//         {/* <MovableProductForm button='edit' title='Edit Movable Product' data={row} /> */}
//         {/* <button onClick={() => toggleModalBtn(row?.id)} id={row?.id} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button> */}
//     </div>

//     const tempTemplate = (row) => (<h6>{row?.temp_type} °c</h6>)


//     const categoryTemplate = (row) => <h6><ItemDots len={10} name={row?.category?.name} /></h6>

//     const descriptionTemplate = (row) => <h6><ItemDots len={30} name={row?.description} /></h6>

//     // ====================================== table columns =========================================
//     const columns = [
//         { field: 'name', header: 'Name' },
//         { field: 'description', header: 'Description', body: descriptionTemplate },
//         { field: 'category', header: 'Category', body: categoryTemplate },
//         { field: 'price', header: 'Price', body: (row) => <PriceFormater price={row?.price} /> },
//         { field: 'rating', header: 'Rating', body: (row) => <h6>{row?.rating?.slice(0, 1) + "/5 Stars"}</h6> },
//         { field: 'stock', header: 'Stock' },
//         { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
//     ];



//     useEffect(() => {
//         flexiProductList();
//         MovableCategoryList();
//         reset({
//             'search': null,
//             'city': null,
//         })
//     }, [])



//     return (
//         <section className='w-full h-full'>
//             {/* =====================Dashboard header===================== */}
//             <div className="grid grid-cols-1 p-8 m-4 bg-white sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 ">
//                 <div className="flex items-center mr-8 space-x-3 border-r-0 sm:border-r border-gray-200/70">
//                     <div className="p-3.5 rounded-xl bg-sky-50">
//                         <ShoppingCart size={26} className="text-sky-400" />
//                     </div>
//                     <div className="space-y-1">
//                         <h6 className='text-sm text-gray-500 font-tb'>Order Completed</h6>
//                         <h6 className='text-base font-semibold text-sky-400 font-tb'>1.237k</h6>
//                     </div>
//                 </div>
//                 <div className="flex items-center mr-8 space-x-3 border-r-0 lg:border-r border-gray-200/70">
//                     <div className="p-3.5 rounded-xl bg-purple-50">
//                         <ArrowSwapVertical size={26} className="text-purple-600" />
//                     </div>
//                     <div className="space-y-1">
//                         <h6 className='text-sm text-gray-500 font-tb'>Total Number</h6>
//                         <h6 className='text-base font-semibold text-purple-600 font-tb'>12.37k</h6>
//                     </div>
//                 </div>
//                 <div className="flex items-center mr-8 space-x-3 border-r-0 md:border-r border-gray-200/70">
//                     <div className="p-3.5 rounded-xl bg-sky-50">
//                         <Box size={26} className="text-sky-400" />
//                     </div>
//                     <div className="space-y-1">
//                         <h6 className='text-sm text-gray-500 font-tb'>Order Completed</h6>
//                         <h6 className='text-base font-semibold text-sky-400 font-tb'>1.237k</h6>
//                     </div>
//                 </div>
//                 <div className="flex items-center space-x-3 ">
//                     <div className="p-3.5 rounded-xl bg-red-50">
//                         <NotificationBing size={26} className="text-red-500" />
//                     </div>
//                     <div className="space-y-1">
//                         <h6 className='text-sm text-gray-500 font-tb'>Total Notification's</h6>
//                         <h6 className='text-base font-semibold text-red-500 font-tb'>1.237k</h6>
//                     </div>
//                 </div>
//             </div>
//             {/* ===================== Availability filters ===================== */}

//             <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
//                 <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
//                     <div className="grid w-full grid-cols-1 gap-y-3 gap-x-2">
//                         <div className="">
//                             <Controller
//                                 control={control}
//                                 name="search"
//                                 render={({ field }) => (
//                                     <AsyncSelect
//                                         placeholder="Search By Name"
//                                         cacheOptions
//                                         defaultOptions
//                                         value={field.value}
//                                         defaultValue={field.value ? { label: field.value, value: field.value } : null}
//                                         loadOptions={loadOptions} onChange={field.onChange} />
//                                 )}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-x-2">
//                         <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
//                         <button type='button' onClick={filterReset} className={`${formBtn2} w-full text-center`} >Clear</button>
//                     </div>
//                 </form>
//             </div >

//             {/* ===================== Movable Table ===================== */}

//             <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 sm:p-7" >
//                 <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
//                     <div className="">
//                         <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Top Selling Products</h1>
//                         <h6 className='text-base text-gray-500 font-tb'>List of all top selling products</h6>
//                     </div>
//                 </div>
//                 <Table data={productList} columns={columns} />
//             </div>
//             <DeleteModal
//                 title='Delete Selling Product'
//                 deleteBtn={deleteData}
//                 toggleModalBtn={toggleModalBtn}
//                 description={"Are you sure you want to delete this Selling Product"} open={open}
//             />
//         </section >
//     )
// }

// export default VendorDashbaord

import React from 'react'

const VendorDashbaord = () => {
    return (
        <div>VendorDashbaord</div>
    )
}

export default VendorDashbaord