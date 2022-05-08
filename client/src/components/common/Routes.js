import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Index from "../pages/Index";
import Add from '../pages/Add';
import View from '../pages/View';

const RoutesComponents = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/save" element={<Add/>} />
                <Route path="/website/:id" element={<View/>} />
            </Routes>
        </Router>
    );
}

export default RoutesComponents;