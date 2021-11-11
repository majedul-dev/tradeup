import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form className="navbar_searchForm" onSubmit={searchHandler}>
      <input
        type="text"
        value={keyword}
        placeholder="Find Cars, Electronics and more"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default Search;
