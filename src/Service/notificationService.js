const axios = require('axios')
const { BASE_URL } = require('../constants/constants')

export const findAllNotifications = async () => {
    let notfication = await axios.get(`${BASE_URL}/api/v1/notification/findAll`);
    if (notfication.status === 200) {
        if (notfication.data.data.length >= 1) {
            return notfication.data.data
        } else {
            return 'No Notifications'
        }
    } else {
        return 'Some error occurred...'
    }
}