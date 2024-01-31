import React, {useEffect} from 'react'
import { Trash } from 'iconsax-react';
import ProductForm from '../../../../components/Modals/MenuModals/ProductForm';
import Table from '../../../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../../../redux/Slices/masterSlice';
import { delMovableCategory, getProducts } from '../../../../api';

const Product = () => {
  const product = useSelector((state) => state?.master?.Product)
  const dispatch = useDispatch()

  // ============== fetch data from api ================
  const fetchData = () => {
      try {
          getProducts().then((res) => {
              dispatch(setProduct(res))
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
      <ProductForm button='edit' title='Edit Movable Product' data={row} />
      <button onClick={() => deleteData(row.id)} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
  </div>

  const imageBodyTemp = (row) => <div className='w-20 h-20'>
      <img src={row?.main_image} alt="image" className='object-cover w-full h-full' />
  </div>

  // ================= columns of the table ===============
  const columns = [
      { field: 'main_image', header: 'Image', body: imageBodyTemp, style: true },
      { field: 'product_name', header: 'Name' },
      { field: 'brand', header: 'Brand' },
      { field: 'description', header: 'Description' },
      { field: 'avilable_qty', header: 'Available Qty' },
      { field: 'discounted_price', header: 'Discounted Price (₹)' },
      { field: 'actual_price', header: 'Actual Price (₹)' },
      { field: 'offers', header: 'offer (%)' },
      { field: 'subcat_id', header: 'Action', body: actionBodyTemplate, sortable: true },
  ];

  return (
      <>
          <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 " >
              <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                  <div className="">
                      <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Product List</h1>
                  </div>
                  <ProductForm title='Add Product' />
              </div>
              {product.length > 0 && <Table data={product} columns={columns} />}
          </div>
      </>
  )
}

export default Product