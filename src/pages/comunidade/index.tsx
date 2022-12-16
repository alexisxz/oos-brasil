import Head from 'next/head'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Home.module.css'
import CommunityCard from '../../components/CommunityCard'
import { useEffect, useState } from 'react'
import { Community } from '../../types/Community'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../firebase'
import ContactWrapper from '../../components/ContactWrapper'


export default function Comunidade() {
    const databaseRef = collection(database, 'communities')

    const [getCommunities, setGetCommunities] = useState<any[] | Community[]>([])
    const [communities, setCommunities] = useState<Community[]>([])

    // useEffects
    useEffect(() => {
        readDataFirestore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCommunities(getCommunities)
    }, [getCommunities])

    // readers and getters
    const readDataFirestore = async () => {
        await getDocs(databaseRef)
            .then((response) => {
                setGetCommunities(response.docs.map(community => {
                    return { ...community.data(), id: community.id }
                }))
            })
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
                        <h3 style={{ textAlign: 'center' }}>Contato OOS Brasil</h3>
                        <ContactWrapper />
                    </div>

                    <div className={`${styles.mainDiv} ${styles.communitiesDiv}`}>
                        {communities.map(community => (
                            <CommunityCard key={community.id} community={community} />
                        ))}
                    </div>
                </main>

            </section>
        </div>
    )
}
