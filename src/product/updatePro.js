import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "react-bootstrap";
import axios from "axios";
import NewPro from "../containers/User/NewPro";
import ModifyPro from "../containers/User/modifyPro";

const UpdatePro = (props) => {
  const [mess, setmess] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState();
  const [Cdata, setcdata] = useState([]);
  const [Pdata, setpdata] = useState([]);
  const [product, setproduct] = useState([]);
  const [display, setdis] = useState(true);
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
  function setpr(e) {
    setpdata(e);
  }
  function setprdct(e) {
    setproduct(e);
  }

  const nextEditPage = () => {
    if (Pdata == 0) {
      window.alert("No Product in this category");
      return;
    }
    setname(product.name);
    setimage(product.image);
    setdesc(product.description);
    setquantity(product.quantity);
    setprice(product.price);
    setdis(!display);
  };

  const fun = async () => {
    console.log("in save mode");
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Product not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    if (!window.confirm("Are you sure to update Product")) return;
    try {
      let res = await axios.post(
        "https://inventory-managementsystem.herokuapp.com/api/user/update/product",
        {
          _id: Pdata,
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
            Authorization: `Bearer ${user.value.token}`,
          },
        }
      );
      if (res.status < 300) {
        window.alert("Product  Updated Successfully..;");
        window.location.reload();
      } else {
        console.log("failed Login");
        setmess(res.data.message);
        return;
      }
      console.log(res.rsponse);
    } catch (error) {
      console.log("Product not updated ...Error");
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
      <Layout>
        <Container className="profile-body">
          <div className="cat-actions profile-list">
            <NavLink className="prolink" to="/user/update-product">
              <div>Add New Product</div>
            </NavLink>
            <NavLink className="prolink" to="/user/update-product/modify">
              <div>Modify Existing Product</div>
            </NavLink>
            <NavLink className="prolink" to="/user/update-product/delete">
              <div>Delete Product</div>
            </NavLink>
          </div>
          <div className="profileset">
            <Row>
              <Col md={6}>
                <div className="cat-actions body">
                  <>
                    <div style={{ display: display ? "block" : "none" }}>
                      <h3 className="sticky">Modify Existing Product</h3>
                      <ModifyPro
                        _id={Pdata}
                        setprdct={setprdct}
                        id={2}
                        Cdata={Cdata}
                        setc={setc}
                        setpr={setpr}
                        Pdata={Pdata}
                        setdis={setdis}
                      />
                      <Button
                        variant="primary"
                        style={{ marginBottom: "1rem" }}
                        onClick={nextEditPage}
                      >
                        Next
                      </Button>
                    </div>
                    <div style={{ display: display ? "none" : "block" }}>
                      <h3 style={{ color: "red", textTransform: "capitalize" }}>
                        {mess}
                      </h3>
                      <NewPro
                        id={2}
                        name={name}
                        setn={setn}
                        price={price}
                        setp={setp}
                        quantity={quantity}
                        setq={setq}
                        desc={desc}
                        setdesc={setdesc}
                        setd={setd}
                        image={image}
                        seti={seti}
                        product={product}
                        prosub1={fun}
                        btn="Update"
                      />
                    </div>
                  </>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default UpdatePro;
