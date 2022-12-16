import Link from 'next/link'
import React from 'react'
import { GuiaDeLeitura } from '../data/guiasDeLeitura'
import styles from '../styles/Home.module.css'

type Props = {
    guide: GuiaDeLeitura
}

export const formatLevel = (level: string) => {
    if (level === 'basic') return 'Iniciante'
    if (level === 'intermediate') return 'Intermediário'
    if (level === 'advanced') return 'Avançado'
}

export const formatCreators = (guide: GuiaDeLeitura) => {
}

export default function ReadingGuideCard({ guide }: Props) {
    return (
        <div className={styles.readingGuideCard}>
            <h3>{guide.title}</h3>
            <p>Do <strong>{formatLevel(guide.initialLevel)}</strong> para <strong>{formatLevel(guide.finalLevel)}</strong> <br></br> {guide.livros.length} livros</p>
            <p>{guide.intro}</p>
            <h5><span style={{ fontWeight: 200 }}>Criado por: </span>{guide.createdBy.map(creator => (<p key={creator}>{creator} </p>))}</h5>
            <Link href={`/guias-de-leitura/${guide.slug}`}>Acessar</Link>
        </div>
    )
}   