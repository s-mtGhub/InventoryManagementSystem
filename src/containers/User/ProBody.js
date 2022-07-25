import React, {  useState } from "react";
import NewPro from "./NewPro";
import axios from "axios";
const ProBody = (props) => {

  const [mess, setmess] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState();
  const [Cdata, setcdata] = useState([]);

  function setn(e) {
    setname(e.target.value);
  }
  function setp(e) {
    setprice(e.target.value);
  } 
  function setq(e) {
    setquantity(e.target.value);
  }
  function setd(e) {
    setdesc(e.target.value);
  }
  function seti(e) {
    setimage(e.target.value);
  }
  function setc(e) {
    setcdata(e);
  }

  const prosub1 = async () => {
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Product not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    try {
      let res = await axios.post(
        "http://localhost:2222/api/user/create/product",
        {
          name: name,
          price: price,
          description: desc,
          productPictures: image,
          quantity: quantity,
          category: Cdata,
          createdBy: user.value.user_data._id,
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
        window.alert("Product  Added Successfully..;");
        window.location.reload();

      } else {
        console.log("failed Login");
        setmess(res.data.message);
        return;
      }
      console.log(res.rsponse);
    } catch (error) {
      console.log("Product not created ...Error");
      console.log(error);
      let data = error.response.data;
      if (data) {
        if (data.message) setmess(data.message);
        else setmess(data.error);
      }
    }
  };



  return (
    <>
      <h3 style={{ color: "red",textTransform:"capitalize" }}>{mess}</h3>
      
        <NewPro
          id={1}
          name={name}
          setn={setn}
          price={price}
          setp={setp}
          quantity={quantity}
          setq={setq}
          setdesc={setdesc}
          setd={setd}
          image={image}
          seti={seti}
          Cdata={Cdata}
          setc={setc}
          prosub1={prosub1}
          mess={setmess}
          btn="Add"
        />
    
    </>
  );
};
export default ProBody;
