import { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import Table from "../../../../../components/Table/Table";
import {
  getHomeBanners,
  delHomeBanners,
  editHomeBanners,
  addHomePromotion,
} from "../../../../../api";
import { useDispatch } from "react-redux";
import { setPromotions } from "../../../../../redux/Slices/masterSlice";
import { toast } from "react-toastify";
import Switch from "react-js-switch";
import BannerForm from "../../../../../components/Modals/MasterModals/AssetsModals/BannerForm";
import { getGalleryImages, delHomePromotion } from '../../../../../api';
import AddPromo from "../../../Promotion/Assests/AddPromo";


const DashboardBannerPanel = () => {
  const [bannerList, setBannerList] = useState([]);
  const [promotionList, setpromotionList] = useState([]);
  const dispatch = useDispatch()

  // ============== fetch data from api ================
  const getAllPromotionList = () => {
    try {
      addHomePromotion().then((res) => {
        console.log(res.data)
        setpromotionList(res.data);
        dispatch(setPromotions(res))
      })
    } catch (error) {
      console.log(error)
    }
  }


  // =================== fetching data ========================
  const fetchData = () => {
    try {
      getGalleryImages().then((res) => {
        // setImageDetails(res);
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBannerList();
    fetchData();
    getAllPromotionList();
  }, []);

  // ============== delete data from api ================
  const deleteDataBanner = (data) => {
    delHomeBanners(data).then((res) => {
      if (res?.message == "deleted successfully") {
        getAllBannerList();
        toast.success(res?.message);
      }
    });
  };

  const deleteDataPromotion = (data) => {
    delHomePromotion(data).then((res) => {
      if (res?.message == "deleted successfully") {
        getAllPromotionList();
        toast.success(res?.message);
      }
    });
  };

  // ================= action of the table ===============
  const actionBodyTemplateBanner = (row) => (
    <div className="flex items-center gap-2">
      <BannerForm
        button="edit"
        title="Edit Home Banner"
        data={row}
        getAllBannerList={getAllBannerList}
      />
      <button
        onClick={() => deleteDataBanner(row.slide_id)}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

    // ================= action of the table ===============
    const actionBodyTemplatePromotion = (row) => (
      <div className="flex items-center gap-2">
        <AddPromo
          button="edit"
          title="Edit Promotions"
          data={row}
          getAllPromotionList={getAllPromotionList}
        />
        <button
          onClick={() => deleteDataPromotion(row.slide_id)}
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

  const vendorTypeStyle = (row) => (
    <div className="w-28 h-24 items-center">
      <h5>{row?.vendor_type}</h5>
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
  const bannercolumns = [
    { field: "image", header: "Image", body: imageBodyTemp, style: true },
    { field: 'vendor_type', header: 'Vendor Type', sortable: true, style: true},
    { field: "id", header: "Action", body: actionBodyTemplateBanner, sortable: true, style: true },
    { field: "isactive", header: "Active", body: switchActive, sortable: true, style: true },
  ];

  // ================= columns of the table ===============
  const promotioncolumns = [
    { field: "image", header: "Image", body: imageBodyTemp, style: true },
    { field: 'vendor_type', header: 'Vendor Type', sortable: true, style: true},
    { field: "id", header: "Action", body: actionBodyTemplatePromotion, sortable: true, style: true },
    { field: "isactive", header: "Active", body: switchActive, sortable: true, style: true },
  ];

  useEffect(() => {
    getAllPromotionList()
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm p-5">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <div className="flex justify-between mb-4 mx-5 items-center text-center">
              <h5 className="font-semibold text-2xl">Banners</h5>
              <BannerForm title="Add New Banner" getAllBannerList={getAllBannerList}/>
            </div>
            {bannerList?.length > 0 && (
              <Table data={bannerList} columns={bannercolumns} />
              )}
          </div>
          <div>
            <div className="flex justify-between mb-4 mx-5 items-center text-center">
              <h5 className="font-semibold text-2xl">Promotions</h5>
              <AddPromo title='Add New Promotion' getAllPromotionList={getAllPromotionList} />
            </div>
            {promotionList?.length > 0 && <Table data={promotionList} columns={promotioncolumns} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBannerPanel;
