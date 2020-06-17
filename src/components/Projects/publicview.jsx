import React, { useState } from 'react';
import {Alert} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Airtable from 'airtable';
import firebase from "gatsby-plugin-firebase"
import Loader from 'react-loader-spinner'

import LayoutPublic from "../Layout/public"

import ProductHuntTemplate from './PublicTemplates/ProductHunt'
import BlogTemplate from './PublicTemplates/Blog'
import FeatureRequestTemplate from './PublicTemplates/FeatureRequest'

const ProjectPublicView = props => {

    const [records, setRecords] = useState([]);
    const [votes, setVotes] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState();
    const [airtableApiKey, setAirtableApiKey] = useState();
    const [airtableBaseId, setAirtableBaseId] = useState();

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
                if(error) {setLoading(false);}

                if (snapshotVal && snapshotVal.apiKey && snapshotVal.baseId && snapshotVal.tableName) {
                    setTitle(snapshotVal.title);

                    const base = new Airtable({ apiKey: snapshotVal.apiKey }).base(snapshotVal.baseId);
                    setAirtableApiKey(snapshotVal.apiKey)
                    setAirtableBaseId(snapshotVal.baseId)
                    base(snapshotVal.tableName).select({ 
                        view: viewName, 
                        filterByFormula: '{IsPublished}=1'
                    }).eachPage(
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
                    <Alert variant="danger">
                        <Alert.Heading>Error(s) Found</Alert.Heading>
                        <p>{error}</p>
                        <hr />
                        <p className="mb-0">
                            Please make sure to rectify it and re-visit this page again
                        </p>
                    </Alert>
                }

                {!loading && records.length > 0 && template === "template_002_producthunt" &&
                    <ProductHuntTemplate title={title} records={records} likeHelperData={likeHelperData} />
                }

                {!loading && records.length > 0 && template === "template_001_blog" &&
                    <BlogTemplate title={title} records={records} />
                }

                {!loading && records.length > 0 && template === "template_003_featurerequest" &&
                    <FeatureRequestTemplate title={title} records={records} likeHelperData={likeHelperData} airtableApiKey={airtableApiKey} airtableBaseId={airtableBaseId} />
                }


            </div>
        </LayoutPublic>
    )
}

export default ProjectPublicView