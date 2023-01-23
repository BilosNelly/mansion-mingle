import { useParams } from "react-router";

interface Props {
  propertyData: any;
}

export const Property = (props: Props) => {
  let { id } = useParams();
  const property = props.propertyData.filter((property: any) => property.id === id)[0];

  return (
    <div className="homepage__property__preview">
      <img src={property.picture.url} />
      <div className="homepage__property__details">
        <span >{property.title}</span>
        <span >{property.description}</span>
        <span >
          {property.address.street}, {property.address.city}, {property.address.zipCode}, {property.address.country}
        </span>
      </div>
    </div>
  );
};