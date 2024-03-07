import { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import Table from "../../../../../components/Table/Table";
import {
  getHomeBanners,
  delHomeBanners,
  editHomeBanners,
} from "../../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setBanner } from "../../../../../redux/Slices/masterSlice";
import { toast } from "react-toastify";
import Switch from "react-js-switch";
import BannerForm from "../../../../../components/Modals/MasterModals/AssetsModals/BannerForm";
import MediaGallaryModal from "../../../../Settings/MediaGallery/MediaGallery";
import { getGalleryImages, } from '../../../../../api';


const DashboardBannerPanel = () => {
  const homeBanners = useSelector((state) => state?.master?.banner);
  // const dispatch = useDispatch()
  const [bannerList, setBannerList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState([]);

  // =================== fetching data ========================
  const fetchData = () => {
    try {
      getGalleryImages().then((res) => {
        console.log("media gallery data = ", res);
        setImageDetails(res);
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  // ============== fetch data from api ================
  const getAllBannerList = () => {
    try {
      getHomeBanners().then((res) => {
        console.log(res.data);
        setBannerList(res.data);

        // dispatch(setBanner(res))
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBannerList();
    fetchData();
  }, []);

  const openMediaModal = () => {
    setShowModal(true);
  };

  // ============== delete data from api ================
  const deleteData = (data) => {
    delHomeBanners(data).then((res) => {
      if (res?.message == "deleted successfully") {
        getAllBannerList();
        toast.success(res?.message);
      }
    });
  };

  // ================= action of the table ===============
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <BannerForm
        button="edit"
        title="Edit Home Banner"
        data={row}
        getAllBannerList={getAllBannerList}
      />
      <button
        onClick={() => deleteData(row.slide_id)}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

  const imageBodyTemp = (row) => (
    <div className="w-52 h-24 rounded bg-slate-100">
      <img
        src={row?.slide_url}
        alt="image"
        className="w-full bg-slate-100 h-full object-cover rounded"
      />
    </div>
  );

  // ------ Active/ Deactive banners -----
  const verifyActions = (row) => {
    const payload = {
      slide_isactive: !row?.slide_isactive,
      slide_url: row?.slide_url,
    };
    try {
      editHomeBanners(row?.slide_id, payload).then((form) => {
        console.log(payload);
        if (form.status == "success") {
          toast.success("Banner Activation Changed !");
          getAllBannerList();
        } else {
          console.log("err");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // =============================== active user switch =============================
  const switchActive = (row) => {
    return (
      <div className="flex items-center justify-center gap-2 ">
        <Switch
          value={row?.slide_isactive}
          onChange={() => verifyActions(row)}
          size={50}
          backgroundColor={{ on: "#86d993", off: "#c6c6c6" }}
          borderColor={{ on: "#86d993", off: "#c6c6c6" }}
        />
      </div>
    );
  };

  // ================= columns of the table ===============
  const columns = [
    { field: "image", header: "Image", body: imageBodyTemp },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
    { field: "isactive", header: "Active", body: switchActive, sortable: true },
  ];

  return (
    <>
      <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  ">
        <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <div className="">
            <h1 className="font-tbPop text-xl font-semibold text-gray-900 ">
              Home Banners
            </h1>
          </div>
          {/* <button onClick={openMediaModal}>Open Media gallery</button> */}
          {/* <MediaGallaryModal title="Media Gallery" showModal={showModal} imageDetails={imageDetails} /> */}

          <BannerForm
            title="Add New Banner"
            getAllBannerList={getAllBannerList}
          />
        </div>
        {bannerList?.length > 0 && (
          <Table data={bannerList} columns={columns} />
        )}
      </div>
    </>
  );
};

export default DashboardBannerPanel;
