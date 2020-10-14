import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/auth/AuthContext";

const AuthPage = () => {

    const {isAuthenticated,login,registration} = useContext(AuthContext);

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async (e) => {
        e.preventDefault()
        await registration(form)
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        await login(form)
    }


    return (
        <div className="row justify-content-center h-100">
            <div className="card col-xl-5 col-lg-7 col-md-9 col-sm-11 align-self-center shadow-lg">
                <div className="card-body col-12 justify-content-center">
                    <h3 className="card-title text-center">Authorization {isAuthenticated.toString()}</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="username"
                                   className="form-control form-control-lg"
                                   id="username"
                                   name="username"
                                   onChange={changeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   className="form-control form-control-lg"
                                   id="password"
                                   name="password"
                                   onChange={changeHandler}
                            />
                        </div>
                    </form>
                    <hr/>
                    <div className="row justify-content-around">
                        <a href="#"
                           className="col-5 btn btn-primary btn-lg"
                           onClick={loginHandler}
                        >Sign in</a>
                        <a href="#"
                           className="col-5 btn btn-secondary btn-lg"
                           onClick={registrationHandler}
                        >Sign up</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthPage