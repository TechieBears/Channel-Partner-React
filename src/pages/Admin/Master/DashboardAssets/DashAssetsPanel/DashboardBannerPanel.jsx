import { useEffect, useState } from 'react';
import { Trash } from 'iconsax-react';
import Table from '../../../../../components/Table/Table';
import { delHomeBanners, getHomeBanners } from '../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setBanner } from '../../../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import BannerForm from '../../../../../components/Modals/MasterModals/AssetsModals/BannerForm';


const DashboardBannerPanel = () => {
    const homeBanners = useSelector((state) => state?.master?.banner)
    // const dispatch = useDispatch()
    const [bannerList, setBannerList] = useState([]);

    // ============== fetch data from api ================
    const getAllBannerList = () => {
        try {
            getHomeBanners().then((res) => {
                console.log(res.data)
                setBannerList(res.data);
                // dispatch(setBanner(res))
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getAllBannerList()
    }, []);

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
        <img src={row?.slide_url} alt="image" className='w-full h-full object-cover rounded' />
    </div>

    // ================= columns of the table ===============
    const columns = [
        { field: 'image', header: 'Image', body: imageBodyTemp },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
    ];

    return (
        <>
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="">
                        <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Home Banners</h1>
                    </div>
                    <BannerForm title='Add New Banner' />
                </div>
                {bannerList?.length > 0 && <Table data={bannerList} columns={columns} />}
            </div>
        </>
    )
}

export default DashboardBannerPanel