import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPizza, setTotalPizzas, setTotalPrice } from '../../redux/cart/slice';
import { PizzaItem } from '../../redux/pizza/types';
import { useAppDispatch } from '../../redux/store';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
import { cartStateSelector } from '../../redux/cart/selector';

const Pizza: React.FC<PizzaItem> = ({ name, price, imageUrl, sizes, id, types }) => {
    const dispatch = useAppDispatch();
    const cartState = useSelector(cartStateSelector);

    const [amount, setAmount] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);
    const [doughType, setDoughType] = React.useState(types[0]);
    const [newPrice, setNewPrice] = React.useState<number>(price);

    useWhyDidYouUpdate('Pizza', cartState);

    React.useEffect(() => {
        const pizzaAmount = cartState
            .filter((obj) => obj.key?.substring(0, 2) == String(id))
            .reduce((prev, curr) => {
                return prev + curr.amount;
            }, 0);
        setAmount(pizzaAmount);
    }, [cartState]);

    const onAddPizza = () => {
        dispatch(
            addPizza({
                key: id.toString() + sizes[activeSize].toString() + doughType.toString(),
                name,
                price: newPrice,
                imageUrl,
                size: sizes[activeSize],
                doughType: doughType == 0 ? 'tiny' : 'traditional',
                amount: 1,
            }),
        );
        dispatch(setTotalPizzas());
        dispatch(setTotalPrice());
    };

    const dough = types.map((type, id) => {
        return (
            <li
                key={id}
                className={type == doughType ? 'active' : ''}
                onClick={() => setDoughType(type)}>
                {type == 0 ? 'tiny' : 'traditional'}
            </li>
        );
    });

    const pizzaSizes = sizes.map((size, sizeId) => {
        return (
            <li
                key={sizeId}
                className={activeSize == sizeId ? 'active' : ''}
                onClick={() => setActiveSize(sizeId)}>
                {size} cm.
            </li>
        );
    });

    React.useEffect(() => {
        setNewPrice(Number((price * (1 + activeSize * 0.11)).toFixed(2)));
    }, [activeSize]);
    return (
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
                <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                <h4 className="pizza-block__title">{name}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>{dough}</ul>
                <ul> {pizzaSizes} </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">price {newPrice} $</div>
                <button
                    onClick={() => {
                        onAddPizza();
                    }}
                    className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Add</span>
                    <i>{amount}</i>
                </button>
            </div>
        </div>
    );
};

export default React.memo(Pizza);
