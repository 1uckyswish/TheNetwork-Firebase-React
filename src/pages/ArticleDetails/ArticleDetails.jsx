import React, {useEffect, useState}from 'react'
import "./ArticleDetails.css"
import { useParams } from 'react-router-dom'
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';
import Likes from '../../Components/Likes/Likes';
import Comments from '../../Components/Comments/Comments';

function ArticleDetails() {
    const {articleId} = useParams();
    const [article, setArticle] = useState({});



    useEffect(()=>{
        const docRef = doc(db, 'Articles', articleId)
        getDoc(docRef).then((res)=>{
            setArticle(res.data());
            console.log(res.data());
        })
        .catch((error)=>console.log(error));
    },[] )


  return (
    <div className="details-container">
        <h1>{article?.title}</h1>

        <h2>{article?.summary}</h2>
        <div className="details-info-container">
          <p>Category: {article?.category}</p>
            <p><span className="article-span">Author:</span>{article?.createdBy?.toUpperCase()}</p>
            <p><span className="article-span published">Published:</span> {article?.createdAt?.toDate().toDateString()}</p>
            <Likes articleId={articleId} />
        </div>
        <div className="details-content">
            <img className="details-img" src={article?.imageUrl} />
            <p className="article-description">{article?.paragraphOne}</p>
            <p className="article-description">{article?.paragraphTwo}</p>
            <p className="article-description">{article?.paragraphThree}</p>   
        </div>
        <Comments articleId={articleId} />
    </div>
  )
}

export default ArticleDetails