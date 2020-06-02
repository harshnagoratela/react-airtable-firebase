import React from "react"
import { Link } from "gatsby"
import { useState } from "react"
import Select from "react-select"
import { navigate } from "@reach/router"
import { getUser } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import View from "../View"
import _ from "lodash"
import Loader from 'react-loader-spinner'

const ProjectCreate = ({ location }) => {
    const user = getUser();
    const [loading, setLoading] = useState(true);

    const [templates, setTemplates] = useState([]); 
    const [options, setOptions] = useState([]);

    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [mandatoryFields, setMandatoryFields] = useState("");
    const [airtableBaseCopy, setAirtableBaseCopy] = useState("#");
    
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [baseId, setBaseId] = useState("");
    const [tableName, setTableName] = useState("");
    const [viewName, setViewName] = useState("");

    const { state = {} } = location

    const mode = location.state.mode || "create";

    //console.log(location)
    console.log("************* form mode = " + mode)
    if (mode && mode === "edit") {
        findProject(location.state.userid, location.state.slug);
    }  

    React.useEffect(() => {
        if (loading && !templates.length) {
            firebase
            .database()
            .ref(`templates`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                //console.log(snapshot.val())
                //console.log(Object.values(snapshotVal))
                //console.log(Object.keys(snapshotVal))
                Object.values(snapshotVal).map((item) => {
                    console.log(item);
                    if(_.findIndex(options, { 'value': item.id }) < 0) {
                        options.push({label: item.name, value: item.id});
                    }
                }); 
                //let dropDownEle = { label: element["title"], value: element };
                //options1.push(dropDownEle);

                setTemplates(snapshotVal);
                setLoading(false);                
                console.log(templates);
            }); //end of loading of all templates            
        }
    }, [loading, templates])

    function handleSelectOnchange (e) {
        console.log("****** selected on change = "+e.value)
        const selection = _.find(Object.values(templates), { 'id': e.value });
        console.log(selection)
        if(selection){
            setSelectedTemplate(e.value);
            setMandatoryFields(selection.mandatoryFields);
            setAirtableBaseCopy(selection.airtableBaseCopy);
        }
        console.log("****** selectedTemplate = "+selectedTemplate)
    }

    function findProject(userid, slug) {
        firebase
            .database()
            .ref(`users/${userid}/projects/${slug}`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                console.log(snapshotVal)
                if (snapshotVal && snapshotVal.selectedTemplate) {
                    setSelectedTemplate(snapshotVal.selectedTemplate);
                    console.log("+++++ selectedTemplate = "+selectedTemplate)
                }
                if (snapshotVal && snapshotVal.title) {
                    setTitle(snapshotVal.title);
                    setSlug(snapshotVal.slug)
                }
                if (snapshotVal && snapshotVal.apiKey) {
                    setApiKey(snapshotVal.apiKey);
                }
                if (snapshotVal && snapshotVal.baseId) {
                    setBaseId(snapshotVal.baseId);
                }
                if (snapshotVal && snapshotVal.tableName) {
                    setTableName(snapshotVal.tableName);
                }
                if (snapshotVal && snapshotVal.viewName) {
                    setViewName(snapshotVal.viewName);
                }
            });
    };

    const createProject = () => {
        const newProject = {
            selectedTemplate,
            title,
            slug,
            apiKey,
            baseId,
            tableName,
            viewName
        };
        firebase
            .database()
            .ref()
            .child(`users/${user.uid}/projects/${slug}`)
            .set(newProject)
            .then(() => navigate(`/`));
    };

    return (
        <View title="">                    
            {loading &&
                <div className="flex justify-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            <form className="form bg-white lg:p-6 md:p-2 my-10 relative md:w-full lg:w-1/2">
                <div className="icon bg-blue-600 text-white text-3xl w-6 h-6 absolute flex items-center justify-center p-5" style={{ left: "-40px" }}>+</div>
                <h3 className="text-2xl text-gray-900 font-semibold">Create Project!</h3>
                <p className="text-gray-600"> Input details of your Airtable project. All fields are mandatory.</p>

                <fieldset className="flex items-center border bg-teal-lighter p-5 mt-3">
                    <legend className="font-bold">Template Selection</legend>
                    <div className="pt-3">
                        <label className="w-full">
                            Select Template to be used
                        </label>
                        <Select
                            name="templateselect"
                            options={options}
                            onChange={handleSelectOnchange}
                        />
                    </div>
                    <div className="pt-3">
                        <label className="w-full">
                            Default mandatory columns of the template
                        </label>
                        <input
                            className="border p-2 w-full"
                            id="defaultcolumns"
                            value = {mandatoryFields}
                            onChange={({ target: { value } }) => {
                                setMandatoryFields(value);
                            }}
                            disabled
                        />
                    </div>
                    <div className="pt-3">
                        <label className="w-full">
                            Use below button to Copy Template's Airtable Base
                        </label>
                        <a href={airtableBaseCopy} target="_blank" className="block w-1/2 bg-teal-600 hover:bg-teal-500 text-white font-semibold p-2">
                            Copy Template Base
                        </a>
                    </div>
                </fieldset>

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
                <input
                    className="border p-2 w-full mt-3"
                    id="apikey"
                    placeholder="Airtable View Name e.g. Grid view"
                    type="text"
                    value={viewName}
                    required
                    onChange={({ target: { value } }) => {
                        setViewName(value);
                    }}
                />
                <input type="button" value={mode} onClick={createProject} className="w-1/2 mt-6 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold p-3" />
            </form>
        </View>
    )
}

export default ProjectCreate
