import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { GuideBook } from '../data/guiasDeLeitura'
import { database } from '../firebase'
import styles from '../styles/Home.module.css'
import { Book } from '../types/Book'

type Props = {
    book: GuideBook
}

function GuideBookCard({ book }: Props) {
    const databaseRef = collection(database, 'books')

    const [getBooks, setGetBooks] = useState<Book[] | any[]>()
    const [selectBook, setSelectBook] = useState<Book>()

    useEffect(() => {
        getBooksFirebase(book.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!getBooks) return
        setSelectBook(getBooks.find((getBook) => getBook.id === book.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getBooks])

    const getBooksFirebase = async (bookId: string) => {
        await getDocs(databaseRef)
            .then((response) => {
                setGetBooks(response.docs.map((book) => {
                    return { ...book.data(), id: book.id }
                }))
            })
    }

    return (
        <div className={styles.guideBookCard}>
            <span>Livro número {book.position}</span>
            <h3>{selectBook?.title}</h3>
            <p>{book.text}</p>
            <div className={styles.bookBtnWrapper}>
                {selectBook?.audiobookLink ? <a style={{ background: 'blue' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={selectBook?.audiobookLink}>Audiobook</a> : ''}
                {selectBook?.freeBookLink ? <a style={{ background: 'green' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={selectBook?.freeBookLink}>Leitura Grátis</a> : ''}
                {selectBook?.onlineBookLink ? <a style={{ background: '#8B8000' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={selectBook?.onlineBookLink}>Comprar Livro Online</a> : ''}
                {selectBook?.bookLink ? <a style={{ background: '#8b0000' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={selectBook?.bookLink}>EBook</a> : ''}
            </div>
        </div>
    )
}

export default GuideBookCard