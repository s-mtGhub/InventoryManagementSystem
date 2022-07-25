import React, {  useEffect, useState } from "react";
import axios from "axios";
import Product from "./product";
import "../../App.css"
const Category = (props) => {
    
    const [Id,setId]=useState();
   const [catOP, setcatOP] = useState(false);
   const [PList,setPro]=useState([])
   const setProfun=(data)=>{
    setPro(data);
    props.setp(data);
   }

const showPro=async(id,indx)=>{
    setId(id);
    let indX = localStorage.getItem('index');
    if(!indX)
    {setcatOP(true);
    }  
    else if(indx==JSON.parse(indX))
    {
        console.log(JSON.parse(indX));
        setcatOP(!catOP);
    }else{
       console.log(JSON.parse(indX));
    setcatOP(true);
   }
   localStorage.setItem('index',indx);
    // if(indX!=indx)
   indX=indx; 
              
        try{
            if(!catOP)return;
           const res = await axios.post(
             "http://localhost:2222/api/user/list/product",
             {
               _id: id,
             },
             {
               headers: {
                 "Access-Control-Allow-Origin": "*",
                 "Content-Type": "application/json",
               },
             }
           );
          
           if(res.status<300){
            if(res.data)
            setProfun(res.data);
            console.log("product",res.data);
           }
        }catch(e){
            console.log(e);
        }
    }

  return (     
    <>
      <div className="cat-list">
        {props.CnP.map((CP,indx) => {
          return (
            <div className="cat-item">
              <li onClick={() => showPro(CP._id, indx)}>
                <b>{CP.name}</b>
              </li>
                {catOP && Id == CP._id ? (
                  <div className="products">
                    <Product data={PList} display={catOP} 
                    // pdata={props.pdata}
                      // setp={props.setp}
                    />
                  </div>
                ) : null}
            </div>
          );
        })}
      </div>

    </>
  );
};

export default Category;
