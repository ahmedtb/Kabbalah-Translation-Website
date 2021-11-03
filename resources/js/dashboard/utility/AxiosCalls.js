import axios from "axios";

import logError from "./logError";

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