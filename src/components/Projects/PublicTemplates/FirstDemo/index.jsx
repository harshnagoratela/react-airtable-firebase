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
                <h1 className="text-center text-3xl px-2 py-3">{title}</h1>
                {records.length > 0 && records.map((record, index) =>
                    <div key={index} className="flex w-3/4 m-5 bg-white shadow-lg rounded-lg mx-auto overflow-hidden">
                        <div className="w-2 bg-gray-800"></div>
                        <div className="flex items-center px-2 py-3">
                            <img className="my-auto h-24 w-24 border-gray-500 rounded-md border-4" src={record.fields["Image"][0].url} alt={record.fields["Title"]} />
                            <div className="mx-3">
                                <h2 className="text-xl font-semibold text-gray-800">{record.fields["Title"]}</h2>
                                <p className="text-gray-600">{record.fields["Subtitle"]}</p>
                                <p className="text-left"><a href={record.fields["URL"]} target="_blank" rel="noreferrer" className="text-blue-500">Visit Site</a></p>
                                {likeHelperData &&
                                    <HeartButton id={record.id} userid={likeHelperData.userid} currentVotes={likeHelperData.votes[record.id]} slug={likeHelperData.slug} />
                                }
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}


export default FirstDemo;