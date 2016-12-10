import React from 'react'
import Mixin from '../common/Mixin.jsx'
import { Collapse } from 'antd';
import Resource from './Resource.jsx'
const Panel = Collapse.Panel;

const Category = React.createClass({

  getInitialState() {
    return {
    }
  },

//data结构
// {
// 	"category": "1",
// 	"path": [{
// 		"res": [{
// 			"resourceMethod": "GET",
// 			"resoureceUrlPath": "test/newCatalog.json",
// 			"resourceFile": [{
// 				"resourceMethod": "GET",
// 				"pathId": "test-newcatalog-json",
// 				"fileStatusCode": "200",
// 				"filrFormat": "json",
// 				"fileData": { & quot;
// 					header & quot;: 123
// 				}
// 			}],
// 			"resourceDescription": "&lt;p&gt;呵呵&lt;/p&gt;"
// 		}]
// 	}]
// }

  mixins: [Mixin],

  render() {

  	const inner = this.props.data.path && this.props.data.path.map(item => {
  		
  		const header = item.res[0] && item.res[0].resourceMethod + " " + item.res[0].resoureceUrlPath;

  		return (
  		<Panel header={header} key={header}>
  			<Resource data={item.res[0]} refresh={this.props.refresh} catagory={this.props.data.category}/>
  		</Panel>
  		)

  	})

    return (<div>
    	<Collapse bordered={false}>
    		{inner}
    	</Collapse>
    </div>)
  },

});

export default Category
