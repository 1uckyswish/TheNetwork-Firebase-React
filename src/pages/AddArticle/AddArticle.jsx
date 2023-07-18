import {useState} from 'react';
import "./AddArticle.css";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {useAuthState} from "react-firebase-hooks/auth";
import {storage, db, auth} from '../../Config/firebaseConfig';
import {v4} from 'uuid';
import { addDoc, collection, Timestamp} from 'firebase/firestore';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

function AddArticle() {
      const categories = ["Health", "Food", "Travel", "Technology"];
        const [user] = useAuthState(auth);
        const navigate = useNavigate()
      const [formData, setFormData] = useState({
        title: '',
        summary: '',
        paragraphOne:'',
        paragraphTwo:'',
        paragraphThree:'',
        category:'',
        image:'',
      });

    const handleSubmit = (e)=>{
        e.preventDefault()
        // create reference for the image
        const imageRef = ref(storage, `images/${formData.image.name + v4()}`)
        // now upload the image to bucket
        uploadBytes(imageRef, formData.image).then(res =>{
            // console.log(res.ref);
            // now get url from this ref
            getDownloadURL(res.ref).then((url)=>{
                // now we have all data and urls'
                //make article reference
                const articleRef = collection(db, 'Articles');
                //use * ADDdoc*
                addDoc(articleRef, {
                    title: formData.title,
                    summary: formData.summary,
                    paragraphOne: formData.paragraphOne,
                    paragraphTwo: formData.paragraphTwo,
                    paragraphThree: formData.paragraphThree,
                    category: formData.category,
                    imageUrl: url,
                    createdBy: user.displayName,
                    userId: user.uid,
                    createdAt: Timestamp.now().toDate(),
                })
            }).then(res => {
                toast('Article Saved Successfully', {type: "success", autoClose: 1000});
                setTimeout(()=>{
                    navigate('/')
                }, 1500)
            })
        }).catch(err=> console.error(err))
    };

  return (
     <div className="add-article-container">
       <form className="add-article-form" onSubmit={handleSubmit}>
            <h2>Create Article</h2>
            <div className="input-group">
                <label htmlFor="title">Title</label>
                <input type="text"
                 id="title" 
                placeholder="Maximum 100 characters"
                maxLength="100"
                onChange={(e)=>setFormData({...formData, title: e.target.value })}
                />
            </div> 
            <div className="input-group">
                <label htmlFor="summary">Summary</label>
                <textarea name="summary"
                id="summary"
                placeholder="Maximum 120 characters"
                maxLength="120"
                onChange={(e)=>setFormData({...formData, summary: e.target.value })}
                />
            </div> 
            <div className="input-group">
                <label htmlFor="paragraphOne">Paragraph One</label>
                <textarea id="paragraphOne" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                onChange={(e)=>setFormData({...formData, paragraphOne: e.target.value })}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphTwo">Paragraph Two</label>
                <textarea id="paragraphTwo"
                placeholder="Maximum 650 characters"
                maxLength="650"
                 onChange={(e)=>setFormData({...formData, paragraphTwo: e.target.value })}
                />
            </div>
            <div className="input-group">
                <label htmlFor="paragraphThree">Paragraph Three</label>
                <textarea id="paragraphThree" 
                placeholder="Maximum 650 characters"
                maxLength="650"
                 onChange={(e)=>setFormData({...formData, paragraphThree: e.target.value })}
                />
            </div>
            <div className="input-group">
                <label htmlFor="category">Category</label>
                <select id="category"  onChange={(e)=>setFormData({...formData, category: e.target.value })}>
                    <option value="">Select</option>
                    {
                        categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                    }
                </select>
            </div>
            <div className="input-group">
                <label>Upload Image</label>
                <input type="file" id="image" accept="image/*"
                 onChange={(e)=>setFormData({...formData, image: e.target.files[0] })}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddArticle