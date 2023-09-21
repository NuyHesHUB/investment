import React from 'react';

import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

/* StyledComponents */
import { SocialIcon } from './StyledLoginFrame';

/* Image */
import GoogleIcon from '../../assets/Login-Image/google.png';

const SocialGoogleLogin = () => {

    const clientId = '849436160190-80kaa73j7ajquc9ohag7i3hobovbbtsg.apps.googleusercontent.com'
    const successGoogle = (res) => {
        console.log(res);
    }
    const failGoogle = (res) => {
        console.log(res);
    }

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default SocialGoogleLogin;