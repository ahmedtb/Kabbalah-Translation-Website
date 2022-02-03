import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound'
import PrivateRoutesConfig from './PrivateRoutesConfig'
import { intersection } from 'lodash';
import { Api, ApiCallHandler } from '../utility/URLs'

const calculateAllowedRoutes = (admin) => {
    const roles = admin?.role?.length ? [admin.role] : []
    // console.log('calculateAllowedRoutes',roles)
    return PrivateRoutesConfig.filter(
        ({ permission }) => {
            if (!permission) return true;
            else if (!(Array.isArray(permission) && permission.length)) return true;
            else return intersection(permission, roles).length;
        })
}

function AllowedRoutes(props) {

    async function isLoggedIn() {

        ApiCallHandler(
            async () => await Api.getAdmin(),
            (data) => props.refreshAdmin(data),
            'isLoggedIn'
        )
    }
    React.useEffect(() => {
        if (props.admin == null) {
            isLoggedIn()
        }
    }, [props.admin])

    React.useEffect(() => {
        props.setAllowedRoutes(calculateAllowedRoutes(props.admin))
        console.log('AllowedRoutes', calculateAllowedRoutes(props.admin))
    }, [props.admin])

    return <Switch>
        {
            props.allowedRoutes.map((route, index) => {
                return <Route
                    key={index}
                    exact={route.exact}
                    title={route.title}
                    path={route.path}
                    component={route.component}
                />
            })
        }
        <Route  component={NotFound} />

    </Switch>

}

import { refreshAdmin, setAllowedRoutes } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        admin: state.state.admin,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (admin) => dispatch(refreshAdmin(admin)),
        setAllowedRoutes: (allowedRoutes) => dispatch(setAllowedRoutes(allowedRoutes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedRoutes)