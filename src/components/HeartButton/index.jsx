import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import firebase from "gatsby-plugin-firebase"
import './hearbutton.styles.css'

class HeartButton extends React.Component {

    state = {
        likes: this.props.currentVotes || 0,
        liked: !!localStorage.getItem(this.props.id)
    };

    addLike = () => {
        if(this.state.liked) return;// allow only one like per visitor per item

        let newCount = this.state.likes + 1;        

        firebase
          .database()
          .ref()
          .child(`users/${this.props.userid}/projects/${this.props.slug}/votes/${this.props.id}`)
          .set(newCount)
          .then(()=>{
              this.setState({likes: newCount, liked: true}); 
              localStorage.setItem(this.props.id, this.state.liked); 
              console.log("Upvote registered for "+this.props.id+" with '"+this.state.likes+"'");
            });   
    };

    render() {
        const likes = this.state.likes;
        const liked = this.state.liked;
        let bgColor = "transparent";
        if(liked) bgColor = "";

        return (
            <div className="row">
                <button
                    id={this.props.id}
                    className="btn btn-light py-3 px-4"
                    disabled={liked}
                    style={{ backgroundColor: bgColor }}
                    onClick={this.addLike}
                >
                    {!liked &&
                        <FaRegHeart className="icons-color" style={{ marginBottom: "3px", display:"inline-block" }} />
                    }
                    {liked &&
                        <FaHeart style={{ marginBottom: "3px", display:"inline-block", color: "red" }} />
                    }
                    <br/>
                    {" "}{likes}
                </button>
            </div>
        );
    }
}


export default HeartButton;