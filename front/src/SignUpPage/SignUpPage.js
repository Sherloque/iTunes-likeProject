import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {signUser} from '../store/action.js'
import './SignUpPage.css'



class SignUpPage extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      login: "",
      password: "",
      subpass:"",
      firstname: "",
      lastname: "",
      validPass:false,
      valid:false
    }

    this.onChange1 = e => this.setState({ login: e.target.value, valid:this.validateSULogin(e.target.value) ? true: false })
    this.onChange2 = e => this.setState({ password: e.target.value, validPass:this.validatePass(e.target.value) ? true : false })
    this.onChange3 = e => this.setState({ subpass: e.target.value, validPass:this.validateSubPass(e.target.value) ? true : false })
    this.onChange4 = e => this.setState({ firstname: e.target.value, valid:this.validateSUFirstname(e.target.value) ? true: false })
    this.onChange5 = e => this.setState({ lastname: e.target.value, valid:this.validateSULastname(e.target.value) ? true: false })
    this.validatePass = str => str === this.state.subpass
    this.validateSubPass = str => str === this.state.password
    this.validateSULogin = str => str.length>0 &&  (this.state.lastname.length >0) && this.state.firstname.length >0
    this.validateSUFirstname = str => str.length>0 && (this.state.login.length >0) && this.state.lastname.length >0
    this.validateSULastname = str => str.length>0 && (this.state.login.length >0) && this.state.firstname.length >0
  }
  render() {
    return (
      <>
      <div className="sign-box">
        <h1>Регистрация</h1>
        <input required className="login" type="text" value={this.state.login} onChange={this.onChange1} placeholder="login"></input>
        <input required className="password" type="password" value={this.state.password} onChange={this.onChange2} placeholder="password"></input>
        <input className="password" type="password" value={this.state.subpass} onChange={this.onChange3} placeholder="repeat password"></input>
        <input className="login" type="text" value={this.state.irstname} onChange={this.onChange4} placeholder="Firstname"></input>
        <input className="login" type="text" value={this.state.lastname} onChange={this.onChange5} placeholder="Lastname"></input>
        <button className="signup-btn" disabled={!(this.state.valid && this.state.validPass)}
          onClick={() => this.props.onSend(this.state.login, this.state.password, this.state.firstname, this.state.lastname)}
        >Зарегистрироваться</button>
        <button className="login-btn"><Link to="/login" style={{color:"white", textDecoration: 'none' }}>Залогиниться</Link></button>
        <button className="cancel-btn"><Link to="/" style={{color:"white", textDecoration: 'none' }}>Отмена</Link></button>
        </div>
      </>
    );
  }
}

let ConnectedSignUpPage = connect(null, { onSend: signUser })(SignUpPage)

export default ConnectedSignUpPage;