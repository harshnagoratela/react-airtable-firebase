import React, { useState } from 'react';
import Airtable from 'airtable';
import firebase from "gatsby-plugin-firebase"
import Loader from 'react-loader-spinner'

import FirstDemoTemplate from './PublicTemplates/FirstDemo'

const ProjectPublicView = props => {

    const [records, setRecords] = useState([]);
    const [votes, setVotes] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        firebase
        .database()
        .ref(`users/${props.userid}/projects/${props.slug}`)
        .once("value")
        .then(snapshot => {
            const snapshotVal = snapshot.val();
            console.log(snapshotVal)
            if (!snapshotVal) { setError("ERROR: Unable to find Project Details"); }
            if (!snapshotVal.apiKey) { setError("ERROR: Unable to find 'API KEY' in Project Details"); }
            if (!snapshotVal.baseId) { setError("ERROR: Unable to find 'BASE ID' in Project Details"); }
            if (!snapshotVal.tableName) { setError("ERROR: Unable to find 'TABLE NAME' in Project Details"); }

            if (snapshotVal && snapshotVal.apiKey && snapshotVal.baseId && snapshotVal.tableName) {
                setTitle(snapshotVal.title);

                const base = new Airtable({ apiKey: snapshotVal.apiKey }).base(snapshotVal.baseId);

                base(snapshotVal.tableName).select({ view: 'Grid view' })
                    .eachPage(
                        (records, fetchNextPage) => {
                            setRecords(records);
                            console.log("***** Found '" + records.length + "' records from Airtable");
                            console.log(records)
                            fetchNextPage();
                        }
                    ).then(setLoading(false));
            }
        }, [props.userid, props.slug]);

        //getting votes data
        setLoading(true);
        firebase
        .database()
        .ref(`users/${props.userid}/projects/${props.slug}/votes`)
        .once("value")
        .then(snapshot => {
            const snapshotVal = snapshot.val();
            console.log("******* Votes data")
            console.log(snapshotVal)  
            if(snapshotVal) setVotes(snapshotVal);
            setLoading(false);
        });
    }, [props]);

    const likeHelperData = {
        userid: props.userid,
        slug: props.slug,
        votes: votes
    }

    return (
        <div className="App">
            {loading &&
                <div className="flex justify-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            
            {!loading &&
                <FirstDemoTemplate title={title} records={records} likeHelperData={likeHelperData} />
            }
        </div>
    )
}

export default ProjectPublicView