import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../firebase'

type Props = {}

export default function SuggestOrganizationPopUp({ }: Props) {
    const databaseRef = collection(database, 'suggestedOrganizations')

    const [isDisplay, setIsDisplay] = useState(false);
    const [form, setForm] = useState({
        name: '',
        state: '',
        city: '',
        link: ''
    })

    const handleOnClick = async () => {
        if (!form.name || !form.state || !form.city || !form.link) return alert('Favor, preencher todos os campos')


        await addDoc(databaseRef, form).then(() => {
            alert('Obrigado pela sugestão')
        })

        setForm({ name: '', state: '', city: '', link: '' })
        setIsDisplay(false);
    }

    return (
        <div>
            <p className={styles.sugerirPopUp} style={{ textAlign: 'center' }}><a onClick={() => setIsDisplay(true)}>Sugerir Organização</a></p>
            <div className={styles.popUp} style={!isDisplay ? { display: 'none' } : {}} onClick={() => setIsDisplay(false)}>
                <div className={styles.popUpWrapper} onClick={e => e.stopPropagation()}>
                    <button onClick={() => { setIsDisplay(false); setForm({ name: '', city: '', state: '', link: '' }) }} className={styles.popUpCloseButton}><AiFillCloseCircle /></button>
                    <h3>Sugerir uma organização</h3>
                    <div className={styles.popUpInput}>
                        <label>Nome da Organização</label>
                        <input type="text" placeholder='Organização' onChange={e => setForm({ ...form, name: e.target.value })} value={form.name} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.popUpInput}>
                        <label>Estado</label>
                        <input type="text" placeholder='Estado' onChange={e => setForm({ ...form, state: e.target.value })} value={form.state} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.popUpInput}>
                        <label>Cidade</label>
                        <input type="text" placeholder='Cidade' onChange={e => setForm({ ...form, city: e.target.value })} value={form.city} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.popUpInput}>
                        <label>Link para mídia social ou site</label>
                        <input type="text" placeholder='Link' onChange={e => setForm({ ...form, link: e.target.value })} value={form.link} style={{ textAlign: 'center' }} />
                    </div>

                    {!form.city || !form.link || !form.name || !form.state ? (
                        <p style={{ color: '#8b0000', fontWeight: 700 }}>Favor, preencher todos os campos</p>
                    ) : (
                        <p style={{ color: 'green', fontWeight: 700 }}>Campos preenchidos, favor enviar</p>
                    )}

                    <button className={styles.popUpWrapperButton} onClick={handleOnClick}>Enviar</button>
                </div>
            </div>
        </div>
    )
}