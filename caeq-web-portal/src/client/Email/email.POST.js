import axios from 'axios';
import baseApiEndpoint from '../backendConfig';




export async function sendEmailToEveryone(data){
    let endpoint = `${baseApiEndpoint}/email/sendEmailToEveryone`;

    const response = await axios.post(endpoint, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.data;
}