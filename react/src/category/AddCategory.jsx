import React from 'react';
import {   List, Row, Col, Button, Select, Avatar, Card, Input, Upload, Divider, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import "../../styles/css/user-list.scss"
import TokenHeaders from '../utils'; 

const {Option}= Select;

export default class AddCategory extends React.Component{

    // props is parameters for this react component
    constructor(props){
        super(props);
        this.state = {
            list:[],
            modelVisible:false,
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
    // calling setState() in an unmounted component means that your app is still holding 
    // a reference to the component after the component has been unmounted - which often indicates a memory leak!

    // avoid calling setState() after a component has unmounted,
    //  set a _isMounted property to true in componentDidMount and set it to false in componentWillUnmount 
    getList = ()=>{
        console.log("requesting category list...");
        // combine axios and http get from node js to get data
        axios({
            method: 'get',
            url:ApiUrl.CATEGORY_ALL,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);

                let data = res.data.data;
                // get data and set state after mount
                if(this._isMounted){
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
        this.setState({
            level:level,
        });
    }

    setParentId = (id) => {
        this.setState({
            pid:id,
        });
    }

    handleOk = () => {
        this.setState({
            modelVisible:false,
        });

        //let url = ApiUrl.CATEGORY_ADD;

        let dataProps = {
            'id':this.state.id,
            'image':this.state.image,
            'name':this.state.name,
            'level':this.state.level,
            'pid':this.state.pid,
        }

        axios({
            method:'post',
            url:ApiUrl.CATEGORY_ADD,  
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
        this.setState({
            modelVisible:false,
        });
        // route back to category list
        this.props.history.push('/admin/category/list/')
    }

    //for image uploads
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
                        <Form.Item label='similar category'>
                            <Select style={{width:120}} defaultValue={this.state.pid} value={this.state.pid} onSelect={this.setParentId}>
                                {
                                    pList.map( (item)=>(
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>   
                        <Form.Item label='category icon'>
                            {/* upload api from antd */}
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
 