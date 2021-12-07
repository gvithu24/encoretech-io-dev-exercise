import './App.css';
import { useState } from 'react';
import Details from './components/details/Details';
import Home from './components/home/Home'
import { BrowserRouter as Router, Route ,Switch } from 'react-router-dom';

function App() {

  const [id,setId] = useState();
  const [userId, setUserId] = useState(); 

  return (
    
    <div className="App">
     
    <Router>
      <Switch>
          <Route path="/" exact>
            <Home
              showDetails={(id,userId)=>{
                setId(id); 
                setUserId(userId);
              }}
            />
          </Route>

          <Route path="/details/">
            <Details
              id={id}
              userId={userId}
            />
          </Route>
      
      </Switch>
    </Router>
    </div>
  );
}

export default App;
