import React, { useEffect } from "react";
import { Trash } from "iconsax-react";
import CategoryForm from "../../../../components/Modals/MenuModals/CategoryForm";
import Table from "../../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../../redux/Slices/masterSlice";
import { delCategory, getCategory } from "../../../../api";
import { NavLink } from "react-router-dom";

const Category = () => {
  const category = useSelector((state) => state?.master?.Category);
  // console.log('category = ', category)
  const dispatch = useDispatch();

  // ============== fetch data from api ================
  const fetchData = () => {
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
    delCategory(data).then((res) => {
      if (res?.message === "Data deleted successfully") {
        fetchData();
        toast.success(res?.message);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <CategoryForm button="edit" title="Edit Category" data={row} />
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
  const columns = [
    {
      field: "category_image",
      header: "Image",
      body: imageBodyTemp,
      style: true,
    },
    {
      field: "category_name",
      header: "Name",
      body: (row) => (
        <NavLink to={`/menu/category-detail/${row?.id}`}>
          <h6 className="hover:underline hover:text-sky-400">
            {row?.category_name}
          </h6>{" "}
        </NavLink>
      ),
    },
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
          <CategoryForm title="Add Category" />
        </div>
        {category?.length > 0 && <Table data={category} columns={columns} />}
      </div>
    </>
  );
};

export default Category;
