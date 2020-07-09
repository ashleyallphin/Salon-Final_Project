import React from 'react';
import './App.css';
import "./components/FontAwesomeIcons/FontAwesomeIcons";
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';


const App = () => (
	<>
		<div className="app">
			<BrowserRouter>
				<MainRouter>

				</MainRouter>
			</BrowserRouter>
		</div>
	</>
)

export default App;
