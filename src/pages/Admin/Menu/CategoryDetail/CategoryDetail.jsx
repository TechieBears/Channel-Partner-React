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

export default function CategoryDetail() {
  const { id } = useParams();
  const [Subcategories, setSubcategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  //   const subcategories = [];

  const fetchProducts = async (subcatId) => {
    try {
      getProductsbySubCat(subcatId).then((res) => {
        // dispatch(setCategory(res))
        // subcategories.push(res);
        setProducts(res);
        console.log("Subcategories == ", Subcategories);
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
  };

  const fetchData = () => {
    try {
      getSubCategorybyCatId(id).then((res) => {
        // dispatch(setCategory(res))
        // subcategories.push(res);
        setSubcategories(res);
        console.log("Subcategories == ", Subcategories);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Category ID:", id);
    fetchData();
  }, [id]);

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
      {!Subcategories && <h1>No data Found</h1>}
      {Subcategories.length > 0 && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-10">
            <div>
              <h5>Sub Categories</h5>
              <div className="gap-4 mt-5">
                <ul className="border border-gray-400">
                  {Subcategories.map((item) => (
                    <li
                      key={item.subcat_id}
                      className="p-4 border-b border-gray-400"
                      onClick={() => fetchProducts(item.subcat_id)}
                    >
                      <h3 className="cursor-pointer hover:underline hover:text-sky-400">
                        {item.subcat_name}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h5>Products</h5>
              <div className="gap-4 mt-5">
                <ul className="border border-gray-400">
                  {Products.map((product) => (
                    <li
                      key={product.product_id}
                      className="p-4 border-b border-gray-400"
                    >
                      <h3 className="cursor-pointer hover:underline hover:text-sky-400">
                        {product.product_name}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
