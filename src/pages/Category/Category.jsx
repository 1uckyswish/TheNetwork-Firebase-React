import React, {useEffect, useState} from 'react'
import "./Category.css"
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';

function Category() {
  const {catergoryName} = useParams();
  const [articles, setArticles] = useState([]);
  useEffect(
    ()=>{
      // create fefernce to articles collection in getFirestore
      const articleRef = collection(db, "Articles");
      // create query
      const q = query(articleRef, where('category', '==', catergoryName))
      getDocs(q, articleRef).then((res)=>{
        const articles = res.docs.map(item=>{
          return {
            id: item.id,
            ...item.data(),
          };
        })
        setArticles(articles);
      console.log(articles)

      })
    },[catergoryName]
  )
  return (
    <div className='category-articles'>
      {
        articles.length === 0? 
        <p>No Articles</p>
        :
        articles?.map(item => <ArticleCard article={item}/>)
      }
    </div>
  )
}

export default Category