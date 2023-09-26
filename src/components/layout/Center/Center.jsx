import styles from './center.module.css'
import {useEffect, useRef, useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";

const Center = ({children, isFullScreen = false, useFreeHeightSpace = false}) => {
    const [heightStyle, setHeightStyle] = useState({})

    const row = styles.row + " " + (isFullScreen ? styles.fullScreen : "")
    const {height} = useWindowSize()
    const containerRef = useRef(null)

    const resetHeight = () => {
        if (useFreeHeightSpace !== true || isFullScreen) {
            setHeightStyle(s => s.height ? {} : s)
            return
        }
        const containerSize = containerRef.current.getBoundingClientRect();

        const freeHeight = height - containerSize.y;

        if (freeHeight <= containerSize.height) {
            return
        }
        setHeightStyle({
            height: `${(freeHeight / height) * 100}vh`
        })
    };

    useEffect(() => {
        if (containerRef.current != null) {
            resetHeight();
        }
    }, [containerRef.current])


    return (
        <div ref={containerRef} className={row} style={heightStyle}>
            <div className={styles.column}>
                {children}
            </div>
        </div>
    )
}

export default Center