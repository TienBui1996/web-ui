import React from 'react';
import {Form, Icon, Input, Button, notification} from 'antd';
import ConfirmResetPassword from '../../containers/authentication/ConfirmResetPassword';
const { Search } = Input;

const FormItem = Form.Item;
var j = 0;
class NormalLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
           otp:'',
           email:'',
           showConfirmPassword:false
        };

    }

    componentWillMount() {
        /*(notification.open({
            message: 'Registered successfully',
            description: 'You have successfully registered. You need to verify your email to complete registration',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
        });*/
    }
    componentWillReceiveProps(nextProps){
        /*if(nextProps.user.register ==='verifyFail' && j ===0) {
            notification.open({
                message: 'Verified account failly',
                description: 'Your otp is incorrect. Try to again',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
            });
        }*/
    }



    handleSubmit = (e) => {
        j = 0;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
          //continue
          this.setState({
              showConfirmPassword: true,
          });
        }
        });
    };

    handleResetPassword(event) {
        this.setState({email: event.target.value});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.showConfirmPassword) {
           return (<ConfirmResetPassword/>)
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"style={{width:300,margin:'auto',marginTop:'150px' }}>
            <div><img src={require('../../img/lock.jpg')} style={{width:'50px',height:'50px'}} alt=""/><span style={{fontSize:'20px',color:'#ff7f00',marginLeft:'20px'}}>Reset your password</span></div>
            <FormItem>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please input your email" onChange={this
                        .handleResetPassword
                        .bind(this)} />
                )}
            </FormItem>

            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button"style={{width:'100%'}}>
                    Reset your password
                </Button>

            </FormItem>
            </Form>
        )

    }
}

export default Form.create()(NormalLoginForm);
