import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Switch from 'react-switch'

export default function DashbardForm() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log("🚀 ~ file: DashbardForm.jsx:15 ~ submit ~ data:", data)
    }
    return (
        <>
            <button onClick={toggle} className={tableBtn}>
                Click Me
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={toggle}>
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
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-blue-600 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='name'
                                                        className={inputClass}
                                                        {...register('name')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        operational year
                                                    </label>
                                                    <input
                                                        type="month"
                                                        placeholder='year'
                                                        className={inputClass}
                                                        {...register('operational_year')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='address'
                                                        className={inputClass}
                                                        {...register('address')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        city name
                                                    </label>
                                                    <select
                                                        name="city"
                                                        className={inputClass}
                                                        {...register("location")}
                                                    >
                                                        <option value="" >
                                                            Select Toilet Status
                                                        </option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Product allowed
                                                    </label>
                                                    <select
                                                        name="Product allowed"
                                                        className={inputClass}
                                                        {...register("type")}
                                                    >
                                                        <option value="" >
                                                            Select Product allowed
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        storage type
                                                    </label>
                                                    <select
                                                        name="Product allowed"
                                                        className={inputClass}
                                                        {...register("storage_type")}
                                                    >
                                                        <option value="" >
                                                            Select storage type
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        no.of chambers
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='total chambers'
                                                        className={inputClass}
                                                        {...register('total_chambers')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        type of chambar
                                                    </label>
                                                    <select
                                                        name="type of chambar"
                                                        className={inputClass}
                                                        {...register("chamber_type")}
                                                    >
                                                        <option value="" >
                                                            Select chamber type
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        unit of measurement
                                                    </label>
                                                    <select
                                                        name="type of chambar"
                                                        className={inputClass}
                                                        {...register("measure_unit")}
                                                    >
                                                        <option value="" >
                                                            Select chamber type
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        total capacity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='total capacity '
                                                        className={inputClass}
                                                        {...register('capacity')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        current occupied
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='current occupied '
                                                        className={inputClass}
                                                        {...register('occupied')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        availablit
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='availablit'
                                                        className={inputClass}
                                                        {...register('available')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Temperature Capability
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='Temperature Capability'
                                                        className={inputClass}
                                                        {...register('temp')}
                                                    />
                                                </div>


                                                <div className="">
                                                    <label className={labelClass}>
                                                        Temperature Compliance
                                                    </label>
                                                    <select
                                                        name="Temperature Compliance"
                                                        className={inputClass}
                                                        {...register("temp_compliance")}
                                                    >
                                                        <option value="" >
                                                            Select Temperature Compliance
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Warehouse Management Software
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Manual / Excel / Software Name'
                                                        className={inputClass}
                                                        {...register('manage_software')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        operating hours
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='operating hours'
                                                        className={inputClass}
                                                        {...register('operating_hrs')}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        rating
                                                    </label>
                                                    <select
                                                        name="Temperature Compliance"
                                                        className={inputClass}
                                                        {...register("rating")}
                                                    >
                                                        <option value="" >
                                                            Select rating
                                                        </option>
                                                        <option value="yes">Veg</option>
                                                        <option value="no">Non-veg</option>
                                                    </select>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        door sensor
                                                    </label>
                                                    <Switch  {...register('door_sensor')} />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Temperature Display System
                                                    </label>
                                                    <Switch  {...register('temp_system')} />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Remote Temperature Monitoring System
                                                    </label>
                                                    <Switch  {...register('remote_temp_sys')} />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Electricity back Up
                                                    </label>
                                                    <Switch  {...register('electricity_bckup')} />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Surveillance CCTV
                                                    </label>
                                                    <Switch  {...register('cctv')} />
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Blast Frezzing
                                                    </label>
                                                    <Switch  {...register('blast_frezzing')} />
                                                </div>

                                            </div>

                                            {/* Add other form fields here */}

                                            <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                                <button type='submit' className={formBtn1}>submit</button>
                                                <button className={formBtn2}>close</button>
                                            </footer>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
