import React from 'react';
import Header from './shared/UI/Header'
import Nav from './shared/UI/Nav'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import AllPages from './pages/AllPages/AllPages';
import AddPage from './pages/AddPage/AddPage';
import AuthPage from './pages/AuthPage/AuthPage'
import { AuthProvider } from './shared/Context/AuthContext';
import { FetchDataContextProvider } from './shared/Context/fetchDataContext';
function App() {
  const navElements = [
    {
        name:"all pages",
        path:"/",
        exact:true
    },
    {
      name:"add pages",
      path:"/page/add",
      exact:true
    },
    {
        name:"my pages",
        path:"/pages/my",
        exact:false
    },   
]
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header/>
          <Nav navElements={navElements}/>
          
          <Route path="/login">
          <AuthPage
              name='login'
              url='login'
            />
          </Route>
          <Route path="/signup">
            <AuthPage
              name='sign up'
              url='signup'
            />
          </Route>
          <Route path="/logout">
            <AuthPage
              name='logout'
              url='logout'
            />
          </Route>
          <FetchDataContextProvider>
            <Route exact path="/">
              <AllPages url='/pages/all'/>
            </Route>
            <Switch>
              <Route exact path="/page/add">
                <AddPage/>
              </Route>
              <Route exact path="/pages/my">
              <AllPages url='/pages/my'/>
              </Route>
            </Switch>
          </FetchDataContextProvider>
          
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
