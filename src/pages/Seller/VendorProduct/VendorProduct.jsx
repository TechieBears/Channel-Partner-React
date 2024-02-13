import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import { toast } from 'react-toastify';
import Table from '../../../components/Table/Table';
import { NavLink } from 'react-router-dom';
import AddProduct from '../../../components/Modals/Vendors/AddProduct';

const VendorProduct = () => {
    const storages = useSelector((state) => state?.storage?.list);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const loadOptions = (_, callback) => {
        const uniqueNames = new Set();
        const uniqueProducts = storages
            ?.filter(
                (res) =>
                    res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
            )
            .map((res) => ({ label: res.name, value: res.name }));
        callback(uniqueProducts || []);
    };

    const onSubmit = (data) => {
        console.log('data', data)
    }
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    //======================= Table =======================
    const data = [
        {
            "productId": "001",
            "name": "Product A",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "category": "Electronics",
            "createdDate": "2024-02-12",
            "MRP": 50,
            "markupPrice": 60,
            "commission": 5,
            "quantity": 100
        },
        {
            "productId": "002",
            "name": "Product B",
            "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "category": "Clothing",
            "createdDate": "2024-02-10",
            "MRP": 100,
            "markupPrice": 120,
            "commission": 7,
            "quantity": 80
        },
        {
            "productId": "003",
            "name": "Product C",
            "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "category": "Home & Garden",
            "createdDate": "2024-02-08",
            "MRP": 75,
            "markupPrice": 90,
            "commission": 6,
            "quantity": 120
        }
    ]


    const coulmn = [
        { field: 'productId', header: 'ID', sortable: false },
        { field: 'name', header: 'Product Name', body: (row) => <NavLink to={`/vendors/vendors-detail/${row?.id}`}><h6 className='underline text-sky-400'>{row?.name}</h6> </NavLink>, sortable: false },
        { field: 'description', header: 'Description', sortable: false },
        { field: 'category', header: 'Category', sortable: false },
        { field: 'createdDate', header: 'Create Date', sortable: true },
        { field: 'MRP', header: 'MRP', sortable: true },
        { field: 'markupPrice', header: 'Markup Price', sortable: true },
        { field: 'commission', header: 'Commission', sortable: false },
        { field: 'quantity', header: 'Quantity', sortable: false },
    ]


    return (
        <>
            <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:items-center lg:flex-row"
                >
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                        <div className="">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <AsyncSelect
                                        placeholder="Search By Name"
                                        cacheOptions
                                        defaultOptions
                                        value={field.value}
                                        defaultValue={
                                            field.value
                                                ? { label: field.value, value: field.value }
                                                : null
                                        }
                                        loadOptions={loadOptions}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <select
                                name="City"
                                className={`${inputClass} !bg-slate-100`}
                                {...register("location")}
                            >
                                <option value="">City</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button
                            type="submit"
                            className={`${formBtn1} w-full text-center`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2} w-full text-center`}
                            onClick={filterReset}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <div className='p-4 m-4 bg-white sm:m-5 rounded-xl'>
                <div className='grid items-center grid-cols-6'>
                    <h2 className='col-span-5 text-xl font-semibold'>Product List</h2>
                    <AddProduct title='Add Title' />
                </div>
                <div className='mt-4'>
                    <Table data={data} columns={coulmn} />
                </div>
            </div>
        </>
    )
}

export default VendorProduct