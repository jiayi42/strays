import React from 'react';
import {   List, Row, Col, Button, Avatar} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import "../../styles/css/user-list.scss"
import TokenHeaders from '../utils';


export default class UserList extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            list:[],
        };
    }

    componentDidMount(){
        this.getList();
    }
    
    getList = ()=>{
        console.log("requesting user list...");
        axios({
            method: 'get',
            url:ApiUrl.USER_LIST,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);
                this.setState({
                    list:res.data.data,
                });
 
            }
        );
    }




    render(){
        let {list} = this.state;
        return (
            <div>
                <List
                    header={
                        <Row className="list-div">
                            <Col span={6}>
                                <b>Profile Picture</b>
                            </Col>
                            <Col span={6}>
                                <b>Username</b>
                            </Col>
                            <Col span={5}>
                                <b>Phone</b>
                            </Col>
                            <Col span={6}>
                                <b>Address</b>
                            </Col>
                        </Row>
                    }
                    bordered
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Col span={5}>
                                <List.Item.Meta 
                                    avatar={ 
                                        <Avatar src={item.head_image}/>
                                    }
                                />
                            </Col>
                            <Col span={3}>
                                {item.username}
                            </Col> 
                            <Col span={4}>
                                {item.mobile}
                            </Col> 
                            <Col span={6}>
                                {item.address}
                            </Col> 

                        </List.Item>
                    )

                    }
                >

                </List>
            </div>
        );
    }
}
 