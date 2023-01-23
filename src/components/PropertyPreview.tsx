import { useState } from "react";
import { useParams } from "react-router";

import { IProperty } from "../typings";

interface Props {
  propertyData: IProperty[];
}

export const PropertyPreview = (props: Props) => {
  let { id } = useParams();
  const property = props.propertyData.filter((property: IProperty) => property.id === id)[0];
  
  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className="homepage__property__preview">
      <a  className="homepage__property__link" href='/'>{'<< Back to list of all properties'}</a>
      <img src={property.picture.url} />
      <div className="homepage__property__details">
        <input className="homepage__property__title" type="text" value={title} onChange={handleTitleChange} />
        <input className="homepage__property__description" type="text" value={description} onChange={handleDescriptionChange} />
        <span >
          {property.address.street}, {property.address.city}, {property.address.zipCode}, {property.address.country}
        </span>
      </div>
    </div>
  );
};