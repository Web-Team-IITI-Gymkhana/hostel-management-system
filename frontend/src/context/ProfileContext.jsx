import { createContext, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
const ProfileContext = createContext();
export default ProfileContext;

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
    let {user} = useContext(AuthContext)
    let [student, setStudent] = useState(() =>
    Cookies.get('student')
    ?JSON.parse(Cookies.get('student'))
    : null
    );

    let getStudent = () => {
        console.log("http://127.0.0.1:8000/student/"+user.email)
        axios.get("http://127.0.0.1:8000/student/"+user.email).then((response)=>{
        console.log(response.data)
          setStudent({ degree: response.data.degree, department: response.data.department, hostel: response.data.hostel, roll_no:response.data.roll_no, room_no:response.data.room_no })
          console.log(student)
          Cookies.set('student', JSON.stringify({ degree: response.data.degree, department: response.data.department, hostel: response.data.hostel, roll_no:response.data.roll_no, room_no:response.data.room_no }), { expires: 365, path: "/" })
        }).catch((error)=>{
          console.log(error)
        })
      };

    let contextData = {
        getStudent:getStudent,
        student:student
    }

    return (
        <ProfileContext.Provider value={contextData} >
            {children}
        </ProfileContext.Provider>
    )
}