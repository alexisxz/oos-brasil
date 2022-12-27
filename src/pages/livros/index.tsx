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
import SuggestBookPopUp from '../../components/SuggestBookPopUp'
import SelectSearch, { SelectedOptionValue } from 'react-select-search'
import "react-select-search/style.css";

export default function Livros() {
    const databaseRef = collection(database, 'books')

    const [getBooks, setGetBooks] = useState<any[] | Book[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [authores, setAuthores] = useState<string[]>([])
    const [filters, setFilter] = useState({
        authores: '',
        readingLevel: '' || 'basic' || 'intermediate' || 'advanced,',
        title: '',
    })

    // filters options
    const authoreOptions = [{ name: "Todos", value: "" }, ...authores.map(str => ({ name: str, value: str }))];
    const readingLevelOptions = [{ name: "Todos", value: "" }, { name: "Iniciante", value: "basic" }, { name: "Intermediário", value: "intermediate" }, { name: "Avançado", value: "advanced" }]

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
        if (filters.authores === '' && filters.readingLevel === '') {
            const newBooksArray = getBooks.filter(book => book.title.includes(filters.title))
            return setBooks(newBooksArray)
        }

        if (filters.authores === '') {
            const newBooksArray = getBooks.filter(book => book.level === filters.readingLevel && book.title.includes(filters.title))
            return setBooks(newBooksArray)
        }

        if (filters.readingLevel === '') {
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
    const handleOnChange = (filter: string, selected: SelectedOptionValue | SelectedOptionValue[] | React.FormEvent<HTMLInputElement>) => {
        setFilter({ ...filters, [filter]: selected ? selected : "" });
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
                            <input type="text" name='title' onChange={(e) => setFilter({ ...filters, title: e.target.value })} />
                        </div>

                        <div className={styles.booksFilter}>
                            <label>Filtrar por autor(a/es/as)</label>
                            <SelectSearch options={authoreOptions} search={true} placeholder="Autores" onChange={e => handleOnChange("authores", e)} value={filters.authores} />
                        </div>

                        <div className={styles.booksFilter}>
                            <label>Filtrar por nível de leitura</label>
                            <SelectSearch options={readingLevelOptions} search={true} placeholder="Nível de Leitura" onChange={e => handleOnChange("readingLevel", e)} value={filters.readingLevel} />
                        </div>
                        <SuggestBookPopUp />

                        {filters.authores === 'all' && filters.readingLevel === 'all' ? '' : books.length <= 0 ? <div>Infelizmente não temos nenhum livro que caiba no seu critério :(</div> : ''}

                    </div>
                    <div className={styles.mainDiv}>
                        {currentBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                        <Pagination totalItems={books.length} itemsPerPage={booksPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>



                </main>

            </section>
        </div>
    )
}
