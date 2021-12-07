import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {TextField, Autocomplete} from '@mui/material';
import { useHistory, withRouter } from "react-router-dom";

function Home(props) {
    let history = useHistory();
    const [posts, setPosts] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(null);

    const url = 'https://jsonplaceholder.typicode.com/posts';

    useEffect(()=>{
        axios.get(url)
        .then(response =>{
            setPosts(response.data);
        })
    }, [url]);


    function handleClick() {
        history.push("/details/");
        // history.push(`/details/+${id}`);
      }


    if(posts){
    return (
        <div>
            <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={posts.map((option) =>option.title)}
                    value={searchTerm}
                    renderInput={(params) => <TextField {...params} label="Search posts" />}
                    style = {styles.searchBar}
                    onChange={(event, value) => setSearchTerm(value)}
            />
    
            {posts.filter((val)=>{
                if(searchTerm === null){
                    return val;
                } else if(val.title.toLowerCase().includes(searchTerm?.toLowerCase() )){
                     return val;
                }
                    return false;
            }).map((val)=>(
                <div onClick={handleClick}>
                <div 
                    style={styles.tile} 
                    onClick={()=> props.showDetails(val.id, val.userId)}
                >
                     <h3 key={val.id}>{val.title}</h3>
                     <p>{val.body}</p>
                </div>
                </div>
            ))}
        </div>
    );
    }
    return(
        <div>
        </div>
    )
}

export default withRouter(Home);

const styles = {
    tile:{
        backgroundColor:"white",
        marginTop:"40px",
        marginBottom:"10px",
        width:"600px",
        marginLeft:"auto",
        marginRight:"auto",
        cursor:"pointer"
    },
    searchBar:{
        marginTop:"50px",
        width:"500px",
        marginLeft:"auto",
        marginRight:"auto"
    }
}