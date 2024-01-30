// import React, { useEffect } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import AsyncSelect from 'react-select/async';
// import { formBtn1, formBtn2 } from '../../../utils/CustomClass';
// import Table from '../../../components/Table/Table';
// import { useDispatch, useSelector } from 'react-redux';
// import { Trash } from 'iconsax-react';
// import { toast } from 'react-toastify';
// import ItemDots from '../../../utils/ItemDots';
// import PriceFormater from '../../../utils/PriceFormater';
// import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';


// const VendorOrders = () => {
//     const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
//     const user = useSelector((state) => state.user.loggedUserDetails)
//     const priceList = useSelector((state) => state?.movable?.price)
//     const dispatch = useDispatch()
//     const [open, setOpen] = React.useState(false);
//     const [delId, setDelId] = React.useState(0);


//     // ================================ Fetch Store Product List =========================
//     const movablePriceList = () => {
//         getAllMovablePrice().then(res => {
//             dispatch(setMovablePrice(res))
//         }).catch(err => {
//             console.error('Error', err);
//         })
//     }

//     // ================================ Dropdown List =========================

//     const loadOptions = (_, callback) => {
//         const uniqueNames = new Set();
//         const uniqueProducts = priceList?.filter(res => res.product_name && !uniqueNames.has(res.product_name) && uniqueNames.add(res.product_name))
//             .map(res => ({ label: res.product_name, value: res.product_name }));
//         callback(uniqueProducts || []);
//     }


//     // =============================== submit data  =====================================
//     const onSubmit = (data) => {
//         let payload = {
//             name: data?.search?.value == undefined ? '' : data?.search?.value,
//         }
//         if (user?.role != 'admin') {
//             payload.user = user?.userid
//         } else {
//             payload.user = ''
//         }
//         if (data?.search?.value != undefined) {
//             try {
//                 filStoreProduct(payload).then((res) => {
//                     dispatch(setMovablePrice(res));
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
//         movablePriceList()
//         toast.success("Filters clear")
//     }

//     // ============================= delete Availability data ==========================

//     const toggleModalBtn = (id) => {
//         setOpen(!open)
//         setDelId(id)
//     }
//     const deleteData = () => {
//         deleteMovablePrice(delId).then((res) => {
//             if (res?.message === 'Data deleted successfully') {
//                 movablePriceList()
//                 toast.success(res?.message);
//                 setOpen(!open)
//             }
//         })
//     }

//     // ============================ Availability table action ===========================
//     const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
//         <MovablePriceForm button='edit' title='Edit Movable Price' data={row} />
//         <button onClick={() => toggleModalBtn(row?.id)} id={row?.id} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
//     </div>
//     const categoryTemplate = (row) => <h6><ItemDots len={10} name={row?.capacity + " Ltr"} /></h6>

//     // ====================================== table columns =========================================
//     const columns = [
//         { field: 'product_name', header: 'Name' },
//         { field: 'capacity', header: 'Category', body: categoryTemplate },
//         { field: 'empty_weight', header: 'Empty Weight' },
//         { field: 'length', header: 'Length' },
//         { field: 'width', header: 'Width' },
//         { field: 'height', header: 'Height' },
//         { field: 'price', header: 'Price', body: (row) => <PriceFormater price={row?.price} /> },
//         { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
//     ];

//     useEffect(() => {
//         movablePriceList();
//         reset({
//             'search': null,
//         })
//     }, [])



//     return (
//         <section className='h-full w-full'>

//             {/* ===================== Availability filters ===================== */}

//             <div className="bg-white p-4 m-4 sm:m-5 rounded-xl">
//                 <form onSubmit={handleSubmit(onSubmit)} className='flex md:items-center flex-col lg:flex-row  gap-2'>
//                     <div className="w-full gap-y-3 gap-x-2">
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
//                         <h1 className='font-tbPop text-xl font-semibold text-gray-900 '> My Orders</h1>
//                         <h6 className='text-gray-400 font-tb font-medium text-base'>List of all store and move my orders</h6>
//                     </div>
//                 </div>
//                 <Table data={priceList} columns={columns} />
//             </div>
//             <DeleteModal
//                 title='Delete Order'
//                 deleteBtn={deleteData}
//                 toggleModalBtn={toggleModalBtn}
//                 description={"Are you sure you want to delete this Order"} open={open}
//             />
//         </section >
//     )
// }

// export default VendorOrders


import React from 'react'

const VendorOrders = () => {
    return (
        <div>VendorOrders</div>
    )
}

export default VendorOrders