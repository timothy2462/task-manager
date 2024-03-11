import styled from "./Header.module.css"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export const Header = () => {

    const [sh, setSh] = useState(false)

    const shoNa = () => {
        setSh(p => !p)
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        window.location.replace("/")
    }

    return (
        <header className={styled.header}>
            <button onClick={shoNa} className={`${styled.nav_btn} ${sh && styled.openb}`}>
                <span className={styled.ham}></span>
                <span className={styled.ham}></span>
                <span className={styled.ham}></span>
            </button>
            <h1 onClick={() => (setSh(false))}>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? styled.pending : isActive ? styled.active : styled.link
                    }>
                    Tasks
                </NavLink>
            </h1>
            <nav className={`${styled.nav} ${sh ? styled.open : styled.closed}`}>
                <ul className={styled.nav_links}>
                    <li onClick={() => (setSh(false))}>
                        <NavLink
                            to="/register"
                            className={({ isActive, isPending }) =>
                                isPending ? styled.pending : isActive ? styled.active : styled.link
                            }>
                            Register
                        </NavLink>
                    </li>
                    <li onClick={() => (setSh(false))}>
                        <NavLink
                            to="/login"
                            className={({ isActive, isPending }) =>
                                isPending ? styled.pending : isActive ? styled.active : styled.link
                            }>
                            Login
                        </NavLink>
                    </li>
                    <li onClick={handleLogout}>
                        <button>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
