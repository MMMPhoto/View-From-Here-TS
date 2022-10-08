import React, { Component } from 'react'; 

import Header from '../components/header';
import Footer from '../components/footer';
import './home.css'
import MapWrapper from '../components/MapWrapper';

class Home extends Component {

    render() {

        return (
            <><Header />
                <div id="map" className="">
                    <MapWrapper />
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
                <Footer />
            </>

)

    }

}

export default Home;