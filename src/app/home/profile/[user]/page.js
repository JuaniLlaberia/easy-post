'use client'

import { db } from "@/firebase_config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import '../../../../assets/profile.css'
import '../../../../assets/home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import PostContainerProfile from "@/components/PostContainerProfile";
import { followUser } from "@/utils/follow";
import { useTheme } from "@/context/ThemeContext";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import UnFollowModal from "@/components/UnFollowModal";

const Profile = () => {
  const {user} = useParams();
  const [profileData, setProfileData] = useState(null);
  const {userData} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const {theme} = useTheme();

  //Getting profile data
  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getDocs(query(collection(db, 'users'), where('username', '==', user)));
        data.forEach(user => setProfileData(user.data()));
      } catch(err) {
        console.log(err);
      }
    }
    getProfile()
  }, []);

  //Getting user posts
  useEffect(() => {
    const getMyPosts = async () => {
        if(!user) return;
        try {
          console.log(user);
            const posts = await getDocs(query(collection(db, 'posts'), where('userName', '==', user), orderBy('date', 'desc')));
            const tempArr = [];
            posts.forEach(post => {
                tempArr.push({
                    postId: post.id,
                    postData: post.data()
                });
                setPosts(tempArr);
                console.log(tempArr);
            });
        } catch(err) {
            console.log(err);
        }
    }
    getMyPosts()
  }, []);

  const beingFollow = userData?.following?.some(user => user === profileData?.userId);

  return (
    <main className={`my-profile-page ${theme === 'light' ? 'light' : ''}`}>
      {profileData !== null ? <section className='personal-info'>
            <div className='profile-top'>
                <Image draggable={false} src={profileData?.userImg} width={180} height={180} alt='user'/>
                <div className='profile-user-info'>
                    <div className='info-container'>
                      <h1>{profileData?.username}</h1>
                      {userData?.username === profileData?.username ? null : beingFollow ? <button className='follow-btn unfollow' onClick={() => setShowModal(true)}>Unfollow</button> : <button className='follow-btn' onClick={() => followUser(profileData?.userId, profileData?.username,userData?.userId, userData?.username)}>Follow</button>}
                    </div>
                    <div className='extra-info'>
                      {profileData?.fullName ? <p><FontAwesomeIcon icon={faUser}/> {profileData?.fullName}</p> : null}
                      {profileData?.location ? <p><FontAwesomeIcon icon={faLocationDot}/> {profileData?.location}</p> : null}
                    </div>
                </div>
            </div>
            <section className='post-section'>
                <h6 className='myprofile-subtitles'>Posts</h6>
                <PostContainerProfile posts={posts}/>
            </section>
        </section> : <ProfileSkeleton />}
        {showModal && <UnFollowModal  user={profileData?.username} toggleModal={() => setShowModal(false)} userId={profileData?.userId} myId={userData?.userId}/>}
    </main>
  )
}

export default Profile
