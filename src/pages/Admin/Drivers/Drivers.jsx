import axios from 'axios';
import { Eye } from 'iconsax-react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Switch from 'react-js-switch';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import { GetFranchisee, getDeliveryBoy, verifyDeliveryBoy } from '../../../api';
import userImg from '../../../assets/user.jpg';
import AddDriverFrom from '../../../components/Modals/DriverModals/AddDriverForm';
import Table from '../../../components/table/Table';
import { environment } from '../../../env';
import { setDeliveryList } from '../../../redux/Slices/deliverySlice';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import Excel from '../../../../src/assets/ms-excel.svg';


function Drivers() {
    const dispatch = useDispatch()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const [open, setOpen] = React.useState(false);
    const [exceltrue, setExcelTrue] = useState(false)

    const [delId, setDelId] = React.useState(0);
    const DeliveryList = useSelector((state) => state?.delivery?.deliveryList);
    const [deliveryBoyData, setDeliveryBoyData] = useState()
    const [pincodeOptions, setPincodeOptions] = useState()
    const [franchiseOptions, setFranchiseOptions] = useState()

    const handleExportComplete = () => {
        setExcelTrue(false); // Set exceltrue to false after export is complete
    };

    const excelbtnTrue = () => {
        setExcelTrue(true);
       console.log('exceltrue = ', exceltrue) 
    }


    // =================== fetch all franchise data ========================
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
            console.log("🚀 ~ file: Vendors.jsx:57 ~ GetFranchiseeData ~ error:", error)
        }
    }




    // =================== filter data ========================
    const onSubmit = async (data) => {
        if (data?.name != '' || data?.msbcode != '' || data?.franchise != '' || data?.franchise != undefined || data?.pincode != '' || data?.pincode != undefined) {
            const name = data?.name?.split(" ")[0] ? data?.name?.split(" ")[0] : ''
            const lastname = data?.name?.split(" ")[1] ? data?.name?.split(" ")[1] : ''
            try {
                let url = `${environment.baseUrl}delivery/deliveryboy_list?name=${name}&lastname=${lastname}&msbcode=${data?.msbcode}&franchise=${data?.franchise?.value ? data?.franchise?.value : ''}&pincode=${data?.pincode?.value ? data?.pincode?.value : ''}`
                await axios.get(url).then((res) => {
                    setDeliveryBoyData(res?.data?.results)
                    toast.success("Filters applied successfully")
                }).catch((err) => {
                    console.log("🚀 ~ file: Drivers.jsx:70 ~ awaitaxios.get ~ err:", err)
                })
            } catch (err) {
                console.log("🚀 ~ file: Drivers.jsx:75 ~ onSubmit ~ err:", err)
            }
        } else {
            toast.warn("No Selected Value !")
        }
    }

    const handleClear = () => {
        reset({
            name: '',
            msbcode: '',
            franchise: '',
            pincode: ''
        })
        toast.success("Filters clear successfully")
        setDeliveryBoyData()
        DeliveryBoyDetails()
    }



    // // ========================= fetch data from api ==============================
    const DeliveryBoyDetails = () => {
        try {
            getDeliveryBoy().then((res) => {
                dispatch(setDeliveryList(res?.data));
                setDeliveryBoyData(res?.data)
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        DeliveryBoyDetails()
        GetFranchiseeData()
    }, [])

    useEffect(() => {
        if (deliveryBoyData?.length > 0) {
            const newData = deliveryBoyData?.map((data) => ({
                label: data?.user?.pincode,
                value: data?.user?.pincode,
            }))
            const uniquePincodeData = _.uniqBy(newData, 'value')
            setPincodeOptions(uniquePincodeData);
        }
    }, [deliveryBoyData])


    // =================== delete the user data ========================
    const toggleModalBtn = (id) => {
        setOpen(!open)
        setDelId(id)
    }

    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/drivers/driver-detail/${row.driver_id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <AddDriverFrom button='edit' title='Edit Driver' data={row} DeliveryBoyDetails={DeliveryBoyDetails} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11 bg-slate-100">
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

    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2">
                <Switch
                    value={row?.isverifiedbyfranchise}
                    disabled={true}
                    // onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

    const verifyActions = (row) => {
        const payload = { userId: row?.user?.id, isverifiedbyadmin: !row?.user?.isverified_byadmin, isverifiedbyfranchise: row?.isverifiedbyfranchise }
        try {
            verifyDeliveryBoy(payload).then((form) => {
                console.log(payload)
                if (form.status == "success") {
                    toast.success('Driver Verification Changed !');
                    DeliveryBoyDetails()
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


    function parseShift(shiftString) {
        const shift = {};
        const lines = shiftString.split('\n');
        lines.forEach(line => {
          const [key, value] = line.split(':');
          shift[key.trim()] = value?.trim();
        });
        console.log(shift)
        return shift;
      }


    const columns = [
        // { field: 'id', header: 'ID', sortable: false },
        
        { field: 'msb_code', header: 'MSBD Code', body: (row) => <h6>{row?.msb_code}</h6>, sortable: false },
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        // { field: 'shift',  header: 'Shift Timing', body: (row) => <h6>{row?.shift ? JSON.parse(row?.shift)?.title : ''}</h6>, sortable: false },
        // { field: 'job_type',  header: 'Job Type', body: (row) => <h6>{row?.job_type ? JSON.parse(row?.job_type)?.title : ''}</h6>, sortable: false },
        { field: 'gender', header: 'Gender', body: (row) => <h6>{row?.user?.gender}</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
        // { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: false },
        { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
        { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
        { field: 'week_off', header: 'Week Off', body: (row) => <h6>{row?.week_off}</h6>, sortable: false },
        { field: 'vehicle_type', header: 'Vehicle Type', body: (row) => <h6>{row?.vehicle_type}</h6>, sortable: false },
        { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isactive', header: 'Franchise Verify', body: switchActive, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
        // { header: 'Analyse', body: action, sortable: false },
    ]



    return (
        <>
            {/* ========================= user fileter ======================= */}
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
                        <div className="">
                            <Controller
                                control={control}
                                name="franchise"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        value={value}
                                        options={franchiseOptions}
                                        className="text-gray-900 w-100"
                                        placeholder="Search By Franchise"
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
                                name="pincode"
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        value={value}
                                        options={pincodeOptions}
                                        className="text-gray-900 w-100"
                                        placeholder="Search By Pincode"
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
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Drivers</h1>
                    </div>
                        <div className='flex items-center'>
                        <AddDriverFrom title='Add Driver' DeliveryBoyDetails={DeliveryBoyDetails} />
                        <div className='flex items-center ms-3'>
                            <h5>Export</h5>
                            <button
                                type="button"
                                icon="pi pi-file-excel"
                                onClick={excelbtnTrue}
                                className="mx-1 my-2 p-button-success"
                                data-pr-tooltip="XLS"
                            >
                                <img src={Excel} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
                <Table data={deliveryBoyData} columns={columns} exceltrue={exceltrue} onExportComplete={handleExportComplete}/>
            </div>
        </>
    )
}

export default Drivers;
