import React from 'react';
import {
    Form, Row
} from 'antd';

// var currentLanguage=0;
class ErrorPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        if(this.props.multiLanguage.currentLanguage != null){
            //currentLanguage = this.props.multiLanguage.currentLanguage;
        }
    }
    render() {
        return (
            <Row type="flex" justify="center">
            <img src={require('../../img/error.png')} alt=""/>
            </Row>
        )

    }
}

export default Form.create()(ErrorPage);


