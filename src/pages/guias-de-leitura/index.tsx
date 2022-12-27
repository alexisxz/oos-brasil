import Head from 'next/head'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import ReadingGuideCard from '../../components/ReadingGuideCard'
import { data, GuiaDeLeitura } from '../../data/guiasDeLeitura'
import Link from 'next/link'
import SelectSearch, { SelectedOptionValue } from 'react-select-search'
import "react-select-search/style.css";


export default function ReadingGuide() {
    const [guides, setGuides] = useState<GuiaDeLeitura[]>(data)
    const [filters, setFilter] = useState({
        level: '',
    })

    // filters options
    const readingLevelOptions = [{ name: "Todos", value: "" }, { name: "Iniciante", value: "basic" }, { name: "Intermediário", value: "intermediate" }, { name: "Avançado", value: "advanced" }]

    //useEffects
    useEffect(() => {

        if (filters.level === '') return setGuides(data)

        setGuides(data.filter(guide => guide.initialLevel === filters.level))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    //handles
    const handleOnChange = (filter: string, selected: SelectedOptionValue | SelectedOptionValue[] | React.FormEvent<HTMLInputElement>) => {
        setFilter({ ...filters, [filter]: selected ? selected : "" });
    }

    return (
        <div>
            <Head>
                <title>OOS Brazil - Guias de leitura</title>
                <meta name="description" content="Uma leitura organizada para uma melhor formação marxista-leninista" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.section}>
                <header className={styles.header}>
                    <SideBar />
                </header>

                <main className={styles.main}>
                    <div className={styles.mainDiv}>
                        <p style={{ textAlign: 'center' }}>Caso queira adicionar ou sugerir um guia, nos <Link style={{ color: 'blue' }} href='/comunidade'>contate</Link></p>
                        <div className={styles.readingGuideFilters}>
                            <label>Filtrar por nível de leitura</label>
                            <SelectSearch options={readingLevelOptions} search={true} placeholder="Nível de Leitura" onChange={e => handleOnChange("level", e)} value={filters.level} />
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
