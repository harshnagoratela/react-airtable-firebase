import React from "react"

const ProjectPublicView = props => {
    console.log(props)

    return (
        <div>
            <h1>Product Public View</h1>
            <p>This page will show the data from airtable {`  `} {props.userid} {`  `} {props.slug}</p>
        </div>
    )
}

export default ProjectPublicView
