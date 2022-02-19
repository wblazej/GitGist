import React, { useState } from 'react';

import GistsWrapper from './../ts/gistsWrapper';
import './../style/addGist.css';
import { IFile } from './../ts/interfaces';
import TrashIcon from './../img/icons/Trash';
import NoneTokenInfo from './../components/NoneTokenInfo';
import toast from 'react-hot-toast';


interface IProps {
    wrapper: GistsWrapper | undefined;
}

const AddGist: React.FunctionComponent<IProps> = (props: IProps) => {
    const [files, setFiles] = useState(Array<IFile>())
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)

    const descriptionHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setDescription(Event.currentTarget.value)

    const isPublicHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setIsPublic(Event.currentTarget.checked)

    const addFile = () =>
        setFiles(files => [...files].concat({name: "", content: "", language: null}))

    const filenameHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: IFile, index: number) => index === i ? {...item, name: value} : item))

    const contentHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: IFile, index: number) => index === i ? {...item, content: value} : item))

    const removeFile = (i: number) =>
        setFiles(files => files.filter((value: IFile, index: number) => index !== i))

    const create = (Event: React.FormEvent) => {
        Event.preventDefault()
        
        if (props.wrapper) {
            if (description.length === 0)
                return toast.error("Description cannot be blank")

            if (files.length === 0)
                return toast.error("Add at least one file")

            files.forEach((value: IFile, index: number) => {
                if (value.name.length === 0)
                    return toast.error(`Filename cannot be blank in file ${index + 1}`)
                if (value.content.length === 0)
                    return toast.error(`File content cannot be blank in file ${index + 1}`)
            })

            let filesObject: any = {}
            files.forEach((value: IFile) => {
                filesObject[value.name] = {content: value.content}
            })

            props.wrapper.createGist(description, isPublic, filesObject)
            .then(response => {
                if (response.status === 201)
                    toast.success("Gist has been successfully created")
                setDescription("")
                setIsPublic(false)
                setFiles([])
            })
            .catch(error => {
                if (error.response.status === 401)
                    toast.error("You didn't provide any token or it's incorrect")
            })
        }
    }

    if (props.wrapper)
        return (
            <div className="add-new-gist">
                <form onSubmit={create}>
                    <div className="header">
                        <input type="text" placeholder="Gist description..." className="description" value={description} onChange={descriptionHandler} />
                        <span className="private">Private</span>
                        <div className="switch-button">
                            <input 
                                type="checkbox" id="is-public" checked={isPublic} 
                                onChange={isPublicHandler} 
                            />
                            <label htmlFor="is-public"></label>
                        </div>
                    </div>

                    { files.map((file: IFile, i: number) => (
                        <div className="new-file" key={i}>
                            <div className="settings">
                                <input 
                                    type="text" placeholder="File name" value={file.name} 
                                    onChange={(Event: React.FormEvent<HTMLInputElement>) => filenameHandler(Event.currentTarget.value, i)} 
                                />
                                <div className="remove-button" onClick={() => removeFile(i)}><TrashIcon/></div>
                            </div>
                            <textarea 
                                value={file.content} 
                                onChange={(Event: React.FormEvent<HTMLTextAreaElement>) => contentHandler(Event.currentTarget.value, i)}>
                            </textarea>
                            <span className="code-sign">code</span>
                        </div>
                    ))}
                    

                    <div className="buttons">
                        <div className="add-button" onClick={addFile}>Add file</div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    else return <NoneTokenInfo/>
}

export default AddGist;