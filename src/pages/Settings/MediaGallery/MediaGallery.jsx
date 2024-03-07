import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import Button from '../buttons/Button';
import { formBtn1, formBtn2, tableBtn } from "../../../utils/CustomClass";
import { useForm } from "react-hook-form";


const MediaGallaryModal = ({sendDataToParent, ...props}) => {
  // console.log("props = ", props);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageDetails, setImageDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  // console.log('selectedImage', selectedImage)
  // console.log('isOpen', isOpen)

  const { reset, formState: { errors }} = useForm();

  useEffect(() => {
    setImageDetails(props?.mediaModal?.mediaModalData);
  }, [props?.mediaModal]);

  // const handleImageClick = (data) => {
  //   setSelectedImage(data);
  // };

  const handleImageClick = (data) => {
    // Check if the image is already selected
    const index = selectedImage?.findIndex((image) => image.media_url === data.media_url);

    // If the image is already selected, remove it from the array
    if (index !== -1) {
      const newSelectedImages = [...selectedImage];
      newSelectedImages.splice(index, 1);
      setSelectedImage(newSelectedImages);
    } else {
      // If the image is not selected, add it to the array
      if (selectedImage.length < 5) {
        setSelectedImage([...selectedImage, data]);
      }
    }
  };

  const handleContinue = () => {
    props.onSelectImage(selectedImage);
    props.onClose();
  };

  const uploadImg = () => {
    setSelectedImage(selectedImage?.media_url)
    sendDataToParent(selectedImage?.media_url)
    toggle();
  }

  // ===================== close modals ===============================
  const closeBtn = () => {
    reset();
    toggle();
    props?.setopenGalleryModal();
  };

  return (
    <>
      {props.button !== "edit" ? (
        <button onClick={toggle} className={tableBtn}>
          {props?.title}
        </button>
      ) : (
        <button
          onClick={toggle}
          className="bg-yellow-100 px-1.5 py-2 rounded-sm"
        >
          <Edit size="20" className="text-yellow-500" />
        </button>
      )}
      <Transition appear show={!isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => toggle}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto scrollbars">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                    Media Gallery
                  </Dialog.Title>
                  <div className="modal-body tennis-secondary-font bg-gray-200 min-h-[calc(100vh-12rem)] px-6 py-4 sidebar-scroll scroll-smooth focus:scroll-auto overflow-y-auto">
                    <ul className="grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1">
                      {props?.imageDetails?.length > 0 &&
                        props?.imageDetails?.map((data, index) => (
                          // <li
                          //   key={index}
                          //   className={`shadow-lg cursor-pointer text-center bg-gray-50 rounded-sm ${
                          //     selectedImage === data
                          //       ? "border-2 border-yellow-500 p-2"
                          //       : ""
                          //   }`}
                          //   onClick={() => handleImageClick(data)}
                          // >
                             <li
                                key={index}
                                className={`shadow-lg cursor-pointer text-center bg-gray-50 rounded-sm ${
                                  selectedImage?.find((image) => image.media_url === data.media_url)
                                    ? "border-2 border-yellow-500 p-2"
                                    : ""
                                }`}
                                onClick={() => handleImageClick(data)}
                              >
                            <img
                              src={data.media_url}
                              alt={data.media_name}
                              className="object-cover h-40 min-w-full"
                            />
                            <div className="py-2 text-xs font-semibold">
                              {data.media_name}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="gap-3 p-3 bg-white modal-foote sm:flex sm:flex-row-reverse">
                    <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                      {loader ? (
                        <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                      ) : (
                        <button type="submit" className={formBtn1} onClick={uploadImg}>
                          submit
                        </button>
                      )}
                      <button
                        type="button"
                        className={formBtn2}
                        onClick={closeBtn}
                      >
                        close
                      </button>
                    </footer>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MediaGallaryModal;
