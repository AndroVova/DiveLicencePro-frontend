import {btnSize, inputSize} from "../../utils/ui.utils";

import {ButtonBox} from "../utils/ButtonBox/ButtonBox";
import {Container} from "../layout/Container/Container";
import InputBox from "../utils/InputBox/InputBox";
import { Link } from "react-router-dom";
import styles from './user.sign.up.module.css'
import {useTranslation} from "react-i18next";

export const CreateClubForm = () => {
    const {t} = useTranslation()

    return (
        <Container width={"700px"}>
            <Link to={'../'} replace={true}>Back</Link>
            <h2>{t('create_club')}</h2>
            <div className={styles.box}>
                <InputBox labelText={t('name')} inputParam={({...inputSize, minLength: 3, required: true})} name={'name'}/>
                <InputBox labelText={t('address')} inputParam={({...inputSize, minLength: 3, required: true})} name={'adress'}/>
                <InputBox labelText={t('city')} inputParam={({...inputSize, minLength: 3, required: true})} name={'city'}/>
                <InputBox labelText={t('country')} inputParam={({...inputSize, required: true})} name={'country'}/></div>
            <ButtonBox settings={btnSize} text={t('submit')}/>
        </Container>
    )
}