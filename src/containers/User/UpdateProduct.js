import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";
import ProBody from "./ProBody";
const UpdateProduct = (props) => {

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
                  <ProBody id={1} Clist={props.Clist} />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default UpdateProduct;
