import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Container,Row,Form,Col,Button } from 'react-bootstrap';
import Input from '../components/UI/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword(props){
  let navigate=useNavigate();
  const [mess, setmess] = useState("");
  // const [Log, setlog] = useState([]);

  const [email, setemail] = useState("");
  function sete(e) {
    setemail(e.target.value);
  }
  const setmessfun=(error) =>{
    if(error.data.error)
    setmess(error.data.error);
    // if (error.status >= 300 && error.status < 400 ) {
      else
      setmess(error.data.message);
    // }
  }


   const sendMail=()=>{
      
    axios
      .post("http://localhost:2222/api/user/sendresetpasswrodlink", {
        "email": `${email}`,
      })
      .then((res) => {
        if (res.status < 300) {
          console.log(res.data);
          window.alert("Reset Link has been sent to your mail..Please Check");
          setmess("Reset Link has been sent to your mail..Please Check");
        } else {
          console.log("link not sent");
          setmess(res.data.message);
          return;
        }
        navigate("/");
        console.log(res.rsponse);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setmessfun(error.response);
         
        }
      });  
  };

   
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
                  label="Email address"
                  type="email"
                  placeholder="Enter email"
                  ErrMessage="We'll share a Reset link to  your Registered email ."
                  value={email}
                  name="email"
                  need={true}
                  onChange={sete}
                />
                <Button variant="primary" onClick={()=>sendMail()}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
}