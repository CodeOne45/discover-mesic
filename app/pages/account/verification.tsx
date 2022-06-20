import {useRouter, withRouter } from 'next/router';
import Layout from '../../components/Layout';
import musicNotesImg from '../../asset/music_notes.png';

function Verification(props) {
    const router = useRouter();

    // TODO: Add a function in API Service to resend a mail
    function resendMail() {
        console.log("ok");
    }

    // TODO: Make sur this component is accesible if the last page is regiser
    /*
    if(!props.routeur){
        router.push('register');
    }*/

    return(
        <Layout>
            <div className="container">
                <img src={musicNotesImg.src} />
                <h2>Please verify your email</h2>
                <p>You're almost there! We sent an email to {props.router.query.email}<br/></p>

                <small className="info">
                    Just click on the link in that email to complete your signup.
                    If you don't see it, you may need to check your spam folder                
                </small>

                <p>Still can't find the email?   
                    <div className="navbar-nav">
                        <a onClick={resendMail} className="nav-item nav-link">Resend Email</a>
                    </div>
                </p>
            </div>
        </Layout>
    );

}

export default withRouter(Verification);
