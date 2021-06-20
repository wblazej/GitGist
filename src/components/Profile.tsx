import React from 'react';
import './../style/profile.css'
import GitHubLogo from './../img/github_logo.png';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <>
            <div className="profile">
                <div className="name-container">
                    <h2>Błażej Wrzosok</h2>
                    <span className="nickname">wblazej</span>
                </div>
                <form>
                    <input type="password" placeholder="Token" />
                    <input type="submit" value="Save" />
                </form>

                <a href="https://github.com/wblazej/GitGist" target="_blank" rel="noreferrer" className="repo-link">
                    <img src={GitHubLogo} alt="github_logo" className="logo" />
                </a>
                <Link to="/" type="submit" className="main-page-button">Main page</Link>
            </div>
        </>
    )
}

export default Profile;