import React from 'react'
import styles from '../styles/Home.module.css'

type Props = {
    totalItems: number;
    itemsPerPage: number;
    setCurrentPage: (number: number) => void;
    currentPage: number
}

function Pagination({ totalItems: totalItems, itemsPerPage: itemsPerPage, setCurrentPage, currentPage }: Props) {
    let items = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        items.push(i)
    }

    return (
        <div className={styles.pagination}>
            {currentPage > 1 ? <button onClick={() => setCurrentPage(currentPage - 1)}>Voltar</button> : ''}
            <button className={styles.active}>{currentPage}</button>
            {currentPage <= (totalItems / itemsPerPage) ? <button onClick={() => setCurrentPage(currentPage + 1)}>Avançar</button> : ''}
        </div >
    )
}

export default Pagination