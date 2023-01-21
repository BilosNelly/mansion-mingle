import React, { useEffect, useState } from "react";
import "./App.scss";
import _ from "lodash";

const debouncedHandleSearch = _.debounce((searchTerm: string, setFilteredProperties: any, propertyData: any) => {
  if (searchTerm) {
    const filteredData = propertyData.property.filter((property: any) => {
      return (
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProperties(filteredData);
  } else {
    setFilteredProperties(propertyData.property);
  }
}, 500);

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyData, setPropertyData] = useState<{ property: Array<{id:number, title:string, description:string, address:Array<{country:string, city:string, street:string, zipCode:string}>, picture:string}> }>({property:[]});
  const [filteredProperties, setFilteredProperties] = useState(propertyData.property);

  useEffect(() => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPropertyData(result);
        setFilteredProperties(result.property);
      });
  }, []);


  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedHandleSearch(e.target.value,setFilteredProperties,propertyData);
  };

  return (
    <div className="homepage">
      <div className="homepage__searchbar">
        <div className="homepage__searchbar__title">What are you searching for?</div>
        <input type="text" placeholder="Search by title or description" value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <div className="homepage__wrapper">
        {filteredProperties.length === 0 ? <div>No properties found with the search criteria</div> : filteredProperties.map((element, index) => (
          <ul className="homepage__list">
            <li key={index} className="homepage__list__item">
              <img src={element.picture} />
              <div>Property title: {element.title}</div>
              <div>Description: {element.description}</div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;