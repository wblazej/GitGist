import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import toast from 'react-hot-toast';


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

    const createWrapper = (authToken: string) => {
        const wrapper = new GistsWrapper(authToken)
        wrapper.validate()
        .then(response => {
            setWrapper(wrapper)
            setDisplayName(response.data.name)
            setLogin(response.data.login)

            localStorage.setItem("token", authToken)

            toast.success("Saved token")
        })
        .catch(error => {
            if (error.response.status === 401)
                toast.error("Token is incorrect")
            else if (error.response.status === 403)
                toast.error("API rate limit exceeded for this user")
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
        <div className="app">
            <Router>
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
                            <AddGist wrapper={wrapper} />
                        </Route>

                        <Route exact path='/gists/:id'>
                            <Gist wrapper={wrapper} />
                        </Route>

                        <Route exact path='/edit/:id'>
                            <EditGist wrapper={wrapper} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;
