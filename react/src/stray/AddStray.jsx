import React from 'react';
import {   List, Row, Col, Button, Avatar, Modal, message, Upload, Form, Input, Select} from 'antd';
import axios from 'axios';
import E from 'wangeditor'
import ApiUrl from '../config/api_url';
import ReactDOM from 'react-dom';
import {UploadOutlined} from '@ant-design/icons';
import "../../styles/css/stray-list.scss"
import TokenHeaders from '../utils';
const {Option} = Select;
const {confirm} = Modal;

export default class AddStray extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            category_first: "123",
            category_second: "321",
            name: "",
            deposit: "",
            tax_deposit: "",
            weight: "5",
            images: "",
            detail: "",
            freight: "0",
            v2List:[],
        };
    }

    componentDidMount(){
        //wang editor needs to be initilized first
        const editor = new E(this.refs.toolbar,this.refs.editor);
        editor.customConfig.zIndex = 100;

        editor.customConfig.uploadImgServer = ApiUrl.UPLOAD_EDITOR;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHeaders = TokenHeaders;

        editor.customConfig.onchange = html =>{
            this.setState({
                detail:html,
            });
            console.log(html);
        };

        editor.customConfig.uploadImgHooks = {
            customInsert: (insertImg,result,editor2) =>{
                var url = result.url;
                console.log("url:::" + url);
                insertImg(url);
            }
        }
        editor.create();
        ////

        this._isMounted = true;
        this.getCategoryList();
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }


    onChange = (file,fileList,event) => {
        if(file.file.status == "done"){
            console.log(file.fileList);
            let res = [];
            file.fileList.forEach(function (item,index){
                res.push(item.response.url);
            });
            this.setState({
                images:res.toString(),
            });
            console.log(res.toString());
        }
    }


    getCategoryList = () => {
        console.log("obtain category list...");
        axios({
            method:'get',
            url:ApiUrl.CATEGORY_ALL,
            headers:TokenHeaders,
        }).then(
            res=>{
                console.log(res.data);
                let data = res.data.data;
                let v2List = [];
                data.forEach((item,index) => {
                    if(item.level == 'V2'){
                        v2List.push(item);
                    }
                });
                
                if(this._isMounted){
                    this.setState({
                        v2List:v2List,
                    });
                }
            }
        );
    }

    setStrayName = (name) =>{
        this.setState({
            name:name,
        });
    }

    setDeposit = (deposit) =>{
        this.setState({
            deposit:deposit,
        });
    }

    setTaxDeposit = (tax_deposit) =>{
        this.setState({
            tax_deposit:tax_deposit,
        });
    }

    setFreight = (freight) =>{
        this.setState({
            freight:freight,
        });
    }

    setWeight = (weight) =>{
        this.setState({
            weight:weight,
        });
    }

    
    addStrayHandler = () => {

        let formData = {
            "category_first":this.state.category_first,
            "category_second": this.state.category_second,
            "name": this.state.name,
            "deposit": this.state.deposit,
            "tax_deposit": this.state.tax_deposit,
            "weight": this.state.weight,
            "images": this.state.images,
            "detail": this.state.detail,
            "freight": this.state.freight,
        }

        axios({
            method:'post',
            url:ApiUrl.STRAY_ADD,
            data:formData,
            headers:TokenHeaders,
        }).then(
            res=>{
                message.success("adding new stray succeeds");
                console.log(res.data);  
            }
        );
    }

    render(){
       
        return (
            <Form>
                <Form.Item label="Stray Name">
                    <Input 
                        style={{width:'300px'}}
                        placeholder=""
                        value={this.state.name}
                        onChange={(e)=> {this.setStrayName(e.target.value)}}
                    />
                </Form.Item>
                <Form.Item label="Before Tax Security Deposit">
                    <Input 
                        style={{width:'300px'}}
                        placeholder=""
                        value={this.state.deposit}
                        onChange={(e)=> {this.setDeposit(e.target.value)}}
                    />
                </Form.Item>
                <Form.Item label="Security Deposit">
                    <Input 
                        style={{width:'300px'}}
                        placeholder=""
                        value={this.state.tax_deposit}
                        onChange={(e)=> {this.setTaxDeposit(e.target.value)}}
                    />
                </Form.Item>
                <Form.Item label="Stray Freight">
                    <Input 
                        style={{width:'300px'}}
                        placeholder=""
                        value={this.state.freight}
                        onChange={(e)=> {this.setFreight(e.target.value)}}
                    />
                </Form.Item>
                <Form.Item label="Stray Weight (kg)">
                    <Input 
                        style={{width:'300px'}}
                        placeholder=""
                        value={this.state.weight}
                        onChange={(e)=> {this.setWeight(e.target.value)}}
                    />
                </Form.Item>
                <Form.Item label="Stray Category">
                        <Select style={{width:120}}>
                            {
                                this.state.v2List.map((item) => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                </Form.Item>
                <Form.Item label="Stray Icon">
                                <Upload headers={TokenHeaders}
                                    accept="images/*"
                                    listType="picture"
                                    action={ApiUrl.UPLOAD_IMAGE}
                                    onChange={this.onChange}
                                >
                                   <Button>
                                   <UploadOutlined/>Upload
                                   </Button>
                                </Upload>
                </Form.Item>

                <Form.Item label="Stray Story">
                    <div ref="toolbar" className="w-e-toolbar"></div>
                    <div ref="editor" className="w-e-text-container"></div>
                    <br/>
                    <Button type="primary" style={{width:'200px'}} onClick={this.addStrayHandler}>OK</Button>
                </Form.Item>
                        
            </Form>
        );
    }
}