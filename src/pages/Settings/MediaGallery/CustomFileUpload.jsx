import React, { useState, useRef , useEffect} from "react";
import { useForm } from "react-hook-form";
import MediaGallaryModal from "../MediaGallery/MediaGallery";
import { Database } from "@phosphor-icons/react";
// import { makeRequest } from "@/app/functions/apiCall";
// import { ADMIN_MEDIA_GALLARY, GET } from "@/app/utils/constant";
import { ImageUpload, productLink } from '../../../env';
import { addGalleryImages } from '../../../api';

const CustomFileUpload = () => {
    const [imageDetails, setImageDetails] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgName, setImgName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const uploadFormRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const response = await makeRequest(GET, ADMIN_MEDIA_GALLARY);
            //     setImageDetails(response.data)
            //     console.log(response.data)
            // } catch (error) {
            //     console.error('Error fetching data:', error);
            // }
        };
        fetchData();
    }, []);

    // AWS.config.update({
    //     accessKeyId: ACCESS_KEY_ID_AWS,
    //     secretAccessKey: SECRET_ACCESS_KEY_AWS,
    //     region: REGION,
    // });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleReset = () => {
        setImgName('');
        setSelectedFile(null);
        if (uploadFormRef.current) {
          uploadFormRef.current.reset();
        }
      };

    const handleUpload = async (data) => {
        // data?.media_url = selectedFile
        console.log('data = ', data)

        if (data?.media_url.length != 0) {
            await ImageUpload(data?.media_url[0], "mediagallery", "mediagallery", data?.media_name)
            data.media_url = `${mediaGallery}${data?.media_name}_mediagallery_${data?.media_url[0]?.name}`
        } else {
            data.media_url = props?.row?.media_url
        }
        if (props?.title != 'Edit Product') {
            addGalleryImages(data).then((res) => {
                if (res?.status == 'success') {
                    props?.getProducts()
                    toast.success('Product Added Successfully')
                    toggle();
                    props?.getProducts()
                } else {
                    toast.error('Error while creating product')
                }
            })
        } else {
            var updatedData = { ...data, vendor: LoggedUserDetails?.sellerId, final_price: FinalPriceSeller }
            console.log(updatedData)
            addProduct(updatedData).then((res) => {
                if (res?.status == 'success') {
                    props?.getProducts()
                    toast.success('Product Added Successfully')
                    toggle();
                    props?.getProducts()
                } else {
                    toast.error('Error while creating product')
                }
            })
        }
       
//         setIsLoading(true)
//         const timestamp = new Date().getTime();
//         const fileExtension = selectedFile.name.split('.').pop();
//         const newFileName = ${timestamp}.${fileExtension};
//         if (!selectedFile) {
//             console.error('No file selected');
//             return;
//         }
//         const s3 = new AWS.S3();
//         const params = {
//             ACL: "public-read",
//             Bucket: 'schooltennis',
//             Key: newFileName,
//             Body: selectedFile,
//         };
//         s3.upload(params, async (err, data) => {
//             if (err) {
//                 console.error('Error uploading file:', err);
//             } else {
//                 console.log('File uploaded successfully:', data);
//                 setIsLoading(false)
//                 handleReset();
//                 let postdata = {
//                     media_url: data.Location,
//                     media_name: imgName
//                 }
//                 const response = await makeRequest(POST, ADMIN_MEDIA_GALLARY, postdata)
//                 console.log(response);
//                 setImageDetails(prevDetails => [...prevDetails, response.data]);
//             }
//         });
    };

  return (
    <>
      <div className="bg-white shadow-lg w-full p-5 my-3">
        <form id="uploadForm">
          <div className="relative gap-2 flex items-center">
            <input
              className={`h-9 w-full text-sm rounded-xs ring-1 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
              type="file"
              placeholder="Select Image"
              multiple={true}
              onChange={handleFileChange}
            />
            <input
              className={`h-9 w-full text-sm rounded-xs ring-1 px-2 leading-6 file:bg-green-50 file:text-teal-500 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 focus:outline-none hover:text-teal-500 border border-gray-300`}
              type="text"
              placeholder="Enter Image Name"
              value={imgName}
              onChange={(e) => setImgName(e.target.value)}
            />

            {isLoading ? (
              <LoadingButton
                className="text-center w-full bg-teal-500 text-white"
                name="Uploading"
              ></LoadingButton>
            ) : (
              <button
                name="Upload"
                className={`bg-teal-500 text-white tennis-primary-font-bold`}
                onClick={handleUpload}
                // disabled={
                //   selectedFile === null || !imgName || imgName.trim() === ""
                // }
              >Upload</button>
            )}
          </div>
        </form>
        <div className="mt-5">
          <ul className="grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1">
            {imageDetails.length > 0 &&
              imageDetails?.map((data, index) => (
                <li
                  key={index}
                  className="shadow-lg text-center bg-gray-100 rounded-sm"
                >
                  <Image
                    src={data?.media_url}
                    alt={data?.media_name}
                    className="min-w-full h-40 object-cover"
                  />
                  <div className="text-xs font-semibold py-2">
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
