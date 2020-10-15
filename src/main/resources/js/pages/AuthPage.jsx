import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/auth/AuthContext";
import {AlertContext} from "../context/alert/AlertContext";

const AuthPage = () => {

    const {isAuthenticated,login,registration} = useContext(AuthContext);
    const alert = useContext(AlertContext);

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async (e) => {
        e.preventDefault()
        const {message,status} = await registration(form);
        const statusType = alert.statusType(status);
        alert.show(message,statusType)
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        const {message,status} = await login(form);
        const statusType = alert.statusType(status);
        alert.show(message,statusType)
    }


    const colSized = "col-xl-5 col-lg-7 col-md-9 col-sm-11"
    return (
        <div className="row justify-content-center">
            <div className={`card card-auth ${colSized} ${marginTop} shadow-lg`}>
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