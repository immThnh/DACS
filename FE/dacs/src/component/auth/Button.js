import clsx from "clsx";
import { useMemo } from "react";
import * as authApi from "../../api/apiService/authService";
import styles from "./Oauth2.module.scss";
import axios from "axios";
import { authorizationCode } from "axios-oauth-client";
const getAuthorizationCode = authorizationCode(
    axios.create(),
    "https://oauth.com/2.0/token", // OAuth 2.0 token endpoint
    "244170825538-gfjr0s4hfes2euh8qjt5mseq2v0o8js5.apps.googleusercontent.com",
    "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",
    "http://localhost:3000" // Redirect URL for your app
);

const auth2 = await getAuthorizationCode(
    "AUTHORIZATION_CODE",
    "OPTIONAL_SCOPES"
);

// const getOwnerCredentials = ownerCredentials(
//     axios.create(),
//     'https://oauth.com/2.0/token', // OAuth 2.0 token endpoint
//     'CLIENT_ID',
//     'CLIENT_SECRET'
//   )

//   const auth = await getOwnerCredentials('USERNAME', 'PASSWORD', 'OPTIONAL_SCOPES')
const Button = ({
    heroiconsOutlinedevicePho,
    inputFieldPassword,
    propAlignSelf,
    propFlex,
    link,
}) => {
    const buttonStyle = useMemo(() => {
        return {
            alignSelf: propAlignSelf,
            flex: propFlex,
        };
    }, [propAlignSelf, propFlex]);

    const handleOauth2Login = () => {
        const fetchApi = async () => {
            try {
                const result = authApi.oauth2Login(link);
                console.log(result);
            } catch (error) {
                console.log("handleOath2Login: " + error);
            }
        };
        fetchApi();
    };

    return (
        <div
            onClick={handleOauth2Login}
            // onClick={functionClick}
            className={clsx(
                styles.btn,
                "rounded-lg cursor-pointer py-3 px-5 bg-white-97 self-stretch rounded-3xs flex flex-row items-start justify-center gap-[14px] border-[1px] border-solid border-white-95"
            )}
            style={buttonStyle}
        >
            <div className="h-[25.5px] flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0 box-border">
                <img
                    className="w-6 h-6 relative overflow-hidden shrink-0"
                    alt=""
                    src={heroiconsOutlinedevicePho}
                />
            </div>
            <div className="w-[230px] relative text-lg leading-[150%] font-medium font-be-vietnam-pro text-grey-15 text-left inline-block shrink-0">
                {inputFieldPassword}
            </div>
        </div>
    );
};
export default Button;
