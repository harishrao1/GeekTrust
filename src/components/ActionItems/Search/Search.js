import styles from "./Search.module.css";
const Search = ({ placeholder, onChange }) => {
  return (
    <>
      <input
        className={styles.searchBar}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </>
  );
};
export default Search;
