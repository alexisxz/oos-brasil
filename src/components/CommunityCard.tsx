//tsrfc
import React from 'react'
import styles from '../styles/Home.module.css'
import { Community } from '../types/Community'

type Props = {
    community: Community
}

export default function CommunityCard({ community }: Props) {
    return (
        <div className={styles.communityCard}>
            <h3>{community.name} <span style={{ fontWeight: 200, fontSize: 14 }}>{community.organization}</span></h3>
            <p>{community.shortDescription}</p>
            <p>Plataforma: {community.platform}</p>
            <a href={community.link} target='_blank' rel='noreferrer'>Acessar</a>
        </div>
    )
}