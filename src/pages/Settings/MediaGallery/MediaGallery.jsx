import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
// import Button from '../buttons/Button';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn} from "../../../utils/CustomClass";
import { CloseCircle } from "iconsax-react";
import { getGalleryImages } from "../../../api";

const MediaGallaryModal = (props) => {
  console.log("props = ", props);
  const [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [imageDetails, setImageDetails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {
    setImageDetails(props?.mediaModal?.mediaModalData);
  }, [props?.mediaModal]);

  const handleImageClick = (data) => {
    setSelectedImage(data);
  };

  const handleContinue = () => {
    props.onSelectImage(selectedImage);
    props.onClose();
  };

    // ===================== close modals ===============================
        const closeBtn = () => {
        toggle();
        setLoader(false);
    }

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
      <Transition appear show={isOpen} as={Fragment} >
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
                  {/* <div
                    id="default-modal"
                    data-modal-show="true"
                    aria-hidden="true"
                    className="show overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                      <div className="flex min-h-min items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                          className={`relative transform overflow-hidden bg-gray-50 text-left shadow-xl transition-all w-full h-screen scale-0 ${
                            props?.showModal ? "scale-100" : ""
                          }`}
                        > */}
                          {/* <div className="modal-header p-3 bg-yellow-500 text-gray-900">
                            <div className="flex justify-between">
                              <h5 className="text-white text-xl uppercase tennis-primary-font-bold">
                                Media Gallery
                              </h5>
                              <CloseCircle size="30" color="#fff" className='cursor-pointer' name="Close" onClick={props.onClose} />
                            </div>
                          </div> */}
                          <div className="modal-body tennis-secondary-font bg-gray-200 min-h-[calc(100vh-12rem)] px-6 py-4 sidebar-scroll scroll-smooth focus:scroll-auto overflow-y-auto">
                            <ul className="grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1">
                              {props?.imageDetails?.length > 0 &&
                                props?.imageDetails?.map((data, index) => (
                                  <li
                                    key={index}
                                    className={`shadow-lg cursor-pointer text-center bg-gray-50 rounded-sm ${
                                      selectedImage === data
                                        ? "border-2 border-yellow-500 p-2"
                                        : ""
                                    }`}
                                    onClick={() => handleImageClick(data)}
                                  >
                                    <img
                                      src={data.media_url}
                                      alt={data.media_name}
                                      className="min-w-full h-40 object-cover"
                                    />
                                    <div className="text-xs font-semibold py-2">
                                      {data.media_name}
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="modal-foote bg-white p-3 sm:flex sm:flex-row-reverse gap-3">
                            {/* <button
                              type="button"
                              name="Continue"
                              onClick={handleContinue}
                              className={formBtn1}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              name="Continue"
                              onClick={handleContinue}
                              className={formBtn1}
                            >
                              Edit
                            </button> */}

                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>submit</button>}
                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                            </footer>

                            {/* <Button
                                type="button"
                                name="Continue"
                                onClick={handleContinue}
                                className="inline-flex w-full justify-center rounded-xs bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-teal-300 sm:w-auto"
                            ></Button>
                            <Button
                                type="button"
                                name="Cancel"
                                onClick={props.onClose}
                                className="inline-flex w-full justify-center rounded-xs bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  sm:w-auto"
                            ></Button> */}
                          {/* </div>
                        </div>
                      </div> */}
                    {/* </div> */}
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
