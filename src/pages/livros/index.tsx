import Head from 'next/head'
import SideBar from '../../components/SideBar'
import BookCard from '../../components/BookCard'
import { fakeDataLivros } from '../../data/fakeData'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../firebase'
import Pagination from '../../components/Pagination'
import Link from 'next/link'

export default function Livros() {
    const databaseRef = collection(database, 'books')

    const [getBooks, setGetBooks] = useState<any[] | Book[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [authores, setAuthores] = useState<string[]>([])
    const [filters, setFilter] = useState({
        authores: 'all',
        readingLevel: 'all' || 'basic' || 'intermediate' || 'advanced,',
        title: '',
    })

    // pagination
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [booksPerPage, setBooksPerPage] = useState<number>(5)
    const lastBookIndex = currentPage * booksPerPage;
    const firstBookIndex = lastBookIndex - booksPerPage;
    const currentBooks = books.slice(firstBookIndex, lastBookIndex)

    useEffect(() => {
        readDataFirebase()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setBooks(getBooks)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getBooks])

    useEffect(() => {
        getAuthores()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books])

    useEffect(() => {
        setCurrentPage(1)
        if (filters.authores === 'all' && filters.readingLevel === 'all') {
            const newBooksArray = getBooks.filter(book => book.title.includes(filters.title))
            return setBooks(newBooksArray)
        }

        if (filters.authores === 'all') {
            const newBooksArray = getBooks.filter(book => book.level === filters.readingLevel && book.title.includes(filters.title))
            return setBooks(newBooksArray)
        }

        if (filters.readingLevel === 'all') {
            const newBooksArray = getBooks.filter(book => book.author === filters.authores && book.title.includes(filters.title))
            return setBooks(newBooksArray)
        }

        const newBooksArray = getBooks.filter(book => book.author === filters.authores && book.level === filters.readingLevel && book.title.includes(filters.title))
        return setBooks(newBooksArray)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    //read and getters
    const readDataFirebase = async () => {
        await getDocs(databaseRef)
            .then((response) => {
                setGetBooks(response.docs.map((book) => {
                    return { ...book.data(), id: book.id }
                }))
            })
    }

    const getAuthores = () => {
        let allAuthores: string[] = []

        getBooks.map(book => {
            if (allAuthores.find(author => author === book.author)) return;
            return allAuthores = [...allAuthores, book.author]
        })

        setAuthores(allAuthores);
    }

    // handlers
    const handleOnChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setFilter({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
    }


    return (
        <div>
            <Head>
                <title>OOS Brazil - Livros</title>
                <meta name="description" content="Livros para estudar o socialismo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.section}>
                <header className={styles.header}>
                    <SideBar />
                </header>

                <main className={styles.main}>
                    <div className={styles.mainDiv}>
                        <p style={{ textAlign: 'center' }}>Caso não tenha o livro que deseja, nos <Link style={{ color: 'blue' }} href='/comunidade'>contate</Link></p>
                        <div className={styles.booksFilter}>
                            <label>Buscar por título</label>
                            <input type="text" name='title' onChange={(e) => handleOnChange(e)} />
                        </div>

                        <div className={styles.booksFilter}>
                            <label>Filtrar por autor(a/es/as)</label>
                            <select name='authores' value={filters.authores} onChange={handleOnChange}>
                                <option value="all">Todos</option>
                                {authores.map(author => (
                                    <option value={author} key={author}>{author}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.booksFilter}>
                            <label>Filtrar por nível de leitura</label>
                            <select name='readingLevel' value={filters.readingLevel} onChange={handleOnChange}>
                                <option value="all">Todos</option>
                                <option value="basic">Iniciante</option>
                                <option value="intermediate">Intermediário</option>
                                <option value="advanced">Avançado</option>
                            </select>
                        </div>

                        {filters.authores === 'all' && filters.readingLevel === 'all' ? '' : books.length <= 0 ? <div>Infelizmente não temos nenhum livro que caiba no seu critério :(</div> : ''}

                    </div>
                    <div className={styles.mainDiv}>
                        {currentBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                        <Pagination totalBooks={books.length} booksPerPage={booksPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>



                </main>

            </section>
        </div>
    )
}
