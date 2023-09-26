import { Col, Container, Row } from 'react-bootstrap';

import {Link} from "react-router-dom";
import React from 'react';
import styles from './help.module.css'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

export const Help = () => {
        const { t } = useTranslation();
        const { user } = useSelector(s => s.auth);
    
        return (
            <Container className={styles.container}>
                <Row className="mb-3">
                    <Col>
                        <Link to="../" replace>Back</Link>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                        <h2>{t('help_label')}</h2>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                        <h3>{t('Email')}: vova.safoschin@gmail.com</h3>
                    </Col>
                </Row>
    
                <Row className="mb-3">
                    <Col>
                        <h3>{t('phone_number')}: +380500397160</h3>
                    </Col>
                </Row>
            </Container>
        );
    }