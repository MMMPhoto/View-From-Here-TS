import React, { Component } from 'react'; 


const SearchFooter = ({markers, searchFilter, handleFormChange, handleFilter}) => {

    let location = "";
    let radius = "";

    return (
        <footer id="searchFooter" className="py-5 bg-dark">
            <div className="container">
            <form className="mx-1 mx-md-4 d-flex flex-row">

                <div className="d-flex flex-row align-items-center mb-12">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <input type="text" name="location" id="search-center" className="form-control" placeholder="GPS" onChange={event => handleFormChange(event)} value={searchFilter.location} />
                        <label className="form-label" htmlFor="search-center">GPS</label>
                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                    <input type="text" name="radius" id="search-radius" className="form-control" placeholder="Radius" onChange={event => handleFormChange(event)} value={searchFilter.radius} />
                    <label className="form-label" htmlFor="search-radius">Radius</label>
                    </div>
                </div>


                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-">
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => handleFilter(searchFilter)}>Filter</button>
                </div>

                </form>
                {/* <p className="m-0 text-center text-white"> Search Bars go here</p> */}
            </div>
        </footer>
    )
};

export default SearchFooter;