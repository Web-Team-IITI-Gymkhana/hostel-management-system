import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
const ProfileContext = createContext();
export default ProfileContext;

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
  let { user } = useContext(AuthContext)

  let [student, setStudent] = useState(() =>
    Cookies.get('student')
      ? JSON.parse(Cookies.get('student'))
      : null
  );

  let [room, setRoom] = useState(() =>
    Cookies.get('room_detail')
      ? JSON.parse(Cookies.get('room_detail'))
      : null
  );

  let [due, setDue] = useState(() =>
    Cookies.get('student_due')
      ? JSON.parse(Cookies.get('student_due'))
      : null
  );


  let getStudent = () => {
    axios.get("http://127.0.0.1:8000/student/" + user.email).then((response) => {
      setStudent({ degree: response.data.degree, department: response.data.department, hostel: response.data.hostel, roll_no: response.data.roll_no, room_no: response.data.room_no })
      Cookies.set('student', JSON.stringify({ degree: response.data.degree, department: response.data.department, hostel: response.data.hostel, roll_no: response.data.roll_no, room_no: response.data.room_no }), { expires: 365, path: "/" })
    }).catch((error) => {
      console.log(error)
    })
  };
  let getStudentRoom = () => {
    axios.get("http://127.0.0.1:8000/student_room/" + user.email).then((response) => {
      setRoom({ furniture: response.data.furniture })
      Cookies.set('room_detail', JSON.stringify({ furniture: response.data.furniture }), { expires: 365, path: "/" })
      }).catch((error) => {
      console.log(error)
    })
  };
  let getStudentDue = () => {
    axios.get("http://127.0.0.1:8000/student_due/" + user.email).then((response) => {
      setDue({ remaining_Due: response.data.Remaining_Due })
      Cookies.set('student_due', JSON.stringify({ remaining_Due: response.data.Remaining_Due}), { expires: 365, path: "/" })
    }).catch((error) => {
      console.log(error)
    })
  };

  let contextData = {
    getStudent,
    getStudentDue,
    getStudentRoom,
    student: student,
    student_room : room,
    student_due : due
  }

  return (
    <ProfileContext.Provider value={contextData} >
      {children}
    </ProfileContext.Provider>
  )
}