import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Link ,useNavigate} from "react-router-dom";
import ResetPassword from "../../actions/ResetPassword";
import axios from "axios";

export default function Signin(props) {
  const [mess, setmess] = useState("");
  // const [Log, setlog] = useState([]);
  let navigate=useNavigate();
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  function sete(e) {
    setemail(e.target.value);
  }
  function setp(e) {
    setpass(e.target.value);
  }

  function setWithExpiry(key, value, ttl) {
    localStorage.removeItem(key);
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    ////////////////////////////////////////
    
          console.log(value.token);
          console.log(value.user_data);
          
          setmess("Login successfully"); 
  }

  const LoginSub = () => {
    axios
      .post(
        "http://localhost:2222/api/user/login",
        {
          email: `${email}`,
          password: `${password}`,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.status < 300) {
          setWithExpiry("User", res.data, 21600000);
        } else {
          console.log("failed Login");
          setmess(res.data.message);
          return;
        }
        // window.location.replace("/");
        navigate("/");
        console.log(res.rsponse);
      })
      .catch((error) => {
        let data = error.response.data;
        if (data.message) setmess(data.message);
        else {
          setmess(data.error);
        }
      });  
  };

  return (
    <Layout  >
      <h3 className="text-center" style={{ color: "red" }}>
        {mess}
      </h3>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form >
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

              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={setp}
                name="password"
                need={true}
              />

              <Link to="/reset-password">Forgot Password</Link>
              <br />
              <Button variant="primary" onClick={LoginSub} >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>   
  );
}
