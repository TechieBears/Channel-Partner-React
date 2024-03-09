import React, { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import SubCategoryForm from "../../../../components/Modals/MenuModals/SubCategoryForm";
import Table from "../../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory, setCategory } from "../../../../redux/Slices/masterSlice";
import { deleteSubCategory, getSubCategory, getCategory, getRestaurantCategory, getRestaurantSubCategory } from "../../../../api";
import Switch from 'react-js-switch';


const SubCategory = (props) => {
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const dispatch = useDispatch();
  // ============== Products API starts================
  const fetchData = () => {
    try {
      getSubCategory().then((res) => {
        setSubcategory(res)
        fetchData2();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData2 = () => {
    try {
      getCategory().then((res) => {
        setCategory(res)
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ============== Products API starts================
  const restaurantSubCategories = () => {
    try {
      getRestaurantSubCategory().then((res) => {
        setSubcategory(res)
        restaurantCategories();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const restaurantCategories = () => {
    try {
      getRestaurantCategory().then((res) => {
        setCategory(res)
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

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <SubCategoryForm button="edit" title="Edit SubCategory" data={row} isrestaurant={props?.isrestaurant} fetchData={fetchData} restaurantSubCategories={restaurantSubCategories} />
      <button
        onClick={() => deleteData(row.subcat_id)}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

  // =================== table user profile column ========================
  const representativeBodyTemplate = (row) => {
    return (
      <div className="rounded-full w-14 h-14">
        <img src={row?.subcat_image} className="object-cover w-full h-full rounded-full" alt={row?.subcat_name} />
      </div>
    );
  };

  // ======================= Table Column Definitions =========================
  const ProductColumns = [
    { field: 'subcat_image', header: 'Image', body: representativeBodyTemplate, sortable: true, style: true },
    { field: 'subcat_name', header: 'Name', sortable: true },
    {
      field: 'category', header: 'Category',
      body: rowData => {
        if (Array.isArray(category)) {
          const matchingCategory = category.find(cat => cat?.id == rowData?.category);
          return matchingCategory ? matchingCategory?.category_name : '';
        } else {
          return 'Category data is not available.';
        }
      }
    },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
  ];

  // ======================= Table Column Definitions =========================
  const RestaurantColumns = [
    { field: 'subcat_image', header: 'Image', body: representativeBodyTemplate, sortable: true, style: true },
    { field: 'subcat_name', header: 'Name', sortable: true },
    {
      field: 'category', header: 'Category',
      body: rowData => {
        if (Array.isArray(category)) {
          const matchingCategory = category.find(cat => cat?.id == rowData?.category);
          return matchingCategory ? matchingCategory?.category_name : '';
        } else {
          return 'Category data is not available.';
        }
      }
    },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
  ];


  useEffect(() => {
    if (!props?.isrestaurant) {
      fetchData();
    }
    if (props?.isrestaurant) {
      restaurantSubCategories();
    }
  }, [props.isrestaurant]);

  return (
    <>
      <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 ">
        <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="">
            <h1 className="text-xl font-semibold text-gray-900 font-tbPop">
              SubCategory List
            </h1>
          </div>
          <SubCategoryForm title="Add SubCategory" isrestaurant={props?.isrestaurant} fetchData={fetchData} restaurantSubCategories={restaurantSubCategories} category={category} />
        </div>
        <Table data={subcategory} columns={props?.isrestaurant ? RestaurantColumns : ProductColumns} />
      </div>
    </>
  );
};

export default SubCategory;
