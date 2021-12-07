import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";

function Details(props) {

    const [postData, setPostData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);

    useEffect(() => {
        const changePostData = async () => {
            const responseData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`);
            setPostData(responseData.data);
            if (responseData && responseData.data && responseData.data.userId) {
                const userResponseData = await axios.get(`https://jsonplaceholder.typicode.com/users/${responseData.data.userId}`);
                setUserData(userResponseData.data);
            }
            const commentsResponseData = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${props.id}`)
            setCommentsData(commentsResponseData.data);
        }
        changePostData();

    }, [props.id]);

    if (postData) {
        return (
            <div>
                <div style={styles.detailBox}>
                    <h2 style={styles.headerFont}>Post</h2>
                    <div style={styles.line}></div>
                    <h3>{postData.title}</h3>
                    <p>{postData.body}</p>

                    <h2 style={styles.headerFont}>User</h2>
                    <div style={styles.line}></div>
                    {userData ? (<>
                        <h4>Name : {userData.name}</h4>
                        <h4>Username : {userData.username}</h4>
                        <h4>Email : {userData.email}</h4>
                        <h4>Address : {userData.address.suite}, {userData.address.street}, {userData.address.city}  </h4>
                        <h4>Phone : {userData.phone}</h4>
                        <h4>Website : {userData.website}</h4>
                        <h4>Company : {userData.company.name}</h4>
                    </>) : (
                        <h4>no data found</h4>
                    )
                    }

                    <h2 style={styles.headerFont}>Comments</h2>
                    <div style={styles.line}></div>
                    {
                        commentsData ? (
                            <>
                                {commentsData.map((comment) => (
                                    <div key={comment.id} >
                                        <div style={{ display: "flex"}}>
                                            <Avatar style={styles.avatar}>{comment.name[0].toUpperCase()}</Avatar>
                                            <h4>{comment.name}</h4>
                                        </div>
                                        <h5 style={styles.comment}>{comment.email}</h5>
                                        <p style={styles.commentBody}>{comment.body}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <h4>no data found</h4>
                        )
                    }

                </div>
            </div>
        );
    }
    return (
        <div>
        </div>
    )
}

export default Details;


const styles = {
    detailBox: {
        backgroundColor: "white",
        marginTop: "40px",
        marginBottom: "10px",
        width: "600px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    headerFont: {
        color: "#1f2ba6",
        fontFamily: "Lucida Console"
    },
    line: {
        position: "relative",
        width: "15%",
        height: "5px",
        background: "#1f2ba6",
        bottom: "15px"
    },
    avatar: {
        backgroundColor: "#659cf0",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
    },
    comment: {
        position: "relative",
        bottom: "40px",
        left: "60px",
        color: "#ababb0"
    },
    commentBody: {
        position: "relative",
        bottom: "50px",
        left: "60px",
        width: "500px"
    }
}