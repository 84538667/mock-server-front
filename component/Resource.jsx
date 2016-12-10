import React from 'react'
import Mixin from '../common/Mixin.jsx'
import { Tabs } from 'antd';
import ResourceDetail from './ResourceDetail';

const TabPane = Tabs.TabPane;

const Resource = React.createClass({

  getInitialState() {
  	return {
  		
  	}
  },

//data结构
// {
// 	"resourceMethod": "GET",
// 	"resoureceUrlPath": "test/newCatalog.json",
// 	"resourceFile": [{
// 		"resourceMethod": "GET",
// 		"pathId": "test-newcatalog-json",
// 		"fileStatusCode": "200",
// 		"filrFormat": "json",
// 		"fileData": { 
// 			"header": 123
// 		}
// 	}],
// 	"resourceDescription": "&lt;p&gt;呵呵&lt;/p&gt;"
// }

  mixins: [Mixin],

  render() {

  	const inner = this.props.data.resourceFile && this.props.data.resourceFile.map(item => {
  		const title = item.fileStatusCode + ' - ' + item.filrFormat;
  		return <TabPane tab={title} key={title}>
  		<ResourceDetail data={item} url={this.props.data.resoureceUrlPath} refresh={this.props.refresh} method={this.props.data.resourceMethod} onUpdate={this.onEditOkClick.bind(null, title)}/>
  		</TabPane>
  	})

    return (<div>
			<div>{this.props.data.resourceDescription}</div>
			<Tabs>
				{inner}
			</Tabs>
    </div>)
  },


  onEditOkClick(key, dataJson){  	
  // http://localhost:8888/__manage/create

  	const reponses = this.props.data.resourceFile && this.props.data.resourceFile.map(item => {
  		if(item.fileStatusCode + ' - ' + item.filrFormat === key){
  			return {
  				status_code: item.fileStatusCode,
  				format: item.filrFormat,
  				body: dataJson,
  				headers:""
  			}
  		} else {
  			return {
  				status_code: item.fileStatusCode,
  				format: item.filrFormat,
  				body: JSON.stringify(item.fileData),
  				headers:""
  			}
  		}
  	})

    const requestObj = {
      url: '__manage/create',
      data: JSON.stringify({
      	url_path: this.props.data.resoureceUrlPath,
      	method: this.props.data.resourceMethod,
      	category:this.props.catagory,
      	description: this.props.data.resourceDescription ? this.props.data.resourceDescription : "",
      	responses : reponses
      })
    }
    // {"url_path":"tttt.json","method":"POST","category":"1","description":"11","responses":[{"status_code":"200","format":"json","body":"{\n    \"a\":\"a\"\n}","headers":""}]}

    const that = this;

    this.request(requestObj, {
      success(result) {
      	that.props.refresh();
      },
      error(result){
      	that.props.refresh();
      }
    })
  	
  }
});

export default Resource
