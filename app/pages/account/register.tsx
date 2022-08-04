import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from "../../styles/login.module.css";

import Link from '../../components/Link';
import Layout from '../../components/Layout';
import {userService} from '../../services/user.service';
import { useTranslation } from 'next-export-i18n';
import { FcGoogle } from 'react-icons/fc'

import register_img from '../../asset/register.svg';


function register() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    
    const {t} = useTranslation();

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
            <div className={styles.block_login}>
                <div className={styles.block_login__header}>
                    <h2 className={styles.header__title}>{t('register.register')}</h2>
                    <p className={styles.header__desc}> {t('register.login_info')} <Link href="/account/register" className={styles.header__desc_btn}>{t('login.Login')}</Link> </p>
                    <img className={styles.header__img_regitser} src={register_img.src}/>
                </div>
                
                <div className={styles.block_login__body}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.body__form}>
                            <label>{t('register.Username')}</label>
                            <input placeholder="example45" name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className={styles.body__form_groupe}>
                            <label>{t('register.Email')}</label>
                            <input placeholder="example@mail.com" name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className={styles.body__form_groupe}>
                            <label>{t('register.Password')}</label>
                            <input placeholder="********" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className={styles.body__form_groupe}>
                            <label>{t('register.Confirm_Password')}</label>
                            <input
                                name="confirmPwd"
                                type="password"
                                placeholder="********"
                                {...register('confirmPwd')}
                                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                        </div>
                        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
                        <button disabled={formState.isSubmitting} className={styles.body__form_btn}>
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {t('register.register')}
                        </button>
                        <div className={styles.body__form_other_options}> 
                            <p>{t('login.login_option')}</p>
                            <FcGoogle onClick="" className={styles.form_other_options__icon} />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default register;
