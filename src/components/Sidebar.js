'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/navbar.css'
import { useState } from "react";
import Link from "next/link";
import { faEnvelope, faStar, faUser, faHouse, faMagnifyingGlass, faPlus, faArrowLeft, faBars, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const {currentAcc, logout, userData} = useAuthContext();

    const router = useRouter();
    const logoutAcc = () => {
      logout();
      router.push('/');
  };

  return (
    <>
      <nav className={isActive ? 'active' : ''}>
        <div className="sidebar-btns">
          <Link className='nav-btn' onClick={() => setIsActive(false)} href='/home'><FontAwesomeIcon icon={faHouse}/> <span className='nav-btn-text'>Home</span></Link>
          <Link className='nav-btn' onClick={() => setIsActive(false)} href={`/home/profile/${userData?.username}`}><FontAwesomeIcon icon={faMagnifyingGlass}/> <span className='nav-btn-text'>Search</span></Link>
          <Link className='nav-btn' href='/home/trending'><FontAwesomeIcon icon={faStar}/> <span className='nav-btn-text'>Trending</span></Link>
          <Link className='nav-btn' href='/home/inbox'><FontAwesomeIcon icon={faEnvelope}/> <span className='nav-btn-text'>Inbox</span></Link>
          <Link className='nav-btn' href='/home/my-profile'><FontAwesomeIcon icon={faUser}/> <span className='nav-btn-text'>Profile</span></Link>
        </div>
        <div>
          <button className='more'><FontAwesomeIcon className='more-symbol' icon={faPlus}/> <span className='more-text'>More</span></button>
          <button className='toggle-nav' onClick={() => setIsActive(!isActive)}><FontAwesomeIcon size="2x" icon={isActive ? faArrowLeft : faBars}/></button>
          {!currentAcc ? null : <button className='more' onClick={logoutAcc}><FontAwesomeIcon className='more-symbol' icon={faRightFromBracket}/> <span className='more-text'>Log Out</span></button>}
        </div>
      </nav>
      {isActive && <div className='overlay' onClick={() => setIsActive(false)}></div>}

    </>
  )
}

export default Sidebar
