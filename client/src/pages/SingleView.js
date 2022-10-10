import React, { useCallback, useEffect, useRef, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

const SingleView = ({marker}) => {

    return (
        <div>
            <img src={marker.url}></img>
        </div>
    )

};

export default SingleView;


