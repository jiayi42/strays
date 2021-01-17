import React from 'react';
import { List,Avatar,Button, Row, Col, Modal,message} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import "../../styles/css/user-list.scss";
import TokenHeaders from '../utils';
const {confirm} = Modal;

export default class StrayList extends React.Component{


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
        console.log("requesting stray list...");
        axios({
            method: 'get',
            url:ApiUrl.STRAY_LIST,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);

                let data = res.data.data;

                data.forEach((item,index) => {
                    item.image = item.images.split(',')[0];
                    console.log(item.image);
                })
 
                this.setState({
                    list:data,
                })

            }
        );
    }

    deleteStray = (id) => {
        let dataProps = {
            'id': id,
        }
        confirm({
            title: "Do you really wanna delete this stray?",
            content:"If you click on OK, this stray will be deleted forever.",
            okText:"Confirm",
            cancelText:'Cancel',
            onOk(){
                axios({
                    method: 'post',
                    url: ApiUrl.STRAY_DELETE,
                    data: dataProps,
                    headers: TokenHeaders,
                }).then(
                    res=>{
                        message.success('Cancellation succeeds');
                    }
                );
            },
            oCancel(){
                message.success('Cancellation Fails');
            },
        });
    }

    editStray = (id) => {
        this.props.history.push('/admin/stray/edit/' + id);
    }


    render(){
        let {list} = this.state;
        console.log(list);
        return (
            <div>
                <List
                    header={
                        <Row className="list-div">
                            <Col span={4}>
                                <b>Stray</b>
                            </Col>
                            <Col span={5}>
                                <b>Stray Name</b>
                            </Col>
                            <Col span={5}>
                                <b>Security  Deposit</b>
                            </Col>
                            <Col span={5}>
                                <b>weight (kg)</b>
                            </Col>
                            <Col span={2}>
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
                            <Col span={2}>
                                {item.deposit}
                            </Col> 
                            <Col span={2}>
                                {item.weight}
                            </Col> 
                            <Col span={1}>
                                <Button type="primary" onClick={()=>{this.editStray(item.id)}}>Revise</Button>
                            </Col> 
                            <Col span={3}>
                                <Button type="primary" onClick={()=>{this.deleteStray(item.id)}}>Delete</Button>
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
 