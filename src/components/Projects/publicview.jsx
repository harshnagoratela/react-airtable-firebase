import React, { Component } from 'react';
import Airtable from 'airtable';

class ProjectPublicView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
    }
    componentDidMount() {
        let API_KEY = 'keyiReX7u7VyXrBCS'
        let BASE_ID = 'appc9HtYkOd4dN8in'
        let TABLE_NAME = 'SampleData'
        
        const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

        base(TABLE_NAME).select({ view: 'Grid view' })
            .eachPage(
                (records, fetchNextPage) => {
                    this.setState({
                        records
                    });
                    fetchNextPage();
                }
            );
    }
    render() {
        return (
            <div className="App">
                <h1>Product Public View</h1>
                <p>This page will show the data from airtable {`  `} {this.props.userid} {`  `} {this.props.slug}</p>
                {this.state.records.length > 0 ? (
                    this.state.records.map((record, index) =>
                        <div key={index}>
                            <h2>{record.fields['Title']}</h2>
                            <h3>{record.fields['Subtitle']}</h3>
                        </div>
                    )
                ) : (
                        <p>Loading...</p>
                    )}
            </div>
        );
    }
}

export default ProjectPublicView;