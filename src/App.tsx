import './scss/app.scss';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PizzaInfo from './pages/PizzaInfo/PizzaInfo';
import { NotFound } from './pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/pizza/:id" element={<PizzaInfo />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
