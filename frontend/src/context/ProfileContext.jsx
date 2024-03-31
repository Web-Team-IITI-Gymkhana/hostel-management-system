import { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
const ProfileContext = createContext();
export default ProfileContext;

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
  let { user } = useContext(AuthContext);

  let [student, setStudent] = useState(() =>
    Cookies.get("student") ? JSON.parse(Cookies.get("student")) : null
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

  let contextData = {
    getStudentData,
    getWardenData,
    hostelStats,
    student: student,
    student_room: room,
    student_due: due,
    room_complaints: complaints,
  };

  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
