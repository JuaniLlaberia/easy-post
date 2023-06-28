'use client'

import { storage } from "@/firebase_config"
import { formatDate } from "@/utils/formatDate"
import { getDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const PostItemFeed = ({body, date,img, userName, id, userRef}) => {
    const [userImg, setUserImg] = useState('');   
    
    //This updates the image, but its too slow
    // const storageRef = ref(storage, userImg);
    // useEffect(() => {
    //     const getImg = async () => {
    //        const link = await getDownloadURL(storageRef);
    //        setUserImg(link)
    //     }
    //     getImg()
    // }, [userImg])

    useEffect(() => {
        const test = async () => {
        const data = await getDoc(userRef);
        setUserImg(data.data().userImg);
    };
    test()
  }, [userRef])

    return (
    <li className='post-item-feed'>
        <Link href={`/home/profile/${userName}`} className='link-to-profile'>
            {userImg ? <Image src={userImg} width={50} height={50} alt="user"/> : null}
            <h6>@{userName}</h6>
            <p>{formatDate(date)}</p>
        </Link>
        <Link href={`/home/post/${id}`} className='link-to-post'>
            <p>{body}</p>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {img ? <Image src={img} width={400} alt="preview" height={300}/> : null}
            </div>
        </Link>
    </li>
  )
}

export default PostItemFeed
