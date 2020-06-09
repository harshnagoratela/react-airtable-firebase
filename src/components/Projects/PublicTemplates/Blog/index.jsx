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
        const { title, records } = this.state

        return (
            <>
                <div className="container">
                {records.length > 0 && records.map((record, index) =>
                    <div key={index} className="row d-flex">
                        <div className="col-12">
                            <h1>{record.fields["Title"]}</h1>
                            <div className="row mt-3 mb-3 align-items-center">
                                <div className="col-2 col-lg-1">
                                    <a href="#">
                                        <img src={record.fields["Images"] && record.fields["Images"].length > 0 && record.fields["Images"][0].url} className="blog-img" alt="blog profile image" />
                                    </a>
                                </div>
                                <div className="col-7 col-lg-10">
                                    <a href="#">
                                        <p>{record.fields["Author"]}</p>
                                    </a>
                                    <div className="row">
                                        <div className="col-12 info">
                                            <p className="d-inline">{record.fields["Last Modified Date"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p>{record.fields["Body"]}</p>
                                    <br />
                                    <hr />
                                </div>
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