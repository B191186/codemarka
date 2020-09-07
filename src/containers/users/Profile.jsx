/* eslint-disable no-undef */
/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as APPURL from '../../config/url'
import * as APIURL from '../../config/api_url'

import { useSelector } from 'react-redux'
import DashboardTab from '../../components/Partials/User/DashboardTab'
import Helmet from '../../components/SEO/helmet'
toast.configure({
    autoClose: 6000,
    draggable: true,
})
export default function Profile(props) {
    const { auth } = useSelector((state) => state)

    const [userProfileData, setUserProfileData] = useState({
        profile: {},
        social: {},
    })
         const jwt = localStorage.getItem('wx1298')

         async function postData(url = '',method = 'POST') {
             // Default options are marked with *
             const response = await fetch(url, {
                 method, // *GET, POST, PUT, DELETE, etc.
                 mode: 'cors', // no-cors, *cors, same-origin
                 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                 credentials: 'same-origin', // include, *same-origin, omit
                 headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${ jwt }`,
                 },
                 redirect: 'follow', // manual, *follow, error
                 referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
             })
             return response.json() // parses JSON response into native JavaScript objects
         }
    useEffect(() => {
        // Example POST method implementation:

        postData(`${ APIURL.GET_USER_DATA }${ String(props.match.params.username).replace(' ','') }`,'GET').then((data) => {
            setUserProfileData(data.data) // JSON data parsed by `data.json()` call
            console.log(data);
        })
    }, [props.match.params.username])

    const handleFollowUser = (e) => {
        e.preventDefault();
            const followUserUrl = APIURL.FOLLOW_USER + userProfileData.kid;
                postData(followUserUrl).then(data => {
                  if(data.status){
   toast.success(
       <div>
           Action Successful
       </div>,{
           position:'bottom-center'
       }
   )
                  } else {
                        toast.danger(<div>Action Failed</div>, {
                            position: 'bottom-center',
                        })
                  }
                })
        }
    return (
        <div className="header-container-fluid">
            <Helmet
                title={ `${ props.match.params.username }'s Profile on Codemarka ` }
                metaDescription=""
            />
            <DashboardTab user={ auth }>
                <div className="col ml-n3 ml-md-n2">
                    <img
                        alt="Img"
                        src={ userProfileData.profile.picture }
                        className="avatar avatar-xl rounded-circle"
                    />
                    <h2 className="mb-0">
                        <b>{userProfileData.username}</b>
                    </h2>
                    <span className="text-muted d-block">
                        {userProfileData.title}
                    </span>
                </div>
            </DashboardTab>
            <section class="slice slice-sm bg-section-secondary">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div class="mb-4">
                                <div class="row align-items-center mb-3">
                                    <div class="col">
                                        <h6 class="mb-0">New connections</h6>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="row align-items-center mb-3">
                                    <div class="col">
                                        <h6 class="mb-0">Quick stats</h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6">
                                        <div class="card card-fluid">
                                            <div class="card-header">
                                                <div class="row align-items-center">
                                                    <div class="col-auto">
                                                        <a
                                                            href="#"
                                                            class="avatar rounded-circle">
                                                            <img
                                                                alt="Img"
                                                                src={
                                                                    userProfileData
                                                                        .profile
                                                                        .picture
                                                                }
                                                            />
                                                        </a>
                                                    </div>
                                                    <div class="col ml-md-n2">
                                                        <a
                                                            href="#!"
                                                            class="d-block h6 mb-0">
                                                            {
                                                                auth.user
                                                                    .displayName
                                                            }
                                                        </a>{' '}
                                                        <small class="d-block text-muted">
                                                            {userProfileData.title ||
                                                                'loading...'}
                                                        </small>
                                                    </div>
                                                    {userProfileData.kid ===
                                                    auth.user.accountid ? (
                                                        <div class="col-auto">
                                                            <button
                                                                type="button"
                                                                class="btn btn-xs btn-primary btn-icon rounded-pill">
                                                                <span class="btn-inner--icon">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="1em"
                                                                        height="1em"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        class="feather feather-edit-2">
                                                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                                    </svg>
                                                                </span>{' '}
                                                                <Link
                                                                    to={ `${ APPURL.USER_PROFILE_EDIT }` }
                                                                    class="btn-inner--text text-white">
                                                                    Edit
                                                                </Link>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-4 text-center">
                                                        <span class="h5 mb-0">
                                                            {userProfileData.publicClassCreated +
                                                                userProfileData.privateClassCreated}
                                                        </span>{' '}
                                                        <span class="d-block text-sm">
                                                            Classrooms
                                                        </span>
                                                    </div>
                                                    <div class="col-4 text-center">
                                                        <span class="h5 mb-0">
                                                            {userProfileData.following
                                                                ? userProfileData
                                                                      .following
                                                                      .length
                                                                : 0}
                                                        </span>{' '}
                                                        <span class="d-block text-sm">
                                                            Following
                                                        </span>
                                                    </div>
                                                    <div class="col-4 text-center">
                                                        <span class="h5 mb-0">
                                                            {userProfileData.followers
                                                                ? userProfileData
                                                                      .followers
                                                                      .length
                                                                : 0}
                                                        </span>{' '}
                                                        <span class="d-block text-sm">
                                                            Followers
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer py-2">
                                                <div class="row align-items-center">
                                                    <div class="col-6">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm px-0 font-weight-bold btn-link text-primary btn-icon">
                                                            Drop a Message
                                                        </button>
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        {userProfileData.kid !==
                                                        auth.user.accountid ? (
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    handleFollowUser
                                                                }
                                                                class="btn btn-xs btn-secondary rounded-pill">
                                                                Follow
                                                            </button>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="card card-fluid">
                                            <div class="card-body">
                                                <div class="row align-items-center">
                                                    <div class="col">
                                                        <h6 class="text-sm mb-0">
                                                            <i class="fab fa-twitter mr-2"></i>
                                                            Twitter
                                                        </h6>
                                                    </div>
                                                    <div class="col-auto">
                                                        {userProfileData.social
                                                            .twitter ? (
                                                                <span class="text-sm">
                                                                    <a
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    href={ `https://twitter.com/${ userProfileData.social.twitter }` }>
                                                                        Follow
                                                                    </a>
                                                                </span>
                                                        ) : (
                                                            'Not set'
                                                        )}
                                                    </div>
                                                </div>
                                                <hr class="my-3" />

                                                <div class="row align-items-center">
                                                    <div class="col">
                                                        <h6 class="text-sm mb-0">
                                                            <i class="fab fa-linkedin mr-2"></i>
                                                            Linkedin
                                                        </h6>
                                                    </div>
                                                    <div class="col-auto">
                                                        {userProfileData.social
                                                            .linkedin ? (
                                                                <span class="text-sm">
                                                                    <a
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    href={ `https://linkedin.com/in/${ userProfileData.social.linkedin }` }>
                                                                        Follow
                                                                    </a>
                                                                </span>
                                                        ) : (
                                                            'Not set'
                                                        )}
                                                    </div>
                                                    <hr class="my-3" />
                                                </div>
                                                <hr class="my-3" />

                                                <div class="row align-items-center">
                                                    <div class="col">
                                                        <h6 class="text-sm mb-0">
                                                            <i class="fab fa-facebook mr-2"></i>
                                                            Facebook
                                                        </h6>
                                                    </div>
                                                    <div class="col-auto">
                                                        {userProfileData.social
                                                            .facebook ? (
                                                                <span class="text-sm">
                                                                    <a
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    href={ `https://facebook.com/${ userProfileData.social.facebook }` }>
                                                                        Follow
                                                                    </a>
                                                                </span>
                                                        ) : (
                                                            'Not set'
                                                        )}
                                                    </div>
                                                </div>
                                                <hr class="my-3" />
                                                <div class="row align-items-center">
                                                    <div class="col">
                                                        <h6 class="text-sm mb-0">
                                                            <i class="fab fa-github mr-2"></i>
                                                            Github
                                                        </h6>
                                                    </div>
                                                    <div class="col-auto">
                                                        {userProfileData.social
                                                            .github ? (
                                                                <span class="text-sm">
                                                                    <a
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    href={ `https://github.com/${ userProfileData.social.github }` }>
                                                                        Follow
                                                                    </a>
                                                                </span>
                                                        ) : (
                                                            'Not set'
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
