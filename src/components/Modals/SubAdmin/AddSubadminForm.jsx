import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Add } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import LoadBox from '../../Loader/LoadBox';
import Error from '../../Errors/Error';
import Switch from 'react-switch'
import { addSubAdmin } from '../../../api';
import { toast } from 'react-toastify';

export default function AddSubadminForm({ getSubAdminFunc, title }) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [isSubAdmin, setIsSubAdmin] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            'is_subadmin': isSubAdmin,
            'isactive': true,
        }
        addSubAdmin(updatedData).then(res => {

            if (res?.code === 2002) {
                toast.success('Sub-Admin Screated Successfully')
                getSubAdminFunc()
                toggle()
            } else {
                toast.error(res.message)
            }
        })
    }

    const [departments, setDepartments] = useState([
        {
            id: 1,
            name: "Back Office",
            permissions: [
                { permission_id: 1, permission_name: "Application Process" },
                { permission_id: 2, permission_name: "Registration Process" },
                { permission_id: 3, permission_name: "Approval Process" },
            ],
        },
        {
            id: 2, name: "Verification", permissions: [
                { permission_id: 1, permission_name: "Delivery Application Process" },
                { permission_id: 2, permission_name: "Vendor Registration Process" },
                { permission_id: 3, permission_name: "User Documents" },
            ],

        },
        {
            id: 3, name: "Franchise Management", permissions: [
                { permission_id: 1, permission_name: "Seller Management" },
                { permission_id: 2, permission_name: "User Management" },
                { permission_id: 3, permission_name: "Delivery Management" },
            ],
        },
        {
            id: 4, name: "Customer Care", permissions: [
                { permission_id: 1, permission_name: "Chat Process" },
                { permission_id: 2, permission_name: "Inbound Process" },
                { permission_id: 3, permission_name: "Outbound Process" },
            ],
        },
        {
            id: 5, name: "Budget Management", permissions: [
                { permission_id: 1, permission_name: "Marketing Budget Pincode wise" },
                { permission_id: 2, permission_name: "Franchisee expenses & Reimbursement" },
                { permission_id: 3, permission_name: "Category Budget" },
            ],
        },
        {
            id: 6, name: "MIS", permissions: [
                { permission_id: 1, permission_name: "Data" },
                { permission_id: 2, permission_name: "Data Analysis" },
            ],
        },
        {
            id: 7, name: "HR", permissions: [
                { permission_id: 1, permission_name: "Recruitment" },
                { permission_id: 2, permission_name: "compensation" },
            ],
        },
    ]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleDepartmentChange = (departmentId) => {
        if (selectedDepartment === departmentId) {
            setSelectedDepartment(null); // Deselect if already selected
        } else {
            setSelectedDepartment(departmentId);
        }
    };

    const handlePermissionChange = (permissionId) => {
        const updatedDepartments = departments.map((dept) => {
            if (dept.id === selectedDepartment) {
                const updatedPermissions = dept.permissions.map((perm) => {
                    if (perm.permission_id === permissionId) {
                        perm.selected = !perm.selected;
                    }
                    return perm;
                });
                dept.permissions = updatedPermissions;
            }
            return dept;
        });
        setDepartments(updatedDepartments);
    };


    return (
        <>
            <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                <Add className='text-white' />
                {title}
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={() => toggle}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-scroll ">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        Add Restaurant
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            First Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='First Name'
                                                            className={inputClass}
                                                            {...register('first_name', { required: true })}
                                                        />
                                                        {errors.first_name && <Error title='First Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Last Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('last_name', { required: true })}
                                                        />
                                                        {errors.last_name && <Error title='Last Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Email'
                                                            className={inputClass}
                                                            {...register('email', { required: true })}
                                                        />
                                                        {errors.email && <Error title='Email is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Password*
                                                        </label>
                                                        <input
                                                            type="password"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password', { required: true })}
                                                        />
                                                        {errors.password && <Error title='Email is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Phone*
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            placeholder='Phone'
                                                            className={inputClass}
                                                            maxLength={10}
                                                            {...register('phone_no', { required: true })}
                                                        />
                                                        {errors.phNumber && <Error title='Phone is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Address*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Address'
                                                            className={inputClass}
                                                            {...register('address', { required: true })}
                                                        />
                                                        {errors.address && <Error title='Addresss is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='State'
                                                            className={inputClass}
                                                            {...register('state', { required: true })}
                                                        />
                                                        {errors.state && <Error title='State is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('city', { required: true })}
                                                        />
                                                        {errors.city && <Error title='City is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pincode*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            maxLength={6}
                                                            placeholder='Pincode'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true })}
                                                        />
                                                        {errors.pincode && <Error title='Pincode is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Role*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('role', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='AC'>AC</option>
                                                            <option value='MIS'>MIS</option>
                                                            <option value='Back Office'>Back Office</option>
                                                            <option value='Admin (Access Option)'>Admin (Access Option)</option>
                                                            <option value='Customer Care'>Customer Care</option>
                                                        </select>
                                                        {errors.role && <Error title='Role is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Is Sub-Admin
                                                        </label>
                                                        <Switch checked={isSubAdmin} onChange={() => setIsSubAdmin(!isSubAdmin)} />
                                                    </div>
                                                </div>

                                                <h1 className='mx-4 mt-8 text-xl font-semibold text-gray-900 font-tbPop'>Permissions:</h1>
                                                <div className="!flex !justify-start ">
                                                    <div className='!grid w-1/3 !gap-3'>
                                                        <h2 className="text-lg font-bold">Departments</h2>
                                                        <select
                                                            value={selectedDepartment}
                                                            onChange={(e) => handleDepartmentChange(parseInt(e.target.value))}
                                                            className={`p-2 mb-4 border border-gray-300 rounded-lg ${inputClass}`}
                                                        >
                                                            <option value={null}>Select Department</option>
                                                            {departments.map((department) => (
                                                                <option key={department.id} value={department.id}>
                                                                    {department.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className='ms-10 w-full '>
                                                        {selectedDepartment && (
                                                            <div className="p-4 border bg-white border-gray-300 rounded-lg grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h2 className="mb-4 text-lg font-bold">Permissions for {departments[selectedDepartment - 1].name}</h2>
                                                                    <ul>
                                                                        {departments[selectedDepartment - 1].permissions.map((permission) => (
                                                                            <li key={permission.permission_id} className="flex items-center mb-2">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`permission-${permission.permission_id}`}
                                                                                    checked={permission.selected}
                                                                                    onChange={() => handlePermissionChange(permission.permission_id)}
                                                                                />
                                                                                <label htmlFor={`permission-${permission.permission_id}`} className="ml-2">{permission.permission_name}</label>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
