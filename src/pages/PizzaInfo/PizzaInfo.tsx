import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PizzaItem } from '../../redux/pizza/types';
import s from './PizzaInfo.module.scss';
// import s from './PizzaInfo.module.scss';

const PizzaInfo: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState<PizzaItem>();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(
                    `https://6341a70016ffb7e275d5902f.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        };

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>loading...</>;
    }

    const { imageUrl, name, price, types, sizes } = pizza;

    const ingredients = pizza.ingredients?.split(', ').map((obj, id) => {
        return (
            <li className={s.IngredientsItem} key={id}>
                {obj}
            </li>
        );
    });

    const dough = types.map((type, id) => {
        return <li key={id}>{type == 0 ? 'tiny' : 'traditional'}</li>;
    });

    return (
        <div className="container">
            <div className={s.pizza}>
                <img className={s.img} src={imageUrl} alt="" />
                <div className={s.pizzaInfo}>
                    <h1 className={s.pizzaName}>{name}</h1>
                    <div className={s.ingredients}>
                        <h2>Ingredients:</h2>
                        <div className={s.ingredientsItems}>{ingredients} </div>
                    </div>

                    <div className={s.sizes}>
                        <h2>Available sizes:</h2>
                        <div className={s.sizesItems}>
                            {sizes.map((obj, id) => {
                                return (
                                    <li className={s.size} key={id}>
                                        {obj} cm
                                    </li>
                                );
                            })}
                        </div>
                    </div>

                    <div className={s.dough}>
                        <h2>Doughtype:</h2>
                        <div className={s.doughItems}>{dough}</div>
                    </div>

                    <h2>Price: {price}$</h2>
                </div>
            </div>
        </div>
    );
};

export default PizzaInfo;
