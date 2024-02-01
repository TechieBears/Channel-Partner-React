import React, { useEffect, useState } from "react";
import CoverPic from "../../../../assets/RestaurantImages/CoverPic.jpg";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { inputClass, labelClass } from "../../../../utils/CustomClass";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Star1 } from "iconsax-react";
import { MultiSelect } from "primereact/multiselect";
import { getSubCategory, getProduct } from '../../../../api';


export default function CategoryDetail() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const categories = [
    "Asian",
    "Mexican",
    "Italian",
    "Russian cussion",
    "Spanish",
    "Comfort",
    "American",
    "North Indian",
    "South Indian",
  ];

  const fetchData = () => {
    try {
        getCategory().then((res) => {
            dispatch(setCategory(res))
            data.push(res)
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    console.log("Category ID:", id);
    fetchData()
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
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className={labelClass}>Sub Categories</label>
            <select
              className={`${inputClass}`}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Asian">Asian</option>
              <option value="Mexican">Mexican</option>
              <option value="Italian">Italian</option>
              <option value="Russian Cuisine">Russian Cuisine</option>
              <option value="Sushi">Sushi</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              {selectedCategory != "" ? selectedCategory : "Sub-category"}
            </label>
            <MultiSelect
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              options={categories}
              placeholder="Select Category"
              maxSelectedLabels={3}
              className={`w-full`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
