import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../style/profile.css'


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
                    onChange={(event: React.FormEvent<HTMLInputElement>) => setAuthToken(event.currentTarget.value)} 
                    value={authToken}
                />
                <input type="submit" value="Save" />
            </form>

            <div className="buttons">
                <Link to="/" type="submit"><i className="fa-solid fa-house"></i></Link>
                <Link to="/add" className="button" title="Add new gist"><i className="fa-solid fa-plus"></i></Link>
                <a href="https://github.com/wblazej/GitGist" target="_blank" rel="noreferrer" ><i className="fa-brands fa-github"></i></a>
            </div>
        </div>
    )
}

export default Profile;