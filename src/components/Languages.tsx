import React from 'react';

import DefaultIcon from './langIcons/Default';
import PythonIcon from './langIcons/Python';
import JavaScriptIcon from './langIcons/JavaScript';
import HTMLIcon from './langIcons/HTML';
import CSSIcon from './langIcons/CSS';
import TypeScriptIcon from './langIcons/TypeScript';
import JavaIcon from './langIcons/Java';

const Languages: React.FunctionComponent<{ lang: string }> = ({ lang }) => {
    switch (lang) {
        case "Python":
            return <PythonIcon />
        case "JavaScript":
            return <JavaScriptIcon />
        case "HTML":
            return <HTMLIcon />
        case "CSS":
            return <CSSIcon />
        case "TypeScript":
            return <TypeScriptIcon />
        case "Java":
            return <JavaIcon />
        default:
            return <DefaultIcon />
    }
}

export default Languages;
