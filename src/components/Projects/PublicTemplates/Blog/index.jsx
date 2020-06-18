import React from 'react';
import HeartButton from '../../../HeartButton'
import './component.styles.css'

class BlogTemplate extends React.Component {

    state = {
        title: this.props.title || "",
        records: this.props.records || [],
        likeHelperData: this.props.likeHelperData
    };

    render() {
        console.log("******* Initial state of template")
        console.log(this.state)
        const { title, records, likeHelperData } = this.state

        return (
            <>
                <div className="container blogcontainer bg-white">
                    {records.length > 0 && records.map((record, index) =>
                        <div key={index} className="row">
                            <div className="col">                                
                                <div className="row border-bottom mb-3">
                                    <div className="col-lg-10">
                                    <h1 className="">{record.fields["Title"]}</h1>
                                        by{`  `}
                                        <span className="text-primary">{record.fields["Author"]}</span>
                                        {`  `}on{`  `}
                                        <span className="text-success">{record.fields["Last Modified Date"]}</span>
                                    </div>
                                    <div className="col-lg-1 m-3">
                                        {likeHelperData &&
                                            <HeartButton id={record.id} userid={likeHelperData.userid} currentVotes={likeHelperData.votes[record.id]} slug={likeHelperData.slug} />
                                        }
                                    </div>
                                </div>
                                <img className="img-fluid pb-2" src={record.fields["Images"] && record.fields["Images"].length > 0 && record.fields["Images"][0].url} alt={record.fields["Title"]} />
                                <p className="d-flex justify-content-between">{record.fields["Body"]}</p>
                                <div className="w-50 mx-auto mb-5">
                                <hr />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {this.state.error &&
                    <div>ERROR = {this.state.error}</div>
                }
            </>
        )
    }
}


export default BlogTemplate;