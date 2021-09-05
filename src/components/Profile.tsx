import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './../style/profile.css'
import GitHubLogo from './../img/github_logo.png';


interface IProps {
    createWrapper: Function;
    token: string | null;

    displayName: string;
    login: string;
}

const Profile: React.FunctionComponent<IProps> = (props: IProps) => {
    const [authToken, setAuthToken] = useState("")

    const submitTokenForm = (Event: React.FormEvent) => {
        Event.preventDefault()
        props.createWrapper(authToken)
    }

    useEffect(() => {
        if (props.token)
            setAuthToken(props.token)
    }, [props.token])

    return (
        <div className="profile">
            <div className="name-container">
                <h2>{props.displayName !== "" ? props.displayName : "-"}</h2>
                <span className="nickname">{props.login !== "" ? props.login : "-"}</span>
            </div>
            <form onSubmit={submitTokenForm}>
                <input 
                    type="password" placeholder="Token" 
                    onChange={(Event: React.FormEvent<HTMLInputElement>) => setAuthToken(Event.currentTarget.value)} 
                    value={authToken}
                />
                <input type="submit" value="Save" />
            </form>

            <a href="https://github.com/wblazej/GitGist" target="_blank" rel="noreferrer" className="repo-link">
                <img src={GitHubLogo} alt="github_logo" className="logo" />
            </a>
            <Link to="/" type="submit" className="main-page-button">Main page</Link>
        </div>
    )
}

export default Profile;