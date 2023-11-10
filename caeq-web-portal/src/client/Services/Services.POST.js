import axios from 'axios';
import baseApiEndpoint from '../backendConfig';

export default async function createRoom(data) {
    let endpoint = `${baseApiEndpoint}/services`;
    const headers = {
        'Content-Type': 'multipart/form-data',
    
    };

    const response = await axios.post(endpoint, data, { headers });
    return response.data.data.document;
}