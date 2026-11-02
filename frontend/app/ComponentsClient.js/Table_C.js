import React from "react";

export default function Table_c({ myPosition, TableData = [] }) {
 
  return (
    <div className="w-full">
     
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
        {/* Table */}
      <div className="min-w-238">

  <div
    className=" grid grid-cols-[90px_110px_minmax(250px,1fr)_160px_130px_160px] items-center gap-3 rounded-t-xl bg-orange-100 px-4 py-3 text-sm font-bold text-slate-700">
    <span>Your Position</span>
    <span>Id No</span>
    <span>Name</span>
    <span>About</span>
    <span>Payment</span>
    <span>Status</span>
  </div>

    {/* Rows */}
  {TableData?.length > 0 ? (
    TableData.map((user, index) => {
      const isMe = user?.customerId?._id === myPosition;

      return (
        <div
          key={user?._id || index}
          className={` grid grid-cols-[90px_110px_minmax(250px,1fr)_160px_130px_160px] items-center gap-3 border-b border-slate-100 px-4 py-3 text-sm transition ${   isMe     ? "bg-green-200"     : "bg-white hover:bg-slate-50" }`}>

          <div className=" w-7 h-7 p-2 flex justify-center items-center bg-green-100 text-green-500 font-bold rounded-full ">
            {index + 1}
          </div>

        
          <div className="whitespace-nowrap font-semibold text-slate-700 ">
            <div className=" w-7 h-7 p-2 bg-gray-100 text-violet-500 font-bold flex justify-center items-center ">
            #{user?.tokenNo ?? index + 1}
            </div>
          </div>

         
          <div className="flex min-w-0 items-center gap-3">

            <img src={  user?.customerId?.imageURL ||  "/default-user.png" }
              alt={user?.customerId?.name || "Customer"}
              className="  h-10  w-10  shrink-0  rounded-full  object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-800">
                {isMe
                  ? `You (${user?.customerId?.name || "Unknown"})`
                  : user?.customerId?.name || "Unknown"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.customerId?.email || "-"}
              </p>
            </div>

          </div>

          {/* About / Subject */}
          <div
            className="truncate text-slate-700"
            title={user?.subject}
          >
            {user?.subject || "-"}
          </div>

          {/* Payment */}
          <div className="whitespace-nowrap font-medium text-slate-700">
            {user?.method || "-"}
          </div>

          {/* Status */}
          <div>
            <span
              className={`  inline-flex  rounded-full  px-3  py-1  text-xs  font-semibold  whitespace-nowrap
                ${
                  user?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : user?.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : user?.status === "Confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : user?.status === "Waiting"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-slate-100 text-slate-600"
                }
              `}
            >
              {user?.status || "Unknown"}
            </span>
          </div>

        </div>
      );
    })
  ) : (
    <div className="px-4 py-10 text-center text-sm text-slate-500">
      No users in the queue.
    </div>
  )}

</div>
      </div>
    </div>
  );
}