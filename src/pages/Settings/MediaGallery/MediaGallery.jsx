import React, { useState, useEffect } from 'react';
// import Button from '../buttons/Button';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
import { CloseCircle } from 'iconsax-react';

const MediaGallaryModal = (props) => {
    console.log('props = ', props)
    const [imageDetails, setImageDetails] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setImageDetails(props?.mediaModal?.mediaModalData)
    }, [props?.mediaModal])

    const handleImageClick = (data) => {
        setSelectedImage(data);
    };

    const handleContinue = () => {
        props.onSelectImage(selectedImage);
        props.onClose();
    };

    return (
        // <div className={`fixed z-50 inset-0 ${props?.mediaModal?.showMediaModal ? 'visible' : 'invisible'} transform transition-transform duration-300`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed z-50 inset-0 transform transition-transform duration-300" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/* <div className={`relative transform overflow-hidden bg-gray-50 text-left shadow-xl transition-all w-full h-screen scale-0 ${props?.mediaModal?.showMediaModal ? 'scale-100' : ''}`}> */}
                    <div className={`relative transform overflow-hidden bg-gray-50 text-left shadow-xl transition-all w-full h-screen scale-0 `}>
                        <div className="modal-header p-3 bg-yellow-500 text-gray-900">
                            <div className='flex justify-between'>
                                <h5 className="text-white text-xl uppercase tennis-primary-font-bold">Media Gallery</h5>
                                <CloseCircle size="30" color="#fff" className='cursor-pointer' name="Close" onClick={props.onClose} />
                            </div>
                        </div>
                        <div className="modal-body tennis-secondary-font bg-white min-h-[calc(100vh-7rem)] px-6 py-4 sidebar-scroll scroll-smooth focus:scroll-auto overflow-y-auto">
                            <ul className='grid lg:grid-cols-6 lg:gap-4 md:grid-cols-4 sm:grid-cols-3 md:gap-3 sm:gap-1'>
                                {/* {imageDetails.length > 0 && imageDetails?.map((data, index) => (
                                    <li key={index} className={`shadow-lg cursor-pointer text-center bg-gray-50 rounded-sm ${selectedImage === data ? 'border-2 border-yellow-500 p-2' : ''}`} onClick={() => handleImageClick(data)}>
                                        <img src={data.media_url} alt={data.media_name} className="min-w-full h-40 object-cover" />
                                        <div className='text-xs font-semibold py-2'>{data.media_name}</div>
                                    </li>
                                ))} */}
                            </ul>
                        </div>
                        <div className="modal-footer bg-gray-200 p-3 sm:flex sm:flex-row-reverse gap-3">
                            <button 
                              type="button"
                              name="Continue"
                              onClick={handleContinue}
                              className={formBtn1}>
                                Edit
                            </button> 
                            <button 
                              type="button"
                              name="Continue"
                              onClick={handleContinue}
                              className={formBtn1}>
                                Edit
                            </button> 

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default MediaGallaryModal;
