import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { signOut } from 'next-auth/client';

function Header() {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch]);


    const logoutHandler = () => {
        signOut();
    }

    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href="/">
                            Terra Virtua
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-center">

                    {user ? (
                        <div className="ml-4 dropdown d-line">
                            <a 
                                className="btn dropdown-toggle mr-4"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"    
                            >
                                <span>{ user && user.name }</span>
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                <Link href="/">
                                    <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
                                </Link>
                            </div>
                        </div>
                    ): (
                        !loading && (
                            <Link href="/login">
                                <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                            </Link>
                        )
                    )}

                    
                </div>
            </div>
        </nav>
    )
}

export default Header