import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Auth from './components/Auth/Auth';
import PostDetail from './components/Posts-Stuff/PostDetail';
import EditPostDetail from './components/Posts-Stuff/EditPostsDetail';
import Posts from './components/Posts-Stuff/Posts';
import CreatePost from './components/Posts-Stuff/CreatePost';

function App() {
  return (
    <>
      <Navbar />
      <Switch>

        <Route exact path="/">
          <Posts />
        </Route>

        <Route path="/auth/:type">
          <Auth />
        </Route>

        <Route path="/post/edit/:id" >
          <EditPostDetail />
        </Route>

        <Route path="/post/create" >
          <CreatePost />
        </Route>

        <Route path="/post/detail/:id">
          <PostDetail />
        </Route>

        <Route path="*">
          <Redirect to="/auth/sign-in" />
        </Route>

      </Switch>
    </>
  );
}

export default App;
