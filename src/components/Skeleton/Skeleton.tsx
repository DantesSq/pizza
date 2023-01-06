import React from 'react';
import ContentLoader from 'react-content-loader';



const Skeleton: React.FC = (props) => (
    <div className="pizza-block">
        <ContentLoader
            speed={2}
            width={280}
            height={470}
            viewBox="0 0 280 470"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}>
            <circle cx="142" cy="118" r="115" />
            <rect x="0" y="238" rx="12" ry="12" width="280" height="28" />
            <rect x="0" y="286" rx="12" ry="12" width="280" height="90" />
            <rect x="0" y="410" rx="12" ry="12" width="125" height="28" />
            <rect x="169" y="396" rx="20" ry="20" width="108" height="56" />
        </ContentLoader>
    </div>
);

export default Skeleton;
