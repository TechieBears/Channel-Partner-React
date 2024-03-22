import React, { useState, useEffect } from 'react'
import { Eye } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import Switch from 'react-js-switch'
import AddFranchisee from '../../../components/Modals/Franchisee/AddFranchiseForm';
import AddFranchiseForm from '../../../components/Modals/Franchisee/AddFranchiseForm';
import { useDispatch, useSelector } from "react-redux";
import { GetFranchisee, verifyFranchise } from "../../../api";
import { setFranchise } from "../../../redux/Slices/masterSlice";
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import userImg from '../../../assets/user.jpg';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';
import { toast } from 'react-toastify';
import { environment } from '../../../env';
import Select from "react-select";
import _ from 'lodash';
import AsyncSelect from 'react-select/async';


function Franchisees() {
    const dispatch = useDispatch()
    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [rstatus, setStatus] = useState();
    const [franchiseData, setFranchiseData] = useState()
    console.log('franchsie', franchiseData)
    const emails = franchiseData?.map(item => item?.user?.email)
    const [pincodeOptions, setPincodeOptions] = useState()

    // // ========================= fetch data from api ==============================
    const FranchiseeDetails = () => {
        try {
            GetFranchisee().then((res) => {
                dispatch(setFranchise(res));
                setFranchiseData(res)
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FranchiseeDetails()
    }, [])

    useEffect(() => {
        if (franchiseData?.length > 0) {
            const newData = franchiseData?.map((data) => ({
                label: data?.user?.pincode,
                value: data?.user?.pincode,
            }))
            const uniquePincodeData = _.uniqBy(newData, 'value')
            setPincodeOptions(uniquePincodeData);
        }
    }, [franchiseData])


    // =================== filter data ========================
    const onSubmit = async (data) => {
        if (data?.name != '' || data?.msbcode != '' || data?.pincode != '' || data?.pincode != undefined) {
            try {
                let url = `${environment.baseUrl}franchise/franchise_list?name=${data?.name}&msbcode=${data?.msbcode}&pincode=${data?.pincode?.value ? data?.pincode?.value : ''}`
                await axios.get(url).then((res) => {
                    console.log("🚀 ~ file: Franchisees.jsx:74 ~ awaitaxios.get ~ res:", res)
                    setFranchiseData(res?.data?.results)
                    toast.success("Filters applied successfully")
                }).catch((err) => {
                    console.log("🚀 ~ file: Franchisees.jsx:78 ~ awaitaxios.get ~ err:", err)
                })
            } catch (err) {
                console.log("🚀 ~ file: Franchisees.jsx:81 ~ onSubmit ~ err:", err)
            }
        } else {
            toast.warn("No Selected Value !")
        }
    }

    const handleClear = () => {
        reset({
            name: '',
            msbcode: '',
            pincode: ''
        })
        toast.success("Filters clear successfully")
        setFranchiseData()
        FranchiseeDetails()
    }




    const verifyActions = (row) => {
        const payload = { userId: row?.user?.id, isverifiedbyadmin: !row?.user?.isverified_byadmin }
        try {
            verifyFranchise(payload).then((form) => {
                console.log(payload)
                if (form.status == "success") {
                    toast.success('Franchisee Verification Changed !');
                    FranchiseeDetails()
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
                    value={row?.user?.isverified_byadmin}
                    onChange={() => verifyActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/franchise/franchise-detail/${row?.franch_id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <AddFranchiseForm button='edit' title='Edit User' data={row} FranchiseeDetails={FranchiseeDetails} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.user?.profile_pic == null || row?.user?.profile_pic == '' || row?.user?.profile_pic == undefined || row?.user?.profile_pic.includes('undefined') ? userImg : row?.user?.profile_pic} className="object-cover w-full h-full rounded-full" alt={row.user?.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
        <h6 className={`${rowData?.user?.isverified_byadmin !== false ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
            {rowData?.user?.isverified_byadmin !== false ? "Active" : "Inactive"}
        </h6>
    );


    const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>

    const columns = [
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'msb_code', header: 'MSB Code', sortable: false, style: true },
        { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name', style: true },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false, style: true },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false, style: true },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false, style: true },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true, style: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true, style: true },
    ]
    return (

        <>
            {/* ========================= user filter ======================= */}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                    <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search by Name'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search by MSB Code'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('msbcode')}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name="pincode"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (

                                    <Select
                                        value={value}
                                        options={pincodeOptions}
                                        className="w-100 text-gray-900"
                                        placeholder="Search by Pincode"
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
                    <div className="flex items-center gap-x-2">
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => handleClear()}>Clear</button>
                    </div>
                </form>
            </div>

            {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Franchisee Details</h1>
                    </div>
                    <AddFranchisee title='Add Franchisee' FranchiseeDetails={FranchiseeDetails} emails={emails} />
                </div>
                <Table data={franchiseData} columns={columns} />
            </div>
        </>
    )
}

export default Franchisees