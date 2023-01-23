import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router'
import _ from 'lodash';

import { getProperty } from './services/getProperties';
import { EmptySearch, PropertyPreview, PropertyListItem, Search } from './components';
import { IProperty } from './typings';
import "./styles/main.scss";

const propertyData: IProperty[] = [...Array(1000)].map(() => getProperty());

const debouncedHandleSearch = _.debounce((searchTerm: string, setFilteredProperties: React.Dispatch<React.SetStateAction<IProperty[]>>, propertyData: IProperty[]) => {
  if (searchTerm) {
    const filteredData = propertyData.filter((property: IProperty) => {
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
        <Routes>
          <Route path="property/:id" element={<PropertyPreview propertyData={propertyData} />} />
          <Route path="/" element={
            <>
              <Search searchTerm={searchTerm} onChange={handleSearchTermChange} />
              <ul className="homepage__list">
                {filteredProperties.length === 0
                  ? <EmptySearch searchTerm={searchTerm} />
                  : filteredProperties.map((element, index) => (
                    <Link to={`/property/${element.id}`}>
                      <PropertyListItem propertyDetails={element} />
                    </Link>
                  ))}
              </ul>
            </>
          } />
        </Routes>
    </div>
  );
};

export default App;