import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'


export function AppHeader() {




    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>MisterToy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
