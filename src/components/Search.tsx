interface Props {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = (props: Props) => {
  return (
    <div className="homepage__searchbar">
      <div className="homepage__searchbar__title">What are you searching for?</div>
      <input type="text" placeholder="Search by title or description" value={props.searchTerm} onChange={props.onChange} />
    </div>
  );
};