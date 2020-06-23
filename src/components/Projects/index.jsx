import React from "react"
import { useState } from "react"
import { navigate } from "@reach/router"
import { getUser, getUserExtras } from "../../utils/auth"
import { refreshUserExtras } from "../../utils/firebaseHelpers"
import firebase from "gatsby-plugin-firebase"
import { Link } from "gatsby"
import Loader from 'react-loader-spinner'
import { Alert, Card, Accordion } from "react-bootstrap"
import { RiDeleteBinLine } from "react-icons/ri"
import Statistics from "../Statistics"

const Projects = () => {
    const user = getUser();
    let userExtras = getUserExtras();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    React.useEffect(() => {
        if (loading && !projects.length && userExtras && userExtras.projects) {
            setProjects(Object.values(userExtras.projects));
        }
        setLoading(false);
    }, [loading])

    const deleteProject = (slug) => {
        console.log("*********** deleteProject")
        console.log(`users/${user.uid}/projects/${slug}`)
        firebase
            .database()
            .ref()
            .child(`users/${user.uid}/projects/${slug}`)
            .remove()
            .then(() => {refreshUserExtras(user);navigate(`/`)});
    };
    let currentItemIndex = 0;

    return (
        <>
            {loading &&
                <div className="text-center"><Loader type="Bars" color="#00BFFF" height={30} width={80} /></div>
            }
            <Link to={`/app/project/create`} className="btn btn-primary">Create New Page...</Link>
            <Statistics />
            <h1 className="p-2">List of available Pages: [Click on title to see more details about that page]</h1>
            <Accordion defaultActiveKey="0">
                {projects && projects.map((project,index) => (
                    <Card key={project.slug} className="border-primary m-1">
                        <Accordion.Toggle as={Card.Header} eventKey={index} className="bg-primary text-white" style={{cursor: "pointer"}}>
                            {project.title}{`  `}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
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
                                        <tbody>
                                            <tr>
                                                <td className="w-50">
                                                    <Link to={`/public/${user.uid}/project/${project.slug}`} target="_blank">View Public URL... </Link>
                                                </td>
                                                <td className="float-right">
                                                    <button className="border-0 p-0" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteProject(project.slug) }}>
                                                        <RiDeleteBinLine size="20" className="text-danger" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Footer>
                            </>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
            {!loading && projects.length <= 0 &&
                <Alert variant="info">
                    <Alert.Heading>No Pages Found OR Page list is loading !!</Alert.Heading>
                    <p>You can create new page from button above.</p>
                </Alert>
            }
        </>
    )
}

export default Projects
