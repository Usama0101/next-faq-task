import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { signOut } from 'next-auth/client';
import Script from 'next/script'

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
        <>
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
            <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossOrigin="anonymous"></Script>
        </>
    )
}

export default Header
