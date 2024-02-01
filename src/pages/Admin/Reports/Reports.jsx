import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { Eye, Trash } from 'iconsax-react';
// import CreateUserForm from '../../../components/Modals/UserModals/CreateUserForm';
import { delUser, editUser, getUser } from '../../../api';
// import userImg from '../../../assets/user.webp';
import Switch from 'react-js-switch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { environment } from '../../../env';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../../../redux/Slices/userSlice';
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';
import AddDriverFrom from '../../../components/Modals/DriverModals/AddDriverForm';
import DriverTipForm from '../../../components/Modals/DriverModals/DriverTipForm';

function Reports() {
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
    // =================== fetching data ========================
    const fetchData = () => {
        try {
            getUser().then((res) => {
                dispatch(setUserList(res))
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    // =================== delete the user data ========================
    const toggleModalBtn = (id) => {
        setOpen(!open)
        setDelId(id)
    }
    const deleteUser = () => {
        delUser(delId).then((res) => {
            if (res.code == 2002) {
                toast.success("User deleted!!");
                fetchData();
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
            <Link to={`/user/${row.id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <CreateUserForm button='edit' title='Edit User' data={row} />
            {/* <button onClick={() => toggleModalBtn(row.id)} id={row.id} className="bg-red-100 px-1.5 py-2 rounded-sm">
                <Trash size="20" className='text-red-500' />
            </button> */}
        </div>
    );
    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="w-11 h-11 rounded-full">
                <img src={row?.profile == null || row?.profile == '' || row?.profile == undefined ? userImg : row?.profile} className="w-full h-full rounded-full object-cover" alt={row.first_name} />
            </div>
        );
    };

    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => <h6 className={`${rowData?.role == 'admin' ? "bg-orange-100 text-sky-400" : rowData?.role !== "user" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"} py-2 px-5 text-center capitalize rounded-full`}>{rowData?.role}</h6>
    const verifyActions = (row) => {
        const payload = { isverify: !row.isverify, email: row?.email }
        try {
            editUser(row?.id, payload).then((form) => {
                if (form.code == 2002) {
                    toast.success('User Verify Changed !');
                    fetchData()
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

    // =================== table user active column ========================

    const activeActions = (row) => {
        const payload = { isactive: !row.isactive, email: row?.email }
        try {
            editUser(row?.id, payload).then((form) => {
                if (form.code == 2002) {
                    toast.success('User Active Changed !');
                    fetchData()
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
            <div className="flex justify-center items-center gap-2 ">
                <Switch
                    value={row?.isverify}
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
            <div className="flex justify-center items-center gap-2 ">
                <Switch
                    value={row?.isactive}
                    onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }
    // ======================= Table Column Definitions =========================
    const columns = [
        { field: 'id', header: 'ID', body: representativeBodyTemplate, sortable: true, style: true },
        { field: 'image', header: 'IMAGE', body: (row) => <img src={row.image} alt={row.name} className="w-11 h-11 rounded-full" />,  sortable: true},
        { field: 'name', header: 'NAME', body: (row) => <div className="uppercase">{row.name}</div> },
        { field: 'email', header: 'EMAIL', sortable: true },
        { field: 'phone', header: 'PHONE', body: (row) => row.phone , sortable: true},
        { field: 'occupation', header: 'OCCUPATION', body: (row) => row.occupation , sortable: true },
        { field: 'restaurant', header: 'RESTAURANT', body: (row) => row.restaurant , sortable: true },
        { field: 'Commission', header: 'COMMISSION', body: (row) => row.restaurantCommission },
        { field: 'revenue', header: 'REVENUE', body: (row) => row.revenue },
        { field: 'status', header: 'STATUS', sortable: true},
        { field: 'action', header: 'ACTION', body: actionBodyTemplate, sortable: true },
    ];


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <DeleteModal
                title='Delete Register User'
                deleteBtn={deleteUser}
                toggleModalBtn={toggleModalBtn}
                description="Are you sure you want to delete this User" open={open}
            />
            {/* ========================= user fileter ======================= */}
            <div className="bg-white p-4 sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex w-full justify-between md:items-center flex-col lg:flex-row gap-2'>
                    <div className="grid grid-cols-1 w-8/12 sm:grid-cols-3 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search by Id / Email / Name / Phone Number'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="date"
                                placeholder='Select date (YYYY-MM-DD)'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100 !text-gray-400`}
                                {...register('date')}
                            />
                        </div>
                    </div>
                    <div className="flex w-4/12 gap-x-2 items-center">
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Download CSV</button>
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), fetchData() }}>Clear</button>
                    </div>
                </form>
            </div>
            {/*====================== User Table ================================*/}
            <div className="bg-white p-4 sm:m-5 rounded-xl" >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center sm:space-y-0 mb-6">
                    <div className="">
                        <h1 className='font-tbPop text-xl font-semibold text-gray-900'>Reports</h1>
                    </div>
                </div>
                <Table data={userList} columns={columns} />
            </div>
        </>
    )
}

export default Reports;
