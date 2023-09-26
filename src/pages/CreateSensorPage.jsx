import React, { useState } from 'react';

import Center from "../components/layout/Center/Center";
import { CreateSensorForm } from '../components/postForms/CreateSensorForm';
import axios from "axios";
import formDataUtils from "../utils/form.data.utils";
import {useNavigate} from "react-router-dom";

export const CreateSensorPage = () => {

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const sensor = formDataUtils.toObject(e.target)

        const responseBody = {
            "name": sensor.name,
            "maxHeartRateValue": sensor.heartRate,
            "maxDepth": sensor.depth,
            "maxTime": sensor.time
        }     
        
            axios.post("http://127.0.0.1:8080/sensor/admin", responseBody, { headers: { Authorization: `Bearer ${token}`}})
            .then((response) => {      
                return response.data
            })
            .catch((error) => {
              console.error("Error while posting user:", error);
            });
            
        navigate('../sensors', {replace:true})
    }


    return (
        <Center useFreeHeightSpace={true}>
            <form onSubmit={handleSubmit}>
                <CreateSensorForm/>
            </form>
        </Center>
    )
}