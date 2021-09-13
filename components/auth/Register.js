import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/client';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'

function Login() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;
    
    const { success, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if(success){
            router.push('/login');
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, success, error]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            name, email, password
        }
        
        dispatch(registerUser(userData));
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container container-fluid">
                <div className="row wrapper"> 
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Join Us</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Full Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChange}    
                                />
                            </div>

                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                            </div>
                
                            <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                            >
                                {loading ? <ButtonLoader /> : "REGISTER"} 
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
