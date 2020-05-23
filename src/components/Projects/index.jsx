import React from "react"
import { useState, useEffect } from "react"
import { getUser } from "../../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"
import { Link } from "gatsby"

const Projects = () => {
    const user = getUser();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useFirebase(firebase => {
        if (loading && !projects.length) {
            firebase
                .database()
                .ref(`users/${user.uid}/projects`)
                .once("value")
                .then(snapshot => {
                    let posts = [];
                    const snapshotVal = snapshot.val();
                    for (let slug in snapshotVal) {
                        posts.push(snapshotVal[slug]);
                    }

                    const newestFirst = posts.reverse();
                    setProjects(newestFirst);
                    setLoading(false);
                });
        }
    }, [])

    return (
        <>
            {projects.map(project => (
                <div key={project.slug} className="max-w-md py-4 mb-4 px-8 bg-gray-200 hover:bg-green-100 border border-gray-200 shadow-lg rounded-lg">
                    <div>
                        <h2 className="text-gray-800 border-b-4 text-lg mb-4 font-semibold">{project.title}</h2>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-semibold">Airtable API Key</h2>
                        <p className="mb-4 text-xs text-gray-600">{project.apiKey}</p>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-semibold">Airtable Base ID</h2>
                        <p className="mb-4 text-xs text-gray-600">{project.baseId}</p>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-semibold">Airtable Table Name</h2>
                        <p className="mb-4 text-xs text-gray-600">{project.tableName}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link to={`/app/${user.uid}/project/${project.slug}`} target="_blank" className="text-xl font-medium text-indigo-500">See Public View...</Link>
                    </div>
                </div>
            ))}
            {projects.length <= 0 &&
                <div className="bg-blue-100 border-t-4 border-blue-600 rounded-b text-blue-800 px-4 py-3 shadow-md my-2" role="alert">
                    <div className="flex">
                        <svg className="h-6 w-6 text-blue-800 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                        <div>
                            <p className="font-bold">No Projects Found !!</p>
                            <p className="text-sm">Please create projects from Top Menu options.</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Projects
