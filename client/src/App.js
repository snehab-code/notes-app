// package imports
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
 
// component imports
import Header from './components/Header'
import Home from './components/Home'

import NotesList from './components/Notes/NoteList';
import NoteShow from './components/Notes/NoteShow';
import NoteAdd from './components/Notes/NoteAdd';
import NoteEdit from './components/Notes/NoteEdit';

import CategoryList from './components/Category/Category';
import CategoryShow from './components/Category/CategoryShow';
import CategoryAdd from './components/Category/CategoryAdd';

// material ui
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import logo from './note.png'
import './App.css'
import Button from '@material-ui/core/Button'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline/>
      <Container style={{color:"#163136"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", height:"100vh"}}>
          <Header/>


          <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/notes" component={NotesList} exact/>
          <Route path="/notes/add" component={NoteAdd} />
          <Route path="/notes/edit/:id" component={NoteEdit} />
          <Route path="/notes/:id" component={NoteShow}/>
          <Route path="/categories" component={CategoryList} exact />
          <Route path="/categories/add" component={CategoryAdd} />
          <Route path="/categories/:id" component={CategoryShow} />

          </Switch>
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
