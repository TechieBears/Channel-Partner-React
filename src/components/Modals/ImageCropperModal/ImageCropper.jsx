import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { tableBtn, formBtn1 } from "../../../utils/CustomClass";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "./SetCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const ImageCropDialog = ({updateAvatar, sendDataToParent,  ...props}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [base64Url, setBase64Url] = useState('');
  
  
  // console.log('== imageUrl == ', imageUrl)

  
  // console.log('props?.imgSrc = ', props?.imgSrc);
  const toggle = () => setOpen(!isOpen);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };


//   const convertBase64ToUrl = (base64String) => {
//     // console.log('base64String = ', base64String);
//     // Create a new Image object
//     setTimeout(() => {
//         const blob = new Blob([base64String], { type: 'image/png' });
//         const url = URL.createObjectURL(blob);
//         setImageUrl(url);
//         // console.log('-- ImageUrl --', url)
//     }, 1000);


//     // Set the src attribute to the base64 string
//     // img.src = base64String;

//     // Once the image is loaded, set the URL to the image's src
//     // img.onload = () => {
//     //   setImageUrl(img.src);
//     //   console.log('-- ImageUrl --', img.src)
//     // };
//   };


const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([uint8Array], { type: contentType });
  };


const convertBase64ToUrl = (canvasRef) => {
    // Retrieve the base64 data URL from the canvas
    const dataUrl = canvasRef.current.toDataURL();

    // Create a blob from the base64 string
    const blob = dataURLtoBlob(dataUrl);

    // Create an object URL from the blob
    const url = URL.createObjectURL(blob);

    // Set the image URL state
    setImageUrl(url);
    sendDataToParent(url)
    setOpen(!isOpen);


    // console.log('url = ', url)
};


//   useEffect(() => {
//     // Example of calling it conditionally
//     if (base64Url) {
//         const blob = new Blob([base64Url], { type: 'image/png' });
//         const url = URL.createObjectURL(blob);
//         setImageUrl(url);
//     //   convertBase64ToUrl(base64Url);
//     }
//   }, [base64Url]);



  return (
    <>

      {/* <button className={`${formBtn1}`} onClick={() => setOpen(true)}>
              Crop Image
          </button> */}
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
          <div className="fixed inset-0 overflow-y-scroll ">
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
                <Dialog.Panel className="w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl max-w-7xl">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                    Image Crop
                  </Dialog.Title>

                  <div className="flex flex-col items-center h-96">
                    <ReactCrop
                      crop={crop}
                      onChange={(pixelCrop, percentCrop) =>
                        setCrop(percentCrop)
                      }
                      circularCrop
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                    >
                      <img
                        ref={imgRef}
                        src={props?.imgSrc}
                        alt="Upload"
                        style={{ maxHeight: "70vh" }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                    <button
                      className="px-4 py-2 mt-4 font-mono text-xs text-white rounded-2xl bg-sky-500 hover:bg-sky-600"
                      onClick={() => {
                       
                        setCanvasPreview(
                          imgRef.current,
                          previewCanvasRef.current,
                          convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                          )
                        );
                        const dataUrl = previewCanvasRef.current.toDataURL();
                        setBase64Url(dataUrl)
                        // updateAvatar(dataUrl);
                        // convertBase64ToUrl(base64Url)
                        // closeModal();
                        // convertBase64ToUrl(props?.imgSrc)
                        // sendDataToParent(props?.imgSrc)
                        // setOpen(!isOpen);
                        // reset();
                      }}
                    >
                      Crop Image Set
                    </button>
                  </div>

                {crop && crop != '' && (
                    <div className="flex items-center justify-center">
                        <canvas
                            ref={previewCanvasRef}
                            className="mx-2 my-10"
                            style={{
                            border: "1px solid black",
                            objectFit: "contain",
                            width: 150,
                            height: 150,
                        }}
                    />
                        <div>
                            <button 
                              onClick={() => convertBase64ToUrl(previewCanvasRef)}
                              className={formBtn1}>Submit</button>
                        </div>
                        {/* <div>
                            <img src={imageUrl} alt="Converted Image" />
                        </div> */}
                    </div>
                )}

             
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >
    </>
  );
};
