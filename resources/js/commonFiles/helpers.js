
import axios from "axios";
import { random } from "lodash";

export function mapRandomKey() {
    return random(0, 10000000)
}

export function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}


export function truncate(str, length = 200) {
    return str?.length > length ? str?.substring(0, length) + "....." : str;
}

export function textNewLines(str) {
    return str?.split('\n').map((str, index) => <p key={index}>{str}</p>)
}


export function logError(error, sourceName = null) {
    if (sourceName)
        console.log('error from: ', sourceName)
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
    console.log(error.stack)
}

export async function post(url, params = null, callerIdentifier = null, setData = null) {
    try {
        const response = await axios.post(url, params)
        if (setData)
            setData(response.data)
        if (callerIdentifier)
            console.log(callerIdentifier, response.data)
        return response
    } catch (error) {
        logError(error, callerIdentifier)
    }
}

export async function get(url, params = null, callerIdentifier = null, setData = null) {
    try {
        const response = await axios.get(url, params)
        if (setData)
            setData(response.data)
        if (callerIdentifier)
            console.log(callerIdentifier, response.data)
        return response
    } catch (error) {
        logError(error, callerIdentifier)
    }
}

export async function ApiCallHandler(ApiEndpoint, setData = null, Identifier = null, logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier, response.data)
    } catch (error) {
        if (Identifier)
            logError(error, Identifier)
    }
}