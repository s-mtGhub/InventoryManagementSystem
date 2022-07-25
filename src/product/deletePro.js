import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import CategoryList from "../containers/User/categoryList";
import ProductList from "../containers/User/ProductList";
import axios from "axios";

const DeletePro = (props) => {
  const [mess, setmess] = useState("");
  const [Cdata, setcdata] = useState([]);
  const [Pdata, setpdata] = useState([]);

  function setc(e) {
    setcdata(e);
  }
  function setpr(e) {
    setpdata(e);
  }

  const prosub3 = async () => {
    let usrdata = localStorage.getItem("User");
    let link, action;
    if (!usrdata) {
      setmess("Product not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    if (props.id == 2);
    else {
      if (Pdata == 0) {
        window.alert("This category not having any product");
        return;
      }
      if (
        !window.confirm(
          `Are you sure to delete Product..revert is not possible`
        )
      )
        return;
      link =
        "https://inventory-managementsystem.herokuapp.com/api/user/remove/product";
      action = { _id: Pdata };
    }
    try {
      await axios
        .post(
          link,
          action,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.value.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status < 300) {
            console.log(res.data);
            setmess("");
            window.alert("Product Deleted");
          } else {
            console.log("mod/del changed");
            return;
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          let data = error.response.data;
          if (data) {
            if (data.message) setmess(data.message);
            else setmess(data.error);
          }
        });
    } catch (e) {}
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
            <h3 className="sticky">Delete Product</h3>
            <Row>
              <Col md={6}>
                <div className="cat-actions body">
                  <CategoryList
                    id={3}
                    Cdata={Cdata}
                    setc={setc}
                    Pdata={Pdata}
                    setpr={setpr}
                  />
                  <label>Choose Product</label>
                  <ProductList _id={Cdata} setpr={setpr} />
                  <Button variant="primary" onClick={prosub3}>
                    Remove
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default DeletePro;
