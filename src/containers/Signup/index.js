import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import axios from "axios";
export default function Signup() {
  const [mess, setmess] = useState("");
  const [firstname, setfname] = useState("");
  const [lastname, setlname] = useState("");
  const [username, setuname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [confirmpassword, setconfirmpass] = useState("");
  const [contact, setcontact] = useState("");

  function setf(e) {
    setfname(e.target.value);
  }
  function setl(e) {
    setlname(e.target.value);
  }
  function setu(e) {
    setuname(e.target.value);
  }
  function sete(e) {
    setemail(e.target.value);
  }
  function setp(e) {
    setpass(e.target.value);
  }
  function setcp(e) {
    setconfirmpass(e.target.value);
  }
  function setct(e) {
    setcontact(e.target.value);
  }

  const RegisterSub = async () => {
    axios
      .post(
        "http://localhost:2222/api/user/register",
        {
          firstname: `${firstname}`,
          lastname: `${lastname}`,
          email: `${email}`,
          password: `${password}`,
          password_confirmation: `${confirmpassword}`,
          username: `${username}`,
          contact: `${contact}`,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status < 300) {
          console.log("registered succesfully");
          setmess("Registered successfully");
          window.alert("Registered successfully");
          window.location.assign("/signin");
        } else {
          console.log("failed registration");
          setmess(res.data.message);
        }
        console.log(res.rsponse);
      })
      .catch((error) => {
        if (error.response) {
          setmess(error.response.data.error);
          //  console.log(error.response.data.error);
          //  console.log(error.response.status);
          //  console.log(error.response.headers);
          if (error.response.status >= 300 && error.response.status < 400) {
            setmess(error.response.data.message);
          }
        }
      });
  };

  return (
    <Layout>
      <h3 className="text-center" style={{ color: "red" }}>
        {mess}
      </h3>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="FirstName"
                    type="text"
                    placeholder="Enter FirstName"
                    value={firstname}
                    onChange={setf}
                    name="firstname"
                    need={true}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="LastName"
                    type="text"
                    placeholder="Enter LastName"
                    value={lastname}
                    onChange={setl}
                    name="lastname"
                    need={false}
                  />
                </Col>
              </Row>
              <Input
                label="User Name"
                type="text"
                placeholder="username"
                ErrMessage=""
                value={username}
                onChange={setu}
                name="username"
                need={true}
              />
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                ErrMessage="We'll never share your email with anyone else."
                value={email}
                onChange={sete}
                name="email"
                need={true}
              />
              <Row>
                <Col md={6}>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={setp}
                    name="password"
                    need={true}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter password again"
                    value={confirmpassword}
                    onChange={setcp}
                    name="confirmpassword"
                    need={true}
                  />
                </Col>
              </Row>
              <Input
                label="Contact Deatils"
                type="Number"
                placeholder="Mo. No."
                ErrMessage=""
                value={contact}
                onChange={setct}
                name="contact"
                need={false}
              />

              <Button variant="primary" onClick={RegisterSub}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
