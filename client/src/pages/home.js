import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAllPics } from '../utils/api';

import Header from '../components/header';
import SearchFooter from '../components/searchFooter';
import './home.css'
import './searchFooter.css'
import MapWrapper from '../components/MapWrapper';

const Home = () => {

    // Set marker state
    const [markers, setMarkers] = useState("");
    // Set search filter state
    const [searchFilter, setSearchFilter] = useState({ location: '', radius: '' });

    // Load all pictures on page load
    useEffect(() => {
        const fetchPicData = async () => {
            try {
            const response = await getAllPics();
            const jsonData = await response.json();
            console.log(jsonData);
            setMarkers(jsonData);
            } catch (error) {
            console.log("error", error);
            }
        };
        fetchPicData();
    }, []);

    // Filter all markers on submission of filter form
    useEffect(() => {
        const center = searchFilter.location;
        const radius = searchFilter.radius;

        const filteredMarkers = markers.filter((marker) => {
            const isWithinRadius = (marker, center, radius) => {
                let response = SphericalUtil.computeDistanceBetween(
                    {lat: 25.775, lng: -80.19},
                    {lat: 21.774, lng: -80.19}
                )
            };
            return isWithinRadius;
        });
        console.log(filteredMarkers);
        setMarkers(filteredMarkers);
    }, [searchFilter]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setSearchFilter({ ...searchFilter, [name]: value });        
    };

    const handleFilter = (searchFilter) => {
        setSearchFilter(searchFilter);
        console.log(searchFilter);
    };

    return (
        <div>
        <Header />
        <div id="map" className="">
            <MapWrapper markers={markers} />
        </div>
        <section className="py-5">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <h2>Engaging Background Images</h2>
                        <p className="lead">The background images used in this template are sourced from Unsplash and are open source and free to use.</p>
                        <p className="mb-0">I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>
                    </div>
                </div>
            </div>
        </section>
        <SearchFooter markers={markers} searchFilter={searchFilter} handleFormChange={handleFormChange} handleFilter={handleFilter} />
        </div>
    )
};

export default Home;