import React from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import './hearbutton.styles.css'

class HeartButton extends React.Component {

    state = {
        likes: this.props.currentVotes || 0,
        liked: !!localStorage.getItem(this.props.id)
    };

    addLike = () => {
        if(this.state.liked) return;// allow only one like per visitor per item

        let newCount = this.state.likes + 1;        

        this.props.firebase
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
        if(liked) bgColor = "aliceblue";

        return (
            <div>
                <button
                    id={this.props.id}
                    className="button"
                    disabled={liked}
                    style={{ backgroundColor: bgColor }}
                    onClick={this.addLike}
                >
                    {likes <= 0 &&
                        <FaRegHeart style={{ marginBottom: "3px", display:"inline-block", color: "#33c3f0" }} />
                    }
                    {likes > 0 &&
                        <FaHeart style={{ marginBottom: "3px", display:"inline-block", color: "red" }} />
                    }
                    {" "}{likes}
                </button>
            </div>
        );
    }
}


export default HeartButton;