import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckBox() {
  const [datas, SetData] = useState([]);
  const [checkData, setCheckData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/places");
        SetData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = async () => {};

  return (
    <div>
      <h1 className="topic">Location</h1>
      {datas.map((data) => {
        return (
          <tr key={data.Place_ID}>
            <input className="Place" type="checkbox" value={data.Place} />{" "}
            {data.Place}
            <br />
          </tr>
        );
      })}
    </div>
  );
}

export default CheckBox;
