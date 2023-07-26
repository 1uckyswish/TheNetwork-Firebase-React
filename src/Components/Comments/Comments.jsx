import {useState, useEffect} from 'react'
import "./Comments.css"
import {db, auth} from "../../Config/firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import {toast} from "react-toastify"

function Comments({articleId}) {
    const [user] = useAuthState(auth);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(
        ()=>{
            //get reference to comments collection
             const commentRef = collection(db, 'Comments');

            //filter to show only comments for this article
            const q = query(commentRef, where("articleId", "==", articleId));

             // get the comments 
             onSnapshot(q, (snapshot)=>{
                 const comments = snapshot.docs.map((item) =>({
                    ...item.data(),
                    id: item.id,
                }));
                // console.log('comments',comments)
                setComments(comments)
             });
             },[]);

    function addNewComment(e){
        e.preventDefault();
        //* need to make a document in comments collection
        //* include the new comment & article ID and user that added Comments..
        //* create a reference to the Comments
        //* will create a collection if it doesnt exist
        const commentRef = collection(db, 'Comments');
        //* adding a document with this aritcleId and userId, content and username
        addDoc(commentRef, {
            userId: user?.uid,
            articleId: articleId,
            content: newComment,
            username: user?.displayName,
        }).then(res=>{
            toast('comment Saved Successfully', {type: "success", autoClose: 1000});
            setNewComment('')
        })
        .catch((error)=> console.log(error))
    };

    const deleteComment = id =>{
        // get the particluar document with the id
        deleteDoc(doc(db, 'Comments', id))
        .then((res) =>{
             toast('comment deleted Successfully', {type: "success", autoClose: 1000});
            setNewComment('')
        })
    };

  return (
    <div>
        <div className="comments-container">
            {
                comments.map((item)=>{
                 return (<><div className='comment'>
                    <p>
                        <span>{item.username}</span>
                        {item.content}
                    </p>
                    {
                        //each comment has a uuid
                        //compare to see if i can delete it 
                        user?.uid === item.userId && <button onClick={()=>deleteComment(item.id)}>Delete</button>
                    }
                 </div>
                 </>)
                })
            }
        </div>
        {
            user?
            <form onSubmit={addNewComment}>
                <input type="text"
                 placeholder='Add Comment'
                 onChange={(e)=>setNewComment(e.target.value)}
                 value={newComment}
                 />
            </form>
            :
            <p>Please Login To Comment</p>
        }
    </div>
  )
}

export default Comments