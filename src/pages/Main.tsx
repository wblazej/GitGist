import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import GistsWrapper from './../ts/gistsWrapper'
import { IGist, IFile } from './../ts/interfaces';

import './../style/main.css'
import LanguagesIcons from './../components/Languages';
import ArrowIcon from './../img/icons/Arrow';
import PlusIcon from './../img/icons/Plus';


interface IProps {
    wrapper: GistsWrapper
    tokenIsCorrect: boolean;
}

const Main: React.FunctionComponent<IProps> = (props: IProps) => {
    const [gistsList, setGistsList] = useState(Array<IGist>())
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (props.tokenIsCorrect) {
            props.wrapper.getGists(null, 10, currentPage)
            .then(response => {
                if (response.status === 200) {
                    const gists: IGist[] = []

                    response.data.forEach((data: any) => {
                        const files: IFile[] = []
                        
                        Object.keys(data.files).forEach((key: string) => {
                            files.push({
                                name: data.files[key].filename,
                                language: data.files[key].language,
                                content: data.files[key].content
                            })
                        })

                        gists.push({
                            id: data.id,
                            createdAt: data.created_at,
                            description: data.description,
                            isPublic: data.public,
                            files: files
                        })
                    })

                    setGistsList(gists)
                }
            })
        }
    }, [props.wrapper, currentPage, props.tokenIsCorrect])

    const nextPage = () => setCurrentPage(currentPage + 1)
    const prevoiusPage = () => setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1)

    if (props.tokenIsCorrect)
        return (
            <div className="gists-container">
                <div className="buttons-panel">
                    <div className="button left-arrow" title="Previous page" onClick={prevoiusPage}><ArrowIcon/></div>
                    <div className="button" title="Current page">{currentPage}</div>
                    <div className="button" title="Next page" onClick={nextPage}><ArrowIcon/></div>
                    <Link to="/add" className="button" title="Add new gist"><PlusIcon/></Link>
                </div>

                <div className="gists">
                    { gistsList.map((gist: IGist, key: number) => (
                        <Link to={`/gists/${gist.id}`} className="gist" key={key}>
                            <h3>{gist.description}</h3>
                            <span className="gist-info">{gist.files.length} {gist.files.length === 1 ? "file" : "files"}</span>
                            { !gist.isPublic && <span className="gist-info private">private</span> }
                            
                            <div className="files">
                                { gist.files.map((file: IFile, i: number) => (
                                    <div className="file" key={i}>
                                        <LanguagesIcons lang={file.language ? file.language : ""} />
                                        <span className="filename">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    else return (
        <p className="page-info">Set the GitHub API token using the panel on the left to use this gist viewer</p>
    )
}

export default Main;