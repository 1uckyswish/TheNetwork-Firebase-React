import {useState}from 'react';
import "./Likes.css";

function Likes({articleId}) {
    const [isLiked, SetIsLiked] = useState(false);
  return (
    <div>
      {
        isLiked?
        "liked"
        :
        "not liked"
      }
    </div>
  )
}

export default Likes
