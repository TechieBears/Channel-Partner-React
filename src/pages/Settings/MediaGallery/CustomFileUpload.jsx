import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { makeRequest } from "@/app/functions/apiCall";
// import { ADMIN_MEDIA_GALLARY, GET } from "@/app/utils/constant";
import { ImageUpload, mediaGalleryLink } from "../../../env";
import { addGalleryImages, getGalleryImages } from "../../../api";
import { toast } from "react-toastify";

const CustomFileUpload = () => {
  const [imageDetails, setImageDetails] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [imgName, setImgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uploadFormRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // =================== fetching data ========================
  const fetchData = () => {
    try {
      getGalleryImages().then((res) => {
        setImageDetails(res);
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleReset = () => {
    setImgName("");
    setSelectedFile(null);
    if (uploadFormRef.current) {
      uploadFormRef.current.reset();
    }
  };

  const onSubmit = async (data) => {
    if (data?.media_url.length != 0) {
      await ImageUpload(
        data?.media_url[0],
        "mediagallery",
        "mediagallery",
        data?.media_name
      );
      data.media_url = `${mediaGalleryLink}${data?.media_name}_mediagallery_${data?.media_url[0]?.name}`;
    } else {
      data.media_url = props?.row?.media_url;
    }
    addGalleryImages(data).then((res) => {
      if (res?.message == "media added successfully") {
        fetchData();
        toast.success(res?.message);
        reset();
      } else {
        toast.error("Error while creating product");
      }
    });
  };

  return (
    <>
      <div className="w-full p-5 my-3 bg-white shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} id="uploadForm">
          <div className="relative flex items-center gap-2">
            <input
              className={`h-9 w-full text-sm rounded-xs ring-1 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
              type="file"
              placeholder="Select Image"
              multiple={true}
              onChange={handleFileChange}
              {...register("media_url")}
            />
            <input
              className={`h-9 w-full text-sm rounded-xs ring-1 px-2 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
              type="text"
              placeholder="Enter Image Name"
              // value={imgName}
              // onChange={(e) => setImgName(e.target.value)}
              {...register("media_name")}
            />

            {isLoading ? (
              <LoadingButton
                className="w-full text-center text-white bg-teal-500"
                name="Uploading"
              ></LoadingButton>
            ) : (
              <button
                type="submit"
                name="Upload"
                className={`bg-teal-500 text-white tennis-primary-font-bold p-2 px-10 rounded-lg`}
              >
                Upload
              </button>
            )}
          </div>
        </form>

        <div className="mt-5">
          <ul className="grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1">
            {imageDetails.length > 0 &&
              imageDetails?.map((data, index) => (
                <li
                  key={index}
                  className="text-center bg-gray-100 rounded-sm shadow-lg"
                >
                  <img
                    src={data?.media_url}
                    alt={data?.media_name}
                    className="object-cover h-40 min-w-full bg-slate-100"
                  />
                  <div className="py-2 text-xs font-semibold">
                    {data?.media_name}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomFileUpload;
