import Head from 'next/head'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import { data, GuiaDeLeitura } from '../../data/guiasDeLeitura'
import { useRouter } from 'next/router'
import GuideBookCard from '../../components/GuideBookCard'


export default function GuiaPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const route = useRouter()
    const guide = data.find(guide => guide.slug === route.query.guiaId)

    useEffect(() => {
        if (!guide?.id) {
            route.replace('/guias-de-leitura')
        }
        setIsLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Head>
                <title>OOS Brazil - Formação Socialista</title>
                <meta name="description" content={`Guia de leitura para formação socialista`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <p>Carregando seu guia...</p>
                </div>
            ) : (
                <section className={styles.section}>
                    <header className={styles.header}>
                        <SideBar />
                    </header>

                    <main className={styles.main}>
                        <div className={`${styles.mainDiv}`} style={{ textAlign: 'center' }}>
                            <h3>{guide?.title}</h3>
                            <p>{guide?.intro}</p>
                            <h5>Autor(a/es/as): {guide?.createdBy.map(creator => (<p key={creator}>{creator}</p>))}</h5>
                        </div>

                        <div className={`${styles.mainDiv}`}>
                            {guide?.livros.map(book => (
                                <GuideBookCard key={book.id} book={book} />
                            ))}
                        </div>
                    </main>

                </section>
            )}
        </div>
    )
}
