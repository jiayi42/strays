import React from 'react';
import {   List, Row, Col, Button, Avatar, Modal, message} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import "../../styles/css/user-list.scss"
import TokenHeaders from '../utils';

const {confirm} = Modal;

export default class CategoryList extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            list:[],
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.getList();
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }

    getList = ()=>{
        console.log("requesting category list...");
        axios({
            method: 'get',
            url:ApiUrl.CATEGORY_ALL,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);

                let data = res.data.data;

                if(this._isMounted){
                    this.setState({
                        list:data,
                    });
                }
 
            }
        );
    }

    deleteCategory = (id) => {
        let dataProps = {
            'id': id,
        }
        confirm({
            title: "Do you really wanna delete this category?",
            content:"If you click on OK, this category will be deleted forever.",
            okText:"Confirm",
            cancelText:'Cancel',
            onOk(){
                axios({
                    method: 'post',
                    url: ApiUrl.CATEGORY_DELETE,
                    data: dataProps,
                    headers: TokenHeaders,
                }).then(
                    res=>{
                        message.success('Cancellation succeeds');
                    }
                );
            },
            onCancel(){
                message.success('Cancellation Fails');
            },
        });
    }

    updateCategory = (id) => {
        // route back to edit category 
        this.props.history.push('/admin/category/edit/' + id);
    }


    render(){
        let {list} = this.state;
        
        
        return (
            <div>
                <List
                    header={
                        <Row className="list-div">
                            <Col span={4}>
                                <b>Category</b>
                            </Col>
                            <Col span={7}>
                                <b>Category Name</b>
                            </Col>
                            <Col span={8}>
                                <b>level</b>
                            </Col>
                            <Col span={1}>
                                <b>action</b>
                            </Col>
                        </Row>
                    }
                    bordered
                    dataSource={list}
                    renderItem={item => (
                        
                        <List.Item>
                            <Col span={2}>
                                <List.Item.Meta 
                                    avatar={ 
                                        <Avatar src={item.image}/>
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                {item.name}
                            </Col> 
                            <Col span={4}>
                                {item.level}
                            </Col> 
                            <Col span={1}>
                                <Button type="primary" onClick={()=>{this.updateCategory(item.id)}}>Revise</Button>
                            </Col> 
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{this.deleteCategory(item.id)}}>Delete</Button>
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
 