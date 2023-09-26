import "./styles/styles.scss";
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import routes from './routes';

function App() {
	return (
		<div id='app-container'>
			<div id='app-base-layout'>
				<Routes>
					{routes.map(({path, isPrivate, Component}) =>
						<Route 
							exact
							key={path}
							path={path} 
							element={
								isPrivate
								?	<PrivateRoute component={Component} />
								: 	<Component />
							} 
						/>
					)} 
				</Routes>
			</div>
		</div>
	);
}

export default App;
