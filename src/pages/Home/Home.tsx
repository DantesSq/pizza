import React from 'react';
import qs from 'qs';

import Categories from '../../components/Categories/Categories';
import Pizza from '../../components/Pizza/Pizza';
import Skeleton from '../../components/Skeleton/Skeleton';
import Sort from '../../components/Sort/Sort';
import { useSelector } from 'react-redux';
import { setCurrentPage, setPages, setParameters } from '../../redux/filter/slice';
import { filterSelector } from '../../redux/filter/selector';
import { Params } from '../../redux/filter/types';
import { useNavigate } from 'react-router-dom';
import PizzaNotFound from '../../components/NotFoundBlock/PizzaNotFound';
import { fetchPizzas } from '../../redux/pizza/slice';
import { RootState, useAppDispatch } from '../../redux/store';
import Pagination from '../../components/Pagination/Pagination';

const Home: React.FC = () => {
    const searchInputValue = useSelector((state: RootState) => state.search.searchInputValue);
    const { sortType, arrSort, activeIndex, currentPage, pizzaPerPage, sort } =
        useSelector(filterSelector);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { items, status } = useSelector((state: RootState) => state.pizza);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    React.useEffect(() => {
        if (items.length) {
            const pages = Math.ceil(items.length / pizzaPerPage);
            dispatch(setPages(pages));
            if (currentPage > pages) dispatch(setCurrentPage(1));
        }
    }, [items]);

    const getPizzas = async () => {
        const search = searchInputValue ? `&search=${searchInputValue}` : '';
        const sortBy = `?sortBy=${arrSort[sortType].replace('-', '')}`;
        const order = arrSort[sortType].includes('-') ? 'desc' : 'esc';
        const category = activeIndex == 0 ? '' : `?&category=${activeIndex}`;
        dispatch(fetchPizzas({ search, sortBy, order, category }));
    };

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const { category, sort, order, page } = params;

            dispatch(setParameters({ category, sort, order, page } as Params));
            isSearch.current = true;
        }
        isSearch.current = false;
    }, []);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: arrSort[sortType],
                order: arrSort[sortType].includes('-') ? 'desc' : 'esc',
                category: activeIndex,
                page: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [searchInputValue, arrSort[sortType], activeIndex, currentPage]);

    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
        window.scrollTo(0, 0);
    }, [searchInputValue, arrSort[sortType], activeIndex, currentPage]);

    return (
        <div className="container">
            {items.length == 0 && searchInputValue !== '' ? (
                <PizzaNotFound />
            ) : (
                <div>
                    <div className="content__top">
                        <Categories />
                        <Sort sortType={sortType} sort={sort} />
                    </div>
                    <h2 className="content__title">All pizzas</h2>
                    <div className="content__items">
                        {status == 'loading'
                            ? [...new Array(8)].map((_, id) => <Skeleton key={id} />)
                            : items.map((obj, id) => {
                                  if (Math.ceil((id + 1) / pizzaPerPage) === currentPage) {
                                      return <Pizza key={obj.id} {...obj} />;
                                  }
                              })}
                    </div>
                </div>
            )}

            {!!items.length && <Pagination />}
        </div>
    );
};

export default React.memo(Home);
