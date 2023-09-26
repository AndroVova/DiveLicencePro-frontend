import i18n from 'i18next';
import {useState} from "react";
import styles from './select.leng.module.css'
import {LANG_KEY} from "../../../i18next";
export const SelectLang = () => {
    const [lang, setLang] = useState(i18n.language)
    const handleChange = async ({target: {value}}) => {
        setLang(value)
        await i18n.changeLanguage(value);
        localStorage.setItem(LANG_KEY, value)
    }

    return (
        <select value={lang} onChange={handleChange} className={styles.box}>
            <option value={'en'}>EN</option>
            <option value={'ua'}>UA</option>
        </select>
    )
}