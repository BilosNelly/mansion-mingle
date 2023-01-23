import { EmptySearchState } from "../assets";

interface Props {
  searchTerm: string;
}

export const EmptySearch = (props: Props) => {
  return (
    <div className="homepage__empty-search">
      <img src={EmptySearchState} className="homepage__empty-search__img" />
      <span className="homepage__empty-search__title">No Results found for:<b>{props.searchTerm}</b></span>
      <span className="homepage__empty-search__description">Please, don't be sad and try again.</span>
    </div>
  );
};