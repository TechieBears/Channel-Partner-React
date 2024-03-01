import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { Eye, Trash } from 'iconsax-react';
import { delUser, verifyDeliveryBoy, getUser, getDeliveryBoy } from '../../../api';
import Switch from 'react-js-switch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { environment } from '../../../env';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../../../redux/Slices/userSlice';
import { setDeliveryList } from '../../../redux/Slices/deliverySlice';
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';
import userImg from '../../../assets/user.jpg';
import AddDriverFrom from '../../../components/Modals/DriverModals/AddDriverForm';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';

function Drivers() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.users.list)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);
    const DeliveryList = useSelector((state) => state?.delivery?.deliveryList);
    // =================== filter data ========================
    const onSubmit = async (data) => {
        if (data?.name != '' || data?.email != '' || data?.city != '' || data?.role != '') {
            let url = `${environment.baseUrl}user-filter/?first_name=${data?.name}&email=${data?.email}&city=${data?.city}&role=${data?.role}`
            await axios.get(url).then((res) => {
                dispatch(setUserList(res.data))
                toast.success("Filters applied successfully")
            })
        } else {
            toast.warn("No Selected Value !")
        }
    }


    // // ========================= fetch data from api ==============================
    const DeliveryBoyDetails = () => {
        try {
            getDeliveryBoy().then((res) => {
                dispatch(setDeliveryList(res));
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        DeliveryBoyDetails()
    }, [])


    // =================== delete the user data ========================
    const toggleModalBtn = (id) => {
        setOpen(!open)
        setDelId(id)
    }
    const deleteUser = () => {
        delUser(delId).then((res) => {
            if (res.code == 2002) {
                toast.success("User deleted!!");
                DeliveryBoyDetails();
                setOpen(!open)
            }
            else {
                console.log("err");
            }
        })
    }

    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/drivers/driver-detail/${row.driver_id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <AddDriverFrom button='edit' title='Edit User' data={row} DeliveryBoyDetails={DeliveryBoyDetails} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.user?.profile_pic == null || row?.user?.profile_pic == '' || row?.user?.profile_pic == undefined ? userImg : row?.user?.profile_pic} className="object-cover w-full h-full rounded-full" alt={row.user?.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
        <h6 className={`${rowData?.user?.isactive !== "false" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
            {rowData?.user?.isactive !== "false" ? "Active" : "Inactive"}
        </h6>
    );


    // ======================= Table Column Definitions =========================
    // const columns = [
    //     { field: 'id', header: 'ID', body: representativeBodyTemplate, sortable: true, style: true },
    //     { field: 'image', header: 'IMAGE', body: (row) => <img src={row.image} alt={row.name} className="rounded-full w-11 h-11" />,  sortable: true},
    //     { field: 'name', header: 'NAME', body: (row) => <div className="uppercase">{row.name}</div> },
    //     { field: 'email', header: 'EMAIL', sortable: true },
    //     { field: 'phone', header: 'PHONE', body: (row) => row.phone , sortable: true},
    //     { field: 'occupation', header: 'OCCUPATION', body: (row) => row.occupation , sortable: true },
    //     { field: 'restaurant', header: 'RESTAURANT', body: (row) => row.restaurant , sortable: true },
    //     { field: 'Commission', header: 'COMMISSION', body: (row) => row.restaurantCommission },
    //     { field: 'revenue', header: 'REVENUE', body: (row) => row.revenue },
    //     { field: 'status', header: 'STATUS', sortable: true},
    //     { field: 'action', header: 'ACTION', body: actionBodyTemplate, sortable: true },
    // ];

    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>


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


    const columns = [
        // { field: 'id', header: 'ID', sortable: false },
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        { field: 'gender', header: 'Gender', body: (row) => <h6>{row?.user?.gender}</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: false },
        { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
        { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
        { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isactive', header: 'Franchise Verify', body: switchActive, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
        // { header: 'Analyse', body: action, sortable: false },
    ]



    return (
        <>
            <DeleteModal
                title='Delete Register User'
                deleteBtn={deleteUser}
                toggleModalBtn={toggleModalBtn}
                description="Are you sure you want to delete this User" open={open}
            />

            {/* ========================= user fileter ======================= */}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                    <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search by name'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search by email'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('email')}
                            />
                        </div>

                        <div className="">
                            <select
                                name="City"
                                className={`${inputClass} !bg-slate-100`}
                                {...register("city")}
                            >
                                <option value="" >
                                    Select by city name
                                </option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Delhi">Delhi</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), DeliveryBoyDetails() }}>Clear</button>
                    </div>
                </form>
            </div>

            {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Drivers</h1>
                    </div>
                    <div className='flex gap-4'>
                        <AddDriverFrom title='Add Driver' DeliveryBoyDetails={DeliveryBoyDetails} />
                    </div>
                </div>
                <Table data={DeliveryList?.data} columns={columns} />
            </div>
        </>
    )
}

export default Drivers;
