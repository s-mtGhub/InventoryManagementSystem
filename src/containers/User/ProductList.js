import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProductList=(props)=>{

    const [Plist, setpfun] = useState([]);
    
    const setpval = () => {
      var nameinput = document.getElementById("selectProduct");
      props.setpr(nameinput.value);
      //   temppro(nameInput.value);
    };

    const temppro = async (id) => {
      setpval();
      try {
        const res = await axios.post(
          "https://inventory-managementsystem.herokuapp.com/api/user/list/product",
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

        if (res.status < 300) {
          if (res.data) {
            setpfun(res.data);
          }
          
        } else {
          console.log("Product not fetched");
        }
      } catch (e) {
        setpfun(["wait.."]);
        console.log(e);
      }
    };

   
    useEffect(() => {
      temppro(props._id);
    });


    return (
      <>
        <div>
          <select
            Name="selectProduct"
            Size="1"
            className="products"
            id="selectProduct"
          >
            {Plist.length>0 ? (
              Plist.map((c) => {
                return <option value={c._id}>{c.name}</option>;
              })
            ) : (
              <option value={0}>No Product</option>
            )}
          </select>
        </div>
      </>
    );
}
    
export default ProductList;