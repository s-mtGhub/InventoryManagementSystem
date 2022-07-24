import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Profile from "./containers/User/profile";
import ResetPassword from "./actions/ResetPassword";
import Setpassword from "./actions/SetPassword";
import UpdateCategory from "./containers/User/UpdateCategory";
import UpdateProduct from "./containers/User/UpdateProduct";
import UpdatePro from "./product/updatePro";
import DeletePro from "./product/deletePro";

function App() {
  function getWithExpiry(key = "User") {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);

    // console.log(item.value);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      window.alert("You have to login again");
      window.location.replace("/signin");
      return null;
    }
    return item.value;
  }

  setInterval(getWithExpiry, 5000);
  let id, token;
  const [Clist, setC] = useState([]);
  function setf(data) {
    setC(data);
  }
  // console.log("in app",Clist);

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home fun={setf} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/update-category" element={<UpdateCategory />} />
            <Route path="/user/update-product" element={<UpdateProduct />} />
            <Route path="/user/update-product/modify" element={<UpdatePro />} />
            <Route path="/user/update-product/delete" element={<DeletePro />} />
            <Route
              exact
              path="/user/reset/:id/:token"
              element={<Setpassword />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
