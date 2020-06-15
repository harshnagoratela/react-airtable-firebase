import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Airtable from 'airtable';
import firebase from "gatsby-plugin-firebase"
import Loader from 'react-loader-spinner'

import LayoutPublic from "../Layout/public"

import ProductHuntTemplate from './PublicTemplates/ProductHunt'
import BlogTemplate from './PublicTemplates/Blog'

const ProjectPublicView = props => {

    const [records, setRecords] = useState([]);
    const [votes, setVotes] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState();

    React.useEffect(() => {
        firebase
            .database()
            .ref(`users/${props.userid}/projects/${props.slug}`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                //console.log(snapshotVal)
                let viewName = "Grid view";
                if (!snapshotVal) { setError("ERROR: Unable to find Project Details"); }
                if (!snapshotVal || !snapshotVal.apiKey) { setError("ERROR: Unable to find 'API KEY' in Project Details"); }
                if (!snapshotVal || !snapshotVal.baseId) { setError("ERROR: Unable to find 'BASE ID' in Project Details"); }
                if (!snapshotVal || !snapshotVal.tableName) { setError("ERROR: Unable to find 'TABLE NAME' in Project Details"); }
                if (snapshotVal && snapshotVal.viewName) { viewName = snapshotVal.viewName }
                if (snapshotVal && snapshotVal.selectedTemplate) { setTemplate(snapshotVal.selectedTemplate); }
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
                        ).then(getVotesData());
                }
            }, [props.userid, props.slug]);
    }, [loading, template]);

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

    const likeHelperData = {
        userid: props.userid,
        slug: props.slug,
        votes: votes
    }

    return (
        <LayoutPublic title={title}>
            <Helmet title={`Hyper - ${title}`}>

            </Helmet>
            <div className="App">
                {loading &&
                    <div className="text-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
                }

                {error &&
                    <div className="flex justify-center">
                        <div className="bg-red-100 items-center border-t-4 border-red-600 rounded-b text-red-800 px-4 py-3 shadow-md my-2 w-1/2" role="alert">
                            <div className="flex">
                                <div>
                                    <p className="font-bold">Error(s) Found</p>
                                    <p className="text-sm">{error}</p>
                                    <p className="text-sm">Please make sure to rectify it and re-visit this page again</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!loading && records.length > 0 && template === "template_002_producthunt" &&
                    <ProductHuntTemplate title={title} records={records} likeHelperData={likeHelperData} />
                }

                {!loading && records.length > 0 && template === "template_001_blog" &&
                    <BlogTemplate title={title} records={records} />
                }
            </div>
        </LayoutPublic>
    )
}

export default ProjectPublicView