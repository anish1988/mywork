import React, { useEffect, useState } from 'react'


function Dropdown() {
  const countries = [
    { name: "India", value: "IN", cities: ["Delhi", "Mumbai"] },
    { name: "Pak", value: "PK", cities: ["Lahore", "Karachi"] },
    { name: "Bangladesh", value: "BG", cities: ["Dhaka", "Chittagong"] }
  ];
  const [country, setCountry] = useState([]);

  useEffect(() => {
    console.log(country[0]);
    console.log(country[1]);
  }, [country]);
  return (
    <>
      <select  value={country}
        onChange={(e) => {
          console.log(e.target.value);
          setCountry([e.target.value]);
        }}>
        {countries.map((items,index ) => {
          return (<options keys={index} value={index}>{items.name}</options>)
        })}
      </select>
      {/* 2nd DropDown */}

      <select>
        {countries[country] &&
          countries[country].cities.map((item, index) => {
            return <option value={index}>{item}</option>;
          })}
      </select>
    </>
  );
}

export default Dropdown

