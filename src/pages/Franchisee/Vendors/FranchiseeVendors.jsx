import axios from 'axios';
import { Eye } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Switch from 'react-js-switch';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetFranchiseeVendorsByID, verifyVendors } from "../../../api";
import userImg from '../../../assets/user.jpg';
import AddVendors from '../../../components/Modals/Vendors/AddVendors/AddVendors';
import Table from '../../../components/table/Table';
import { setFranchiseVendors } from "../../../redux/Slices/masterSlice";
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';


function FranchiseeVendors() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()
    const [Vendors, setVendors] = useState();
    const LoggedDetails = useSelector((state) => state?.user?.loggedUserDetails)


    // // ========================= fetch data from api ==============================
    const FranchiseeVendors = () => {
        try {
            GetFranchiseeVendorsByID(LoggedDetails?.userid).then((res) => {
                const shopVendors = res.filter(vendor => vendor.vendor_type === 'shop');
                setVendors(shopVendors);
                dispatch(setFranchiseVendors(res));
            });
        } catch (error) {
            console.log(error);
        }
    };

    // =================== filter data ========================
    const onSubmit = async (data) => {
        if (data?.name != '' || data?.msbcode != '') {
            const name = data?.name?.split(" ")[0] ? data?.name?.split(" ")[0] : ''
            const lastname = data?.name?.split(" ")[1] ? data?.name?.split(" ")[1] : ''
            try {
                let url = `${environment.baseUrl}vendor/vendor_list?name=${name}&lastname=${lastname}&msbcode=${data?.msbcode}`
                await axios.get(url).then((res) => {
                    console.log("🚀 ~ file: FranchiseeVendors.jsx:45 ~ awaitaxios.get ~ res:", res)
                    // SetVendors(res?.data?.results)
                    toast.success("Filters applied successfully")
                }).catch((err) => {
                    console.log("🚀 ~ file: FranchiseeVendors.jsx:49 ~ awaitaxios.get ~ err:", err)
                })
            } catch (err) {
                console.log("🚀 ~ file: FranchiseeVendors.jsx:52 ~ onSubmit ~ err:", err)
            }
        } else {
            toast.warn("No Selected Value !")
        }
    }


    const verifyActions = (row) => {
        const payload = { userId: row?.user?.id, isverifiedbyadmin: row?.user?.isverified_byadmin, isverifiedbyfranchise: !row?.isverifiedbyfranchise }
        try {
            verifyVendors(payload).then((form) => {
                if (form.message == "seller verified Successfully") {
                    toast.success('Vendor Verification Changed !');
                    FranchiseeVendors()
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
                    value={row?.isverifiedbyfranchise}
                    onChange={() => verifyActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }
    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2">
                <Switch
                    value={row?.user?.isverified_byadmin}
                    disabled={true}
                    // onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }


    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/vendors/vendors-detail/${row.id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="18" className='text-green-500' />
            </Link>
            <AddVendors button='edit' title='Edit Vendor' data={row} FranchiseeVendors={FranchiseeVendors} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.hawker_shop_photo == null || row?.hawker_shop_photo == '' || row?.hawker_shop_photo == undefined || row?.hawker_shop_photo.includes('undefined') ? userImg : row?.hawker_shop_photo} className="object-cover w-full h-full rounded-full" alt={row?.user?.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
        <h6 className={`${rowData?.isactive !== "false" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
            {rowData?.isactive !== "false" ? "Active" : "Inactive"}
        </h6>
    );

    const columns = [
        { field: 'hawker_shop_photo', header: 'Shop Image', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'msb_code', header: 'MSB Code', sortable: false },
        { field: 'shop_name', header: 'Shop Name', body: (row) => <div className="capitalize">{row?.shop_name ? row?.shop_name : 'Not Available'}</div> },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        { field: 'insta_commison_percentage', header: 'Comission(%)', body: (row) => <h6>{row?.insta_commison_percentage}%</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
        { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
        { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
        { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchActive, sortable: true },
        { field: 'isactive', header: 'Franchise Verify', body: switchVerify, sortable: true },
    ]

    useEffect(() => {
        FranchiseeVendors()
    }, [])
    return (
        <>
            {/* ========================= user filter ======================= */}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                    <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search By Name'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search By MSB Code'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('msbcode')}
                            />
                        </div>

                    </div>
                    <div className="flex items-center gap-x-2">
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), fetchData() }}>Clear</button>
                    </div>
                </form>
            </div>
            {/* ========================= user filter ======================= */}


            {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Vendor Details</h1>
                    </div>
                    <AddVendors title='Add Vendors' FranchiseeVendors={FranchiseeVendors} />
                </div>
                {/* {
                    Vendors?.legth > 0 && <Table data={Vendors} columns={columns} />
                } */}
                {
                    <Table data={Vendors} columns={columns} />
                }

            </div>


            {/*====================== User Table ================================*/}
        </>
    )
}

export default FranchiseeVendors