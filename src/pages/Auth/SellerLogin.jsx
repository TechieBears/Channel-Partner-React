import { useForm } from 'react-hook-form';
import { inputClass } from '../../utils/CustomClass'
import leftImage from '../../assets/leftImage.png'
import { useState } from 'react';
import { Eye, EyeSlash } from 'iconsax-react';
import { setLoggedUser, setLoggedUserDetails, setRoleIs, setFranchiseeDetails } from '../../redux/Slices/loginSlice';
import LoadBox from '../../components/Loader/LoadBox';
import { toast } from 'react-toastify';
import Error from '../../components/Errors/Error';
import { vendorlogin, getFranchiseDetails } from '../../api/index';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';


const SellerLogin = () => {
    const [eyeIcon, setEyeIcon] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ==================== Custom validation function for email ========================
    const validateEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (emailPattern.test(value)) {
            return true;
        }
        return 'Invalid email address';
    };
    // ================ Data submit form ==================
    const onSubmit = async (data) => {
        try {
            setLoader(true)
            await vendorlogin(data).then((res) => {
                console.log("🚀 ~ awaitlogin ~ res:", res)
                if (res.message == "Successfully logged in") {
                    document.title = `Insta Smart Bazzar Admin Dashbaord | ${res?.role?.charAt(0)?.toUpperCase() + res?.role?.slice(1)}`
                    dispatch(setLoggedUserDetails(res))
                    dispatch(setRoleIs(res?.is_subadmin))
                    setLoader(false)
                    dispatch(setLoggedUser(true))
                    if (res?.userid && res?.role == 'franchise') {
                        getFranchiseDetailsById(res?.userid);
                    }
                } else {
                    setLoader(false)
                    toast.error('Please provide valid credentails')
                }
            })
        } catch (error) {
            setLoader(false)
            toast.error(error?.message)
            console.log(error)
        }
    }


    const getFranchiseDetailsById = async (id) => {
        try {
            setLoader(true)
            await getFranchiseDetails(id).then((res) => {
                console.log(" Franchisee Additional data ", res)
                if (res) {
                    console.log(" ..", res[0])
                    dispatch(setFranchiseeDetails(res[0]))
                    setLoader(false)
                } else {
                    setLoader(false)
                    toast.error(res?.message)
                }
            })
        } catch (error) {
            setLoader(false)
            toast.error(error?.message)
            console.log(error)
        }
    }


    return (
        <div className="flex items-center justify-center w-full h-screen bgbackground">
            <div className="p-5 md:p-3 flex items-center justify-center glass border-4 border-gray-50 shrink-0  w-[30%] rounded-3xl px-7 min-w-max" data-aos="fade-up" data-aos-duration="1000" delay="100">
                <div className="w-[27rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] h-[30rem] xl:h-[30rem] lg:h-[30rem] md:h-[22rem] rounded-lg hidden sm:block p-5">
                    <img src={leftImage} className='object-cover w-full h-full rounded-lg' loading='lazy' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-[20rem] md:w-[22rem] lg:w-[27rem] xl:w-[27rem] md:p-3 py-5 space-y-3">
                        <div className="">
                            <h2 className="text-xl font-bold tracking-tight text-black lg:mx-3 sm:text-3xl font-tbPop">
                                Hello, <span className='text-sky-400'>Again!</span>
                            </h2>
                            <h5 className="text-sm font-medium text-gray-400 lg:mx-3 sm:text-base font-tbPop">
                                Please SignIn To Seller Dashboard!
                            </h5>
                        </div>

                        <div className="mt-2 space-y-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div>
                                <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-500 font-tbPop">
                                    Email*
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Email address'
                                        autoComplete="email"
                                        required
                                        className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                        {...register('email', { required: true, validate: validateEmail })}
                                    />
                                    {errors.email && <Error title={'Email is required*'} />}
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-500 font-tbPop">
                                        Password*
                                    </label>
                                </div>
                                <div className="relative flex items-center mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        placeholder='Password'
                                        type={!eyeIcon ? "password" : "test"}
                                        autoComplete="current-password"
                                        required
                                        className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                        {...register('password', { required: true })}
                                    />
                                    <span className="absolute z-10 right-2 " onClick={() => setEyeIcon(!eyeIcon)}>
                                        {
                                            eyeIcon ?
                                                <Eye size={24} className='text-gray-400 cursor-pointer' /> :
                                                <EyeSlash size={24} className='text-gray-400 cursor-pointer' />
                                        }
                                    </span>
                                    {errors.password && <p className='text-xs text-red-500'>Password is required*</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-500 font-tbPop">
                                    MSB*
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="msb"
                                        name="msb"
                                        type="text"
                                        placeholder='MSB Code'
                                        autoComplete="msb_code"
                                        required
                                        className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                        {...register('msb_code', { required: true })}
                                    />
                                    {errors.msb_code && <Error title={'MSB code is required*'} />}
                                </div>
                            </div>
                            <div className='pt-3'>
                                {loader ? <LoadBox /> : <button
                                    type="submit"
                                    className="flex w-full justify-center font-tbPop rounded-md bg-sky-400 px-3 py-2.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                                >
                                    Sign in
                                </button>}
                            </div>
                            {/* <div className=''><NavLink className='w-full' to='/admin'>Sign-in as a <span className='text-sky-400'>Admin</span></NavLink></div> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerLogin