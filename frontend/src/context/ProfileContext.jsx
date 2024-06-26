import { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";
const ProfileContext = createContext();
export default ProfileContext;

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
  let { user } = useContext(AuthContext);

  let [student, setStudent] = useState(() =>
    Cookies.get("student") ? JSON.parse(Cookies.get("student")) : null
  );
  let [swapStudentData1, setSwapStudentData1] = useState(() =>
    Cookies.get("swapStudentData1") ? JSON.parse(Cookies.get("swapStudentData1")) : null
  );
  let [swapStudentData2, setSwapStudentData2] = useState(() =>
    Cookies.get("swapStudentData1") ? JSON.parse(Cookies.get("swapStudentData1")) : null
  );
  let [room, setRoom] = useState(() =>
    Cookies.get("room_detail") ? JSON.parse(Cookies.get("room_detail")) : null
  );
  let [complaints, setComplaints] = useState(() =>
    Cookies.get("room_complaints")
      ? JSON.parse(Cookies.get("room_complaints"))
      : null
  );
  let [due, setDue] = useState(() =>
    Cookies.get("student_due") ? JSON.parse(Cookies.get("student_due")) : null
  );
  let [hostelStats, setHostelStats] = useState(() =>
  Cookies.get("hostelStats") ? JSON.parse(Cookies.get("hostelStats")) : null)
  let getStudentData = () => {
    axios
      .get("http://127.0.0.1:8000/student_data/" + user.email + "/")
      .then((response) => {
        setStudent({
          degree: response.data.student.degree,
          department: response.data.student.department,
          hostel: response.data.student.hostel,
          roll_no: response.data.student.roll_no,
          room_no: response.data.student.room_no,
        });
        Cookies.set(
          "student",
          JSON.stringify({
            degree: response.data.student.degree,
            department: response.data.student.department,
            hostel: response.data.student.hostel,
            roll_no: response.data.student.roll_no,
            room_no: response.data.student.room_no,
          }),
          { expires: 365, path: "/" }
        );
        setRoom({ furniture: response.data.room.furniture });
        Cookies.set(
          "room_detail",
          JSON.stringify({
            furniture: response.data.room.furniture,
          }),
          { expires: 365, path: "/" }
        );
        setComplaints({ room_complaints: response.data.complaint });
        console.log(complaints);
        Cookies.set(
          "room_complaints",
          JSON.stringify({
            room_complaints: response.data.complaint,
          }),
          { expires: 365, path: "/" }
        );
        setDue({ remaining_Due: response.data.due.Remaining_Due });
        Cookies.set(
          "student_due",
          JSON.stringify({
            remaining_Due: response.data.due.Remaining_Due,
          }),
          { expires: 365, path: "/" }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let getWardenData = () => {
    axios
    .get("http://127.0.0.1:8000/warden_data/" + user.email + "/")
    .then((response) => {
      console.log(response)
      setHostelStats({
        complaints_resolved : response.data.complaints_resolved,
        furniture_counts : response.data.furniture_counts,
        registered_students : response.data.registered_students,
        rooms_is_occupied : response.data.rooms_is_occupied,
        total_capacity : response.data.total_capacity,
        total_complaints : response.data.total_complaints,
      })
      Cookies.set(
        "hostelStats",
        JSON.stringify({
          complaints_resolved : response.data.complaints_resolved,
          furniture_counts : response.data.furniture_counts,
          registered_students : response.data.registered_students,
          rooms_is_occupied : response.data.rooms_is_occupied,
          total_capacity : response.data.total_capacity,
          total_complaints : response.data.total_complaints,
        }),
        { expires: 365, path: "/" }
      );
      setStudent({
        hostel: response.data.student.hostel,
        room_no: response.data.student.room_no,
      });
      Cookies.set(
        "student",
        JSON.stringify({
          hostel: response.data.student.hostel,
          room_no: response.data.student.room_no,
        }),
        { expires: 365, path: "/" }
      );
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  let getSwapStudentsData = (e) =>{
    e.preventDefault();
    const Email1 = e.target.email1.value
    const Email2 = e.target.email2.value
    axios
      .get("http://127.0.0.1:8000/student_data/" + Email1 + "/")
      .then((response) => {
        setSwapStudentData1({
          email : Email1,
          hostel: response.data.student.hostel,
          roll_no: response.data.student.roll_no,
          room_no: response.data.student.room_no,
        });
        Cookies.set(
          "swapStudentData1",
          JSON.stringify({
            email : Email1,
            hostel: response.data.student.hostel,
            roll_no: response.data.student.roll_no,
            room_no: response.data.student.room_no,
          }),
          { expires: 365, path: "/" }
        );
      }).catch((error) => {
          console.log(error);
        });


        axios
      .get("http://127.0.0.1:8000/student_data/" + Email2 + "/")
      .then((response) => {
        setSwapStudentData2({
          email : Email2,
          hostel: response.data.student.hostel,
          roll_no: response.data.student.roll_no,
          room_no: response.data.student.room_no,
        });
        Cookies.set(
          "swapStudentData2",
          JSON.stringify({
            email : Email2,
            hostel: response.data.student.hostel,
            roll_no: response.data.student.roll_no,
            room_no: response.data.student.room_no,
          }),
          { expires: 365, path: "/" }
        );
      }).catch((error) => {
          console.log(error);
        });
  }

  let confirmSwap = () =>{
    if(swapStudentData1==null || swapStudentData2==null){
      toast.error('2 Email IDs missing');
    }
    else if(swapStudentData1.email==swapStudentData2.email){
      toast.error("Same student data");
    }
    else{
      axios.post("http://127.0.0.1:8000/swap-student-rooms/",{
        email1:swapStudentData1.email,
        email2:swapStudentData2.email,
      }).then((response)=>{
        toast.success(response.data.detail);
        // setSwapStudentData1(null)
        // setSwapStudentData2(null)
        // Cookies.remove('swapStudentData1')
        // Cookies.remove('swapStudentData2')
      }).catch((error)=>{
        error.response.data.non_field_errors ?
        toast.error(error.response.data.non_field_errors)
        : toast.error("Error Occured")
      })
      
    }
  }

  let contextData = {
    getStudentData,
    getWardenData,
    hostelStats,
    student: student,
    student_room: room,
    student_due: due,
    room_complaints: complaints,
    getSwapStudentsData : getSwapStudentsData,
    swapStudentData1:swapStudentData1,
    swapStudentData2:swapStudentData2,
    setSwapStudentData1:setSwapStudentData1,
    setSwapStudentData2:setSwapStudentData2,
    confirmSwap:confirmSwap,
  };

  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
