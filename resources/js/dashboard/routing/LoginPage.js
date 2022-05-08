import React from 'react'
import axios from 'axios';
import { Api, Routes } from '../utility/URLs'
import { ApiCallHandler, logError } from '../../commonFiles/helpers'
import { Redirect } from 'react-router-dom'
import { refreshAdmin } from '../redux/stateActions'
import { connect } from "react-redux"

function LoginPage(props) {
    const [username, setusername] = React.useState('')
    const [password, setpassword] = React.useState('')


    async function handleLogin(username, password) {

        ApiCallHandler(
            async () => {
                await axios.get('/sanctum/csrf-cookie')
                return await Api.login(username, password)
            },
            (data) => {
                props.refreshAdmin(data)
                setredirect(Routes.dashboard())
            },
            'handleLogin',
            true
        )
        // try {
        //     await axios.get('/sanctum/csrf-cookie')
        //     const response = await Api.login(username, password)
        //     console.log('Admin signed in!', (response.data));
        //     props.refreshAdmin(response.data)
        //     setredirect(Routes.dashboard())

        // } catch (error) {
        //     logError(error)
        // }
    }

    React.useEffect(() => {
        if (props.admin) {
            setredirect(Routes.dashboard())
        }
    }, [props.admin])


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
                    <button type="button" className="btn btn-success w-100 my-1" onClick={() => handleLogin(username, password)}>دخول</button>

                </div>
            </div>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        admin: state.state.admin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (admin) => dispatch(refreshAdmin(admin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)