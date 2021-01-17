import React from 'react';
import {   List, Row, Col, Button, Select, Avatar, Card, Input, Upload, Divider, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import "../../styles/css/user-list.scss"
import TokenHeaders from '../utils'; 

const {Option}= Select;

export default class EditCategory extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            list:[],
            id:'',
            image:'',
            name:'',
            level:'V2',
            pid:'',
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.getList();
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }

    getList = ()=>{
        let id = this.props.match.params.id;
        console.log(id);
        axios({
            method: 'get',
            url:ApiUrl.CATEGORY_ALL,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);

                let data = res.data.data;

                if(this._isMounted){

                    data.forEach((item,index)=>{
                        if(item.id==id){
                            this.setState({
                                id:item.id,
                                image:item.image,
                                name:item.name,
                                level:item.level,
                                pid:item.pid,
                            });
                        }
                    });
                    

                    this.setState({
                        list:data,
                    });
                }
 
            }
        );
    }

    setCategoryName = (name) => {
        this.setState({
            name:name,
        });
    }
    
    setLevel = (level) => {
        let pListV2 = [];
        this.state.list.forEach((item,index)=>{
                pListV2.push(item);
        });
        this.setState({
            level:level,
            pid:pListV1[0].id,
        });
    }
    

    handleOk = () => {
 

        let url = ApiUrl.CATEGORY_EDIT;

        let dataProps = {
            'id':this.state.id,
            'image':this.state.image,
            'name':this.state.name,
            'level':this.state.level,
            'pid':this.state.pid,
        }

        axios({
            method:'post',
            url:url,
            data:dataProps,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);
            }
        );
        // route back to category list
        this.props.history.push('/admin/category/list/')
    }


    handleCancel = () => {
        // route back to category list
        this.props.history.push('/admin/category/list/')
    }

    onUploadChange = (file,fileList,event) => {
        if(file.file.status == "done"){
            console.log(file.fileList);
            let res = [];
            file.fileList.forEach(function (item,index){
                res.push(item.response.url);
            });
            this.setState({
                image:res[0].toString(),
            });
            console.log(this.state.image);
        }
    }

    render(){
         
        let {list} = this.state;
        let pList = [];
        list.forEach((item,index) => {
            if(this.state.level == 'V2'){
                if(item.level == 'V2'){
                    pList.push(item);
                }
            } else if(this.state.level == 'V1'){
                if(item.level == 'V1'){
                    pList.push(item);
                }
            }
        });

        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className ="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="category-layout">
                <card>
                    <Form>
                        <Form.Item label="category name">
                            <Input  
                                style={{width:'380px'}}
                                placeholder="category name"
                                value={this.state.name}
                                onChange={(e)=>{this.setCategoryName(e.target.value)}}
                            />
                        </Form.Item>
                        <Form.Item label='category icon'>
                            <Upload
                                headers={TokenHeaders}
                                accept="images/*"
                                listType="picture-card"
                                action={ApiUrl.UPLOAD_CATEGORY}
                                onChange={this.onUploadChange}
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>   
                        <Button type="primary" style={{width:"200px"}} onClick={this.handleOk}>OK</Button>                  
                    </Form>
                </card>
            </div>
        );
    }
}
 