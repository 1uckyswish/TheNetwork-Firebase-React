import React, {useEffect, useState} from 'react'
import "./Banner.css"
import { db } from '../../Config/firebaseConfig'
import { collection, getDocs, query, orderBy, limit} from 'firebase/firestore'

function Banner() {
    const [mainArticle, setMainArticle] = useState({});
    const [otherArticles, setOtherArticles] = useState([]);

    useEffect(
        ()=>{
            //* reference article <BiCollection
            const articlesRef = collection(db, "Articles");

            const q = query(articlesRef, orderBy('createdAt','desc', limit(5)));
            //set up query to filter response

            getDocs(q, articlesRef).then(res => {
                // console.log(res.docs[0].data());
                const articles = res.docs.map(item => {
                    return {id: item?.id, ...item?.data() }
                })
                // console.log(articles)
                setMainArticle(articles[0])
                setOtherArticles(articles.splice(1))
            })
            .catch((error)=> console.log(error));
        },[]
    )



  return (
    <div className='banner-container'>
      <div className="main-article-container" style={{backgroundImage: `url(${mainArticle?.imageUrl})`}}>
        <div className="banner-info">
            <h2>{mainArticle.title}</h2>
            <div className="main-article-info">
                <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
            </div>
        </div>
      </div>
      <div className="other-articles-container">
        {
            otherArticles.map(item=>{
               return  <div className="other-article-item" style={{backgroundImage: `url(${item?.imageUrl})`}} key={item?.id}>
                 <div className="banner-info">
                    <h3>{item?.title}</h3>
                    <p>{item?.createdAt?.toDate().toDateString()}</p>
                </div>
            </div>
            })
        }
      </div>
    </div>
  )
}

export default Banner
