import axios from 'axios';
import baseApiEndpoint from '../backendConfig';




export async function sendEmailToEveryone(data){
    let endpoint = `${baseApiEndpoint}/email/sendEmailToEveryone`;
    console.log('endpoint', endpoint)
    const response = await axios.post(endpoint, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log("post",response)
    return response.data;
}