import React from 'react';
import { useSelector } from 'react-redux';
import { setActiveIndex } from '../../redux/filter/slice';
import { useAppDispatch } from '../../redux/store';

type PizzaCategoriesItem = {
    name: string;
    id: number;
};

const Categories: React.FC = () => {
    const activeIndex = useSelector((state: any) => state.filter.activeIndex);
    const dispatch = useAppDispatch();

    const onClickClass = (id: number) => {
        dispatch(setActiveIndex(id));
    };

    const pizzaCategories: PizzaCategoriesItem[] = [
        { name: 'All', id: 0 },
        { name: 'Meat', id: 1 },
        { name: 'Grill', id: 2 },
        { name: 'Spicy', id: 3 },
        { name: 'Vegetarian', id: 4 },
        { name: 'Closed', id: 5 },
    ];

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((obj) => {
                    return (
                        <li
                            key={obj.id}
                            onClick={() => onClickClass(obj.id)}
                            className={activeIndex == obj.id ? 'active' : ''}>
                            {obj.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default React.memo(Categories);
