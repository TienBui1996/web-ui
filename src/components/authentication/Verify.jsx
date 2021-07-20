import React from 'react';
import {Form, Icon, Input, Button, notification} from 'antd';

const FormItem = Form.Item;
var j = 0;
class NormalLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
           otp:''
        };

    }

    componentWillMount() {
        notification.open({
            message: 'Registered successfully',
            description: 'You have successfully registered. You need to verify your email to complete registration',
            icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user.register ==='verifyFail' && j ===0) {
            notification.open({
                message: 'Verified account failly',
                description: 'Your otp is incorrect. Try to again',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
            });
        }
    }

    handleUsernameChange(event) {
        j++;
        this.setState({otp: event.target.value});
    }


    handleSubmit = (e) => {
        j = 0;
        e.preventDefault();
        this.props.verifyAccount(this.state.otp);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"style={{width:300,margin:'auto',marginTop:'150px' }}>
                <h3 style={{textAlign:'center',color:'#ff7f00'}}>VERIFY ACCOUNT</h3>
                <img src={require('../../img/lock.jpg')} style={{marginLeft:'125px',width:'50px',height:'50px'}} alt="" />
                <FormItem label="OTP">
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your otp!' }],
                    })(
                        <Input prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="OTP" onChange={this
                            .handleUsernameChange
                            .bind(this)} />
                    )}
                </FormItem>
                <FormItem>
                    <Button style={{marginLeft:'30px'}} type="primary" htmlType="submit" className="login-form-button">Confirm</Button>
                </FormItem>
            </Form>
        )

    }
}

export default Form.create()(NormalLoginForm);


