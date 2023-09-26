import {ButtonBox} from "../../utils/ButtonBox/ButtonBox";
import InputBox from "../../utils/InputBox/InputBox";
import {Link} from "react-router-dom";
import styles from './login.module.css'
import {useTranslation} from "react-i18next";

export const Login = () => {
    const {t} = useTranslation()
    return (
        <div className={styles.container}>
            <h2>{t('login')}</h2>
            <InputBox labelText={t('username')} name={'email'}/>
            <InputBox labelText={t('password')} name={'password'} type={"password"}/>
            <Link to={"../support"} replace={true}>{t('support')}</Link>
            <Link to={"../singup"} replace={true}>{t("sign_up")}</Link>

            <ButtonBox text={t('submit')  } settings={({
                style: {
                    width: "110px",
                    margin: "10px 100px 0"
                },
                type: 'submit'
            })}/>
        </div>
    )
}