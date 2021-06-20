import React from 'react';
import { Link } from 'react-router-dom';

import './../style/profile.css'
import GitHubLogo from './../img/github_logo.png';


interface IProps {
    setToken: Function;
    createWrapper: Function;
    displayName: string;
    login: string;
}

const Profile: React.FunctionComponent<IProps> = (props: IProps) => {
    const tokenHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        props.setToken(Event.currentTarget.value)

    const submitToken = (Event: React.FormEvent) => {
        Event.preventDefault()
        props.createWrapper()
    }

    return (
        <div className="profile">
            <div className="name-container">
                <h2>{props.displayName !== "" ? props.displayName : "-"}</h2>
                <span className="nickname">{props.login !== "" ? props.login : "-"}</span>
            </div>
            <form onSubmit={submitToken}>
                <input type="password" placeholder="Token" onChange={tokenHandler} />
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