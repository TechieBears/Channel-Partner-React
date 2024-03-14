import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import { formBtn1, formBtn2, tableBtn } from "../../../utils/CustomClass";
// import getCroppedImg from "./cropImage";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop} from "react-image-crop";
// import setCanvasPreview from "../setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const ImageCropDialog = (props) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    console.log('isOpen = ', isOpen);
    console.log('props?.imgSrc = ', props?.imgSrc);
    const toggle = () => setIsOpen(!isOpen);

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



  return (
    <>
      {
        <button 
        onClick={toggle} 
        className={tableBtn}>
          {"Crop"}
        </button>
      }

      <Transition appear show={!isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100] w-full"
          onClose={() => toggle}
        >
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
                <Dialog.Panel className="w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl max-w-7xl max-h-96">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                    {"crop image"}
                  </Dialog.Title>

                  {/* {props?.imgSrc != '' && ( */}
                    <div className="flex flex-col items-center">
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
                          updateAvatar(dataUrl);
                          closeModal();
                        }}
                      >
                        Crop Image
                      </button>
                    </div>
                  {/* )} */}
                  {crop && (
                    <canvas
                      ref={previewCanvasRef}
                      className="mt-4"
                      style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                      }}
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
