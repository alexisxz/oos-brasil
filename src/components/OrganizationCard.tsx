/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Organization } from '../types/Organization'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

// icons
import { MdConnectWithoutContact, MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiOutlineGlobal } from 'react-icons/ai'
import { RiWhatsappFill } from 'react-icons/ri'



type Props = {
    organization: Organization
}

export default function OrganizationCard({ organization: organization }: Props) {

    const setContactType = () => {

        if (organization.contact?.includes('@gmail.com' || '@hotmail.com')) {
            return <a style={{ background: '#8b0000' }} className={styles.organizationBtn} target='_blank' rel='noreferrer' href={`mailto:${organization.contact}`}><MdConnectWithoutContact /></a>
        } else {
            return <a style={{ background: '#8b0000' }} className={styles.organizationBtn} target='_blank' rel='noreferrer' href={`${organization.contact}`}><MdConnectWithoutContact /></a>
        }

    }

    return (
        <div className={styles.organizationCard}>
            <img src={organization.image} alt={organization.name} />
            <div className={styles.organizationInfos}>
                <h3>{organization.name} <span style={{ fontWeight: 200, fontSize: 14 }}>{organization.type}</span></h3>
                {organization.site ? <a href={organization.site} target='_blank' rel='noreferrer' className={styles.organizationSite}><AiOutlineGlobal /> {organization.site}</a> : ''}
                <p><strong>{organization.city}</strong> - {organization.state}</p>
                <p>{organization.shortDescription}</p>

                <div className={styles.organizationBtnWrapper}>
                    {organization.contact ? setContactType() : ''}
                    {organization.facebook ? <a style={{ background: '#4267B2' }} className={styles.organizationBtn} target='_blank' rel='noreferrer' href={organization.facebook}><MdFacebook /></a> : ''}
                    {organization.instagram ? <a style={{ background: '#C13584' }} className={styles.organizationBtn} target='_blank' rel='noreferrer' href={organization.instagram}><AiFillInstagram /></a> : ''}
                    {organization.whatsapp ? <a style={{ background: '#25D366' }} className={styles.organizationBtn} target='_blank' rel='noreferrer' href={organization.whatsapp}><RiWhatsappFill /></a> : ''}
                </div>
            </div>
        </div>
    )
}