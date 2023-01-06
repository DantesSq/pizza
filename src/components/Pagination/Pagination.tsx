import React from 'react';
import { useSelector } from 'react-redux';
import { setCurrentPage, setCurrentPageNext, setCurrentPagePrev } from '../../redux/filter/slice';
import { RootState, useAppDispatch } from '../../redux/store';

import s from './Pagination.module.scss';

const Pagination: React.FC = () => {
    const { currentPage, pages } = useSelector((state: RootState) => state.filter);
    const dispatch = useAppDispatch();

    return (
        <div className={s.root}>
            <li
                onClick={() => {
                    dispatch(setCurrentPagePrev());
                }}
                className="prev">
                <a>{'<'}</a>
            </li>
            {pages.map((_obj, id) => {
                return (
                    <li
                        onClick={() => {
                            dispatch(setCurrentPage(id + 1));
                        }}
                        key={id}
                        className={id + 1 === currentPage ? 'selected' : ''}>
                        <a>{id + 1}</a>
                    </li>
                );
            })}
            <li
                onClick={() => {
                    dispatch(setCurrentPageNext());
                }}
                className="next">
                <a>{'>'}</a>
            </li>
        </div>
    );
};

export default Pagination;
