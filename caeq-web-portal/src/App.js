import './styles/styles.scss';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import routes from './routes';
import Navbar from './components/navbar/Navbar';

function App() {
    return (
        <div id='app-container'>
            <div id='app-base-layout'>
                <Routes>
                    {routes.map((route) =>
                        route.isPrivate ? (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <div>
                                        <Navbar />
                                        <route.Component />
                                    </div>
                                }
                            />
                        ) : (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <div>
                                        <Navbar />
                                        <route.Component />
                                    </div>
                                }
                            />
                        )
                    )}
                </Routes>
            </div>
        </div>
    );
}

export default App;
