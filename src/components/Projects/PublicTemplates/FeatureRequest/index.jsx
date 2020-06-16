import React from 'react';
import { Badge } from 'react-bootstrap';
import HeartButton from '../../../HeartButton'
import './component.styles.css'

class FeatureRequest extends React.Component {

    state = {
        title: this.props.title || "",
        records: this.props.records || [],
        likeHelperData: this.props.likeHelperData
    };

    render() {
        const { title, records, likeHelperData } = this.state
        console.log("******* Records in template ")
        console.log(records)
        console.log("******* likeHelperData in template ")
        console.log(likeHelperData)
        const badgeVariant = {
            "Under Review" : "warning",
            "Open" : "primary",
            "Planned" : "secondary",
            "In Progress" : "info",
            "Completed" : "success",
            "Closed" : "danger"
        };

        return (
            <div className="feature-request">
                <div className="container mx-auto border p-0 bg-white">
                    {records.length > 0 && records.map((record, index) =>
                        <div key={index} className="row post border-bottom border-light">
                            <div className="col-md-2 align-items-top justify-content-center mb-lg-5">
                                {likeHelperData &&
                                    <HeartButton id={record.id} userid={likeHelperData.userid} currentVotes={likeHelperData.votes[record.id]} slug={likeHelperData.slug} />
                                }
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <h4>{record.fields["Title"]}</h4>
                                </div>
                                <div className="row">                                    
                                    <Badge variant={badgeVariant[record.fields["Status"]]}>{record.fields["Status"]}</Badge>
                                </div>
                                <div className="row">
                                    <p>{record.fields["Details"]}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}


export default FeatureRequest;