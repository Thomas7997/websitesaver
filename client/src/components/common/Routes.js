import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Index from "../pages/Index";

const RoutesComponents = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>} />
            </Routes>
        </Router>
    );
}

export default RoutesComponents;