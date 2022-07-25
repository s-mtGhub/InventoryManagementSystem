import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Col ,Row} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import Layout from '../../components/Layout';
import CatBody from './CatBody';
const UpdateCategory = (props) => {
    const [srno,setsrno]=useState(1);
    return(
        <>
     <Layout>
        <Container className='profile-body'>
            <div className='cat-actions profile-list'>
                 <div onClick={()=>{setsrno(1)}}>Add New Category</div>
                 <div onClick={()=>{setsrno(2)}}>Modify Existing Category</div>
                 <div onClick={()=>{setsrno(3)}}>Delete Category</div>
            </div>
           <div className='profileset'>

           <Row>
            <Col md={6}>
            <div className='cat-actions body'>
                <CatBody id={srno}
                    Clist={props.Clist}
                />
            </div>
            </Col>
           </Row>
           </div>
        </Container>

     </Layout>
    </>
    )
};
export default UpdateCategory;
    