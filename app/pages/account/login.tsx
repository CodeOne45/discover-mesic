import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from "../../styles/login.module.css";
import login_img from '../../asset/login_img.svg';
import { FcGoogle } from 'react-icons/fc'


import Link from '../../components/Link';
import Layout from '../../components/Layout';
import {userService} from '../../services/user.service';

import { useTranslation } from 'next-export-i18n';

function Login() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");

    const {t} = useTranslation();


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
                router.push(returnUrl);             
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
                    <h2 className={styles.header__title}>{t('login.Login')}</h2>
                    <p className={styles.header__desc}> {t('login.Register_info')} <Link href="/account/register" className={styles.header__desc_btn}>{t('login.Register')}</Link> </p>
                    <img className={styles.header__img} src={login_img.src}/>
                </div>
                
                <div className={styles.block_login__body}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.body__form}>
                            <p>{t('login.Username_Email')}</p>
                            <input placeholder="example@mail.com" name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className={styles.body__form_groupe}>
                            <p>{t('login.Password')}</p>
                            <input placeholder="*******" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
                        <button disabled={formState.isSubmitting} className={styles.body__form_btn}>
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {t('login.Login')}
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

export default Login;
