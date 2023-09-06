import './App.css'
import Appbar from './components/Appbar';
import Login from './components/login';
import Content from './components/content';
import AddSubject from './components/addSubject';
import AdminSubjects from './components/adminSubject';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { RecoilRoot,useSetRecoilState } from 'recoil';
import { userState } from '../store/atom/user';
import { useEffect } from 'react';

function App() {

  return (
    <Router>
    <RecoilRoot>
    <Appbar />
    <InitUser />
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/content"} element={<Content />}/>
      <Route path={"/adminSubject"} element={<AdminSubjects />}/>
      <Route path={"/addSubject"} element={<AddSubject />}/>
    </Routes>
    </RecoilRoot>
  </Router>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const navigate=useNavigate();
  const init = async() => {
      // try {
      //     const response = await axios.get("http://localhost:3000/admin/me", {
      //         headers: {
      //             "Authorization": "Bearer " + localStorage.getItem("token")
      //         }
      //     })

      //     if (response.data.username) {
      //         setUser({
      //             userEmail: response.data.username
      //         })
      //     } else {
      //         setUser({
      //             userEmail: null
      //         })
      //     }
      // } catch (e) {

      //     setUser({
      //         userEmail: null
      //     })
      // }
      navigate("/login");
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App
