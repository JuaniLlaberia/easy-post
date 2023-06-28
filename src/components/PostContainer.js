'use client'

import { db } from "@/firebase_config"
import { collection, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore"
import { useEffect, useState } from "react";
import PostItemFeed from "./PostItemFeed";

const PostContainer = () => {
    const [posts, setPosts] = useState([]);

    const collectionRef = collection(db, 'posts');
    const firstQuery = query(collectionRef, orderBy('date', 'desc'), limit(10));
    
    // const nextQuery = firstQuery.startAfter()

    useEffect(() => {
        const suscribe = onSnapshot(firstQuery, snapshot => {
            const data = [];
            snapshot.forEach(item => {
                data.push({
                    data: item.data(),
                    id: item.id
                });
            })
            setPosts(data)
        });

        return suscribe
    }, []);

    const renderPosts = posts?.map(post => {
        return <PostItemFeed key={post.id} date={post?.data?.date?.seconds} id={post.id} img={post.data.imgPath} userRef={post.data.imgRef} likeNum={post.data.likesNum} userName={post.data.userName} userImg={post.data.userPhotoURl} body={post.data.postBody} />
    });

  return (
    <ul>
      {renderPosts}
    </ul>
  )
}

export default PostContainer
