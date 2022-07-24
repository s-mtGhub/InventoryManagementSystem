import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const CategoryList=(props)=>{
    
    const [Clist, setfun] = useState([]);

    
    
    var nameInput = document.getElementById("selectCategory");
    const setval=()=> {
        if(nameInput.value)
        props.setc(nameInput.value);
        // if(props.id==3)
    };
    const temp = async () => {
        setval();
       try {
         const res = await axios.get(
           "http://localhost:2222/api/user/category/getcategory"
         );

         if (res.status < 300) {
           if (res.data) {
             setfun(res.data);
            //  if(props.id==3)
            //  temppro(nameInput.value);
           }
         } else {
           console.log("category not fetched");
         }
       } catch (e) {
         setfun(["wait.."]);
         console.log(e);
       }
     };




    useEffect(()=>{
        temp();
    })



    return (
      <>
        <div style={{ marginBottom: "10px" }}>
          <label>Choose Category</label>
          <div>
            <select
              Name="selectCategory"
              Size="1"
              className="categories"
              id='selectCategory'
            >
              {Clist.map((c) => {
                return (
                  <option value={c._id} >
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
                   
        </div>
      </>
    );
}

export default CategoryList;