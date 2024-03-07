import { useEffect, useState } from 'react';
import { Trash } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import { addHomePromotion, delHomePromotion, editHomePromotion } from '../../../api';
import { setPromotions } from '../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import Switch from 'react-js-switch';
import AddPromo from './Assests/AddPromo';
import { useDispatch, useSelector } from 'react-redux';



const Promotions = () => {
    const promotions = useSelector((state) => state?.master?.promotion)
    // const dispatch = useDispatch()
    const [promotionList, setpromotionList] = useState([]);
    const dispatch = useDispatch()

    // ============== fetch data from api ================
    const getAllPromotionList = () => {
        try {
            addHomePromotion().then((res) => {
                console.log(res.data)
                setpromotionList(res.data);
                dispatch(setPromotions(res))
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getAllPromotionList()
    }, []);

    // ============== delete data from api ================
    const deleteData = (data) => {
        delHomePromotion(data).then((res) => {
            if (res?.message == 'deleted successfully') {
                getAllPromotionList();
                toast.success(res?.message);
            }
        })
    }

    // ================= action of the table ===============
    const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
        <AddPromo button='edit' title='Edit Promotions' data={row} getAllPromotionList={getAllPromotionList} />
        <button onClick={() => deleteData(row.slide_id)} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
    </div>

    const imageBodyTemp = (row) => <div className='w-52 h-24 rounded bg-slate-100'>
        <img src={row?.slide_url} alt="image" className='w-full bg-slate-100 h-full object-cover rounded' />
    </div>

    // ------ Active/ Deactive banners -----   
    const verifyActions = (row) => {
        const payload = { slide_isactive: !row?.slide_isactive, slide_url: row?.slide_url }
        try {
            editHomePromotion(row?.slide_id, payload).then((form) => {
                console.log(payload)
                if (form.message == "slide edited successfully") {
                    toast.success('Promotion Activation Changed !');
                    getAllPromotionList()
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

    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.slide_isactive}
                    onChange={() => verifyActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }



    // ================= columns of the table ===============
    const columns = [
        { field: 'image', header: 'Image', body: imageBodyTemp },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isactive', header: 'Active', body: switchActive, sortable: true },
    ];

    return (
        <>
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="">
                        <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Promotions</h1>
                    </div>
                    <AddPromo title='Add New Promotion' getAllPromotionList={getAllPromotionList}/>
                </div>
                {promotionList?.length > 0 && <Table data={promotionList} columns={columns} />}
            </div>
        </>
    )
}

export default Promotions