import React, { useEffect, useState } from "react";
import { axios } from "axios";
const Geek = () => {
  const [data, setData] = useState("");
  // Async and AWait | Showing Data in Browser
  async function makerequest() {
    try {
      console.log("Button Clicked");
      const res = await axios.get("data.txt");
      console.log(res);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {}, []);

  return (
    <div>
      Geek
      <br />
      <div className="m-auto w-1/2">
        <button
          type="submit"
          onClick={makerequest}
          className="bg-slate-500 rounded text-white p-2  mt-4 w-1/3"
        >
          Fetch Data
        </button>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default Geek;
