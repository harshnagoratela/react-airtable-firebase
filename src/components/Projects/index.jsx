import React from "react"
import { useState } from "react"
import { getUser, getUserExtras } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import { Link } from "gatsby"
import Loader from 'react-loader-spinner'
import { Alert, Card, Accordion } from "react-bootstrap"
import { RiDeleteBinLine } from "react-icons/ri"
import Statistics from "../Statistics"

const Projects = () => {
    const user = getUser();
    const userExtras = getUserExtras();

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    React.useEffect(() => {
        if (loading && !projects.length && userExtras) {
            setProjects(Object.values(userExtras.projects));
            setLoading(false);
        }
    }, [loading])

    const deleteProject = (slug) => {
        console.log("*********** deleteProject")
        console.log(`users/${user.uid}/projects/${slug}`)
        firebase
            .database()
            .ref()
            .child(`users/${user.uid}/projects/${slug}`)
            .remove()
            .then(() => window.location.reload());
    };

    return (
        <>
            {loading &&
                <div className="text-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            <Link to={`/app/project/create`} className="btn btn-primary">Create New Page...</Link>
            <Statistics />
            <Accordion defaultActiveKey="0">
                {projects && projects.map(project => (
                    <Card key={project.slug} className="border-primary">
                        <Accordion.Toggle as={Card.Header} eventKey={project.slug} className="bg-primary text-white">
                            {project.title}{`  `}[Click to see details]
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={project.slug}>
                            <>
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
                                </Card.Body>
                                <Card.Footer>
                                    <table className="w-100">
                                        <tr>
                                            <td className="w-50">
                                                <Link to={`/public/${user.uid}/project/${project.slug}`} target="_blank">View Public URL... </Link>
                                            </td>
                                            <td class="float-right">
                                                <button className="border-0 p-0" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteProject(project.slug) }}>
                                                    <RiDeleteBinLine size="20" className="text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </Card.Footer>
                            </>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
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
