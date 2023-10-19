import axios from 'axios';
import baseApiEndpoint from "./backendConfig";


export async function getSpecialties() {
    const result = await axios.get(`${baseApiEndpoint}/specialties`);
    
    return result.data.data.documents; 
}

