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
                <h1 className="text-center text-3xl px-2 py-3">{title}</h1>
                <main className="py-4">
                    <div className="px-4">
                        <div className="grid grid-cols-1 justify-between">
                            {records.length > 0 && records.map((record, index) =>
                                <div key={index} className="w-full lg:p-3 md:p-2">
                                    <div className="bg-white rounded-lg shadow">
                                        <img className="h-56 w-full object-cover object-center" src={record.fields["Images"] && record.fields["Images"].length > 0 && record.fields["Images"][0].url} alt="" />
                                        <div className="pt-4 pl-4">
                                            <a className="inline bg-gray-300 p-1 text-xs lowercase text-gray-700 mr-2">{record.fields["Category"]}</a>
                                        </div>
                                        <div className="p-4">
                                            <a className="block text-blue-500 hover:text-blue-600 font-semibold text-lg md:text-base lg:text-lg">
                                                {record.fields["Title"]}
                                             </a>
                                            <div className="block text-blue-400 mb-2 text-sm md:text-xs lg:text-sm">
                                                {record.fields["Author"]}
                                            </div>
                                            <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                                                {record.fields["Body"]}
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </main>

                {this.state.error &&
                    <div>ERROR = {this.state.error}</div>
                }
            </>
        )
    }
}


export default BlogTemplate;