import {useState, useEffect}from 'react';
import "./Likes.css";
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db} from '../../Config/firebaseConfig';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

function Likes({articleId}) {
    const [isLiked, setIsLiked] = useState(false);
     const likesRef = collection(db, 'Likes');
    const [user] = useAuthState(auth);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(()=>{
        //* did this user like this article???
        //*need the collection first
        // const likesRef = collection(db, 'Likes');
        //* check if user is logged in
        if(user){
            //* make query to see if we liked this ArticleCard
            const q = query(likesRef, where("articleId", "==", articleId), where('userId','==', user?.uid));

            //* look for a matching document
            getDocs(q, likesRef).then((res)=>{
                //* is there a match?
                if(res.size > 0){
                    setIsLiked(true);
                }
            })
            .catch((error)=>console.log(error));
        }else{
            setIsLiked(false);
        }
    },[user]);

    useEffect(()=>{
        //* find out count for this article
        //* make a query to count likes
        const q2 = query(likesRef, where("articleId", "==", articleId));
        //* look for matching documents
        getDocs(q2, likesRef).then((res)=>{
            setLikeCount(res.size);
        })
        .catch((error)=>console.log(error));
    },[isLiked]);


    const handleLike = ()=>{
        if(user){
            //* a ref to likes collection
            //* will create a collection if doesnt exist
            // const likesRef = collection(db, 'Likes');
            //* adding a doc with article id and user id
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId,
            }).then((res)=>{
                //dont need the response
                //want to show the liked icon
                setIsLiked(true);
            }).catch((error)=>console.error(error));
        }
    };

    const handleUnlike = ()=>{
        if(user){
            console.log("user", user?.uid, articleId)
            //* need to find document with article id and userid to get its document id
            const likesRef = collection(db, "Likes");
            //* setup query to find out id of article id and delete
            const q = query(likesRef, where("articleId", "==", articleId), where('userId','==', user?.uid));

            //* get match
            getDocs(q, likesRef).then((result)=>{
                console.log(result.size)
                console.log(result.docs[0].id)
                const likedId = result.docs[0].id;
                //delete doc
                deleteDoc(doc(db, 'Likes', likedId))
                .then((res)=>{
                    setIsLiked(false);
                })
                . catch((error)=>console.log(error));
            })
            .catch((error)=> console.error(error));
        }
    };

  return (
    <div>
      {
        isLiked?
        <FaHeart onClick={handleUnlike}/>
        :
        <FaRegHeart onClick={handleLike}/>
      }
      <span> {likeCount}</span>
    </div>
  )
}

export default Likes
