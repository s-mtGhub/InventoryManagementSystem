import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductList from './ProductList';
import CategoryList from './categoryList';
const ModifyPro=(props)=>{

  
  const search=async()=>{
    if(props.Pdata==0)return;
      let usrdata = localStorage.getItem("User");
      if (!usrdata ) {
          return;
        }
        let user = JSON.parse(usrdata);
        
    try {
        const res = await axios.post(
          "http://localhost:2222/api/user/product",
          {
            _id: props.Pdata,
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
        if (res.data) {
          props.setprdct(res.data);
        }
    } else {
        console.log("category not fetched");
        return;
    }
} catch (e) {
    console.log(e);
    
};
}

const prosub2=()=>{
  if(props.Pdata==0){
      window.alert("Their is not such a product");
      return;
  }
//    props.setdis(!props.display);
   props.funp();
}

useEffect(()=>{
    if(props.Pdata!=0)
    search();
})
    return (
      <>
        <>
          <div>
            <CategoryList
              id={2}
              Cdata={props.Cdata}
              setc={props.setc}
              Pdata={props.Pdata}
              setpr={props.setpr}
            />
            <label>Choose Product</label>
            <ProductList _id={props.Cdata} setpr={props.setpr} />
          </div>
        </>
      </>
    );
    
}

export default ModifyPro;
