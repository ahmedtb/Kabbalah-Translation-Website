import React from 'react'
import { matchPath, Link } from 'react-router-dom'
// import { matchPath } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

function AllowedLink(props) {
    const to = props.to
    const children = props.children
    const className = props.className
    const target = props.target

    const hide = props.hide
    const container = props.container

    const allowedRoutes = props.allowedRoutes

    function isPathAllowed(path) {
        // console.log('isPathAllowed path', matchPath({ path: allowedRoutes[0]?.path, exact: true, strict: false }, path))

        if (allowedRoutes.length) {
            for (let i = 0; i < allowedRoutes.length; i++) {
                // if (
                //     matchPath({ path: allowedRoutes[i].path, exact: true, strict: false }, path)
                // ) return true
                return true
            }
        }
        return false;
    }


    return isPathAllowed(to) ?
        (container ? <LinkContainer target={target} className={className} to={to}>{children}</LinkContainer> : <Link target={target} className={className} to={to}>{children}</Link>)
        :
        (hide ? null : <div className={className}>{children}</div>)

}

import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedLink)