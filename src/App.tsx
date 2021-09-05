import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { IMessage } from '././/ts/interfaces';
import GistsWrapper from './ts/gistsWrapper';
import Profile from './components/Profile';

// pages
import Main from './pages/Main';
import AddGist from './pages/AddGist';
import Gist from './pages/Gist';
import EditGist from './pages/EditGist';

const App = () => {
    const [token, setToken] = useState<string | null>(null)
    const [wrapper, setWrapper] = useState<GistsWrapper>()

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

    const createWrapper = (authToken: string) => {
        const wrapper = new GistsWrapper(authToken)
        wrapper.validate()
        .then(response => {
            setWrapper(wrapper)
            setDisplayName(response.data.name)
            setLogin(response.data.login)

            localStorage.setItem("token", authToken)

            throwMessage('success', "Token is correct")
        })
        .catch(error => {
            if (error.response.status === 401)
                throwMessage('failure', "Token is incorrect")
            else if (error.response.status === 403)
                throwMessage('failure', "API rate limit exceeded for this user")
        })
    }

    useEffect(() => {
        let tokenFromStorage = localStorage.getItem("token")
        if (tokenFromStorage) {
            const wrapper = new GistsWrapper(tokenFromStorage)
            wrapper.validate()
            .then(response => {
                setWrapper(wrapper)
                setDisplayName(response.data.name)
                setLogin(response.data.login)
                setToken(tokenFromStorage)
            })
            .catch(error => {
                if (error.response.status === 401)
                    localStorage.removeItem("token")
            })
        }
    }, [])

    return (
        <>
            { message.shown && <div className={message.hiding ? `message hiding ${message.status}` : `message ${message.status}`}>{message.content}</div> }
            <div className="container">
                <Router basename={process.env.PUBLIC_URL}>
                    <Profile 
                        token={token} 
                        createWrapper={createWrapper} 
                        displayName={displayName} 
                        login={login}
                    />
                    
                    <div className="content">
                        <Switch>
                            <Route exact path='/'>
                                <Main wrapper={wrapper} />
                            </Route>

                            <Route exact path='/add'>
                                <AddGist wrapper={wrapper} throwMessage={throwMessage}/>
                            </Route>

                            <Route exact path='/gists/:id'>
                                <Gist wrapper={wrapper} throwMessage={throwMessage} />
                            </Route>

                            <Route exact path='/edit/:id'>
                                <EditGist wrapper={wrapper} throwMessage={throwMessage} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </>
    )
}

export default App;
