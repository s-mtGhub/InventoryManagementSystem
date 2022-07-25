import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../App.css";
import Layout from "../../components/Layout";
import Category from "./category";
import Oop from "../../photos/oops.png"
// import Category from "./category";

export default function Home(props) {
  let res = { data: [] };
  const [CnPList, setCatList] = useState([]);
  const [pdata, setpr] = useState([]);

  const setp = (e) => {
    setpr(e);
  };

  const setfun = (data) => {
    setCatList(data);
    props.fun(data);
  };

  const temp = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2222/api/user/category/getcategory",
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

  useEffect(() => {
    temp();
  });

  return (
    <Layout CnP={CnPList}>
      <div id="catOperation" className="home-body">
        <div className="user-dashboard category">
          {/* <h3>Categories &nbsp;</h3> */}
          <Category CnP={CnPList} pdata={pdata} setp={setp} />
        </div>

        <div className="user-dashboard content text-center">
          <Container>
            <h1>Product Details</h1>
            <div className="contained">
              {pdata.length > 0 ? null : (
                <img               
                  src={Oop}
                  style={{ width: "30vw" }}
                />
              )}

              {pdata.map((p) => {
                return (
                  <>
                    <div className="productAtHome">
                      <h4>{p.name}</h4>
                      <p>
                        <b>Price</b>
                        <br />
                        {p.price}
                      </p>
                      <p>
                        <b>Quantity</b>
                        <br />
                        {p.quantity}
                      </p>
                      <p>
                        <b>Description</b>
                        <br />
                        {p.description}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

