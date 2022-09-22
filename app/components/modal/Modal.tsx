import React from "react";
import Head from 'next/head';



const Modal = () => {

    return (
        <>
            <Head>
             <script type="text/javascript" src="/script/confetti.min.js"></script>
             <script type="text/javascript" src="/script/modal.js"></script>
            </Head>
            <div className="container">
                <button className="open">Claim Your Reward</button>
                <div className="box">
                    <div className="modal-content">
                        <div className="imgBox">
                        <img src="./logo.png" alt="" />
                        </div>
                        <h2 className="title">Congratulations You Won This! 🌟</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
                        voluptatum velit soluta dicta neque doloremque quaerat vitae. Harum
                        maxime dolor totam voluptatum soluta, excepturi optio magni quis odio
                        qui facere.
                        </p>
                        <div className="btnContainer">
                        <button className="close">Claim Now!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;