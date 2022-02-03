import React from 'react'
import axios from 'axios';
import { api, routes } from '../utility/URLs'
import { logError } from '../../commonFiles/helpers'
import { Navigate } from 'react-router-dom'
function LoginPage(props) {
    const [username, setusername] = React.useState('')
    const [password, setpassword] = React.useState('')


    async function handleLogin(username, password) {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await api.login(username, password)
            console.log('Admin signed in!', (response.data));
            props.refreshAdmin(response.data)
            setredirect(routes.dashboard())

        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        if (props.user) {
            setredirect(routes.dashboard())
        }
    }, [props.user])

    const [redirect, setredirect] = React.useState(null);

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className='col-5 mx-auto'>
            <div className='card'>
                <h4 className='card-header text-center'>
                    تسجيل الدخول
                </h4>
                <div className='card-body'>
                    <label>اسم المستخدم</label>
                    <input type='username' className='form-control' onChange={e => setusername(e.target.value)} />
                    <label>كلمة المرور</label>
                    <input type='password' className='form-control' onChange={e => setpassword(e.target.value)} />
                    <button type="button" className="btn btn-success" onClick={() => handleLogin(username, password)}>دخول</button>

                </div>
            </div>

        </div>
    )
}

import { refreshAdmin } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (user) => dispatch(refreshAdmin(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)