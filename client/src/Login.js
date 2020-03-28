import React from 'react';
import Home from "./Home";
import ReactDOM from 'react-dom';
import './Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			errorMessage: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value,
		});
				console.log(this.state.username)
	}

	handlePasswordChange(event) {
		this.setState({
			password: event.target.value,
		});
		console.log(this.state.password)
	}

	// Need to change to use .env
	handleSubmit(event) {
		event.preventDefault();
		const username = this.state.username;
		const password = this.state.password;

		fetch(`${process.env.REACT_APP_BACKEND_API_ROOT}` + '/login', {
			method: 'POST',
			credentials: "include",
			headers: {
      			'Content-Type': 'application/json'
    		},
			mode: 'cors',
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then(response => {
			// Logic for redirection goes here, based on content of response.
			return response.text();
		}).then(text => {
			if (text === "Successful login.") {
				ReactDOM.render(
					<Home />,
					document.getElementById('root')
				);
			}
			else {
				this.setState({errorMessage: text});
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">Home</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item">
                				<a class="nav-link" href="Login">
                  					Login
                				</a>
              				</li>
              				<li>
              					<a class="nav-link" href="signup">Signup</a>
              				</li>
              				<li>
              					<a class="nav-link" href="logout">Logout</a>
              				</li>
							<li class="nav-item">
				                <a class="nav-link" href="About">
				                  About
				                </a>
				              </li>
				              <li class="nav-item">
				                <a class="nav-link" href="Play">
				                  Play
				                </a>
				              </li>
				              <li class="nav-item">
				                <a class="nav-link" href="Analytics">
				                  Analytics
				                </a>
				              </li>
				              <li class="nav-item">
				                <a class="nav-link" href="Team">
				                  Team
				                </a>
				              </li>
						</ul>
					</div>
				</nav>
        <div class="jumbotron text-center  ">
					<div class="login" onSubmit={this.handleSubmit}>
					  <div class="login-triangle"></div>

					  <h2 class="login-header">Log in</h2>

					  <form class="login-container">
					    <p><input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}></input></p>
					    <p><input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input></p>
					    <p><input type="submit" value="Log in"></input></p>
					  </form>
					</div>

				  <p>{this.state.errorMessage}</p>
				</div>
			</React.Fragment>

		)
	}
}

export default Login;
