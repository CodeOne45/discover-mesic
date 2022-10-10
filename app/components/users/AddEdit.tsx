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


interface Props {
    readonly user?: any;
}
const AddEdit: React.FC = ({ user }) => {
    const isAddMode = !user;
    const router = useRouter();
    const [addedSongs, setaddedSongs] = useState<any>();

    useEffect(() => {
        (async() => {
            const addedSongs = (await songService.songsList());
            if(user.data.id && addedSongs.length != 0){
                var result = addedSongs.data.filter((x)=>x.addedBy === user.data.id);
                console.log(result)
                setaddedSongs(result);
            }
        })();
      }, []);

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
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(user.data.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
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
                <ProgressBar className={styles.progress_bar} variant="danger" now={addedSongs? (addedSongs.length * 100)/150: 0} />
                <p> {addedSongs? addedSongs.length: "#"}/150 songs</p>
            </div>
        </div>
        <div className={styles.user_seprator}>
            <p>Edit profile:</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Email</label>
                    <input name="email" type="text" {...register('firstName')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>
                        Password
                        {!isAddMode && <em className="ml-1">(Leave blank to keep the same password)</em>}
                    </label>
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
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
            </div>
        </form>
        </>
    );
}

export default AddEdit;