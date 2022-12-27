/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Book } from '../types/Book'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

type Props = {
    book: Book
}

export default function BookCard({ book }: Props) {
    const readingLevel: string = book.level

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookImgBox}>
                <img src={book.image} alt={book.title} className={styles.bookImg} />
            </div>
            <div className={styles.bookInfos}>
                <h3 className={styles.bookTitle}>{book.title} <span style={{ fontWeight: 200, fontSize: 12 }}>({book.id})</span></h3>
                <p><strong>{book.author}</strong> {book.publishedYear}</p>
                <p><strong>Nível de Leitura: </strong>{book.level === 'basic' ? 'Iniciante' : book.level === 'advanced' ? 'Avançado' : 'Intermediário'}</p>
                <p>{book.shortDescription}</p>

                <div className={styles.bookBtnWrapper}>
                    {book.audiobookLink ? <a style={{ background: 'blue' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={book.audiobookLink}>Audiobook</a> : ''}
                    {book.freeBookLink ? <a style={{ background: 'green' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={book.freeBookLink}>Leitura Grátis</a> : ''}
                    {book.onlineBookLink ? <a style={{ background: '#8B8000' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={book.onlineBookLink}>Comprar Livro Online</a> : ''}
                    {book.bookLink ? <a style={{ background: '#8b0000' }} className={styles.bookBtn} target='_blank' rel='noreferrer' href={book.bookLink}>Comprar Livro Fisico</a> : ''}
                </div>
            </div>
        </div>
    )
}