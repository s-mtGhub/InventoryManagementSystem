import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Container,Row,Form,Col,Button } from 'react-bootstrap';
import Input from '../components/UI/Input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { LaptopWindows } from '@material-ui/icons';


const Setpassword=()=>{
  let navigate=useNavigate();
   const [mess, setmess] = useState("");
   let {id,token}=useParams();
//   let id=id.params;
//   let token=token.params;

  const [password, setpass] = useState("");
  const [confirmPassword, setcpass] = useState("");
  function setp(e) {
    setpass(e.target.value);
  }
  function setcp(e) {
    setcpass(e.target.value);
  }
  
  const setmessfun = (error) => {
    if(error.data.error)
    setmess(error.data.error);
    else{
      setmess(error.data.message);
    }
  };


  const setPass=()=>{
axios
  .post(`http://localhost:2222/api/user/forgotpassword/${id}/${token}`, {
    "password": `${password}`,
    "confirmPassword": `${confirmPassword}`,
  })
  .then((res) => {
    if (res.status < 300) {
      console.log(res.data);
      setmess("Password has been changed");
      window.alert("Password has been changed");
    //   window.location.replace("/");
    } else {
      console.log("password not changed");
      setmess(res.data.message);
      return;
    }
    navigate("/signin");
    console.log(res.rsponse);
  })
  .catch((error) => {
    console.log(error);
    if (error.response) {
      setmessfun(error.response);
    }
  });  

  }


      return (
      <Layout>
        <h3 className="text-center" style={{ color: "red" }}>
          {mess}
        </h3>
        <Container>
          <Row style={{ marginTop: "150px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter Password"
                  ErrMessage=""
                  value={password}
                  name="password"
                  need={true}
                  onChange={setp}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter Password Again"
                  ErrMessage=""
                  value={confirmPassword}
                  name="confirmPassword"
                  need={true}
                  onChange={setcp}
                />
                <Button variant="primary" onClick={()=>setPass()}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
}



export default Setpassword;