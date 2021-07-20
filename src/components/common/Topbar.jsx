import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Col, Divider, Icon, Layout, List, Menu, message, Radio, Row, Spin, Tooltip } from 'antd';
import $ from 'jquery';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import '../../constants/fbCustom.css';
import t from '../../constants/language';
import { handleTimeOutSession } from "../../interceptor/timeoutSession";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
// var e;
var temp;
var notifyList = [];
const { Header } = Layout;
var currentLanguage = 0;
const RadioGroup = Radio.Group;
export default class Topbar extends React.Component {
    constructor() {
        super();
        //e = this;
        this.state = {
            name: '',
            isNewNotify: false,
            data: [],
            totalNotify: 0,
            statusType: 'NEW',
            offset: 0,
            limit: 10,
            limitAll: 100,
            loading: false,
            hasMore: true,
            textMarked: 'Đánh dấu đã đọc',
            index: -1,
            requestNotifyList: false,
            disabledVi: false,
            disabledEn: false,
            language: 'VI'
        };
        // var serverUrl = COMMON_API + '/live-websocket-endpoint?token=' + window.localStorage.getItem('tokenAuth');
        // var ws = new SockJS(serverUrl);
        // stompClient = Stomp.over(ws);
        // stompClient.debug = null;
        // stompClient.connect({}, function () {
        //     stompClient.subscribe('/user/topic/notification', (message) => {
        //         var data = JSON.parse(JSON.stringify(message)).body;
        //         if (data != null) {
        //             var msg = {
        //                 id: JSON.parse(data).id,
        //                 thumbnail: JSON.parse(data).thumbnail,
        //                 title: JSON.parse(data).title,
        //                 link:JSON.parse(data).link,
        //                 createdDate: new Date(JSON.parse(data).createdDate)
        //             };
        //             msg.createdDate = monthNames[msg.createdDate.getMonth()] + " " + msg.createdDate.getDate() + " " + msg.createdDate.getFullYear() + " " + msg.createdDate.getHours() + ":" + msg.createdDate.getMinutes();
        //             notification.open({
        //                 message: msg.title,
        //                 description: <p style={{ marginLeft: "10px", fontSize: "10px" }}>{msg.createdDate}</p>,
        //                 icon: <img width="40px" height="40px" src={msg.thumbnail == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png" : msg.thumbnail} alt="" />
        //             });
        //             notifyList.unshift(msg);
        //             e.setState({
        //                 totalNotify: e.state.totalNotify + 1
        //             })
        //         }
        //     });
        // },function() {
        //     // check message for disconnect
        //     handleTimeOutSession();
        // });
    }

    //this.props.updateProfile
    componentWillMount() {
        if (this.props.multiLanguage.currentLanguage != null) {
            currentLanguage = this.props.multiLanguage.currentLanguage;
        }
        //check login
        if (!window.localStorage.getItem('admicroJwt')) {
            temp = 0;
          //  this.props.getUserProfile();
            //const user = JSON.parse(window.localStorage.getItem('admicroJwt'));
            //this.setState({name: user.name});
        }
        else {
            this.setState({ name: JSON.parse(window.localStorage.getItem('admicroJwt')).name });
        }
    }

    componentDidMount() {
        var $notifyIcon = $("#notifyIcon");
        $(document).mouseup(function (e) {
            if ($notifyIcon.has(e.target).length === 0) {
                $("#notify").css("visibility", "hidden");
            } else {
                if ($("#notify").css("visibility") === 'visible' && $("#notify").has(e.target).length === 0) {
                    $("#notify").css("visibility", "hidden");
                } else {
                    $("#notify").css("visibility", "visible");
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.multiLanguage.currentLanguage != null) {
            currentLanguage = nextProps.multiLanguage.currentLanguage;
        }
        if (nextProps.userManagement.data !== null) {
            if (JSON.parse(JSON.stringify(nextProps.userManagement.data)).name) {
                this.setState({ name: JSON.parse(JSON.stringify(nextProps.userManagement.data)).name });
            } else if (temp === 0) {
                this.setState({ name: JSON.parse(window.localStorage.getItem('admicroJwt')).name });
                temp++;
            }
        }

        if (nextProps.notify != null && nextProps.notify.newMessages != null) {
            var notifyData = JSON.parse(nextProps.notify.newMessages);
            var dataType = notifyData.content;
            if (dataType != null) {
                for (var i = 0; i < dataType.length; i++) {
                    var date = new Date(JSON.parse(JSON.stringify(dataType[i])).createdDate);
                    var messages = JSON.parse(JSON.stringify(dataType[i])).title;
                    var arrMessages = messages.split('.');
                    var message = {
                        id: JSON.parse(JSON.stringify(dataType[i])).id,
                        thumbnail: JSON.parse(JSON.stringify(dataType[i])).thumbnail,
                        title: arrMessages[0],
                        link: JSON.parse(JSON.stringify(dataType[i])).link,
                        createdDate: monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                    };
                    if (!this.state.data.includes(message)) {
                        notifyList.push(message);
                    }
                }
                this.setState({
                    data: notifyList,
                    totalNotify: notifyData.totalElements
                })
            }
        }
        if (nextProps.notify.update != null) {
            if (this.state.index !== -1) {
                //only update a notify
                notifyList.splice(this.state.index, 1);
                var total = this.state.totalNotify - 1;
                this.setState({
                    data: notifyList,
                    totalNotify: total
                });
            } else {
                //update all seen
                notifyList = [];
                this.setState({
                    data: notifyList,
                    totalNotify: notifyList.length
                });

                //close icon notification
                $("#notify").css("visibility", "hidden");
            }
        }
    }

    handleLogOut = (event) => {
        handleTimeOutSession();
    };

    notifyMarker() {
        var arrId = [];
        for (var i = 0; i < notifyList.length; i++) {
            arrId.push(notifyList[i].id);
        }
        var option = {
            notificationIds: arrId,
            notifyStatus: 'SEEN'
        };
        this.props.updateNotification(option);
    }

    rowSeenMarker(obj, event) {
        var arrId = [];
        arrId.push(obj.id);
        var option = {
            notificationIds: arrId,
            notifyStatus: 'SEEN'
        };
        this.setState({ index: notifyList.indexOf(obj) });
        this.props.updateNotification(option);
    }

    getNotificationList() {
        this.setState({ requestNotifyList: true });
        this.setState({
            data: notifyList
        })
    }

    handleInfiniteOnLoad() {
        let currentData = this.state.data;
        this.setState({
            loading: true,
        });
        // debugger;
        if (currentData.length > this.state.totalNotify) {
            message.warning('Đã hiển thị hết thông báo mới');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }

        var option = {
            statusType: this.state.statusType,
            offset: this.state.offset + 1,
            limit: this.state.limit
        };

        setTimeout(() => {
            this.props.getCrawlNotification(option);
            currentData = currentData.concat(this.state.data);
        }, 1000);
        this.setState({
            data: currentData,
            offset: this.state.offset + 1,
            loading: false
        });

    };

    onChangeRadio(event) {
        if (event.target.value === 'VI') {
            this.setState({ language: 'VI' });
            this.props.getLanguage(0);
            this.setState({ disabledVi: true });
            this.setState({ disabledEn: false });
        } else {
            this.setState({ language: 'EN' });
            this.props.getLanguage(1);
            this.setState({ disabledEn: true });
            this.setState({ disabledVi: false });
        }
    }

    rediectDetail() {
        $("#notify").css("visibility", "hidden");
        //this.props.history.push('user/notify');
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Header style={{ padding: 0, boxShadow: '0 1px 4px #000', backgroundColor: '#f9fafb' }}>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '50px' }} className="cssSider">
                    <Menu.SubMenu key="sub11" title={<span style={{ color: '#ff6700' }}>
                        <Icon type="global" />{this.state.language}</span>} style={{ float: 'right', borderBottom: 'none' }}>
                        <Menu.Item key="user11" style={{ height: '60px' }}>
                            <RadioGroup onChange={this.onChangeRadio.bind(this)} value={this.state.language}>
                                <Radio style={radioStyle} value="VI">Vietnamese</Radio>
                                <Radio style={radioStyle} value="EN">English</Radio>
                            </RadioGroup>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub1" title={<span style={{ color: '#ff6700' }}>
                        <Icon type="user" />{t[currentLanguage].WELCOME},  {this.state.name}</span>} style={{ float: 'right', borderBottom: 'none' }}>
                        <Menu.Item key="user1"
                            onClick={() => this.handleLogOut()} >
                            <Link to="/">{t[currentLanguage].LOGOUT}</Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item id="notifyIcon" key="1" style={{ borderBottom: 'none', paddingRight: '10px' }}
                        onClick={this.getNotificationList.bind(this)}>
                        <Badge count={this.state.totalNotify}>
                            <FontAwesomeIcon icon={["far", "bell"]} size="1x" style={{ color: '#ff6700' }} />
                        </Badge>
                        <div id="notify" style={{ visibility: "hidden" }}>
                            <div className="notifyList">
                                <Row justify="start" className="noti">
                                    <Col className="notify-icon" xs={1} sm={1} md={1} lg={1} xl={1}>
                                        <Icon type="notification" theme="outlined" />
                                    </Col>
                                    <Col className="notify-label" xs={5} sm={5} md={5} lg={5} xl={5}>
                                        <p>{t[currentLanguage].NOTIFICATION}</p>
                                    </Col>
                                    <Col>
                                        <div style={{ float: "right" }}>
                                            <span onClick={this.notifyMarker.bind(this)} style={{ fontSize: '12px' }}>{t[currentLanguage].MARK_ALL_AS_READ}</span>
                                            <Divider type="vertical" />
                                            <Link to="/user/profile" >{t[currentLanguage].SETTING_NOTIFY}</Link>
                                        </div>
                                    </Col>
                                </Row>
                                {this.state.data.length === 0 ? <Row justify="start" className="noti">
                                    <Col className="notiInfo" xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p style={{ textAlign: "center" }}>{t[currentLanguage].SHOW_NOTIFY}</p>
                                    </Col>
                                </Row> : null}
                                {this.state.data.length > 0 ?
                                    <div className="demo-infinite-container">
                                        <InfiniteScroll
                                            initialLoad={false}
                                            pageStart={0}
                                            loadMore={this.handleInfiniteOnLoad.bind(this)}
                                            hasMore={!this.state.loading && this.state.hasMore}
                                            useWindow={false}
                                        >
                                            <List className="noti"
                                                dataSource={this.state.data}
                                                renderItem={item => (
                                                    <List.Item key={item.id}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar size={45} src={item.thumbnail == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/2000px-F_icon.svg.png" : item.thumbnail} />}
                                                            title={<a href={item.link} className="cssTitleNotificationIcon">{item.title}<span style={{ float: 'right' }} className="resizeRadioNofify"><Tooltip placement="topLeft" title={this.state.textMarked}><input type="radio" onChange={this.rowSeenMarker.bind(this, item)} /></Tooltip></span></a>}
                                                            description={<p className="cssTimeNotificationIcon">{item.createdDate}</p>
                                                            }
                                                        />
                                                    </List.Item>
                                                )}
                                            >
                                                {this.state.hasMore && <div className="demo-loading-container">
                                                    <Spin />
                                                </div>}
                                            </List>
                                        </InfiniteScroll>
                                    </div> : null
                                }
                            </div>
                            <div className="viewMore" onClick={this.rediectDetail.bind(this)}>
                                <Link to="/user/notify" >{t[currentLanguage].SEE_ALL_NOTIFICATIONS}</Link>
                            </div>
                        </div>
                    </Menu.Item>
                </Menu>

            </Header>
        )
    }
}
