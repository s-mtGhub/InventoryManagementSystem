import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

export default function Input
(props) {

  
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
       type={props.type}
        placeholder={props.placeholder} 
         value={props.value}   
         onChange={props.onChange}
         name={props.name}
         required={props.need}
        />
      <Form.Text className="text-muted">
       {props.ErrMessage}
      </Form.Text>
    </Form.Group>
  );    
}
