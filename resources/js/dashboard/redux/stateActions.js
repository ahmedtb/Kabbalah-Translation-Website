
export const refreshAdmin = (admin) => {
    return {
        type: 'refresh-admin',
        admin: admin
    }
}

export const setAllowedRoutes = (allowedRoutes) => {
    return {
        type: 'setAllowedRoutes',
        allowedRoutes: allowedRoutes
    }
}
