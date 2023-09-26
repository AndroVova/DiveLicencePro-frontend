import Center from "../components/layout/Center/Center";
import { CreateClubForm } from '../components/postForms/CreateClubForm';
import React from 'react';
import axios from "axios";
import formDataUtils from "../utils/form.data.utils";
import {useNavigate} from "react-router-dom";

export const CreateClubPage = () => {

    //const [customUserId, setСustomUserId] = useState();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const club = formDataUtils.toObject(e.target)

        const responseBody = {
            "name": club.name,
            "address": club.adress,
            "city": club.city,
            "country": club.country
        }     
        
            axios.post("http://127.0.0.1:8080/dive_club/admin", responseBody, { headers: { Authorization: `Bearer ${token}`}})
            .then((response) => {      
                return response.data
            })
            .catch((error) => {
              console.error("Error while posting user:", error);
            });
            
        navigate('../clubs', {replace:true})
    }


    return (
        <Center useFreeHeightSpace={true}>
            <form onSubmit={handleSubmit}>
                <CreateClubForm/>
            </form>
        </Center>
    )
}