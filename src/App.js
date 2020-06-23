import React from 'react';
import './App.css';
// Parent component that is used to store all of your <Route> components. The <Route> components are what tell your app which other components to display based on the route.
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => (
  <BrowserRouter>
    <MainRouter>

    </MainRouter>
  </BrowserRouter>
)

export default App;
