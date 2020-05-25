import React from "react"
import { FaRegHeart, FaHeart } from "react-icons/fa";
import './hearbutton.styles.css'
class HeartButton extends React.Component {
    state = {
        likes: 0
    };

    addLike = () => {
        let newCount = this.state.likes + 1;
        this.setState({
            likes: newCount
        });
    };

    render() {
        const likes = this.state.likes;
        return (
            <div>
                <button
                    id={this.props.id}
                    className="button"
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