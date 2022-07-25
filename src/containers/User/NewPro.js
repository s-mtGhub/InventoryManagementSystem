import React, { useState } from "react";
import Input from "../../components/UI/Input";
import { Container, Button } from "react-bootstrap";
import CategoryList from "./categoryList";
const NewPro = (props) => {
  function selection() {
    if (props.id == 1) props.proSub1();
    else props.fun(props.cdata);
  }

  return (
    <>
      <div className="cat-main-body">
        {(props.id==1)?<h4 className="sticky">Add New Product</h4>:<h4 className="sticky">{props.product.name}</h4>}
        <Input
          label="Product Name *"
          type="text"
          placeholder="Product"
          value={props.name}
          onChange={props.setn}
          name="product"
          need={true}
        />
        <Input
          label="Price (in Rs.) *"
          type="number"
          placeholder="Price"
          value={props.price}
          onChange={props.setp}
          name="price"
          need={true}
        />
        <Input
          label="Quantity*"
          type="number"
          placeholder="Quantity"
          value={props.quantity}
          onChange={props.setq}
          name="product"
          need={true}
        />
        <Input
          label="description *"
          type="text"
          placeholder="desciption"
          value={props.desc}
          onChange={props.setd}
          name="desc"
          need={true}
        />
        <Input
          label="Product Images"
          type="file"
          placeholder=""
          ErrMessage="Not required"
          value={props.image}
          onChange={props.seti}
          name="productImage"
          need={false}
        />
        {
        props.id==1?<CategoryList
        id={1}
         Cdata={props.Cdata}
            setc={props.setc}
        />:null}
        <Button variant="primary" onClick={props.prosub1}>
          {props.btn}
        </Button>
      </div>
    </>
  );
};
     
export default NewPro;
