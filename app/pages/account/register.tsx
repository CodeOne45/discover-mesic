import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from '../../components/Link';
import Layout from '../../components/Layout';
import {userService} from '../../services/user.service';

function Register() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPwd: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        delete user["confirmPwd"];
        return userService.register(user)
            .then(() => {
                router.push({
                    pathname: '/account/verification',
                    query: { email: user["email"] }
                },'/account/verification');
            })
            .catch(error => {
                setColor("red")
                setMessage("Error: " +  error.response.data.message)
            });
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                name="confirmPwd"
                                type="password"
                                {...register('confirmPwd')}
                                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                        </div>
                        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link href="/account/login" className="btn btn-link">Cancel</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Register;
