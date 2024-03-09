import { Trash } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { delCategory, getCategory, getRestaurantCategory } from "../../../../api";
import CategoryForm from "../../../../components/Modals/MenuModals/CategoryForm";
import Table from "../../../../components/Table/Table";


const Category = (props) => {
  const [category, setCategory] = useState([])
  // ============== Products API ================
  const productCategories = () => {
    try {
      getCategory().then((res) => {
        setCategory(res)
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ============== Restaurant API ================
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
    delCategory(data).then((res) => {
      if (res?.status === "success") {
        productCategories();
        toast.success(res?.message);
      }
    });
  };


  useEffect(() => {
    if (!props?.isrestaurant) {
      productCategories();
    }
    if (props?.isrestaurant) {
      restaurantCategories();
    }
  }, [props.isrestaurant]);

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <CategoryForm button="edit" title="Edit Category" data={row} isrestaurant={props?.isrestaurant} productCategories={productCategories} restaurantCategories={restaurantCategories} />
      <button
        onClick={() => deleteData(row.id)}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

  const imageBodyTemp = (row) => (
    <div className="w-20 h-20">
      <img
        src={row?.category_image}
        alt="image"
        className="object-cover w-full h-full"
      />
    </div>
  );

  // ================= columns of the table ===============

  const ProductColumns = [
    { field: "category_image", header: "Image", body: imageBodyTemp, style: true },
    { field: "category_name", header: "Name", body: (row) => (<h6 className="">{row?.category_name}</h6>) },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
  ];

  const RestaurantColumns = [
    { field: "category_image", header: "Image", body: imageBodyTemp, style: true },
    { field: "category_name", header: "Name", body: (row) => (<h6 className="">{row?.category_name}</h6>) },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
  ];

  return (
    <>
      <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 ">
        <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="">
            <h1 className="text-xl font-semibold text-gray-900 font-tbPop ">
              Category List
            </h1>
          </div>
          <CategoryForm title="Add Category" isrestaurant={props?.isrestaurant} productCategories={productCategories} restaurantCategories={restaurantCategories} />
        </div>
        <Table data={category} columns={props?.isrestaurant ? RestaurantColumns : ProductColumns} />
      </div>
    </>
  );
};

export default Category;
