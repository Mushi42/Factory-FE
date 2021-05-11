const axios = require('axios')
const { BASE_URL } = require('../constants/constants')

export const createCustomer = async (body) => {
    console.log('Bodyyyyyyyyyyyyyy  ', body)
    let createResponse = await axios.post(`${BASE_URL}/api/v1/customer/create`, body)
    console.log(createResponse.status)
    if (createResponse.status === 200) {
        return true
    } else {
        return false
    }
}

export const findAllCustomers = async () => {
    let customers = await axios.get(`${BASE_URL}/api/v1/customer/findAll`);
    if (customers.status === 200) {
        if (customers.data.data.length >= 1) {
            return customers.data.data
        } else {
            return 'No Data'
        }
    } else {
        return 'Some error occurred...'
    }
}

export const findSingleCustomer = async (id) => {
    let customers = await axios.get(`${BASE_URL}/api/v1/customer/findOne/${id}`);
    if (customers.status === 200) {
        console.log(customers.data)
        if (customers.data.data) {
            return customers.data.data
        } else {
            return 'No Data'
        }
    } else {
        return 'Some error occurred...'
    }
}

export const updateCustomer = async (id, body) => {
    let customers = await axios.put(`${BASE_URL}/api/v1/customer/update/${id}`, body);
    if (customers.status === 200) {
        return true
    } else {
        return false
    }
}

export const deleteCustomer = async (id) => {
    let customers = await axios.delete(`${BASE_URL}/api/v1/customer/delete/${id}`);
    if (customers.status === 200) {
        return true
    } else {
        return false
    }
}