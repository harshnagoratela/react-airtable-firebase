import React from "react"
import { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { getUser } from "../../utils/auth"
import { FirebaseContext } from "gatsby-plugin-firebase"
import View from "../View"
import _ from "lodash"

const ProjectCreate = () => {
    const firebase = React.useContext(FirebaseContext)
    const user = getUser();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [baseId, setBaseId] = useState("");
    const [tableName, setTableName] = useState("");    
    
    const createProject = () => {
        const newProject = {
            title,
            slug,
            apiKey,
            baseId,
            tableName
        };
        console.log(newProject)
        firebase
          .database()
          .ref()
          .child(`users/${user.uid}/projects/${slug}`)
          .set(newProject)
          .then(() => navigate(`/`));          
    };

    return (
        <View title="">
            <form className="form bg-white p-6 my-10 relative">               
                <div className="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5" style={{left:"-40px"}}><i className="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i></div>
                <h3 className="text-2xl text-gray-900 font-semibold">Create Project!</h3>
                <p className="text-gray-600"> Input details of your Airtable project. All fields are mandatory.</p>
                <input
                    className="border p-2 w-full mt-3"
                    id="title"
                    placeholder="Project Title"
                    type="text"
                    value={title}
                    required
                    onChange={({ target: { value } }) => {
                        setTitle(value);
                        setSlug(_.kebabCase(value));
                    }}
                />
                <input
                    className="border p-2 w-full mt-3"
                    id="slug"
                    placeholder="Project Slug"
                    type="text"
                    value={slug}
                    required
                    disabled
                    onChange={({ target: { value } }) => {
                        setSlug(value);
                    }}
                />
                <input
                    className="border p-2 w-full mt-3"
                    id="apikey"
                    placeholder="Airtable API Key"
                    type="text"
                    value={apiKey}
                    required
                    onChange={({ target: { value } }) => {
                        setApiKey(value);
                    }}
                />
                <input
                    className="border p-2 w-full mt-3"
                    id="apikey"
                    placeholder="Airtable Base ID"
                    type="text"
                    value={baseId}
                    required
                    onChange={({ target: { value } }) => {
                        setBaseId(value);
                    }}
                />
                <input
                    className="border p-2 w-full mt-3"
                    id="apikey"
                    placeholder="Airtable Table Name"
                    type="text"
                    value={tableName}
                    required
                    onChange={({ target: { value } }) => {
                        setTableName(value);
                    }}
                />                
                <input type="button" value="Create" onClick={createProject} className="w-1/2 mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3" />
            </form>
        </View>
    )
}

export default ProjectCreate
