import React, { useState } from 'react';

import Center from "../components/layout/Center/Center";
import { CreateCertificateForm } from '../components/postForms/CreateCertificateForm';
import axios from "axios";
import formDataUtils from "../utils/form.data.utils";
import {useNavigate} from "react-router-dom";

export const CreateCertificatePage = () => {

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const cert = formDataUtils.toObject(e.target)


        const currentDate = new Date();

// Extract year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

// Format the date as "yyyy-dd-mm"
        const formattedDate = `${year}-${month}-${day}`;

        const responseBody = {
            "name" : cert.name,
            "date": formattedDate,
            "numberOfSuccessfulLessonsToGet" : cert.numberOfSuccessfulLessonsToGet,
            "maxDepth" : cert.maxDepth,
            "isCompleted" : false
        }     
        
            axios.post("http://127.0.0.1:8080/certificate/admin", responseBody, { headers: { Authorization: `Bearer ${token}`}})
            .then((response) => {      
                return response.data
            })
            .catch((error) => {
              console.error("Error while posting user:", error);
            });
            
        navigate('../certificates', {replace:true})
    }


    return (
        <Center useFreeHeightSpace={true}>
            <form onSubmit={handleSubmit}>
                <CreateCertificateForm/>
            </form>
        </Center>
    )
}