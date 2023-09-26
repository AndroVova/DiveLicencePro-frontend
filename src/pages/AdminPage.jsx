import Center from "../components/layout/Center/Center";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const linkStyle = {
    display: 'block',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: '#ddd',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    textAlign: 'center',
};

export const AdminPage = () => {
    const { t } = useTranslation();
    return (
        <Center useFreeHeightSpace={true}>
            <Link style={linkStyle} to="/users">{t("users")}</Link>
            <Link style={linkStyle} to="/clubs">{t("clubs")}</Link>
            <Link style={linkStyle} to="/sensors">{t("sensors")}</Link>
            <Link style={linkStyle} to="/certificates">{t("certificates")}</Link>
        </Center>
    )
}