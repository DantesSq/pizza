import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default React.memo(MainLayout);
