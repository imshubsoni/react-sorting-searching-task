import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchData, sortData } from "../utilities/reduxSlices/tableData";

const Body = () => {
  const dispatch = useDispatch();

  const tabledata = useSelector((state) => state.tabledata);

  const searchInput = useRef();

  const handleSearch = () => {
    // Shifted the search logic to the Reducers in the TableData Slice, because it's easy to manipulate data in the slice,
    dispatch(searchData(searchInput.current.value));
  };

  const handleSortData = () => {
    // I identified the mistake i was making while updating array -- mentioned it in the sortData method -- I tried to change "number" property instead of changing the whole object and that's why it throws the error - "Can't change the read-only property "number""
    dispatch(sortData(tabledata.data));
  };

  if (tabledata === null) return;

  return (
    <div>
      <div className="search-input">
        <input type="text" placeholder="search" ref={searchInput}></input>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <table>
        <tr>
          <th>Key</th>
          <th>Name</th>
          <th onClick={handleSortData}>Number</th>
        </tr>
        {tabledata.data.map((record) => {
          return (
            <tr key={record["key"]}>
              <td>{record["key"]}</td>
              <td>{record["name"]}</td>
              <td>{record["number"]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Body;
