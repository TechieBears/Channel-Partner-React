import React from "react";

const ActiveOrders = () => {
  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
      <div
        className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 "
        previewlistener="true"
      >
        <div className="items-center gap-x-3">
          <div className="flex flex-wrap justify-between p-4">
            <p className="text-sm">
              Order Id - <span className="text-sky-400">753</span>
            </p>
            <p className="text-sm">
              Order Date -{" "}
              <span className="text-base font-semibold text-center text-gray-800">
                Jan 1, 2024 , 05:56 PM
              </span>{" "}
            </p>
          </div>
          <div className="flex-1 p-4 my-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between">
                <img
                  className="w-16"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU"
                  alt=""
                />
                <div>
                  <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">
                    Butter Milk x 7 more
                  </h2>
                  <p>Lorem ipsum dolor, sit amet </p>
                </div>
              </div>
              <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 dark:text-gray-400">
                Payment - Cash
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
            <p className="text-base font-medium">Order Price - $ 1,000</p>
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300"
              >
                Reject
              </button>
              <button
                type="submit"
                className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrders;
