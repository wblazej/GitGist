import React, { useState } from 'react';
import GistsWrapper from './ts/gistsWrapper';
import { token } from './config.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Main from './pages/Main';
import AddGist from './pages/AddGist';
import { IMessage } from '././/ts/interfaces';
import Gist from './pages/Gist';
import EditGist from './pages/EditGist';

const App = () => {
    const wrapper = new GistsWrapper(token)

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
    

    return (
        <>
        { message.shown && <div className={message.hiding ? `message hiding ${message.status}` : `message ${message.status}`}>{message.content}</div> }
        <div className="container">
            <Router>
                <Profile/>
                <div className="content">
                    <Switch>
                        <Route exact path='/'><Main wrapper={wrapper}/></Route>
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
