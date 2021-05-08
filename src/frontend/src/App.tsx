import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';
import PetDetail from './pages/petDetail/petDetail';

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/pet/:petId" children={<PetDetail />} />
				<Route path="/" children={<Home />} />
			</Switch>
		</Router>
	);
};

export default App;
