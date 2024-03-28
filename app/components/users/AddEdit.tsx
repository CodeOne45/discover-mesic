import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import styles from "../../styles/user-profile.module.css";

import { userService} from '../../services/user.service';
import { songService} from '../../services/music.service';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { useTranslation } from 'next-export-i18n';

// import levels vinyls svg
import BronzeVinyl from '../../asset/rewards/bronze-vinyl.svg';
import SilverVinyl from '../../asset/rewards/silver-vinyl.svg';
import GoldVinyl from '../../asset/rewards/gold-vinyl.svg';
import PlatinumVinyl from '../../asset/rewards/platinum-vinyl.svg';


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
    const [level, setlevel] = useState<String>("Bronze Vinyl");
    const [levelSongs, setlevelSongs] = useState<number>(0);
    const [levelImg, setlevelImg] = useState<any>(BronzeVinyl);

    const percentage = 100;
    const maxVentilSongs = 150;
    // 4 levels : 25 song : Bronze Vinyl, 50 songs : Silver Vinyl, 75 songs : Gold Vinyl, 100 songs : Platinum Vinyl
    const levels = [25, 50, 75, 100];
    const levelsLabel = ["Bronze Vinyl", "Silver Vinyl", "Gold Vinyl", "Platinum Vinyl"];

    const {t} = useTranslation();

    useEffect(() => {
        (async() => {
            const addedSongs = (await songService.songsList());
            if(user.data.id && addedSongs.length != 0){
                var result = addedSongs.data.filter((x)=>x.addedBy === user.data.id);
                setaddedSongs(result); // number of songs added by the user
                for(var i = 0; i < levels.length; i++){
                    if(result.length < levels[i]){
                        settotalSongs((result.length * percentage)/levels[i]);
                        setlevelSongs(levels[i]);
                        setlevel(levelsLabel[i]);
                        switch(i){
                            case 0:
                                setlevelImg(BronzeVinyl);
                            case 1:
                                setlevelImg(SilverVinyl);
                            case 2:
                                setlevelImg(GoldVinyl);
                            case 3:
                                setlevelImg(PlatinumVinyl);
                        }
                        break;
                    }
                }

                //settotalSongs((addedSongs.length * percentage)/maxVentilSongs);
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
                    <img src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.data.username}`} alt="user img"/>
                </div>
                <div className={styles.user_info_details}>
                    <h1 className={styles.user_info_details_name}>{user.data.username}</h1>
                    <p className={styles.user_info_details_level}>Level : Bronze Vinyl</p>
                    <p className={styles.user_info_details_songs}>Total songs added : {addedSongs? addedSongs.length: "#"}</p>
                </div>
            </div>
            <div className={styles.user_progress}>
                <div className={styles.user_rewards}>
                    <img src={levelImg.src} alt="level img"/>
                    <p className={styles.bold}> Next level :  {levelsLabel[levelsLabel.indexOf(level) + 1]}</p>
                    <img className={styles.next_level_blur_img} src={levelsLabel[levelsLabel.indexOf(level) + 1] === "Platinum Vinyl"? PlatinumVinyl.src: levelsLabel[levelsLabel.indexOf(level) + 1] === "Gold Vinyl"? GoldVinyl.src: levelsLabel[levelsLabel.indexOf(level) + 1] === "Silver Vinyl"? SilverVinyl.src: BronzeVinyl.src} alt="next level img"/>
                </div>
                <ProgressBar className={styles.progress_bar} variant="danger" now={totalSongs} />
                <p> {addedSongs? addedSongs.length: "#"}/{levelSongs} songs</p>
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