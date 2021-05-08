import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from './components';
import Home from './pages/home/home';
import PetDetail from './pages/petDetail/petDetail';

const App: React.FC = () => {
	return (
		<Layout>
			<Router>
				<Switch>
					<Route exact path="/pet/:petId" children={<PetDetail />} />
					<Route path="/" children={<Home />} />
				</Switch>
			</Router>
		</Layout>
	);
};

export default App;
