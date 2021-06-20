import React, { useState } from 'react';
import GistsWrapper from './ts/gistsWrapper';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Main from './pages/Main';
import AddGist from './pages/AddGist';
import { IMessage } from '././/ts/interfaces';
import Gist from './pages/Gist';
import EditGist from './pages/EditGist';
import { setCookie, getCookie } from './ts/cookies';
import { useEffect } from 'react';

const App = () => {
    const [token, setToken] = useState("")
    const [wrapper, setWrapper] = useState<GistsWrapper>(new GistsWrapper(""))
    const [tokenIsCorrect, setTokenIsCorrect] = useState(false)

    const [displayName, setDisplayName] = useState("")
    const [login, setLogin] = useState("")

    const [message, setMessage] = useState<IMessage>({content: '', status: '', shown: false, hiding: false})

    const throwMessage = (status: string, content: string, expire: number = 3000) => {
        if (message.shown) return

        setMessage({content: content, status: status, shown: true, hiding: false})

        setTimeout(() => {
            setMessage((message: IMessage) => ({...message, hiding: true}))
            setTimeout(() => {
                setMessage({status: "", content: "", shown: false, hiding: false})
            }, 300)
        }, expire - 300)
    }

    const createWrapper = () => {
        const wrapper = new GistsWrapper(token)
        wrapper.validate()
        .then(response => {
            setWrapper(wrapper)
            setTokenIsCorrect(true)
            setDisplayName(response.data.name)
            setLogin(response.data.login)

            setCookie('token', token, 1)
            console.log(response)
        })
        .catch(error => {
            if (error.response.status === 401)
                throwMessage('failure', "Token is incorrect")
            else if (error.response.status === 403)
                throwMessage('failure', "API rate limit exceeded for this user")
        })
    }

    useEffect(() => {
        let tkn = getCookie('token')
        if (tkn) {
            const wrapper = new GistsWrapper(tkn)
            wrapper.validate()
            .then(response => {
                setWrapper(wrapper)
                setTokenIsCorrect(true)
                setDisplayName(response.data.name)
                setLogin(response.data.login)
            })
            .catch(error => {
                if (error.response.status === 401)
                    setCookie('token', '', -1)
            })
        }   
    }, [])

    return (
        <>
        { message.shown && <div className={message.hiding ? `message hiding ${message.status}` : `message ${message.status}`}>{message.content}</div> }
        <div className="container">
            <Router>
                <Profile setToken={setToken} createWrapper={createWrapper} displayName={displayName} login={login} />
                <div className="content">
                    <Switch>
                        <Route exact path='/'><Main wrapper={wrapper} tokenIsCorrect={tokenIsCorrect}/></Route>
                        <Route exact path='/add'><AddGist wrapper={wrapper} throwMessage={throwMessage}/></Route>
                        <Route exact path='/gists/:id'><Gist wrapper={wrapper} throwMessage={throwMessage} /></Route>
                        <Route exact path='/edit/:id'><EditGist wrapper={wrapper} throwMessage={throwMessage} /></Route>
                    </Switch>
                </div>
            </Router>
        </div>
        </>
    )
}

export default App;
