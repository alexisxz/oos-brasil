import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../public/logos-oosbrasil_lightgray.png'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

type Props = {}

export default function SideBar({ }: Props) {
    const router = useRouter()

    const handleOnClick = () => {
        router.replace('/')
    }
    return (
        <div className={styles.sidebar}>
            <Image src={Logo} alt="OOS Logo" className={styles.headerLogo} onClick={handleOnClick} />
            <nav className={styles.nav}>
                <Link href='/'>Organizações</Link>
                <Link href='/livros'>Livros</Link>
                <Link href='/guias-de-leitura'>Guias de Leitura</Link>
                <Link href='/comunidade'>Comunidade</Link>
            </nav>
            <h6 className={styles.sidebarFooter}>Organização das Organizações Socialistas do Brasil</h6>
        </div>
    )
}