import React from 'react'
import styles from '../styles/Home.module.css'

type Props = {
    totalBooks: number;
    booksPerPage: number;
    setCurrentPage: (number: number) => void;
    currentPage: number
}

function Pagination({ totalBooks, booksPerPage, setCurrentPage, currentPage }: Props) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {pages.map((page, index) => {
                return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? `${styles.active}` : ''}>{page}</button>
            })}
        </div >
    )
}

export default Pagination