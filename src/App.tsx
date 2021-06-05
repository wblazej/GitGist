import React from 'react';
import GistsWrapper from './ts/gistsWrapper';
import { token } from './config.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Main from './pages/Main';

const App = () => {
    const wrapper = new GistsWrapper(token)

    return (
        <div className="container">
            <Profile/>
            <div className="content">
                <Router>
                    <Switch>
                        <Route exact path='/'><Main wrapper={wrapper}></Main></Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default App;
