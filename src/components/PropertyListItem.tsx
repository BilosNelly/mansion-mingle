interface Props {
  element: any;
}

export const PropertyListItem = (props: Props) => {

  const propertyDetail = props.element;

  return (
    <li key={propertyDetail.id} className="homepage__list__item">
      <img src={propertyDetail.picture.url} />
      <div className="homepage__list__item__content">
        <div key={propertyDetail.id} >
          <span className="homepage__list__item__title">Property title:</span>
          {propertyDetail.title}
        </div>
        <div key={propertyDetail.id} >
          <span className="homepage__list__item__description">Description:</span>
          {propertyDetail.description}
        </div>
      </div>
    </li>
  );
};