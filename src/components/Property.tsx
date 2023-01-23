import { useParams } from "react-router";

interface Props {
  propertyData: any;
}

export const Property = (props: Props) => {
  let { id } = useParams();
  const property = props.propertyData.filter((property: any) => property.id === id)[0];

  return (
    <div className="homepage__property-preview">
      <img src={property.picture.url} />
      <div className="property-detail__title">{property.title}</div>
      <div className="property-detail__description">{property.description}</div>
      <div className="property-detail__address">
        {property.address.street}, {property.address.city}, {property.address.zipCode}, {property.address.country}
      </div>
    </div>
  );
};