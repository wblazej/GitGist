import React from 'react';

import PythonIcon from './../img/langIcons/Python';
import JavaScriptIcon from './../img/langIcons/JavaScript';

interface IProps {
    lang: string;
}

const Languages: React.FunctionComponent<IProps> = (props: IProps) => {
    switch(props.lang) {
        case "Python":
            return <PythonIcon/>
        case "JavaScript":
            return <JavaScriptIcon/>
        default:
            return <PythonIcon/>
    }
}

export default Languages;