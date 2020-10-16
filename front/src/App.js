import React from 'react';
import { Provider} from 'react-redux';
import { Router, Route} from 'react-router-dom';
import MainPage from 'MainPage/MainPage';
import SearchPage from 'SearchPage/SearchPage';
import LoginPage from 'LoginPage/LoginPage';
import SignUpPage from 'SignUpPage/SignUpPage';
import ProfilePage from 'ProfilePage/ProfilePage';
import store from './store/store'
import history from './history/history';

function App() {
	
	return (
		<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/" component={MainPage} exact />
				<Route path="/login" component={LoginPage} exact />
				<Route path="/signup" component={SignUpPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
				<Route path="/search" component={SearchPage} exact />
			</div>
		</Router>
		</Provider>
	)
}


export default App;
