import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import NewCat from "./NewCat";
import { Col, Row } from "react-bootstrap";

const CatAdd = (props) => {
  const [display, setdis] = useState(props.dsp);
  const [Clist, setfun] = useState([]);
  const [name, setname] = useState("");
  const [image, setimage] = useState();
  const [mess, setmess] = useState("");
  const [cdata, setcdata] = useState();
  function setc(e) {
    setname(e.target.value);
  }
  function seti(e) {
    console.log(e.target.value);
    setimage(e.target.value);
  }
  const fun1 = (data) => {
    setdis(false);
    // setdis(!display);
    setname(data.name);
    setimage(data.image);
    setcdata(data);
    // console.log("in fun1",data);
  };

  const temp = async () => {
    try {
      const res = await axios.get(
        "https://inventory-managementsystem.herokuapp.com/api/user/category/getcategory",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status < 300) {
        if (res.data) {
          setfun(res.data);
        }
      } else {
        console.log("category not fetched");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setmessfun = (error) => {
    if (error.data.error) setmess(error.data.error);
    else {
      setmess(error.data.message);
    }
  };

  async function fun(data) {
    // console.log("inside fun", data._id);
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Category not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    let link = "",
      action = {};

    if (props.id == 2) {
      console.log("naam", name);
      link =
        "https://inventory-managementsystem.herokuapp.com/api/user/update/category";
      action = {
        _id: `${cdata._id}`,
        name: `${name}`,
        categoryImage: `${image}`,
        createdBy: `${user.value._id}`,
      };
    } else {
      if (
        !window.confirm(
          `Are you sure to delete Category ${data.name}..revert is not possible`
        )
      )
        return;
      link =
        "https://inventory-managementsystem.herokuapp.com/api/user/remove/category";
      action = {
        _id: `${data._id}`,
      };
    }
    try {
      await axios
        .post(link, action, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.value.token}`,
          },
        })
        .then((res) => {
          if (res.status < 300) {
            console.log(res.data);
            if (props.id == 2) window.alert("Category Modified");
            else window.alert("Category Deleted");
          } else {
            console.log("mod/del changed");
            return;
          }
          console.log(res.rsponse);
          setdis(true);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setmessfun(error.response);
          }
        });
    } catch (e) {}
  }

  useEffect(() => {
    temp();
    // fun1();
  });

  return (
    <>
      <h3 className="text-center" style={{ color: "red" }}>
        {mess}
      </h3>
      <div
        className="cat-main-body "
        style={{ minWidth: "200px", display: display ? "block" : "none" }}
      >
        {props.id == 2 ? (
          <h4 className="sticky">Modify Existing Categiry</h4>
        ) : (
          <h4 className="sticky">Remove a Category</h4>
        )}
        <div className="cat-body-list">
          {Clist.map((c) => {
            return (
              <div
                className="cat-item"
                onClick={() => {
                  props.id == 2 ? fun1(c) : fun(c);
                }}
              >
                <li>{c.name}</li>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: display ? "none" : "block" }}>
        <Row>
          <Col md={6}>
            <NewCat
              setc={setc}
              seti={seti}
              name={name}
              image={image}
              id={2}
              fun={fun}
              data={cdata}
              btn="Update"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CatAdd;
