import React from 'react';
import HeartButton from '../../../HeartButton'
import './component.styles.css'

class FirstDemo extends React.Component {

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

        return (
            <>



                <div className="container py-3 px-5">
                    {records.length > 0 && records.map((record, index) =>
                        <div key={index} className="card">
                            <div className="row ">
                                <div className="col-md-2">
                                    <img src={record.fields["Image"][0].url} alt={record.fields["Title"]} className="w-100" />
                                </div>
                                <div className="col-md-10 px-3">
                                    <div className="card-block px-3">
                                        <h4 className="card-title">{record.fields["Title"]}</h4>
                                        {likeHelperData &&
                                            <HeartButton id={record.id} userid={likeHelperData.userid} currentVotes={likeHelperData.votes[record.id]} slug={likeHelperData.slug} />
                                        }
                                        <p className="card-text">{record.fields["Subtitle"]}</p>
                                        <a href={record.fields["URL"]} target="_blank" rel="noreferrer" className="btn btn-primary">Visit Site</a>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}


export default FirstDemo;