import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Browse from '../pages/Browse';

const App = (): JSX.Element => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/browse" element={<Browse />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
