import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div className={s.root}>
            <h2>😕</h2>
            <br />
            <h2> Page Not Found </h2>
            <br />
            <Link to="/" className="button button--black">
                <span>Come Back</span>
            </Link>
        </div>
    );
};

export default NotFoundBlock;
