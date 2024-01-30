// import React, { useEffect } from 'react'
// import { Controller, useForm } from 'react-hook-form';
// import AsyncSelect from 'react-select/async';
// import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
// import Table from '../../../components/Table/Table';
// import { useDispatch, useSelector } from 'react-redux';
// import { delStoreProduct, filStoreProduct, getStoreCategory, getUserStoreProduct } from '../../../api';
// import { setFlexiStoreList } from '../../../redux/VendorSlices';
// import { NavLink } from 'react-router-dom';
// import { Eye, Trash } from 'iconsax-react';
// import { toast } from 'react-toastify';
// import StoreProductForm from '../../../components/Modals/StoreProduct/StoreProductForm';
// import ItemDots from '../../../utils/ItemDots';
// import { setStoreCategory } from '../../../redux/Slices/masterSlice';
// import PriceFormater from '../../../utils/PriceFormater';
// import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';


// const VendorProduct = () => {
//     const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
//     const flexiCategory = useSelector((state) => state?.master?.storeCategory)
//     const user = useSelector((state) => state.user.loggedUserDetails)
//     const productList = useSelector((state) => state?.flexiStore?.flexiStoreList)
//     const dispatch = useDispatch()
//     const [open, setOpen] = React.useState(false);
//     const [delId, setDelId] = React.useState(0);


//     // ================================ Fetch Store Product List =========================
//     const flexiStoreProductList = () => {
//         getUserStoreProduct(user?.userid).then(res => {
//             dispatch(setFlexiStoreList(res))
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
//             category: data?.type == undefined ? '' : data?.category,
//         }
//         payload.user = user?.userid
//         if (data?.search?.value != undefined || data?.category != '') {
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
//         flexiStoreProductList()
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
//                 flexiStoreProductList()
//                 toast.success(res?.message);
//                 setOpen(!open)
//             }
//         })
//     }

//     // ============================ Availability table action ===========================
//     const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
//         <NavLink to={`/flexiProductView/${row?.id}`} className="bg-green-100 px-1.5 py-2 rounded-sm"><Eye size="20" className='text-green-500' /></NavLink>
//         <StoreProductForm button='edit' title='Edit Flexi Stroage Product' data={row} />
//         <button onClick={() => toggleModalBtn(row?.id)} id={row?.id} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
//     </div>

//     const descriptionTemplate = (row) => <h6><ItemDots len={30} name={row?.description} /></h6>
//     const categoryTemplate = (row) => <h6><ItemDots len={10} name={row?.category?.name} /></h6>

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


//     const fetchStoreCategory = () => {
//         try {
//             getStoreCategory().then((res) => {
//                 dispatch(setStoreCategory(res))
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         flexiStoreProductList();
//         fetchStoreCategory();
//         reset({
//             'location': '',
//             'search': null,
//             'type': ''
//         })
//     }, [])



//     return (
//         <section className='h-full w-full'>

//             {/* ===================== Availability filters ===================== */}

//             <div className="bg-white p-4 m-4 sm:m-5 rounded-xl">
//                 <form onSubmit={handleSubmit(onSubmit)} className='flex md:items-center flex-col lg:flex-row  gap-2'>
//                     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-y-3 gap-x-2">
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
//                         <div className="">
//                             <select
//                                 name="Product Category"
//                                 className={`${inputClass} !bg-slate-100`}
//                                 {...register("category")}
//                             >
//                                 <option value="" >Select Product Category</option>
//                                 {flexiCategory?.map((category) => <option value={category?.name} key={category?.id}>{category?.name}</option>)}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="flex gap-x-2 items-center">
//                         <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
//                         <button type='button' onClick={filterReset} className={`${formBtn2} w-full text-center`} >Clear</button>
//                     </div>
//                 </form>
//             </div >

//             {/* ===================== Availability table ===================== */}

//             <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7" >
//                 <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
//                     <div className="">
//                         <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>All Products</h1>
//                         <h6 className='text-gray-500 font-tb text-base'>List of All Products and Quantity respectively</h6>
//                     </div>
//                     <StoreProductForm title='Add Store Product' />
//                 </div>
//                 <Table data={productList} columns={columns} />
//             </div>
//             <DeleteModal
//                 title='Delete Product'
//                 deleteBtn={deleteData}
//                 toggleModalBtn={toggleModalBtn}
//                 description={"Are you sure you want to delete this Product"} open={open}
//             />
//         </section >
//     )
// }

// export default VendorProduct

import React from 'react'

const VendorProduct = () => {
    return (
        <div>VendorProduct</div>
    )
}

export default VendorProduct