import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "./userState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigate = useNavigate();
    const PARAMS = new URL(window.location.href).searchParams;
    const KAKAO_CODE = PARAMS.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    const onSignIn = () => {
        window.location.href = KAKAO_URL
    }

    const getAccessToken = async () => {
        if (accessTokenFetching) return; 
 
        try {
            setAccessTokenFetching(true); 

            const response = await axios.post(
                'http://localhost:3001/auth',
                {
                    authorizationCode: KAKAO_CODE,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const accessToken = response.data.accessToken;
            console.log("accessToken:", accessToken);
 
            setUserInfo({
                ...userInfo,
                accessToken: accessToken,
            });
 
            setAccessTokenFetching(false); 
            navigate("/main");
        } catch (error) {
            console.error("Error:", error);
            setAccessTokenFetching(false); 
        }
    };

    const getProfile = async () => {
        try {
            console.log("getProfile 호출");
            
            if (userInfo.accessToken) {
                console.log("accessToken in getProfile:", userInfo.accessToken);
                const response = await axios.get(
                    "~~~/users/profile",
                    {
                        headers: {
                            Authorization: `${userInfo.accessToken}`,
                        },
                    }
                );
                console.log("message:", response.data.message);
                setUserInfo({
                    ...userInfo,
                    id: response.data.result.id,
                    name: response.data.result.name,
                    email: response.data.result.email,
                    nickname: response.data.result.nickname,
                    profileImage: response.data.result.profile_image_url,
                    isLogin: true,
                });
                navigate("/main");
            } else {
                console.log("No accessToken available");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (KAKAO_CODE && !userInfo.accessToken) {
            getAccessToken();
        }
    }, [KAKAO_CODE, userInfo]);
    
    useEffect(() => {
        if (userInfo.accessToken) {
            getProfile();
        }
    }, [userInfo]);

    // 일단 서버 주소가 불명확해서 로그인 후 바로 main 화면으로 넘어가도록 설계
    // 추후 서버 주소 확정되면 삭제 예정
    navigate("/main");

    return(
        <div>
            <button onClick={onSignIn}>Sign In</button>
        </div>
    );
}

export default SignIn;