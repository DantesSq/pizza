import React from 'react'
import { Link } from 'react-router-dom';
import cartPng from '../../assets/img/empty-cart.png';

const EmptyCart: React.FC = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Empty cart😕</h2>
                    <p>
                        You have not ordered the pizza.
                        <br />
                        Move to main page to order the pizza.
                    </p>
                    <img src={cartPng} alt="Empty cart" />
                    <Link to="/" className="button button--black">
                        <span>Come Back</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;
