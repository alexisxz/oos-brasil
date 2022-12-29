import Head from 'next/head'
import React from 'react'
import SideBar from '../components/SideBar'
import styles from '../styles/Home.module.css'
import fotoKarlMarx from '../../public/doubt-karl-marx.jpg'
import Image from 'next/image'

type Props = {}

export default function Custom404({ }: Props) {
    return (
        <div>
            <Head>
                <title>OOS Brazil - Organizações</title>
                <meta name="description" content="Se organize em uma organização socialista perto de você" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.section}>
                <header className={styles.header}>
                    <SideBar />
                </header>

                <main className={styles.errorPage}>
                    <div className={styles.errorPageInfos}>
                        <h2>400</h2>
                        <p>Essa página nem Karl Marx conseguiu desvendar!</p>
                    </div>
                </main>
            </section>
        </div>
    )
}