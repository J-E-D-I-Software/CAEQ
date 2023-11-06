import axios from "axios";
import baseApiEndpoint from '../backendConfig';

export default async function updateRoom(id, data) {
    let endpoint = `${baseApiEndpoint}/services/${id}`;
    const headers = {
        'Content-Type': 'multipart/form-data'
    };

    const response = await axios.patch(endpoint, data, { headers: headers });
    return response.data.data.document;

}