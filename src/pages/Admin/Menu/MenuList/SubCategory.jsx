import React, {useEffect} from 'react'
import { Trash } from 'iconsax-react';
import SubCategoryForm from '../../../../components/Modals/MenuModals/SubCategoryForm';
import Table from '../../../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { setSubCategory } from '../../../../redux/Slices/masterSlice';
import { delMovableCategory, getSubCategory } from '../../../../api';

const SubCategory = () => {   
  const subcategory = useSelector((state) => state?.master?.SubCategory)
  const dispatch = useDispatch()

  // ============== fetch data from api ================
  const fetchData = () => {
      try {
          getSubCategory().then((res) => {
              dispatch(setSubCategory(res))
          })
      } catch (error) {
          console.log(error)
      }
  }

  // ============== delete data from api ================
  const deleteData = (data) => {
      delMovableCategory(data).then((res) => {
          if (res?.message === 'Data deleted successfully') {
              fetchData();
              toast.success(res?.message);
          }
      })
  }
  useEffect(() => {
      fetchData()
  }, [])

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
      <SubCategoryForm button='edit' title='Edit Movable SubCategory' data={row} />
      <button onClick={() => deleteData(row.id)} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
  </div>

  const imageBodyTemp = (row) => <div className='w-20 h-20'>
      <img src={row?.subcat_image} alt="image" className='object-cover w-full h-full' />
  </div>

  // ================= columns of the table ===============
  const columns = [
      { field: 'subcat_image', header: 'Image', body: imageBodyTemp, style: true },
      { field: 'subcat_name', header: 'Name' },
      { field: 'subcat_id', header: 'Action', body: actionBodyTemplate, sortable: true },
  ];

  return (
      <>
          <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 " >
              <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                  <div className="">
                      <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>SubCategory List</h1>
                  </div>
                  <SubCategoryForm title='Add SubCategory' />
              </div>
              {subcategory?.length > 0 && <Table data={subcategory} columns={columns} />}
          </div>
      </>
  )
}

export default SubCategory