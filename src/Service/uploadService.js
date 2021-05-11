import { BASE_URL } from '../constants/constants';

const axios = require('axios').default;

export const upload = async (img) => {
    const formData = new FormData()
    formData.append('file', img)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    let resp = await axios.post(`${BASE_URL}/api/v1/image/upload`, formData, config);
    if (resp.status === 200) {
        return resp.data.data
    } else {
        return false
    }
}