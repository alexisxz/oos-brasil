import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../firebase'

type Props = {}

export default function SuggestBookPopUp({ }: Props) {
    const databaseRef = collection(database, 'suggestedBooks')

    const [isDisplay, setIsDisplay] = useState(false);
    const [form, setForm] = useState({
        title: '',
        author: '',
        link: '',
    })

    const handleOnClick = async () => {
        if (!form.title || !form.author) return alert('Favor, preencher todos os campos (link não é obrigatório)')


        await addDoc(databaseRef, form).then(() => {
            alert('Obrigado pela sugestão')
        })

        setForm({ title: '', author: '', link: '' })
        setIsDisplay(false);
    }

    return (
        <div>
            <p className={styles.sugerirPopUp} style={{ textAlign: 'center' }}><a onClick={() => setIsDisplay(true)}>Sugerir Livro</a></p>
            <div className={styles.popUp} style={!isDisplay ? { display: 'none' } : {}} onClick={() => setIsDisplay(false)}>
                <div className={styles.popUpWrapper} onClick={e => e.stopPropagation()}>
                    <button onClick={() => { setIsDisplay(false); setForm({ title: '', author: '', link: '' }) }} className={styles.popUpCloseButton}><AiFillCloseCircle /></button>
                    <h3>Sugerir um livro</h3>
                    <div className={styles.popUpInput}>
                        <label>Título</label>
                        <input type="text" placeholder='Título do livro' onChange={e => setForm({ ...form, title: e.target.value })} value={form.title} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.popUpInput}>
                        <label>Autor</label>
                        <input type="text" placeholder='Autor' onChange={e => setForm({ ...form, author: e.target.value })} value={form.author} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.popUpInput}>
                        <label>Algum link do livro (não obrigatório)</label>
                        <input type="text" placeholder='Link da organização' onChange={e => setForm({ ...form, link: e.target.value })} value={form.link} style={{ textAlign: 'center' }} />
                    </div>

                    {!form.author || !form.title ? (
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