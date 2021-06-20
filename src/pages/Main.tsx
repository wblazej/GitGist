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
}

const Main: React.FunctionComponent<IProps> = (props: IProps) => {
    const [gistsList, setGistsList] = useState(Array<IGist>())
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        props.wrapper.getGists(null, 10, currentPage)
        .then(response => {
            if (response.status === 200) {
                const gists: IGist[] = []

                response.data.forEach((data: any) => {
                    const files: IFile[] = []
                    
                    Object.keys(data.files).forEach((key: string) => {
                        files.push({
                            name: data.files[key].filename,
                            language: data.files[key].language
                        })
                    })

                    gists.push({
                        id: data.id,
                        createdAt: data.created_at,
                        description: data.description,
                        isPublic: data.public,
                        filesCount: files.length,
                        files: files
                    })
                })

                setGistsList(gists)
            }
        })
    }, [props.wrapper, currentPage])

    const nextPage = () => setCurrentPage(currentPage + 1)
    const prevoiusPage = () => setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1)

    return (
        <div className="gists-container">
            <div className="buttons-panel">
                <div className="button left-arrow" title="Previous page" onClick={prevoiusPage}><ArrowIcon/></div>
                <div className="button" title="Current page">{currentPage}</div>
                <div className="button" title="Next page" onClick={nextPage}><ArrowIcon/></div>
                <Link to="/add" className="button" title="Add new gist"><PlusIcon/></Link>
            </div>

            { gistsList.map((gist: IGist, key: number) => (
                <Link to={`/gists/${gist.id}`} className="gist" key={key}>
                    <h3>{gist.description}</h3>
                    <span className="gist-info">{gist.filesCount} {gist.filesCount === 1 ? "file" : "files"}</span>
                    { !gist.isPublic && <span className="gist-info private">private</span> }
                    
                    <div className="files">
                        { gist.files.map((file: IFile, i: number) => (
                            <div className="file" key={i}>
                                <LanguagesIcons lang={file.language} />
                                <span className="filename">{file.name}</span>
                            </div>
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Main;