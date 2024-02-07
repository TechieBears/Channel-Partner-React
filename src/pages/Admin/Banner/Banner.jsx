import { useEffect } from 'react';
import { Trash } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Table from '../../../components/Table/Table';
import { setBanner } from '../../../redux/Slices/masterSlice';
import { delHomeBanners, getHomeBanners } from '../../../api';
import BannerForm from '../../../components/Modals/MasterModals/AssetsModals/BannerForm';
import { inputClass } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';


const Banner = () => {
    const homeBanners = useSelector((state) => state?.master?.banner)
    const dispatch = useDispatch()

    // ============== fetch data from api ================
    const getAllBannerList = () => {
        try {
            getHomeBanners().then((res) => {
                dispatch(setBanner(res))
            })
        } catch (error) {
            console.log(error)
        }
    }

    // ============== delete data from api ================
    const deleteData = (data) => {
        delHomeBanners(data).then((res) => {
            if (res?.message === 'Data deleted successfully') {
                getAllBannerList();
                toast.success(res?.message);
            }
        })
    }
    useEffect(() => {
        getAllBannerList()
    }, [])

    // ================= action of the table ===============
    const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
        <BannerForm button='edit' title='Edit Home Banner' data={row} />
        <button onClick={() => deleteData(row.id)} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
    </div>

    const imageBodyTemp = (row) => <div className='w-52 h-24 rounded'>
        <img src={row?.image} alt="image" className='w-full h-full object-cover rounded' />
    </div>

    // ================= columns of the table ===============
    const columns = [
        { field: 'image', header: 'Image', body: imageBodyTemp },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
    ];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();



    return (
        <>
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="">
                                    <input
                                        type="text"
                                        placeholder='Search'
                                        autoComplete='off'
                                        className={`${inputClass} !bg-slate-100`}
                                        {...register('name')}
                                    />
                                </div>
                    
                    <BannerForm title='Add New Banner' />
                </div>
                {homeBanners?.length > 0 && <Table data={homeBanners} columns={columns} />}
            </div>
        </>
    )
}

export default Banner