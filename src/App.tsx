import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router'
import _ from 'lodash';

import { EmptySearch, Property, PropertyListItem, Search } from './components';
import "./styles/main.scss";

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
    if(e.target.value.length){
        debouncedHandleSearch(e.target.value,setFilteredProperties,propertyData);
    }else{
        setFilteredProperties(propertyData)
    }
  };

  return (
    <div className="homepage">
      <Search searchTerm={searchTerm} onChange={handleSearchTermChange} />
      <div className="homepage__wrapper">
        <Routes>
          <Route path="property/:id" element={<Property propertyData={propertyData} />} />
          <Route path="/" element={
            <ul className="homepage__list">
              {filteredProperties.length === 0
                ? <EmptySearch searchTerm={searchTerm} />
                : filteredProperties.map((element, index) => (
                  <Link to={`/property/${element.id}`}>
                    <PropertyListItem element={element} />
                  </Link>
                ))}
            </ul>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;