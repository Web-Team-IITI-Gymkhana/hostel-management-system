import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { GoogleOAuthProvider } from 'google-oauth-gsi';
const AuthContext = createContext();
export default AuthContext;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
      Cookies.get('auth')
      ?JSON.parse(Cookies.get('user'))
      : null
  );
  let [auth, setAuth] = useState(() =>
      Cookies.get('auth')
      ? JSON.parse(Cookies.get('auth'))
      : null
  );
  let [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  let navigate = useNavigate();

  let register = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/dj-rest-auth/registration/",{
    username:e.target.fname.value + e.target.lname.value,
    email:e.target.email.value,
    password1:e.target.password1.value,
    password2:e.target.password2.value
  }).then((response)=>{
      toast.success(response.data.detail)
    }).catch((error)=>{
      error.response.data.non_field_errors ?
      toast.error(error.response.data.non_field_errors)
      : toast.error("Error Occured")})
  };

  let login = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/token/",{
      email:e.target.email.value,
      password:e.target.password.value
    }).then((response)=>{
      setAuth({ access: response.data.access, refresh: response.data.refresh })
      setUser(jwtDecode(response.data.access))
      Cookies.set('auth', JSON.stringify({ access: response.data.access, refresh: response.data.refresh }), { expires: 365, path: "/" })
      Cookies.set('user', JSON.stringify(jwtDecode(response.data.access)));
      console.log(response)
      toast.success("Logged in Successfully")
      navigate("/");
    }).catch((error)=>{
        console.log(error.response.data)
        toast.error(error.response.data.non_field_errors)
    });
  };

  let logout = () => {
    if (user && auth) {
      toast.success("logged out!");
      setAuth(null);
      setUser(null);
      localStorage.clear();
      Cookies.remove('auth')
      Cookies.remove('user')
      Cookies.remove('student')
      Cookies.remove('room_detail')
      Cookies.remove('student_due')
      navigate("/");
    }
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
      setAuth({ access: response.data.access, refresh: response.data.refresh })
      Cookies.set('auth', JSON.stringify({ access: response.data.access, refresh: response.data.refresh }), { expires: 365, path: "/" })
    }).catch((error)=>{
      logout()
      console.log(error)
    })
    if(loading){
      setLoading(false);
    }
  };
  let googleProvider = new GoogleOAuthProvider({
		clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		onScriptLoadError: () => console.log('onScriptLoadError'),
		onScriptLoadSuccess: () => console.log('onScriptLoadSuccess'),
	});
  let googleLogin = googleProvider.useGoogleLogin({
		scope: 'profile email openid',
		flow: 'auth-code',
		onSuccess: (res) => {
			setFormLoading(true)
			const code = res.code;
			axios.post('http://127.0.0.1:8000/google/', { code: code }).then((response) => {
        console.log(response.data)
				setAuth({ access: response.data.access, refresh: response.data.refresh })
				Cookies.set('auth', JSON.stringify({ access: response.data.access, refresh: response.data.refresh }), { expires: 365, path: "/" })
				Cookies.set('user', JSON.stringify({ username: `${response.data.user.first_name} ${response.data.user.last_name}`, email: response.data.user.email, id: response.data.user.pk }), { expires: 365, path: "/" })
				setUser({ username: `${response.data.user.first_name} ${response.data.user.last_name}`, email: response.data.user.email, id: response.data.user.pk })
				navigate("/");
				toast.success("Logged In");
        setFormLoading(false)
			}).catch((err) => {
        console.log(err)
				if(err.response.data && err.response.data.non_field_errors[0] === "User is already registered with this e-mail address.") {
					toast.error('User is Already Registered Using Basic Registration');
					return 
				}
				toast.error("Some Error Occured")
				setFormLoading(false)
			}
			)
		},
		onError: (err) => console.error('Failed to login with google', err),
	});

  const ContextData = {
    register: register,
    user: user,
    login: login,
    logout: logout,
    auth: auth,
    deleteAccount: deleteAccount,
    googleLogin : googleLogin,
    formLoading: formLoading,
    setFormLoading: setFormLoading,
  };
  useEffect(() => {
    if (loading && auth) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (auth) {
        updateToken();
        console.log(auth)
      }
    }, 1000 * 60 * 4);
    return () => clearInterval(interval);
  }, [auth, loading]);
  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};
