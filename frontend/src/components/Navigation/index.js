import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='nav-header-container'>
            <li>
                <NavLink exact to="/">BrossBnB</NavLink>
            </li>
            {isLoaded && (
             
                <li className='nav-header-right'>
                    {sessionUser && <NavLink exact to="/spots/new">Create a new spot</NavLink>}
                    <ProfileButton user={sessionUser} />
                </li>

            )}
        </ul>
    );
}

export default Navigation;