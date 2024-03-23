import { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import Table from "../../../../../components/table/Table";
import { getHomeBanners, delHomeBanners, editHomeBanners, addHomePromotion} from "../../../../../api";
import { useDispatch } from "react-redux";
import { setPromotions } from "../../../../../redux/Slices/masterSlice";
import { toast } from "react-toastify";
import Switch from "react-js-switch";
import BannerForm from "../../../../../components/Modals/MasterModals/AssetsModals/BannerForm";
import { delHomePromotion, editHomePromotion } from '../../../../../api';
import AddPromo from "../../../Promotion/Assests/AddPromo";


const DashboardBannerPanel = () => {
  const [bannerList, setBannerList] = useState([]);
  const [promotionList, setpromotionList] = useState([]);
  const dispatch = useDispatch()

  // ============== fetch data from api ================
  const getAllPromotionList = () => {
    try {
      addHomePromotion().then((res) => {
        setpromotionList(res.data);
        dispatch(setPromotions(res))
      })
    } catch (error) {
      console.log(error)
    }
  }

  // ============== fetch data from api ================
  const getAllBannerList = () => {
    try {
      getHomeBanners().then((res) => {
        setBannerList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBannerList();
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
    <div className="h-24 rounded w-52 bg-slate-100">
      <img
        src={row?.slide_url}
        alt="image"
        className="object-cover w-full h-full rounded bg-slate-100"
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



  // ------ Active/ Deactive Promotions -----
  const verifyActionsPromo = (row) => {
    const payload = {
      slide_isactive: !row?.slide_isactive,
      slide_url: row?.slide_url,
    };
    try {
      editHomePromotion(row?.slide_id, payload).then((form) => {
        console.log(payload);
        if (form.status == "success") {
          toast.success("Promotion Activation Changed !");
          getAllPromotionList();
        } else {
          console.log("err");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // =============================== active user switch =============================
  const switchActivePromo = (row) => {
    return (
      <div className="flex items-center justify-center gap-2 ">
        <Switch
          value={row?.slide_isactive}
          onChange={() => verifyActionsPromo(row)}
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
    { field: 'vendor_type', header: 'Vendor Type', sortable: true, style: true },
    { field: 'redirection_type', header: 'Redirection Type', body: (row) => <h5>{row?.redirection_type ? row?.redirection_type : row?.redirect_link}</h5>, sortable: true, style: true },
    { field: 'screen_name', header: 'Screen Name', sortable: true, style: true },
    { field: "id", header: "Action", body: actionBodyTemplateBanner, sortable: true, style: true },
    { field: "isactive", header: "Active", body: switchActive, sortable: true, style: true },
  ];

  // ================= columns of the table ===============
  const promotioncolumns = [
    { field: "image", header: "Image", body: imageBodyTemp, style: true },
    { field: 'vendor_type', header: 'Vendor Type', sortable: true, style: true },
    { field: 'Redirection Type', header: 'Redirection Type', body: (row) => <h5>{row?.redirection_type ? row?.redirection_type : row?.redirect_link}</h5>, sortable: true, style: true },
    { field: 'screen_name', header: 'Screen Name', sortable: true, style: true },
    { field: "id", header: "Action", body: actionBodyTemplatePromotion, sortable: true, style: true },
    { field: "isactive", header: "Active", body: switchActivePromo, sortable: true, style: true },
  ];

  useEffect(() => {
    getAllPromotionList()
  }, []);

  return (
    <>
      <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <div className="flex items-center justify-between mx-5 mb-4 text-center">
              <h5 className="text-2xl font-semibold">Banners</h5>
              <BannerForm title="Add New Banner" getAllBannerList={getAllBannerList} />
            </div>
            <Table data={bannerList} columns={bannercolumns} />
          </div>
          <div>
            <div className="flex items-center justify-between mx-5 mb-4 text-center">
              <h5 className="text-2xl font-semibold">Promotions</h5>
              <AddPromo title='Add New Promotion' getAllPromotionList={getAllPromotionList} />
            </div>
            <Table data={promotionList} columns={promotioncolumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBannerPanel;
