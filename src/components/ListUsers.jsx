import { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";
import Card from "./Card/Card";

//
function ListUsers({ dataList }) {
  return (
    <>
      {!dataList ? (
        <>{"Loading"}</>
      ) : (
        <>
          {dataList.map((element) => (
            <Card key={uuid()} data={element} />
          ))}
        </>
      )}
    </>
  );
}

export default ListUsers;
