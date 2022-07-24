import React from 'react'
import { Container } from 'react-bootstrap';
import Header from '../Header';

export default function Layout(props) {
  // console.log(props.logged);
  return (
    <>
      <Header 
        logged={props.logged}
        CnP={props.CnP}
      />
      
      {props.children}
      
      
    </>
  );
}   
