import React from 'react'
import Mixin from '../common/Mixin.jsx'
import Category from './Category.jsx'
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const ResouceList = React.createClass({

  propTypes: {
    children: React.PropTypes.any,
  },

  getInitialState() {
    return {
      data:{}
    }
  },

  mixins: [Mixin],

  componentWillMount(){
    this.requestData();
  },

  render() {

    const inner = this.state.data.res && this.state.data.res.map(item => {
      return <Panel header={item.category} key={item.category}>
        <Category data={item} refresh={this.requestData}/>
      </Panel>
    })

    return (<Collapse>
      {inner}
    </Collapse>)
  },

  requestData(){
    const requestObj = {
      url: '__manage'
    }

    const that = this;

    this.request(requestObj, {
      success(result) {
        const data = result.text
          .replace(/\n/g, '')
          .replace(/ /g, '')
          .replace(/,\]/g, ']')
          .replace(/,}/g, '}')
          .replace(/&quot;/g, '"')
          .replace(/&lt;(\/)?p&gt;/g, '')
        const jsonData = JSON.parse(data);;
        console.log(jsonData);
        that.setState({data: jsonData})
      }
    })
  }
});

export default ResouceList
