import { Dialog, Transition } from "@headlessui/react";
import { Edit } from "iconsax-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from "../../../utils/CustomClass";
import Error from "../../Errors/Error";
import LoadBox from "../../Loader/LoadBox";
import axios from "axios";
import { environment } from "../../../env";

export const AddWalletAmt = (props) => {
    console.log("🚀 ~ file: AddWalletAmt.jsx:12 ~ AddWalletAmt ~ props:", props)
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);


    const toggle = () => setIsOpen(!isOpen);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors }, setError } = useForm({ criteriaMode: 'all' });

    const onSubmit = async (data) => {
        data.transaction_status = 'success'
        data.transaction_log = 'Added by admin'
        data.user = props?.userData?.id
        try {
            const url = `${environment.baseUrl}app/wallet_transaction`
            await axios.post(url, data).then((res) => {
                console.log("🚀 ~ file: AddWalletAmt.jsx:29 ~ awaitaxios.post ~ res:", res)
            }).catch((err) => {
                console.log("🚀 ~ file: AddWalletAmt.jsx:32 ~ awaitaxios.post ~ err:", err)
            })

        } catch (err) {
            console.log("🚀 ~ file: AddWalletAmt.jsx:36 ~ onSubmit ~ err:", err)
        }
    }
    const closeBtn = () => {
        toggle();
        setLoader(false);
        reset();
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
            <Transition appear show={isOpen} as={Fragment}>
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
                                <Dialog.Panel className="w-full max-w-2xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>Amount</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter Amount"
                                                        className={inputClass}
                                                        {...register("amount")}
                                                    />
                                                    {errors.amount && (
                                                        <Error title={errors?.amount?.message} />
                                                    )}
                                                </div>
                                            </div>

                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? (
                                                    <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                                                ) :
                                                    (
                                                        <button type="submit" className={formBtn1}  >
                                                            submit
                                                        </button>
                                                    )
                                                }
                                                <button
                                                    type="button"
                                                    className={formBtn2}
                                                    onClick={closeBtn}
                                                >
                                                    close
                                                </button>
                                            </footer>
                                        </form>

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
