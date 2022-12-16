import Head from 'next/head'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import ReadingGuideCard from '../../components/ReadingGuideCard'
import { data, GuiaDeLeitura } from '../../data/guiasDeLeitura'


export default function ReadingGuide() {
    const [guides, setGuides] = useState<GuiaDeLeitura[]>(data)
    const [filters, setFilters] = useState({
        level: 'all',
    })

    //useEffects
    useEffect(() => {

        if (filters.level === 'all') return setGuides(data)

        setGuides(data.filter(guide => guide.initialLevel === filters.level))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    //handles
    const handleOnChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [event.currentTarget.name]: event.currentTarget.value })
    }

    return (
        <div>
            <Head>
                <title>OOS Brazil - Comunidades</title>
                <meta name="description" content="Comunidades associadas ao OOS" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.section}>
                <header className={styles.header}>
                    <SideBar />
                </header>

                <main className={styles.main}>
                    <div className={styles.mainDiv}>
                        <div className={styles.booksFilter}>
                            <label>Filtrar por nível de leitura</label>
                            <select name='level' value={filters.level} onChange={handleOnChange}>
                                <option value="all">Todos</option>
                                <option value="basic">Iniciante</option>
                                <option value="intermediate">Intermediário</option>
                                <option value="advanced">Avançado</option>
                            </select>
                        </div>
                        {!guides.length ? <p>Infelizmente não temos nenhum guia que caiba nos seus critérios :(</p> : ''}
                    </div>

                    <div className={`${styles.mainDiv} ${styles.readingGuideDiv}`}>
                        {guides.map(guide => (
                            <ReadingGuideCard key={guide.id} guide={guide} />
                        ))}
                    </div>
                </main>

            </section>
        </div>
    )
}
