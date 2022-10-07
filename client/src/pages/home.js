import React, { Component } from 'react'; 

import Header from '../Components/header';
import Footer from '../Components/footer';

class Home extends Component {

    render() {

        return (
            <><Header /><body>
                <div id map class="py-5 bg-image-full">
                </div>
                <section class="py-5">
                    <div class="container my-5">
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                <h2>Engaging Background Images</h2>
                                <p class="lead">The background images used in this template are sourced from Unsplash and are open source and free to use.</p>
                                <p class="mb-0">I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </body></>

)

    }

}

export default Home;