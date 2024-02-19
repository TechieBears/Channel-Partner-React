import React, { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import SubCategoryForm from "../../../../components/Modals/MenuModals/SubCategoryForm";
import Table from "../../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory, setCategory } from "../../../../redux/Slices/masterSlice";
import { deleteSubCategory, getSubCategory, getCategory } from "../../../../api";
import Switch from 'react-js-switch';


const SubCategory = () => {
  const subcategory = useSelector((state) => state?.master?.SubCategory);
  const category = useSelector((state) => state?.master?.Category);
  console.log('category = ', category)


  const dispatch = useDispatch();

  // ============== fetch data from api ================

  const fetchData = () => {
    try {
      getSubCategory().then((res) => {
        dispatch(setSubCategory(res));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData2 = () => {
    try {
      getCategory().then((res) => {
        dispatch(setCategory(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  // ============== delete data from api ================
  const deleteData = (data) => {
    deleteSubCategory(data).then((res) => {
      if (res?.message === "Data deleted successfully") {
        toast.success(res?.message);
      }
    });
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <SubCategoryForm button="edit" title="Edit SubCategory" data={row} />
      <button
        onClick={() => deleteData(row.subcat_id)}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

  const imageBodyTemp = (row) => (
    <div className="w-20 h-20">
      <img
        src={row?.subcat_image}
        alt="image"
        className="object-cover w-full h-full"
      />
    </div>
  );

  const verifyActions = (row) => {
    const payload = { userId: row?.user?.id, isverifiedbyadmin: row?.user?.isverified_byadmin, isverifiedbyfranchise: !row?.isverifiedbyfranchise }
    // try {
    //     verifyDeliveryBoy(payload).then((form) => {
    //         console.log(payload)
    //         if (form.message == "delivery boy verified successfully") {
    //             toast.success('Driver Verification Changed !');
    //             DeliveryBoyDetails()
    //         }
    //         else {
    //             console.log("err");
    //         }
    //     })
    // }
    // catch (err) {
    //     console.log(err);
    // }
}


// =============================== verify user switch =============================
const switchVerify = (row) => {
    return (
        <div className="flex items-center justify-center gap-2 ">
            <Switch
                value={row?.isverifiedbyfranchise}
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
        <div className="flex items-center justify-center gap-2">
            <Switch
                value={row?.user?.isverified_byadmin}
                disabled={true}
                // onChange={() => activeActions(row)}
                size={50}
                backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
        </div>
    )
}

    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
      return (
          <div className="rounded-full w-14 h-14">
              <img src={row?.subcat_image} className="object-cover w-full h-full rounded-full" alt={row?.subcat_name} />
          </div>
      );
  };


  // ================= columns of the table ===============
       // ======================= Table Column Definitions =========================
       const columns = [
        { field: 'subcat_image', header: 'Image', body: representativeBodyTemplate, sortable: true, style: true },
        { field: 'subcat_name', header: 'Name', sortable: true },
        { field: 'category', header: 'Category',  body: rowData => {
          const matchingCategory = category.find(category => category.id === rowData.category);
          return matchingCategory ? matchingCategory.category_name : '';
        }},
        { field: 'isactive', header: 'Active', body: switchActive, sortable: true },
        { field: 'isverify', header: 'Verify', body: switchVerify, sortable: true },
    ];


  return (
    <>
      <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 ">
        <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="">
            <h1 className="text-xl font-semibold text-gray-900 font-tbPop ">
              SubCategory List
            </h1>
          </div>
          <SubCategoryForm title="Add SubCategory" />
        </div>
        {subcategory?.length > 0 && (
          <Table data={subcategory} columns={columns} />
        )}
      </div>
    </>
  );
};

export default SubCategory;
