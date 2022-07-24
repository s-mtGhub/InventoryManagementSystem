import React from 'react'


const Product=(props)=>{

  console.log(props.data);

    return(<>
            {  (props.data.length>0)?
                props.data.map((p)=>{
                    return(
                        <li >{p.name}</li>
                    )
                }):
                <p >No products yet...</p>
            }
    </>)
}

export default Product;