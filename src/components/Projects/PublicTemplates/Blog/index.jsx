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
                        <div key={index} class="row">
                            <div class="col">
                                <h1 class="mt-4">{record.fields["Title"]}</h1>
                                <p class="lead">
                                    by{`  `}
                                    <a>{record.fields["Author"]}</a>
                                </p>
                                <hr />
                                <p>{record.fields["Last Modified Date"]}</p>
                                <hr />
                                <img className="img-fluid pb-2" src={record.fields["Images"] && record.fields["Images"].length > 0 && record.fields["Images"][0].url} alt={record.fields["Title"]} />
                                <p>{record.fields["Body"]}</p>
                                <hr />
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