import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import CatAdd from "./CatAdd";
import NewCat from "./NewCat";
const CatBody = (props) => {
  const [mess, setmess] = useState("");
  const [name, setname] = useState("");
  const [image, setimage] = useState();
  //   function setmessnill(){
  //     setmess("");
  //   }
  // console.log("inupdation ",props.Clist);

  function setc(e) {
    setname(e.target.value);
  }
  function seti(e) {
    console.log(e.target.value);
    setimage(e.target.value);
  }

  function setmessfun(D) {
    if (D.error) setmess(D.error);
    // if (D.status >= 300 && D.status < 400)
    else {
      setmess(D.message);
    }
  }

  const catSub1 = async () => {
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Category not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    try {
      let res = await axios.post(
        "https://inventory-managementsystem.herokuapp.com/api/user/create/category",
        {
          name: `${name}`,
          createdBy: `${user.value.user_data._id}`,
        },

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.value.token}`,
          },
        }
      );
      if (res.status < 300) {
        window.alert("Category Added Successfully..;");
        setname("");
        setimage();
      } else {
        console.log("failed Login");
        setmess(res.data.message);
        return;
      }
      console.log(res.rsponse);
    } catch (error) {
      console.log("Category not created ...Error");
      console.log(error);

      if (error.response) {
        setmessfun(error.response);
      }
    }
  };

  return (
    <>
      <h3 style={{ color: "red" }}>{mess}</h3>
      {props.id == 1 ? (
        <>
          <h4 className="sticky">Add New Category</h4>
          <NewCat
            setc={setc}
            seti={seti}
            name={name}
            image={image}
            id={1}
            catSub1={catSub1}
            btn="Add"
          />
        </>
      ) : (
        <>
          {props.id == 2 ? (
            <CatAdd id={2} dsp={true} />
          ) : (
            <CatAdd id={3} dsp={true} />
          )}
        </>
      )}
    </>
  );
};
export default CatBody;
