const axios = require('axios')

export const AdminLogin = () => axios.post(`${BASE_URL}/fetchsliderorsections.php`)
    .then(response => {
        // return await checkLanguage(response.data)
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })