import {btnSize, inputSize} from "../../utils/ui.utils";

import {ButtonBox} from "../utils/ButtonBox/ButtonBox";
import {Container} from "../layout/Container/Container";
import InputBox from "../utils/InputBox/InputBox";
import { Link } from "react-router-dom";
import styles from './user.sign.up.module.css'
import {useTranslation} from "react-i18next";

export const CreateCertificateForm = () => {
    const {t} = useTranslation()

    return (
        <Container width={"700px"}>
            <Link to={'../'} replace={true}>Back</Link>
            <h2>{t('create_cert')}</h2>
            <div className={styles.box}>
                <InputBox labelText={t('name')} inputParam={({...inputSize, minLength: 3, required: true})} name={'name'}/>
                <InputBox labelText={t('max_depth')} inputParam={({...inputSize, minLength: 1, required: true})} name={'maxDepth'}/>
                <InputBox labelText={t('number_of_successful_lessons_to_get')} inputParam={({...inputSize, required: true})} name={'numberOfSuccessfulLessonsToGet'}/></div>
            <ButtonBox settings={btnSize} text={t('submit')}/>
        </Container>
    )
}