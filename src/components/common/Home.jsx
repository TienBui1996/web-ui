import React from 'react';
import { Switch, Route} from 'react-router-dom';
import ErrorPage from '../../containers/error/Error';

import {
    Layout,
    Breadcrumb, notification, Icon
} from 'antd';

import Sidebar from '../../containers/common/Sidebar';
import Topbar from '../../containers/common/Topbar';
import '../../constants/custom.css';
import t from '../../constants/language';
import {HOST} from '../../host/portPath';
import Login from '../../containers/authentication/Login';
import Verify from '../../containers/authentication/Verify';
import Dashboard from '../../containers/Overview/Dashboard';

const {Content, Footer } = Layout;
var path ="/",url = null,name=null;
var currentLanguage=0;
var timeOut = false;

function getBreadcrumbName(event,type){
  switch (type) {
      case event.state.profile:
        return t[currentLanguage].LEFT_MENU_GENERAL_PROFILE;
      case event.state.socialAccount:
          return t[currentLanguage].LEFT_MENU_GENERAL_SOCIAL_ACCOUNT;
      case event.state.addnewSocialAccount:
          return t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_SOCIAL_ACCOUNT;
      case event.state.updateSocialAccount:
          return t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_SOCIAL_ACCOUNT;
      case event.state.findDataFromKeyword:
          return t[currentLanguage].LEFT_MENU_DT_COLLECTION_SEARCH;
      case event.state.urlManagement:
          return t[currentLanguage].CONTENT_BREADCRUMB_DATA_MANAGEMENT;
      case event.state.notify:
          return t[currentLanguage].CONTENT_BREADCRUMB_NOTIFICATION;
      case event.state.organizationManagement:
          return t[currentLanguage].LEFT_MENU_DT_COLLECTION_LIST_OF_ORGANIZATION;
      case event.state.newOrganization:
          return t[currentLanguage].CONTENT_BREADCRUMB_NEW_ORGANIZATION;
      case event.state.updateOrganization:
          return t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_ORGANIZATION;
      case event.state.listOfCampaigns:
          return t[currentLanguage].CONTENT_BREADCRUMB_LIST_OF_CAMPAIGN;
      case event.state.createCampaign:
          return t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_CAMPAIGN;
      case event.state.listOfGroups:
          return t[currentLanguage].LEFT_MENU_DT_COLLECTION_LIST_STUDENT;
      case event.state.newGroup:
          return t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_GROUP;
      case event.state.error:
          return "Error";
      case event.state.overview:
          return null;
      default:
          if(type.includes("/campaign/overviewCampaign/")){
              return t[currentLanguage].CONTENT_BREADCRUMB_OVERVIEW_CAMPAIGN;
          }
          if(type.includes("/campaign/detailCampaign/")){
              return t[currentLanguage].CONTENT_BREADCRUMB_DETAIL_CAMPAIGN;
          }
          if(type.includes("/campaign/updateCampaign/")){
              return t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_CAMPAIGN;
          }
          if(type.includes("/group/overviewGroup/")){
              return t[currentLanguage].CONTENT_BREADCRUMB_OVERVIEW_GROUP;
          }

          if(type.includes("/group/updateGroup")){
              return t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_GROUP;
          }
          if(type.includes("/group/detailStudent/")){
              return t[currentLanguage].CONTENT_BREADCRUMB_DETAIL_STUDENT;
          }
        return t[currentLanguage].CONTENT_BREADCRUMB_DETAIL_VISUALIZATION;
  }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard:'/',
            error:'/error',
        };
    }
    componentWillMount() {
        //check login
        if (this.props.location.pathname === '/user/verify') {
            const search = this.props.location.search;
            const index = search.trim().indexOf('=');
            const otp = search.substring(index + 1).trim();
            this.props.verifyAccount(otp);
            window.location.href = HOST;
        }
        const jwt = JSON.parse(window.localStorage.getItem('admicroJwt'));
        // if(this.props.location.pathname==='/'){
        //     this.props.history.push('visualization/overview');
        // }
        if (jwt) {
            this.props.validateToken(jwt);
        }

    }

    componentWillReceiveProps(nextProps) {
        var url = nextProps.location.pathname;
        var jwt = JSON.parse(window.localStorage.getItem('admicroJwt'));
        if(nextProps.user.register === 'verifySuccess'){
            notification.open({
                message: 'Verified successfully',
                description: 'You have successfully verify. So now, you can log in system.',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
            });
        }
        if(nextProps.location.pathname==='/' && jwt){
            nextProps.history.push('visualization/overview');
        }
        if(url !== path){
            name = getBreadcrumbName(this, url);
            this.props.getUpdateCurrentPage(url);
        }
        path= url;

        if(nextProps.multiLanguage.currentLanguage != null && currentLanguage !== nextProps.multiLanguage.currentLanguage){
            currentLanguage = nextProps.multiLanguage.currentLanguage;
            name = getBreadcrumbName(this,url);
        }
    }

    render() {
      if (this.props.user.register === 'success' || this.props.user.register === 'verifyFail') {
         return (<Verify/>)
      }
      const jwt = window.localStorage.getItem('admicroJwt');
      if(jwt){
          //Consider timeOut of localStorage
          timeOut = true;
      }

      /*if(this.props.user.data === null ||(timeOut === true && !jwt)){
          return <Login/>;
      }*/
      return (<Layout style={{ height: '100vh' }}>
          <Sidebar/>
          <Layout>
            <Topbar/>
            <Layout>
                <Breadcrumb separator=">" className="css-item-breadscrumb">
                    <Breadcrumb.Item href="/visualization/overview" style={{color:'rgba(0, 0, 0, 0.85)'}}>
                        {t[currentLanguage].CONTENT_BREADCRUMB_HOME_PAGE}
                    </Breadcrumb.Item>
                    {name ===t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_SOCIAL_ACCOUNT||
                        name ===t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_SOCIAL_ACCOUNT?(
                        <Breadcrumb.Item href="/user/socialAccount" style={{color:'rgba(0, 0, 0, 0.85)'}}>
                            {t[currentLanguage].LEFT_MENU_GENERAL_SOCIAL_ACCOUNT}
                        </Breadcrumb.Item>
                    ):null
                    }
                    {name ===t[currentLanguage].CONTENT_BREADCRUMB_NEW_ORGANIZATION||
                    name ===t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_ORGANIZATION?(
                        <Breadcrumb.Item href="/organization/organizationManagement" style={{color:'rgba(0, 0, 0, 0.85)'}}>
                            {t[currentLanguage].LEFT_MENU_DT_COLLECTION_LIST_OF_ORGANIZATION}
                        </Breadcrumb.Item>
                    ):null
                    }
                    {name ===t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_CAMPAIGN ||
                        name ===t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_CAMPAIGN?(
                        <Breadcrumb.Item href="/campaign/listOfCampaign" style={{color:'rgba(0, 0, 0, 0.85)'}}>
                            {t[currentLanguage].LEFT_MENU_DT_COLLECTION_LIST_CAMPAIGN}
                        </Breadcrumb.Item>
                    ):null
                    }
                    {name ===t[currentLanguage].CONTENT_BREADCRUMB_ADD_NEW_GROUP ||
                    name === t[currentLanguage].CONTENT_BREADCRUMB_OVERVIEW_GROUP||
                    name===t[currentLanguage].CONTENT_BREADCRUMB_UPDATE_GROUP ||
                    name === t[currentLanguage].CONTENT_BREADCRUMB_DETAIL_STUDENT?(
                        <Breadcrumb.Item href="/group/listOfGroup" style={{color:'rgba(0, 0, 0, 0.85)'}}>
                            {t[currentLanguage].LEFT_MENU_DT_COLLECTION_LIST_STUDENT}
                        </Breadcrumb.Item>
                    ):null
                    }
                    <Breadcrumb.Item href={url} style={{color:'rgba(0, 0, 0, 0.85)'}}>{name}</Breadcrumb.Item>
                </Breadcrumb>
              <Content style={{ margin: '0', padding: 24, backgroundColor: '#f9fafb' }}>
                <Switch>
                <Route path={this.state.dashboard} render={(props) =>
                      <Dashboard {...props}/>}
                  />
                  <Route path={this.state.error} render={(props) =>
                     <ErrorPage {...props}/>}
                  />
                </Switch>
              </Content>
            </Layout>
            <Footer className="footerCss">Malu Application 2020</Footer>
          </Layout>
        </Layout>);
    }
  }
