import axios from "axios";
import { ChangeEvent, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const SignUp = () => {
    const navigate = useNavigate();
    const {values, onChange} = useInput({email : "" , password : ""})

    const isUnValid = useMemo(() => {
        const {email, password} = values;
        if(email.includes('@') && password.length >= 8) {
            return true;
        }
        return false;
    },[values]);

    const onSignUp = (e : ChangeEvent<HTMLFormElement> ) => {
        e.preventDefault();
    
        const response = axios({
            method : 'post',
            baseURL : 'https://pre-onboarding-selection-task.shop/auth/signup',
            headers: { 'Content-Type': 'application/json' },
            data : {
               values
            }
        })
        .then(res => navigate('/signin'))
        .catch((error) => {
            const {message} = error.response.data;
            return alert(message || '회원가입에 실패하였습니다.')
        })
        return response;
    };

    useEffect(() => {
        if(localStorage.getItem('access_token')) navigate('/todo');
    },[]);

    return(
        <StyledForm onSubmit={onSignUp}>
            <StyledTitle>Sign up</StyledTitle>
            <label>
                <StyledLabel>Email address</StyledLabel>
                <StyledInput 
                    data-testid="email-input"
                    value={values.email}
                    onChange={onChange}
                    name="email"
                    type="text" 
                />
            </label>
            <label>
                <StyledLabel>Password</StyledLabel>
                <StyledInput
                    data-testid="password-input"
                    value={values.password}
                    onChange={onChange}
                    name="password" 
                    type="text" 
                    minLength={8}
                    />
            </label>

            <StyledButton
                type="submit"
                data-testid="signup-button"
                disabled={isUnValid}
            >
                Sign up
            </StyledButton>

        </StyledForm>
    )
}

export default SignUp;

const StyledForm = styled.form`
    padding : 16px;
    display : flex;
    flex-direction : column;
    width : 340px;
    margin : 150px auto 0;
    border : 1px solid #d8dee4;
    border-radius : 6px;
    box-sizing : border-box;
    background-color : #f6f8fa;
`;

const StyledTitle = styled.h3`
    font-size : 24px;
    letter-spacing : -0.5px;
    font-weight : 300;
    margin-top : 10px;
    margin-bottom : 10px;
`;

const StyledLabel = styled.label`
    display : block;
    margin-bottom : 8px;
    font-weight : 400;
    font-size : 14px;
    line-height : 1.5;
    color : #24292f;
`;

const StyledInput = styled.input`
    width : 100%;
    margin-top : 4px;
    margin-bottom : 16px;
    padding : 5px 12px;
    font-size : 14px;
    line-height : 20px;
    color : #24292f;
    border : 1px solid #d0d7de;
    border-radius : 6px;
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    display : block;
    width : 100%;
    text-align : center;
    background-color : #2da44e;
    color : #ffffff;
    padding : 5px 16px;
    font-size : 14px;
    font-weight : 500;
    line-height : 20px;
    border-radius : 6px;
    border: none;
`;