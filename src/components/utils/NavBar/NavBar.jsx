import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import { SelectAdminBar } from "../SelectAdminBar/SelectAdminBar";
import { SelectLang } from "../SelectLang/SelectLang";
import {logout} from "../../../reducers/auth.reducer";
import styles from './nav.bar.module.css'
import {useTranslation} from "react-i18next";

const NavBar = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(s => s.auth)
    const {t} = useTranslation()


    const handleLogOut = () => {
        dispatch(logout())
    }
    // TODO: user.roles
    return (
        <nav className={styles.container}>
            <Link className={styles.link} to={'../home'} replace={true} >DiveLicencePro</Link>
            <SelectLang/>
            {user.roles.length == 2 ? <SelectAdminBar/> : null}
            {/* <SelectAdminBar/> */}
            <Link className={styles.link} to={'../lessons'} replace={true} >{t('lessons')}</Link>
            <Link className={styles.link} to={'../profile'} replace={true} >{user.username}</Link>
            <Link className={styles.link} to={null} onClick={handleLogOut}>{t('log_out')}</Link>
            
        </nav>
    )
}

export default NavBar