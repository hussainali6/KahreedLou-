import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const Filtersection = () => {
  const {
    filters: { text, category, company },
    updateFilterValue,
    All_Products,
    clearfilter
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    newVal = ["ALL", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueData(All_Products, "category");
  const CompanyOnlyData = getUniqueData(All_Products, "company");

  return (
    <div className="container" style={{ backgroundColor: 'silver', border: '5px solid black', padding: '10px' }}>
      <div className="row">
        <div className="col-md-3">
          <form onSubmit={(e) => e.preventDefault()}>
            <label style={{ color: 'black', fontWeight: 'bold' }}>Search</label>
            <br />
            <input
              type="text"
              name="text"
              value={text}
              onChange={updateFilterValue}
              style={{ border: '5px solid gray' }}
            />
          </form>
        </div>
        <div className="col-md-3">
          <form action="#">
            <label style={{ fontWeight: 'bold' }}>Category</label>
            <br />
            <select
              name="category"
              id="category"
              value={category}
              onChange={updateFilterValue}
            >
              {categoryOnlyData.map((curElem, index) => (
                <option key={index} value={curElem}>
                  {curElem}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className="col-md-3">
          <form action="#">
            <label style={{ fontWeight: 'bold' }}>Select Company</label>
            <br />
            <select
              name="company"
              id="company"
              value={company}
              onChange={updateFilterValue}
            >
              {CompanyOnlyData.map((curElem, index) => (
                <option key={index} value={curElem}>
                  {curElem}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className="col-md-3" style={{ marginTop: '10px' }}>
          <button className="btn btn" onClick={clearfilter} style={{ backgroundColor: 'black', color: 'white' }}>
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtersection;
