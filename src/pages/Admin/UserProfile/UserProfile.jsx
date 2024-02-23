import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import userImg from '../../../assets/user.jpg';
import { ArrowLeft, Building3, CallCalling, Edit, Profile2User, SmsNotification } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Error from '../../../components/Errors/Error';
import { editUser } from '../../../api';
import { toast } from 'react-toastify';
import { setLoggedUserDetails } from '../../../redux/Slices/loginSlice';
// import { profileUpload, profileLink } from '../../../env';
import { ImageUpload, categoryLink, profileImage } from "../../../env";
import PathName from '../../../components/PathName/PathName';

const UserProfile = () => {
    const user = useSelector(state => state?.user?.loggedUserDetails)
    console.log(user)
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [open, setOpen] = useState(true)
    const [file, setFile] = useState('')
    const [upload, setUpload] = useState('')
    const dispatch = useDispatch()


    const handleChange = (e) => {
        console.log('file = ', e)
        setUpload(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    
    // ================================ Submit form data ===========================
    const onSubmit = async (data) => {
        console.log('profile pic =', upload)
        data.email = user?.email
        try {
            if (upload) {
                data.profile_pic = upload
                await ImageUpload(
                    data.profile_pic,
                    "profileimg",
                    "profileimg",
                    data.first_name
                );
                data.profile_pic = `${profileImage}${data.first_name}_profileimg_${data.profile_pic.name}`;
            }
            editUser(user?.userid, data).then(res => {
                if (res) {

                    setOpen(!open);
                    dispatch(setLoggedUserDetails({ ...user, ...data }))
                    toast.success(res?.message);
                } else {
                    console.log('failed to update user')
                }
            })
        } catch (error) {
            console.log("error:", error)
        }
    }
    // ====================================== close ==================================
    const close = () => {
        reset();
        setOpen(!open);
    }

    // ==================================== Reset form ==================================
    useEffect(() => {
        reset({
            first_name: user?.first_name,
            last_name: user?.last_name,
            phone_no: user?.phone_no,
            address: user?.address,
            city: user?.city,
            state: user?.state,
            profile_pic: user?.profile_pic,
        })
        setFile(user?.profile_pic)
    }, [])

    
    return (
        <>
            <div className="flex items-center justify-between px-6">
                <button className="flex items-center space-x-1 bg-transparent " onClick={() => window.history.back()}>
                    <ArrowLeft size={25} className='text-black' />
                    <span className='fs-3 base-font-600'>Back</span> </button>
                <div className="">
                    <PathName />
                </div>
            </div>
            <div className="p-8 m-4 bg-white lg:flex lg:items-center lg:justify-between sm:m-5 rounded-xl">
                {
                    open ?
                        <>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-x-6 ">
                                    <img className="h-[120px] w-[120px] rounded-full border object-contain" src={user?.profile_pic ? user?.profile_pic : userImg} alt="User_Profile" />
                                    <div>
                                        <h2 className="text-xl font-bold leading-7 text-gray-700 capitalize font-tb sm:truncate sm:text-2xl sm:tracking-tight">
                                            {user?.first_name} {user?.last_name}
                                        </h2>
                                        <div className="flex items-center space-x-5">
                                            <div className="flex items-center mt-2 text-base text-gray-500">
                                                <SmsNotification size="22" className='text-gray-400 mr-1.5' />
                                                {user?.email ? user?.email : "-------------"}
                                            </div>
                                            <div className="flex items-center mt-2 text-base text-gray-500">
                                                <CallCalling size="22" className='text-gray-400 mr-1.5' />
                                                {user?.phone_no ? user?.phone_no : "-------------"}
                                            </div>
                                            <div className="flex items-center mt-2 text-base text-gray-500 capitalize">
                                                <Profile2User size="22" className='text-gray-400 mr-1.5' />
                                                {user?.role ? user?.role : "-------------"}
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-2 text-base text-gray-500">
                                            <Building3 size="22" className='text-gray-400 mr-1.5' />
                                            <span className='pt-1'>{user?.address ? user?.address : "-------------"} {user?.city ? user?.city : "-------------"} {user?.state ? user?.state : "-------------"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-5 space-x-5 lg:ml-4 lg:mt-0">
                                <span className="">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        type="button"
                                        className={`flex items-center ease-in-out !py-3 hover:bg-sky-400 group transition-all duration-500  ${formBtn1}`}
                                    >
                                        <Edit size="22" className='text-white mr-1.5 ' />
                                        <span className="">Edit</span>
                                    </button>
                                </span>
                            </div>
                        </>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-between w-full '>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-x-6 ">
                                    <div className="relative">
                                        <label htmlFor="file-input">
                                            {file ?
                                                <img src={file} className="h-[120px] w-[120px] rounded-full border object-contain" alt="User_Profile" /> : <img src={user?.profile ? user?.profile : userImg} className="h-[120px] w-[120px] rounded-full border object-contain" alt="User_Profile" />
                                            }

                                        </label>
                                        <div className="absolute right-0 bottom-1">
                                            <label htmlFor="file-input">
                                                <Edit size="26" className='w-10 h-10 p-2 bg-white border-2 rounded-full shadow border-slate-300' />
                                            </label>
                                            <div className=''>
                                                <input
                                                    id='file-input'
                                                    type="file"
                                                    className='hidden'
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    {...register("profile_pic")}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="flex items-center space-x-3">
                                            <div className="">
                                                <input
                                                    type="text"
                                                    placeholder='First Name'
                                                    className={inputClass}
                                                    {...register('first_name', { required: true })}
                                                />
                                                {errors.first_name && <Error title="First Name is required*" />}
                                            </div>
                                            <div className="">
                                                <input
                                                    type="text"
                                                    placeholder='Last Name'
                                                    className={inputClass}
                                                    {...register('last_name', { required: true })}
                                                />
                                                {errors.last_name && <Error title="Last Name is required*" />}
                                            </div>
                                        </h2>
                                        <div className="flex items-center space-x-5">
                                            <div className="flex items-center mt-2 text-base text-gray-500">
                                                <SmsNotification size="22" className='text-gray-400 mr-1.5' />
                                                {user?.email ? user?.email : "-------------"}
                                            </div>
                                            <div className="flex items-center mt-2 text-base text-gray-500">
                                                <CallCalling size="22" className='text-gray-400 mr-1.5' />
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        placeholder='000000000'
                                                        className={inputClass}
                                                        {...register('phone_no', { required: true })}
                                                    />
                                                    {errors.phone_no && <Error title="Phone Number is required*" />}
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-2 text-base text-gray-500 capitalize">
                                                <Profile2User size="22" className='text-gray-400 mr-1.5' />
                                                {user?.role ? user?.role : "-------------"}
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <Building3 size="22" className='text-gray-400 mr-1.5' />
                                            <div className="flex items-center space-x-2">
                                                <div className="">
                                                    <input
                                                        type="text"
                                                        placeholder='Address'
                                                        className={inputClass}
                                                        {...register('address', { required: true })}
                                                    />
                                                    {errors.address && <Error title="Address is required*" />}
                                                </div>
                                                <div className="">
                                                    <input
                                                        type="text"
                                                        placeholder='City'
                                                        className={inputClass}
                                                        {...register('city', { required: true })}
                                                    />
                                                    {errors.city && <Error title="City is required*" />}
                                                </div>
                                                <div className="">
                                                    <input
                                                        type="text"
                                                        placeholder='State'
                                                        className={inputClass}
                                                        {...register('state', { required: true })}
                                                    />
                                                    {errors.state && <Error title="State is required*" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-5 space-x-5 lg:ml-4 lg:mt-0">
                                <span className="">
                                    <button
                                        type="submit"
                                        className={`flex items-center ease-in-out !py-3 hover:bg-sky-400 group transition-all duration-500  ${formBtn1}`}
                                    >
                                        <Edit size="22" className='text-white mr-1.5 ' />
                                        <span className="">Edit</span>
                                    </button>
                                </span>
                                <span className="">
                                    <button
                                        onClick={close}
                                        type="button"
                                        className={`flex items-center ease-in-out !py-3  transition-all duration-500 !text-slate-500  ${formBtn2}`}
                                    >
                                        <span className="">Close</span>
                                    </button>
                                </span>
                            </div>
                        </form>
                }
            </div >
        </>

    )
}

export default UserProfile