import React, { useState } from "react";

import "./App.scss";
import _ from "lodash";

const { faker } = require('@faker-js/faker');

const createFakeProperty = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.word(),
  description: faker.lorem.sentence(),
  address: {
      country: faker.address.country(),
      city: faker.address.city(),
      street: faker.address.street(),
      zipCode: faker.address.zipCode(),
  },
  picture: {
      url: faker.image.abstract()
  }
})

const propertyData = [...Array(1000)].map(() => createFakeProperty());

const debouncedHandleSearch = _.debounce((searchTerm: string, setFilteredProperties: any, propertyData: any) => {
  if (searchTerm) {
    const filteredData = propertyData.filter((property: any) => {
      return (
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProperties(filteredData);
  } else {
    setFilteredProperties(propertyData);
  }
}, 500);

export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(propertyData);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if(searchTerm.length){
        debouncedHandleSearch(e.target.value,setFilteredProperties,propertyData);
    }else{
        setFilteredProperties(propertyData)
    }
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
            <li key={element.id} className="homepage__list__item">
              <img src={element.picture.url} />
              <div className="homepage__list__item__content">
                <div key={element.id} >
                  <span className="homepage__list__item__title">Property title:</span>
                  {element.title}
                </div>
                <div key={element.id} >
                  <span className="homepage__list__item__description">Description:</span>
                  {element.description}
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;