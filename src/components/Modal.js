import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Transition} from 'react-overlays'
import Button from './Button';
import { connect } from 'react-redux';
import {get_user} from '../actions/index'


const FADE_DURATION = 200;
class MyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      login: null,
      name: 'test',
      password: 'test'
    };
  }

  handle_login = async () => {
    //console.log('name %s password %s ',this.state.name, this.state.password)
    const {name, password} = this.state;
    try {
        const res = await this.props.get_user(name,password)
        if(this.props.login.user != undefined){
          console.log('has it baby')
          return this.handle_correct_cred()
        }
        this.handle_wrong_cred()
       // console.log(this.props.login)
    }catch(err){
        console.log(err)
    }   
  }
  handle_wrong_cred = () => {
    this.setState({
      show: true,
      login: false
    })
  }
  handle_correct_cred = () => {
    console.log('in the correct cred func');
     this.setState({
      show: false,
      login: true
    })
  }

  handle_name_change = (e) => {
   this.setState({name: e.target.value});
}
  handle_password_change = (e) => {
   this.setState({password: e.target.value});
}
 render_msg = () => {
   if(this.state.login === false ){
    return <span className="msg-err">Wrong username or password</span> 
   }
 }
   is_out = () => {
       
        return this.state.show ? '': ' out-transition'
      }   

  render() {
   //console.log(this.props.login.user)
 
    return (
      <div>

        <Modal  bsSize="large"
                className={"modal" + this.is_out()}
                show={this.state.show} 
                onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>EGT Interactive</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <span>Name</span><input id="first_name" value={this.state.name} onChange={this.handle_name_change} type="text" className="validate" />
                  </div>
                </div>
              <div className="row">
                 <div className="input-field col s12">
                   <span>Password</span><input id="password" type="password" value={this.state.password} onChange={this.handle_password_change} className="validate" />
                    {this.render_msg()}
                 </div>
              </div>
            </form>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <Button click={this.handle_login} type ="loginbtn" name="Login" />


          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}
function map_state_to_props({login}){
  return { login }
}

export default connect(map_state_to_props,{get_user})(MyModal)