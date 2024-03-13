import { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getPolicy, getHelpCenter, deletePrivacyPolicy, deleteHelpSupportbyId } from '../../../api';
import AddPolicyForm from "../AddPolicy/AddPolicyForm";
import AddTerm from "../AddPolicy/AddTerm";


const SupportPanel = () => {
  const [Data, setData] = useState([])
  const [polices, setPolicy] = useState([])
  const dispatch = useDispatch()

  const getAllPrivacyPolicy = () => {
    try {
        getPolicy().then((res) => {
            setPolicy(res)
        })
    } catch (err) {
        console.log(err);
    }       
  }
  const getAllHelpCenter = () => {
    try {
        getHelpCenter().then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAllHelpCenter();
    getAllPrivacyPolicy();
  }, []);

  
  const deletePrivacy = (id) => {
    try{
        deletePrivacyPolicy(id).then(res => {
          if (res?.status == 'success') {
              toast.success('Privacy policy Deleted successfully')
              getAllPrivacyPolicy();
          }else{
              toast.error('Error while deleting privacy policy')
        }});
    }catch(e){
        toast.error('Error while deleting privacy policy')
    }
  };


  const deleteHelpSupport = (id) => {
    try{
      deleteHelpSupportbyId(id).then(res => {
          if (res?.status == 'success') {
              toast.success('Privacy policy Deleted successfully')
              getAllPrivacyPolicy();
          }else{
              toast.error('Error while deleting privacy policy')
        }});
    }catch(e){
        toast.error('Error while deleting privacy policy')
    }
  };

  
 
  return (
    <>
      <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5">
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <div className="flex items-center justify-between mx-5 mb-4 text-center">
              <h5 className="text-2xl font-semibold">Privacy Policy</h5>
              <AddPolicyForm title='Add Privacy Policy' getAllPrivacyPolicy={getAllPrivacyPolicy}/>
            </div>
            <>
                <div className=''>
                    {
                        polices.map(({ id, title, description }) => (
                            <div key={id} className='p-4 space-y-2'>
                                <div className='space-y-1'>
                                    <p className={` font-semibold text-lg underline cursor-pointer mx-3`}>{title}</p>
                                    <div className='p-4 border-2 border-gray-200 rounded-lg' key={id}>
                                        <p>{description}</p>
                                    </div>
                                    <AddPolicyForm  
                                      id={id} 
                                      policytitle={title} 
                                      policydesc={description}
                                      title='Edit Privacy Policy' getAllPrivacyPolicy={getAllPrivacyPolicy}/>
                                    <button>
                                        <Trash  onClick={() => deletePrivacy(id)}  size={24} className='mx-1 text-red-400 cursor-pointer' />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
          </div>
          <div>
            <div className="flex items-center justify-between mx-5 mb-4 text-center">
              <h5 className="text-2xl font-semibold">Help Center</h5>
              <AddTerm title="Add Help Center" getAllHelpCenter={getAllHelpCenter}/>
            </div>
            <>
                <div className=''>
                    {
                        Data.map(({ support_id, support_name, support_contact }) => (
                            <div key={support_id} className='p-4 space-y-2'>
                                <div className='space-y-1'>
                                    <p className={` font-semibold text-lg underline cursor-pointer`}>{support_name}</p>
                                    <div className='p-4 border-2 border-gray-200 rounded-lg' key={support_id}>
                                        <p>{support_contact}</p>
                                    </div>
                                    <AddTerm
                                      id={support_id} 
                                      termname={support_name} 
                                      termdesc={support_contact}
                                     title="Edit Help Center" />
                                    <button>
                                        <Trash  onClick={() => deleteHelpSupport(support_id)}  size={24} className='mx-1 text-red-400 cursor-pointer' />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPanel;
