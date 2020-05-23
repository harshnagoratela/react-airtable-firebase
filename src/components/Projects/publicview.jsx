import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { useFirebase } from "gatsby-plugin-firebase"

const ProjectPublicView = props => {

    const [records, setRecords] = useState([]);
    const [keys, setKeys] = useState([]);
    const [error, setError] = useState("");

    useFirebase(firebase => {
        firebase
            .database()
            .ref(`users/${props.userid}/projects/${props.slug}`)
            .once("value")
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                console.log(snapshotVal)
                console.log(snapshotVal.apiKey)
                if (!snapshotVal) { setError("ERROR: Unable to find Project Details"); }
                if (!snapshotVal.apiKey) { setError("ERROR: Unable to find 'API KEY' in Project Details"); }
                if (!snapshotVal.baseId) { setError("ERROR: Unable to find 'BASE ID' in Project Details"); }
                if (!snapshotVal.tableName) { setError("ERROR: Unable to find 'TABLE NAME' in Project Details"); }

                if (snapshotVal && snapshotVal.apiKey && snapshotVal.baseId && snapshotVal.tableName) {
                    let API_KEY = 'keyiReX7u7VyXrBCS'
                    let BASE_ID = 'appc9HtYkOd4dN8in'
                    let TABLE_NAME = 'SampleData'

                    const base = new Airtable({ apiKey: snapshotVal.apiKey }).base(snapshotVal.baseId);

                    base(snapshotVal.tableName).select({ view: 'Grid view' })
                        .eachPage(
                            (records, fetchNextPage) => {
                                setRecords(records);
                                console.log("***** Found '" + records.length + "' records from Airtable");
                                //getting the keys from the first record
                                console.log(records)
                                if (records.length > 0) {
                                    console.log(Object.keys(records[0].fields))
                                    setKeys(Object.keys(records[0].fields))
                                }
                                fetchNextPage();
                            }
                        );

                }
            });
    }, [])

    useEffect(() => {

    });

    return (
        <div className="App">
            <h1 className="text-center text-3xl underline px-2 py-3">Products View</h1>

            {records.length > 0 && records.map((record, index) =>
                <div key={index} className="flex w-3/4 m-5 bg-white shadow-lg rounded-lg mx-auto overflow-hidden">
                    <div className="w-2 bg-gray-800"></div>
                    <div className="flex items-center px-2 py-3">
                        <img className="my-auto h-24 w-24 border-gray-500 rounded-md border-4" src={record.fields["Image"][0].url} />
                        <div className="mx-3">
                            <h2 className="text-xl font-semibold text-gray-800">{record.fields["Title"]}</h2>
                            <p className="text-gray-600">{record.fields["Subtitle"]}</p>
                            <p className="text-left"><a href={record.fields["URL"]} target="_blank" className="text-blue-500">Visit Site</a></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectPublicView