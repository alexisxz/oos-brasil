import Head from 'next/head'
import SideBar from '../components/SideBar'
import BookCard from '../components/BookCard'
import { fakeDataLivros } from '../data/fakeData'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../firebase'
import { Organization } from '../types/Organization'
import OrganizationCard from '../components/OrganizationCard'

export default function Home() {
  const databaseRef = collection(database, 'organizations')

  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [getOrganizations, setGetOrganizations] = useState<any[] | Organization[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [filters, setFilter] = useState({
    city: '',
    state: '',
    type: '',
  })

  // useEffects
  useEffect(() => {
    readDataFirebase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOrganizations(getOrganizations)
  }, [getOrganizations])

  useEffect(() => {
    getStates()
    getCities()
    getTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizations])

  useEffect(() => {
    if (!getOrganizations) return
    let newOrganizationsArray: Organization[] = getOrganizations

    if (filters.city === '' && filters.state === '' && filters.type === '') {
      return setOrganizations(getOrganizations)
    }

    if (filters.state !== '') {
      newOrganizationsArray = newOrganizationsArray.filter(organization => organization.state === filters.state)
    }

    if (filters.city !== '') {
      newOrganizationsArray = newOrganizationsArray.filter(organization => organization.city === filters.city)
    }

    if (filters.type !== '') {
      newOrganizationsArray = newOrganizationsArray.filter(organization => organization.type === filters.type)
    }

    setOrganizations(newOrganizationsArray)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  //get and readers
  const readDataFirebase = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setGetOrganizations(response.docs.map((organization) => {
          return { ...organization.data(), id: organization.id }
        }))
      })
  }

  const getStates = () => {
    let allStates: string[] = []

    getOrganizations.map(organization => {
      if (allStates.find(state => state === organization.state)) return;
      return allStates = [...allStates, organization.state]
    })

    setStates(allStates);
  }

  const getCities = () => {
    let allCities: string[] = []

    getOrganizations.map(organization => {
      if (allCities.find(city => city === organization.city)) return;
      return allCities = [...allCities, organization.city]
    })

    setCities(allCities);
  }

  const getTypes = () => {
    let allTypes: string[] = []

    getOrganizations.map(organization => {
      if (allTypes.find(type => type === organization.type)) return;
      return allTypes = [...allTypes, organization.type]
    })

    setTypes(allTypes)
  }

  //handles
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

            <p style={{ textAlign: 'center' }}>Procure e organize-se o mais próximo de você</p>

            <div className={styles.organizationsFilters}>
              <label>Filtrar por estado</label>
              <select name='state' value={filters.state} onChange={handleOnChange}>
                <option value="">Todos</option>
                {states.map(state => (
                  <option value={state} key={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className={styles.organizationsFilters}>
              <label>Filtrar por cidade</label>
              <select name='city' value={filters.city} onChange={handleOnChange}>
                <option value="">Todos</option>
                {cities.map(city => (
                  <option value={city} key={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className={styles.organizationsFilters}>
              <label>Filtrar por tipo de organização</label>
              <select name='type' value={filters.type} onChange={handleOnChange}>
                <option value="">Todos</option>
                {types.map(type => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </div>

            {filters.city === '' && filters.state === '' && filters.type === '' ? '' : organizations.length <= 0 ? <div>Infelizmente não temos nenhuma organização que caiba no seu critério, procure na maior cidade mais próxima de você :(</div> : ''}

          </div>
          <div className={styles.mainDiv}>
            {organizations.map(organization => (
              <OrganizationCard key={organization.id} organization={organization} />
            ))}
          </div>
        </main>

      </section>
    </div>
  )
}
