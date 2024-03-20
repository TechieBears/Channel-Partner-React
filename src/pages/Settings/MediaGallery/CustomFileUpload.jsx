import React, { useState, useRef, useEffect } from "react";
import { Trash } from 'iconsax-react';
import { useForm } from "react-hook-form";
import { ImageUpload, mediaGalleryLink } from "../../../env";
import { addGalleryImages, getGalleryImages, deleteMediagallery, editMediagallery } from "../../../api";
import { toast } from "react-toastify";
import { Edit } from 'iconsax-react';
import LoadBox from "../../../components/Loader/LoadBox";
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import DeleteModal from "../../../components/Modals/DeleteModal/DeleteModal";


const CustomFileUpload = () => {
  const [imageDetails, setImageDetails] = useState([]);
  const [loader, setLoader] = useState(false)

  // const [selectedFile, setSelectedFile] = useState(null);
  const [imgName, setImgName] = useState("");
  const uploadFormRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [EditingData, setEditingData] = useState(null);
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState(0);

  const filteredImages = imageDetails?.filter(data =>
    data.media_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

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
        console.log(res)
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

  const handleClear = () => {
    setEditingData(null);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    if (EditingData) {
      if (data?.media_url?.length > 0 && (data?.media_url != EditingData?.media_url)) {
        await ImageUpload(
          data?.media_url[0],
          "mediagallery",
          "mediagallery",
          data?.media_name
        );
        EditingData.media_url = `${mediaGalleryLink}${data?.media_name}_mediagallery_${data?.media_url[0]?.name}`;
        EditingData.media_name = data?.media_name;
      } else {
        EditingData.media_name = data?.media_name;
        EditingData.media_url = EditingData?.media_url;
      }
      editMediagallery(EditingData?.media_id, EditingData).then(res => {
        if (res?.status == 'success') {
          fetchData();
          toast.success('Gallery Image Edited successfully')
          reset();
          setLoader(false);
          setEditingData(null);
        }
      })
    }
    else {
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
          setLoader(false);
        } else {
          toast.error("Error while creating product");
        }
      });
    }
  };

  const handleEditClick = (data) => {
    setEditingData(data);
    setValue('media_name', data.media_name);
    setValue('media_url', data.media_url);
  };

  const toggleModalBtn = (id) => {
    setOpen(!open)
    setDelId(id)
  }

  const handleDeleteImage = () => {
    deleteMediagallery(delId).then(res => {
      if (res?.status == 'success') {
        toast.success('Gallery Image Deleted successfully')
        reset();
        fetchData();
        setOpen(!open)
      }
    })
  };

  return (
    <>
      <DeleteModal
        title='Delete Image'
        deleteBtn={handleDeleteImage}
        toggleModalBtn={toggleModalBtn}
        description="Are you sure you want to delete this Image" open={open}
      />
      <div className="w-full p-5 my-3 bg-white shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} id="uploadForm">
          <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3">
            <div className="col-span-1">
              <input
                className={`h-9 w-full text-sm rounded-xs ring-1 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
                type="file"
                placeholder="Select Image"
                onChange={handleFileChange}
                {...register("media_url")}
              />
              {EditingData && EditingData?.media_url != '' && EditingData?.media_url != undefined &&
                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb truncate'>
                  {EditingData?.media_url?.split('/').pop()}
                </label>}
            </div>
            <div className="col-span-1">
              <input
                className={`h-9 w-full text-sm rounded-xs ring-1 px-2 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
                type="text"
                placeholder="Enter Image Name"
                // value={imgName}
                // onChange={(e) => onChangeMediaName(e)}
                {...register("media_name")}
              />
            </div>
            <div className="col-span-1">
              <div className="flex">
                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                <button
                  type="button"
                  className={`${formBtn2} mx-2`}
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Search by Image Name..."
                value={searchQuery}
                className={`${inputClass} !bg-slate-100`}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </form>

        <div className="mt-5">
          <ul className="grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1">
            {filteredImages.length > 0 ? (
              filteredImages?.map((data, index) => (
                <li
                  key={index}
                  className="text-center bg-gray-100 rounded-sm shadow-lg"
                >
                  <img
                    src={data?.media_url}
                    alt={data?.media_name}
                    className="object-cover h-40 min-w-full bg-slate-100"
                  />
                  <div className="flex items-center py-3 justify-evenly">
                    <div className="py-2 text-xs font-semibold">
                      {data?.media_name}
                    </div>
                    <button className='items-center p-1 bg-yellow-100 rounded-xl hover:bg-yellow-200'
                      onClick={() => handleEditClick(data)}>
                      <Edit size={21} className='text-yellow-600' />
                    </button>
                    <Trash onClick={() => toggleModalBtn(data?.media_id)} size={21} className='text-red-400 cursor-pointer' />
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center bg-gray-100 rounded-sm shadow-lg">
                No data found
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomFileUpload;
