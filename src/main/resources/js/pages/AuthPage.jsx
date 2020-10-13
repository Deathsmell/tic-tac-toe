import React from 'react'

export default () => {

    return (
        <div className="row justify-content-center h-100">
            <div className="card col-xl-5 col-lg-7 col-md-9 col-sm-11 align-self-center shadow-lg ">
                <div className="card-body col-12 justify-content-center">
                    <h3 className="card-title text-center">Authorization</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1"
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1"/>
                        </div>
                    </form>
                    <hr/>
                    <div className="row justify-content-around">
                        <a href="#"
                           className="col-5 btn btn-primary btn-lg"
                        >Sign in</a>
                        <a href="#"
                           className="col-5 btn btn-secondary btn-lg"
                        >Sign up</a>
                    </div>
                </div>
            </div>
        </div>

    )
}