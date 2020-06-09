import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Airtable from 'airtable';
import firebase from "gatsby-plugin-firebase"
import Loader from 'react-loader-spinner'
import _ from "lodash"

import FirstDemoTemplate from './PublicTemplates/FirstDemo'
import BlogTemplate from './PublicTemplates/Blog'

const ProjectPublicView = props => {

    const [records, setRecords] = useState([]);
    const [votes, setVotes] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState();
    const [mandatoryFields, setMandatoryFields] = useState();

    React.useEffect(() => {
        firebase
            .database()
            .ref(`users/${props.userid}/projects/${props.slug}`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                console.log(snapshotVal)
                let viewName = "Grid view";
                if (!snapshotVal) { setError("ERROR: Unable to find Project Details"); }
                if (!snapshotVal.apiKey) { setError("ERROR: Unable to find 'API KEY' in Project Details"); }
                if (!snapshotVal.baseId) { setError("ERROR: Unable to find 'BASE ID' in Project Details"); }
                if (!snapshotVal.tableName) { setError("ERROR: Unable to find 'TABLE NAME' in Project Details"); }
                if (snapshotVal.viewName) { viewName = snapshotVal.viewName }
                if (snapshotVal.selectedTemplate) { setTemplate(snapshotVal.selectedTemplate); }
                console.log("*** Template = " + template)

                if (snapshotVal && snapshotVal.apiKey && snapshotVal.baseId && snapshotVal.tableName) {
                    setTitle(snapshotVal.title);

                    const base = new Airtable({ apiKey: snapshotVal.apiKey }).base(snapshotVal.baseId);

                    base(snapshotVal.tableName).select({ view: viewName })
                        .eachPage(
                            (records, fetchNextPage) => {
                                setRecords(records);
                                console.log("***** Found '" + records.length + "' records from Airtable");
                                console.log(records)
                                fetchNextPage();
                            }
                        ).then(getVotesData()).then(checkMandatoryFieldsData());
                }
            }, [props.userid, props.slug]);


    }, [props, getVotesData, checkMandatoryFieldsData]);

    const getVotesData = () => {
        //getting votes data
        firebase
            .database()
            .ref(`users/${props.userid}/projects/${props.slug}/votes`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                console.log("******* Votes data")
                console.log(snapshotVal)
                if (snapshotVal) setVotes(snapshotVal);
                setLoading(false);
            });
    };

    const checkMandatoryFieldsData = () => {
        if (!template) return;

        /*
        firebase
        .database()
        .ref(`templates/${template}`)
        .once("value")
        .then(snapshot => {
            const snapshotVal = snapshot.val();
            console.log("********** Templates data");
            console.log(snapshotVal)
            if(snapshotVal && snapshotVal.mandatoryFields) {setMandatoryFields(snapshotVal.mandatoryFields);}
            //checking whether mandatory fields are present or not
            if(records) {
                if(records.length <=0 ) {setError("No Record Found in the Airtable")}
                else {
                    const recordKeys = Object.keys(records[0].fields);
                    const arrayMandatoryFields = mandatoryFields.split(',');
                    arrayMandatoryFields.map(field => {
                        const exists = recordKeys.includes(field.trim());
                        if(!exists) {
                            const errorMessage = "Field '"+field+"' is not present in Airtable.";
                            console.log(errorMessage)
                            setError(errorMessage)
                        }
                    })    
                    
                }            
            }
        });
        */
    };

    const likeHelperData = {
        userid: props.userid,
        slug: props.slug,
        votes: votes
    }

    return (
        <>
            <Helmet title={`Hyper - ${title}`}>

            </Helmet>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-4 mb-4 blue-section">
                            <h3>{title}</h3>
                        </div>
                    </div>
                </div>
                {loading &&
                    <div className="d-flex justify-content-center align-items-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
                }

                {error &&
                    <div className="flex justify-center">
                        <div className="bg-red-100 items-center border-t-4 border-red-600 rounded-b text-red-800 px-4 py-3 shadow-md my-2 w-1/2" role="alert">
                            <div className="flex">
                                <svg className="h-6 w-6 text-red-800 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                                <div>
                                    <p className="font-bold">Error(s) Found</p>
                                    <p className="text-sm">{error}</p>
                                    <p className="text-sm">Please make sure to rectify it and re-visit this page again</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!loading && records.length > 0 && !template &&
                    <FirstDemoTemplate title={title} records={records} likeHelperData={likeHelperData} />
                }

                {!loading && records.length > 0 && template && template === "template_001_blog" &&
                    <BlogTemplate title={title} records={records} />
                }
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-4 mb-4 blue-section">
                            <h3>Ready for more?</h3>
                            <form name="form">
                                <input placeholder="Type your email..." />
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectPublicView