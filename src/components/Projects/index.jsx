import React from "react"
import { useState } from "react"
import { getUser } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import { Link } from "gatsby"
import Loader from 'react-loader-spinner'
import {Alert, Card, CardColumns } from "react-bootstrap"

const Projects = () => {
    const user = getUser();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    React.useEffect(() => {
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
    }, [loading, projects, user])

    return (
        <>
            {loading &&
                <div className="text-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            <CardColumns>
                {projects.map(project => (
                    <Card key={project.slug} style={{ margin: "10px" }}>
                        <Card.Header className="bg-primary">{project.title}</Card.Header>
                        <Card.Body>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Project Template Code</th>
                                        <td>{project.selectedTemplate}</td>
                                    </tr>
                                    <tr>
                                        <th>Airtable API Key</th>
                                        <td>{project.apiKey}</td>
                                    </tr>
                                    <tr>
                                        <th>Airtable Base ID</th>
                                        <td>{project.baseId}</td>
                                    </tr>
                                    <tr>
                                        <th>Airtable Table Name</th>
                                        <td>{project.tableName}</td>
                                    </tr>
                                    <tr>
                                        <th>Airtable View Name</th>
                                        <td>{project.viewName}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/*<div className="flex justify-end mt-4">
                        <Link to={`/app/project/create`} state={{ mode: "edit", userid: user.uid, slug: project.slug }} className="text-xl font-medium text-indigo-500">Edit Project...</Link>
                    </div>*/}
                        </Card.Body>
                        <Card.Footer>
                            <Link to={`/public/${user.uid}/project/${project.slug}`} target="_blank">See Public View...</Link>
                        </Card.Footer>
                    </Card>
                ))}
            </CardColumns>
            {!loading && projects.length <= 0 &&
                <Alert variant="info">
                    <Alert.Heading>No Projects Found OR Projects are loading !!</Alert.Heading>
                    <p>You can create new projects from top menu options.</p>
                </Alert>
            }
        </>
    )
}

export default Projects
