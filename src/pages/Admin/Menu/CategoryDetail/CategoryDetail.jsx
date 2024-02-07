import React, { useEffect, useState } from "react";
import CoverPic from "../../../../assets/RestaurantImages/CoverPic.jpg";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { inputClass, labelClass } from "../../../../utils/CustomClass";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Star1 } from "iconsax-react";
import { MultiSelect } from "primereact/multiselect";
import { getSubCategorybyCatId, getProductsbySubCat } from "../../../../api";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryDetail() {
  const { id } = useParams();

  const [Subcategories, setSubcategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const Subcategory = useSelector((state) => state?.master?.SubCategory);
  // console.log('Subcategories = ', Subcategories)

  //   const subcategories = [];

  const fetchProducts = async (subcatId) => {
    try {
      getProductsbySubCat(subcatId).then((res) => {
        // dispatch(setCategory(res))
        // subcategories.push(res);
        setProducts(res);
        console.log("products data  == ", res);
      });
    } catch (error) {
      console.log(error);
    }
    // Make an API call to get Products based on subcatId
    // For example:
    // const response = await fetch(`/api/products?subcatId=${subcatId}`);
    // const data = await response.json();
    // setProducts(data);
    // setSelectedSubcategoryId(subcatId);
    // setActiveTab(subcatId);
    // setActiveTab(Subcategories[0].subcat_id);
  };

  const fetchData = async () => {
    try {
      getSubCategorybyCatId(id).then((res) => {
        // dispatch(setCategory(res))
        // subcategories.push(res);
        setSubcategories(res);
        console.log("Subcategories = ", res);
        setActiveTab(res[0]?.subcat_id);
        // fetchProducts()
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const closeBtn = () => {
    toggle();
    reset();
  };
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <div className="relative">
        <button
          className="absolute flex mt-4 text-white border-2 rounded-full left-3"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-white" /> Back
        </button>
        <img src={CoverPic} className="w-full h-60" alt="cover-pic" />
      </div>
      {Subcategories.length == 0 && (
        <div className="mx-10 my-10">
          <h1 className="text-2xl">No Data Found</h1>
        </div>
      )}
      {Subcategories.length > 0 && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-10">
            <div>
              <h5>Sub Categories</h5>
              <div className="gap-4 mt-5">
                <ul className="border border-gray-400 rounded-lg">
                  {Subcategories.map((item) => (
                    <li
                      key={item.subcat_id}
                      className={`p-4 border-b flex items-center border-gray-400 cursor-pointer active ${
                        activeTab === item.subcat_id ? "bg-sky-400" : ""
                      }`}
                      onClick={() => {
                        setActiveTab(item.subcat_id);
                        fetchProducts(item.subcat_id);
                      }}
                    >
                      <img
                        src={item.subcat_image}
                        className="w-11 h-11"
                        alt=""
                      />
                      <h3 className="px-3 cursor-pointer hover:underline">
                        {item.subcat_name}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {
              Products.length == 0 && 
              <div className="mx-10 my-10">
                <h1 className="text-2xl">No Products Found</h1>
              </div>
            }

            {Products.length > 0 && (
              <div>
                <h5>Products</h5>
                <div className="gap-4 mt-5">
                  <ul className="border border-gray-400 rounded-lg">
                    {Products.map((product) => (
                      <li
                        key={product.product_id}
                        className="flex items-center p-4 border-b border-gray-400"
                      >
                        <img
                          src={product.main_image}
                          className="w-11 h-11"
                          alt=""
                        />
                        <h3 className="px-3 cursor-pointer hover:underline hover:text-sky-400">
                          {product.product_name}
                        </h3>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
