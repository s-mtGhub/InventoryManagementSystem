import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import axios from "axios";
import { Update } from "@material-ui/icons";

const Profile = () => {
  let usrdata = localStorage.getItem("User");
  let user;
  if (usrdata) user = JSON.parse(usrdata);
  console.log(user.value);
  const [mess, setmess] = useState("");
  const [dsp, setdsp] = useState(true);
  const [firstname, setfname] = useState(user.value.user_data.firstname);
  const [lastname, setlname] = useState(user.value.user_data.lastname);
  const [username, setuname] = useState(user.value.user_data.username);
  const [contact, setcontact] = useState(user.value.user_data.contact);
  const [password, setpass] = useState("");
  const [confirmpassword, setconfirmpass] = useState("");
  const [confirmnewpassword, setconfirmnewpass] = useState("");

  function setf(e) {
    setfname(e.target.value);
  }
  function setl(e) {
    setlname(e.target.value);
  }
  function setu(e) {
    setuname(e.target.value);
  }
  function setp(e) {
    setpass(e.target.value);
  }
  function setcp(e) {
    setconfirmpass(e.target.value);
  }
  function setcnp(e) {
    setconfirmnewpass(e.target.value);
  }
  function setct(e) {
    setcontact(e.target.value);
  }

  function setmessfun(D) {
    if (D.data.error) setmess(D.data.error);
    else {
      setmess(D.data.message);
    }
  }

  const update = async () => {
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Category not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    try {
      let res = await axios.post(
        "http://localhost:2222/api/user/profileupdate",
        {
          firstname: firstname,
          lastname: lastname,
          username: username,
          contact: contact,
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
        console.log(res.data);
        let token = user.value.token;
        let user_data = {
          contact: contact,
          firstname: firstname,
          lastname: lastname,
          username: username,
          _id: `${user.value.user_data._id}`,
          email: `${user.value.user_data.email}`,
        };
        let value = {
          token: token,
          user_data: user_data,
        };
        let expiry = user.expiry;
        const item = {
          value: value,
          expiry: expiry,
        };
        console.log("setted", value);
        localStorage.removeItem("User");
        localStorage.setItem("User", JSON.stringify(item));
        window.alert("Personal Data Updated..;");
        window.location.reload();
      } else {
        console.log("not updated");
        setmess(res.data.message);
        return;
      }
    } catch (error) {
      console.log("Category not created ...Error");
      console.log(error);

      if (error.response) {
        setmessfun(error.response);
      }
    }
  };

  const change = async () => {
    let usrdata = localStorage.getItem("User");
    if (!usrdata) {
      setmess("Category not created something went Wrong");
      return;
    }
    let user = JSON.parse(usrdata);
    try {
      let res = await axios.post(
        "http://localhost:2222/api/user/changepassword",
        {
          password: password,
          newPassword: confirmpassword,
          confirmNewPassword: confirmnewpassword,
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
        window.alert("Password has been changed..;");
        setmess("");
        setconfirmnewpass("");
        setconfirmpass("");
        setpass("");
      } else {
        console.log("not changed");
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
      <Layout>
        <Container className="profile-body">
          <div className="profile-list">
            <div
              onClick={() => {
                setdsp(true);
              }}
            >
              Personal Data
            </div>
            <div
              onClick={() => {
                setdsp(false);
              }}
            >
              Change Password
            </div>
          </div>
          <div
            className="user-profile-data profileset"
            style={{ display: dsp ? "block" : "none" }}
          >
            <Row style={{ marginTop: "50px" }}>
              <h3>Update Personal Information</h3>
              <h4 style={{ color: "red" }}>{mess}</h4>
              <Col md={6}>
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
                    label="Contact Deatils"
                    type="Number"
                    placeholder="Mo. No."
                    ErrMessage=""
                    value={contact}
                    onChange={setct}
                    name="contact"
                    need={false}
                  />

                  <Button
                    variant="primary"
                    onClick={() => {
                      update();
                    }}
                  >
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
          <div
            className="change-password profileset"
            style={{ display: dsp ? "none" : "block" }}
          >
            <Row style={{ marginTop: "50px" }}>
              <h3>Change Password</h3>
              <h4 style={{ color: "red" }}>{mess}</h4>
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
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter password again"
                  value={confirmpassword}
                  onChange={setcp}
                  name="confirmpassword"
                  need={true}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Enter password again"
                  value={confirmnewpassword}
                  onChange={setcnp}
                  name="confirmnewpassword"
                  need={true}
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    change();
                  }}
                >
                  Change
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
