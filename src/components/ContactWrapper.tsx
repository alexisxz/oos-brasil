import React from 'react'
import styles from '../styles/Home.module.css'
import { MdEmail } from 'react-icons/md'
import { AiFillInstagram } from 'react-icons/ai'

type Props = {}

export default function ContactWrapper({ }: Props) {
    return (
        <div className={styles.contactCard}>
            <a href='mailto:alexisxzinho@hotmail.com'><MdEmail /></a>
            <a href='https://www.instagram.com/alexismatos_/' target='_blank' rel='noreferrer'><AiFillInstagram /></a>
        </div>
    )
}