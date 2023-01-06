import React from 'react'
import s from './NotFoundBlock.module.scss';

const PizzaNotFound: React.FC = () => {
    return (
        <div className={s.root}>
            <h2>😕</h2>
            <br />
            <h2> Pizza Not Found </h2>
            <br />
        </div>
    );
};

export default PizzaNotFound;
