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

    const mode = "create";

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
                        if (_.findIndex(options, { 'value': item.id }) < 0) {
                            options.push({ label: item.name, value: item.id });
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

    function handleSelectOnchange(e) {
        console.log("****** selected on change = " + e.value)
        const selection = _.find(Object.values(templates), { 'id': e.value });
        console.log(selection)
        if (selection) {
            setSelectedTemplate(e.value);
            setMandatoryFields(selection.mandatoryFields);
            setAirtableBaseCopy(selection.airtableBaseCopy);
        }
        console.log("****** selectedTemplate = " + selectedTemplate)
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
                    console.log("+++++ selectedTemplate = " + selectedTemplate)
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
        <>
            {loading &&
                <div className="text-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h3>Create Project!</h3>
                                <p> Input details of your Airtable project. All fields are mandatory.</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <fieldset className="border p-3">
                                        <legend className="font-bold">Template Selection</legend>
                                        <div>
                                            <label>
                                                Select Template to be used
                                            </label>
                                            <Select
                                                name="templateselect"
                                                options={options}
                                                onChange={handleSelectOnchange}
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <label>
                                                Default mandatory columns of the template
                                            </label>
                                            <input
                                                className="w-100 p-2"
                                                id="defaultcolumns"
                                                value={mandatoryFields}
                                                onChange={({ target: { value } }) => {
                                                    setMandatoryFields(value);
                                                }}
                                                disabled
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <label>
                                                Use below button to Copy Template's Airtable Base
                                            </label>
                                            <div><a href={airtableBaseCopy} target="_blank" className="text-primary p-2 w-100">
                                                Copy Template Base
                                            </a></div>
                                        </div>
                                    </fieldset>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
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
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
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
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
                                            id="apikey"
                                            placeholder="Airtable API Key"
                                            type="text"
                                            value={apiKey}
                                            required
                                            onChange={({ target: { value } }) => {
                                                setApiKey(value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
                                            id="apikey"
                                            placeholder="Airtable Base ID"
                                            type="text"
                                            value={baseId}
                                            required
                                            onChange={({ target: { value } }) => {
                                                setBaseId(value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
                                            id="apikey"
                                            placeholder="Airtable Table Name"
                                            type="text"
                                            value={tableName}
                                            required
                                            onChange={({ target: { value } }) => {
                                                setTableName(value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control p-2 mt-3"
                                            id="apikey"
                                            placeholder="Airtable View Name e.g. Grid view"
                                            type="text"
                                            value={viewName}
                                            required
                                            onChange={({ target: { value } }) => {
                                                setViewName(value);
                                            }}
                                        />
                                    </div>
                                    <div className="mx-auto">
                                        <input type="button" value={`Create Project`} onClick={createProject} className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectCreate
