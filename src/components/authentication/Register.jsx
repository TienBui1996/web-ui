import React from 'react';

import {Form, Input, Button, Spin, Icon, notification} from 'antd';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
var i = 0;
class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            address:'',
            email:'',
            name:'',
            password:'',
            phone:'',
            company:''
        };

    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register ==='failed'){
            //show notification
            i++;
        }
        if(i === 1){
            notification.open({
                message: 'Registered failly',
                description: 'You have failly registered. Your email has been used',
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            });
        }
    }

    handleSubmit = (e) => {
        i = 0;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var user = {
                    address:this.state.address,
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                    phone: this.state.phone,
                    company:this.state.company
                };
                this.props.registerUser(user);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleUsernameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value});
    }
    handleCompanyChange(event) {
        this.setState({company: event.target.value});
    }
    handleAddressChange(event) {
        this.setState({address: event.target.value});
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit}style={{width:400,margin:'auto',marginTop:'100px' }}>
                <h3 style={{textAlign:'center',paddingLeft:'100px',color:'#ff7f00'}}>REGISTER</h3>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input placeholder="Please input your email @gmail.com "onChange={this
                            .handleEmailChange
                            .bind(this)}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input placeholder="Please input your password " type="password" onChange={this.handlePasswordChange.bind(this)}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input placeholder="Please confirm your password" type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>Fullname&nbsp;
            </span>
                    )}
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(
                        <Input placeholder="Please input your username" onChange={this
                            .handleUsernameChange
                            .bind(this)}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              Phone number&nbsp;
            </span>
                    )}
                >
                        <Input placeholder="Please input your phone" onChange={this
                            .handlePhoneChange
                            .bind(this)}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              Address&nbsp;
            </span>
                    )}
                >
                        <Input placeholder="Please input your address" onChange={this
                            .handleAddressChange
                            .bind(this)}/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              Company&nbsp;
            </span>
                    )}
                >
                        <Input placeholder="Please input your company" onChange={this
                            .handleCompanyChange
                            .bind(this)}/>
                </FormItem>
                {this.props.user.requesting === true && !this.props.user.error?
                    <div style={{marginLeft:'240px'}}><Spin indicator={antIcon} />
                    </div>
                :null}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit"style={{marginLeft:'80px'}}>Register</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegistrationForm);