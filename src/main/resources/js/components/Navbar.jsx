import React, {useContext} from 'react'
import {IoIosLogOut} from 'react-icons/io'

const Navbar = () => {


    return (
        <nav className="d-flex row navbar navbar-dark bg-primary">
            <a className="navbar-brand">Tic Tac Toe</a>
            <a className="nav-link"
               href="/logout"
            >
                <IoIosLogOut size={"30px"}
                             color={"white"}
                />
            </a>
        </nav>
    )
}

export default Navbar