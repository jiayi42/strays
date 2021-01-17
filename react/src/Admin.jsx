import React from 'react';
import {Layout, Menu, Breadcrumb, Input, Icon, Button, message} from 'antd';
import axios from 'axios';
import ReactDOM from 'react-dom';
import "../styles/css/layout.scss"
import { Redirect, Route } from 'react-router-dom';
import UserList from './user/UserList'
import CategoryList from './category/CategoryList'
import EditCategory from './category/EditCategory'
import AddCategory from './category/AddCategory'
import StrayList from './stray/StrayList'
import EditStray from './stray/EditStray'
import AddStray from './stray/AddStray'

const { Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

export default class Login extends React.Component{


    constructor(props){
        super(props);
 
    }
   
    // this.props.history.push is used to routing

    handleClickUserList = (e) => {
        console.log(e.item.props);
        this.props.history.push('/admin/user/list/')
    }


    handleClickStrayList = (e) => {
        console.log(e.item.props);
        this.props.history.push('/admin/stray/list/')
    }

    handleClickAddStray = (e) => {
        console.log(e.item.props);
        this.props.history.push('/admin/stray/add/')
    }

    handleClickCategoryList = (e) => {
        console.log(e.item.props);
        this.props.history.push('/admin/category/list/')
    }

    handleAddCategory = (e) => {
        console.log(e.item.props);
        this.props.history.push('/admin/category/add/')
    }

    render(){
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider>
                    <div className="logo">Your Stray Manager</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>Home</span>
                        </Menu.Item>

                        <SubMenu
                            key="/user"
                            title={
                                <span>
                                    <Icon type="desktop"/>
                                    <span>User Management</span>
                                </span>
                            }
                        >
                            <Menu.Item key="userList" onClick={this.handleClickUserList}>User List</Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="/stray"
                            title={
                                <span>
                                    <Icon type="desktop"/>
                                    <span>Stray Management</span>
                                </span>
                            }
                        >
                            <Menu.Item key="strayList" onClick={this.handleClickStrayList}>Stray List</Menu.Item>
                            <Menu.Item key="addstray" onClick={this.handleClickAddStray}>Add Stray</Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="/category"
                            title={
                                <span>
                                    <Icon type="desktop"/>
                                    <span>Class Management</span>
                                </span>
                            }
                        >
                            <Menu.Item key="10" onClick={this.handleClickCategoryList}>
                                <Icon type="file"/>
                                <span>Class List</span>
                            </Menu.Item>
                            <Menu.Item key="11" onClick={this.handleAddCategory}>
                                <Icon type="file"/>
                                <span>Add Class</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin:'0 16px'}}>
                        <Breadcrumb style={{ margin: '16px 0'}}>
                            <Breadcrumb.Item>Store Management</Breadcrumb.Item>
                            <Breadcrumb.Item>Work Bench</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* menu to route to different component and render the component */}
                        <div style={{ padding:24, background: '#fff', minHeight:360}}>
                            <Route path="/admin/user/list/" component={UserList}/>
                            <Route path="/admin/stray/list/" component={StrayList}/>
                            <Route path="/admin/stray/add" component={AddStray}/>
                            <Route path="/admin/stray/edit/:id" component={EditStray}/>
                            <Route path="/admin/category/list/" component={CategoryList}/>
                            <Route path="/admin/category/add" component={AddCategory}/>
                            <Route path="/admin/category/edit/:id" component={EditCategory}/>
                            <Redirect to="/admin/user/list"/>
                        </div>
                        
                    </Content>
                    <Footer style={{textAlign:'center'}}>Powered by ReactJS and NodeJS</Footer>
                </Layout>
            </Layout>
        );
    }
}
 