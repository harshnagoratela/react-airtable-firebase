import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import HeartButton from '../../../HeartButton'
import './component.styles.css'

class ProductHunt extends React.Component {

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
            <div id="content" className="bg-white pt-3">
                <div className="subdomainContainer">
                    <div className="authContainer">
                        <div className="modalContainer">
                            <div className="toastContainer">
                                <div className="publicContainer">
                                    <div className="boardHome">
                                        <div className="contentContainer">
                                            <div className="contentInnerContainer">
                                                <div className="subdomainSidebarContainer">
                                                    <div className="mainContainer">
                                                        <div className="postListContainer">
                                                            <div className="postList">
                                                                <div className="topContainer">
                                                                    <div className="postListMenu">
                                                                        <div className="menu">
                                                                            <div className="text">Showing</div>
                                                                            <div className="selector">
                                                                                <div className="selectedName">Trending</div>
                                                                                <div className="icon-chevron-down"></div>
                                                                            </div>
                                                                            <div className="text">posts</div>
                                                                        </div>
                                                                        <div className="searchContainer">
                                                                            <div className="searchBar">
                                                                                <div className="textInput searchInput">
                                                                                    <div className="inset">
                                                                                        <div className="icon icon-search"></div>
                                                                                    </div>
                                                                                    <div className="inputContainer"><input type="text" placeholder="Search…" value="" /></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="posts">
                                                                    {records.length > 0 && records.map((record, index) =>
                                                                        <div className="postListItem">
                                                                            <div className="col-md-2 pl-0 ">
                                                                                <img className="img-fluid" src={record.fields["Image"][0].url} alt={record.fields["Title"]} />
                                                                            </div>
                                                                            <a className="postLink">
                                                                                <div className="body">
                                                                                    <div className="postTitle">
                                                                                        <span>
                                                                                            {record.fields["Title"]}
                                                                                            {` `}<a href={record.fields["URL"]} target="_blank" rel="noreferrer" className="btn btn-white text-primary p-0"><FiExternalLink className="icons-color" /></a>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="postDetails">
                                                                                        <div className="truncate">{record.fields["Subtitle"]}</div>
                                                                                    </div>
                                                                                </div>                                                                                
                                                                            </a>
                                                                            {likeHelperData &&
                                                                                <HeartButton id={record.id} userid={likeHelperData.userid} currentVotes={likeHelperData.votes[record.id]} slug={likeHelperData.slug} />
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductHunt;