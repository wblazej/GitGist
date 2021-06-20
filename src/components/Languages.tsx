import React from 'react';

import DefaultIcon from './../img/langIcons/Default';
import PythonIcon from './../img/langIcons/Python';
import JavaScriptIcon from './../img/langIcons/JavaScript';
import HTMLIcon from './../img/langIcons/HTML';
import CSSIcon from './../img/langIcons/CSS';
import TypeScriptIcon from './../img/langIcons/TypeScript';

interface IProps {
    lang: string;
}

const Languages: React.FunctionComponent<IProps> = (props: IProps) => {
    switch(props.lang) {
        case "Python":
            return <PythonIcon/>
        case "JavaScript":
            return <JavaScriptIcon/>
        case "HTML":
            return <HTMLIcon/>
        case "CSS":
            return <CSSIcon/>
        case "TypeScript":
            return <TypeScriptIcon/>
        default:
            return <DefaultIcon/>
    }
}

export default Languages;