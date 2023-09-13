import axios from 'axios';

const baseEndpoint = 'http://localhost:5000';

export async function getUsers() {
    const endpoint = `${baseEndpoint}/user`;

    const response = await axios.get(endpoint);

    return response.data.data.documents;
}
