import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import { FaTh, FaList } from 'react-icons/fa';

export const Sort = () => {
  const { SetGridView, SetListView, Grid_View, Sorting } = useFilterContext();

  const iconStyle = {
    marginRight: '10px', 
  };

  const selectStyle = {
    marginLeft: '10px',
    width: '150px', 
  };

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={SetGridView} className="btn btn-dark" style={iconStyle}>
          <FaTh /> 
        </button>
        <button onClick={SetListView} className="btn btn-dark">
          <FaList />
        </button>
        <select id="sort" onChange={Sorting} className="form-select" style={selectStyle}>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
      <br />
    </div>
  );
};

export default Sort;
