import React from 'react'
import Mixin from '../common/Mixin.jsx'
import JsonEditor from './JsonEditor'
import { Row, Col, Button, Input, Popconfirm } from 'antd';
const ButtonGroup = Button.Group;

const Resource = React.createClass({

  getInitialState() {
    return {
      edit: false,
      currentData: JSON.stringify(this.props.data.fileData)
    }
  },

//data结构
// {
// 		"resourceMethod": "GET",
// 		"pathId": "test-newcatalog-json",
// 		"fileStatusCode": "200",
// 		"filrFormat": "json",
// 		"fileData": { 
// 			"header": 123
// 		}
// 	}



  mixins: [Mixin],

  componentWillReceiveProps(nextProps){
    this.state.currentData = JSON.stringify(nextProps.data.fileData)
  },

  render() {
  	console.log(this.props.data);

  	const testShell = "curl -v -X " + this.props.method + " http://localhost:8888/" + this.props.url + (this.props.data.fileStatusCode != "200" ? "?__statusCode=" + this.props.data.fileStatusCode : "");

  	const innerData = JSON.stringify(this.props.data.fileData);
    return (<div style={{border:"1px solid #e9e9e9", borderRadius:5}}>
    		<Row  style={{margin:20}}>
    			<Col offset="1" span="8">
    				<ButtonGroup>
    					<Button size="small" onClick={this.onEditClick}>编辑</Button>
    					<Popconfirm title="确认删除?" onConfirm={this.onDeleteClick} okText="Yes" cancelText="No">
    						<Button size="small">删除</Button>
    					</Popconfirm>
		    			{
		    				this.state.edit && 
		    				<Button size="small" onClick={this.onEditOkClick}>确定</Button>
		    			}
		    			{
		    				this.state.edit && 
		    				<Button size="small" onClick={this.onCancelClick}>取消编辑</Button>
		    			}
    				</ButtonGroup>
    			</Col>
    		</Row>
    		<div style={{margin:20}}>
		    	<Row >
		    		<Col span="20" offset="2">
                        <JsonEditor value={this.state.currentData} view={!this.state.edit} onChange={this.onJsonDataChange}/>
		    		</Col>
		    	</Row>
    		</div>
    		<div style={{margin:20, backgroundColor:"#F7F7F9", padding:10, fontSize:16}}>
    			{testShell}
    		</div>
    </div>)
  },

  onJsonDataChange(value){
  	this.state.currentData = value
        .replace(/\n/g, '')
        .replace(/ /g, '');
  },

  onEditClick(){
  	this.setState({edit:true})
  },

  onCancelClick(){
  	this.setState({edit:false})
  },

  onDeleteClick(){
  	// http://localhost:8888/__manage/resource/GET-lalala?_method=delete
    const requestObj = {
      url: '__manage/resource/' + this.props.data.resourceMethod + '-' + this.props.url + '?_method=delete',
      method: 'get'
    }

    const that = this;

    this.request(requestObj, {
      success(result) {
      	that.props.refresh();
      }
    })
  },

  onEditOkClick(){  	
  	this.props.onUpdate(this.state.currentData);
  	this.setState({edit:false})
  }

});

export default Resource
