import { useContext } from "react";
import ProfileContext from "../context/ProfileContext";

export default function HostelStats() {
  const { hostelStats } = useContext(ProfileContext);
  return (
    <div className="">
      <div className="text-3xl py-4">Hostel Statistics</div>
      <div className="flex shadow-lg w-max">
        <div className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2 rounded-l-lg">
          <span className="font-semibold text-sm">Total Capacity</span>
          <span className="text-3xl">{hostelStats?.total_capacity}</span>
        </div>
        <div className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2">
          <span className="font-semibold text-sm">Rooms Occupied</span>
          <span className="text-3xl">{hostelStats?.rooms_is_occupied}</span>
        </div>
        <div className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2">
          <span className="font-semibold text-sm">
            Registered Students in Hostel
          </span>
          <span className="text-3xl">{hostelStats?.registered_students}</span>
        </div>
        <div className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2">
          <span className="font-semibold text-sm">Total Complaints</span>
          <span className="text-3xl">{hostelStats?.total_complaints}</span>
        </div>
        <div className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2 rounded-r-lg">
          <span className="font-semibold text-sm">Complaints resolved</span>
          <span className="text-3xl">{hostelStats?.complaints_resolved}</span>
        </div>
      </div>
      <br />
      <br />
      <div className="rounded-lg shadow-lg w-max overflow-hidden">
        <div className="m-2 p-2 font-medium">FURNITURES:</div>
        <div className="flex">
          {hostelStats &&
            Object.entries(hostelStats.furniture_counts).map(
              ([furniture, count], index) => (
                <div
                  key={index}
                  className="text-gray-700 py-4 px-8 border-1 hover:border-none hover:bg-green-400 hover:text-white transition-all dureation-500 grid grid-rows-2 min-w-[200px]"
                >
                  <span className="font-semibold text-sm">
                    {furniture + "s"}
                  </span>
                  <span className="text-3xl">{count}</span>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
