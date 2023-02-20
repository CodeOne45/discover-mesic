import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/user-profile.module.css";

import { userService} from '../../services/user.service';
import { songService} from '../../services/music.service';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { useTranslation } from 'next-export-i18n';


interface Props {
    readonly user?: any;
}
const AddEdit: React.FC = ({ user }) => {
    const isAddMode = !user;
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [username, setusername] = useState<String>("")
    const [email, setemail] = useState<String>("")
    const [addedSongs, setaddedSongs] = useState<any>();
    const [totalSongs, settotalSongs] = useState<number>(0);

    const percentage = 100;
    const maxVentilSongs = 150;

    const {t} = useTranslation();

    useEffect(() => {
        (async() => {
            const addedSongs = (await songService.songsList());
            if(user.data.id && addedSongs.length != 0){
                var result = addedSongs.data.filter((x)=>x.addedBy === user.data.id);
                setaddedSongs(result);
                settotalSongs((addedSongs.length * percentage)/maxVentilSongs);
            }
        })();

        setusername(user.data.username)
        setemail(user.data.email)

    }, []);

    useEffect(() => {
        // reset form with user data
        reset();
    }, [user]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 8 characters'),
        conforme_password: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = user.data;
    }

    // get functions to build form with useForm() hook
    const {formState } = useForm(formOptions);
    const {register, handleSubmit } = useForm();

    const { errors } = formState;


    function onSubmit(data) {
        return updateUser(user.data.id, data);
    }

    function reset(){
        setusername(user.data.username)
        setemail(user.data.email)
    }

    function updateUser(id, data) {
        console.log(data)
        return userService.update(id, data)
            .then(() => {
                setColor("green")
                setMessage("Information updated!")
            })
            .catch(error => {
                setColor("red")
                setMessage("Error: " +  error.response.data.message)
            });
    }

    return (
        <>
        <div className={styles.header_user_profile}>
            <div className={styles.user_info}>
                <div className={styles.user_info_img}>
                    <img src={`https://avatars.dicebear.com/api/adventurer-neutral/${user.data.username}.svg`} alt="user img"/>
                </div>
                <div className={styles.user_info_details}>
                    <h1 className={styles.user_info_details_name}>{user.data.username}</h1>
                    <p className={styles.user_info_details_level}>Level : Bronze Vinyl</p>
                    <p className={styles.user_info_details_songs}>Total songs added : {addedSongs? addedSongs.length: "#"}</p>
                </div>
            </div>
            <div className={styles.user_progress}>
                <p className={styles.bold}> Next level : Silver vinyl </p>
                <ProgressBar className={styles.progress_bar} variant="danger" now={totalSongs} />
                <p> {addedSongs? addedSongs.length: "#"}/150 songs</p>
            </div>
        </div>
        <div className={styles.user_seprator}>
            <p>Edit profile:</p>
        </div>
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.body__form}>
                    <div className={styles.body__form__inputs}>
                        <div>
                            <label>{t('register.Username')}</label>
                        </div>
                        <div>
                            <input placeholder="example45" name="username" type="text" value={username} {...register('username')} onChange={(e) => setusername(e.target.value)} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        </div>  
                    </div>
                <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div className={styles.body__form_groupe}>
                    <div className={styles.body__form__inputs}>
                        <div>
                            <label>{t('register.Email')}</label>
                        </div>
                        <div>
                            <input placeholder="example@mail.com" name="email" type="text" value={email} {...register('email')} onChange={(e) => setemail(e.target.value)}  className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        </div>  
                    </div>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className={styles.body__form_groupe}>
                    <div className={styles.body__form__inputs}>
                        <div>
                            <label>{t('register.Password')}</label>
                        </div>
                        <div>
                            <input placeholder="********" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        </div>  
                    </div>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className={styles.body__form_groupe}>
                <div className={styles.body__form__inputs}>
                        <div>
                            <label>{t('register.Confirm_Password')}</label>
                        </div>
                        <div>
                            <input
                                name="confirmPwd"
                                type="password"
                                placeholder="********"
                                {...register('confirmPwd')}
                                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                            />                    
                        </div>  
                    </div>
                    <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
                </div>
                <div className={styles.body__form_btn_bloc}>
                    <button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className={styles.body__form_btn_rest}>Reset</button>
                    <button type="submit" disabled={formState.isSubmitting} className={styles.body__form_btn}>
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                </div>
                <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
            </form>
        </div>
        </>
    );
}

export default AddEdit;