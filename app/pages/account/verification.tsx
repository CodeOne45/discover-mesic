import {useRouter, withRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import Layout from '../../components/Layout';
import musicNotesImg from '../../asset/music_notes.png';
import {userService} from '../../services/user.service';

function Verification(props) {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const email = props.router.query.email;



    function resendMail() {
        return userService.resendEmail({"email" : email})
            .then(() => {
                setColor("green")
                setMessage("Info: Email send !")

            })
            .catch(error => {
                setColor("red")
                setMessage("Error: " +  error.response.data.message)
            });
    }
  
    useEffect(() => {
        if(!email){
            router.push('register')
        }
    }, [email]);
    

    return(
        <Layout>
            <div className="container">
                <img src={musicNotesImg.src} />
                <h2>Please verify your email</h2>
                <p>You're almost there! We sent an email to {email}<br/></p>

                <small className="info">
                    Just click on the link in that email to complete your signup.
                    If you don't see it, you may need to check your spam folder                
                </small>

                <p>Still can't find the email?   
                    <div className="navbar-nav">
                        <a onClick={resendMail} className="nav-item nav-link">Resend Email</a>
                    </div>
                </p>
                <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
            </div>
        </Layout>
    );

}

export default withRouter(Verification);
