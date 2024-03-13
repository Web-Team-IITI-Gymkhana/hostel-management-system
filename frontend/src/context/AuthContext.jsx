import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
const AuthContext = createContext();
export default AuthContext;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [auth, setAuth] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  let register = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/register/",{
    username:e.target.fname.value + e.target.lname.value,
    email:e.target.email.value,
    password:e.target.password1.value
    }).then((response)=>{
      console.log(response.data)
      login(e)
    }).catch((error)=>{
      console.log(error)
      toast.error("Wrong Credentials");})
  };

  let login = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/token/",{
    email:e.target.email.value,
    password:e.target.password.value
    }).then((response)=>{
      setAuth(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      toast.success("logged in Successfully!");
      navigate("/");
    }).catch((error)=>{
      console.log(error)
      toast.error("Wrong Credentials");
    })
  };

  let logout = () => {
    if (user) {
      toast.success("logged out!");
    }
    setAuth(null);
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  let deleteAccount = () => {
    if(user){
      axios.delete("http://127.0.0.1:8000/delete/user/" + String(user.user_id) + "/").then((response)=>{
      setAuth(null);
      setUser(null);
      localStorage.clear();
      console.log(response)
      toast.success("Deleted Account");
      navigate("/");
      }).catch((error)=>{
        console.log(error)
        toast.error("Some error occured");
      })
    }
  };
  
  let updateToken = () => {
    axios.post("http://127.0.0.1:8000/token/refresh/",{
      refresh: auth?.refresh
    }).then((response)=>{
      setAuth(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    }).catch((error)=>{
      logout()
      console.log(error)
    })
    if(loading){
      setLoading(false);
    }
  };
  const ContextData = {
    register: register,
    user: user,
    login: login,
    logout: logout,
    auth: auth,
    deleteAccount: deleteAccount,
  };
  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (auth) {
        updateToken();
      }
    }, 1000 * 60 * 4);
    return () => clearInterval(interval);
  }, [auth, loading]);
  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};
