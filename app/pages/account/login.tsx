import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from '../../components/Link';
import Layout from '../../components/Layout';
import {userService} from '../../services/user.service';

import { useCookies } from 'react-cookie';

const [cookies,setCookie,removeCookie]=useCookies(['user']);
function Login() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");



    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then((user) => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/discover';                
            })
            .catch(error => {
                setColor("red")
                setMessage("Error: " +  error.response.data.message)
            });
    }
    const handleCookie = (user: any) => {
        setCookie("user",user.data.token);
      };

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username or Email</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <Link href="/account/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
