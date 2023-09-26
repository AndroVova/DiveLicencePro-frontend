import styles from './auth.container.module.css'
export const Container = ({width = "",children}) => {
    return (
        <div className={styles.container} style={({width})}>
            {children}
        </div>
    )
}