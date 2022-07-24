import React from "react";

import Input from "../../components/UI/Input";
import { Container, Button } from "react-bootstrap";

const NewCat = (props) => {
  function selection() {
    if (props.id == 1) props.catSub1();
    else props.fun(props.cdata);
  }

  return (
    <>
      <div className="cat-main-body">
        <Input
          label="Category Name *"
          type="text"
          placeholder="Category"
          value={props.name}
          onChange={props.setc}
          name="category"
          need={true}
        />
        <Input
          label="Category Images"
          type="file"
          placeholder=""
          ErrMessage="Not required"
          value={props.image}
          onChange={props.seti}
          name="categoryImage"
          need={false}
        />
        <Button variant="primary" onClick={selection}>
          {props.btn}
        </Button>
      </div>
    </>  
  );
};

export default NewCat;
