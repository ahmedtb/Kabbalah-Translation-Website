import axios from "axios";

export default function logError(error, sourceName = null) {
    if (sourceName)
        console.log('error from:', sourceName)
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}

export async function post(url, params = null, callerIdentifier = null, setData = null) {
    try {
        const response = await axios.post(url, params)
        if (setData)
            setData(response.data)
        console.log(callerIdentifier, response.data)

        return response
    } catch (error) {
        logError(error, callerIdentifier ?? null)
    }
}

export async function get(url, params = null, callerIdentifier = null, setData = null) {
    try {
        const response = await axios.get(url, params)
        if (setData)
            setData(response.data)
        console.log(callerIdentifier, response.data)
        return response
    } catch (error) {
        logError(error, callerIdentifier)
    }
}