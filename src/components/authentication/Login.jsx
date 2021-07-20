import React from 'react';
import {Form, Icon, Input, Button, Spin} from 'antd';
import Register from '../../containers/authentication/Register';
import ForgetPassword from '../../containers/authentication/ForgetPassword';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class NormalLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            showComponent:false,
            showforgetPassword: false
        };

    }

    componentWillMount() {
        this.setState({
            showComponent: false,
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            showComponent: false,
        });
    }

    handleUsernameChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit = (e) => {
      //  e.preventDefault();
      this.props.form.validateFields((err, values) => {
      if (!err) {
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.logIn(credentials);
      }
      });

    };
    signUp =(e)=>{
        this.setState({
            showComponent: true,
        });
    };

    forgetPassword =(e)=>{
      e.preventDefault();
        this.setState({
            showforgetPassword: true,
        });
    };
    render() {
      if (this.state.showforgetPassword) {
         return (<ForgetPassword/>)
      }
        const { getFieldDecorator } = this.props.form;
        return (this.state.showComponent||this.props.user.requesting?
            <Register/>
            : <Form onSubmit={this.handleSubmit} className="login-form"style={{width:300,margin:'auto',marginTop:'150px' }}>
                <div><img src={require('../../img/lock.jpg')} style={{width:'50px',height:'50px'}} alt=""/>
                <span style={{color:'#ff7f00',textAlign:'center',marginLeft:'10%'}}>LOGIN ACCOUNT</span>
                </div>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" onChange={this
                            .handleUsernameChange
                            .bind(this)} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this
                            .handlePasswordChange
                            .bind(this)}/>
                    )}
                </FormItem>
                {this.props.user.error
                    ? <div style={{color:'red',marginLeft:'20px'}}>{this.props.user.error.message}</div>
                    : ''}
                { this.props.user.requestingLogin === true && !this.props.user.error?
                    <div style={{marginLeft:'140px'}}><Spin indicator={antIcon} />
                    </div>
                    :null}
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button"style={{width:'100%'}}>
                        Log in
                    </Button>
                </FormItem>
                <a href="" onClick={this.forgetPassword} >Forgotten your password?</a>
                <Button style={{width:'100%',marginTop:'20px'}} type="primary" htmlType="submit" className="login-form-button" onClick={this.signUp}>Sign up</Button>

            </Form>)
    }
}

export default Form.create()(NormalLoginForm);
