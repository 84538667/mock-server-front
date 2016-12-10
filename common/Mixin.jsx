import React from 'react'
import request from 'superagent'

const httpurl = 'http://localhost:8888/';

const Mixin = {

  request(requestObj,ops={}){

		if(requestObj.method === 'get'){
	    request
	      .get(httpurl + requestObj.url)
	      .set('Accept', 'application/json')
	      .end((err, res) => {
	        if (err !== null) {
	          ops.error(err)
	        } else {
	          ops.success(res)
	        }
	      })

		} else {
	    request
	      .post(httpurl + requestObj.url)
	      .send(requestObj.data)
	      .set('Accept', 'application/json')
	      .end((err, res) => {
	        if (err !== null) {
	          ops.error(err)
	        } else {
	          ops.success(res)
	        }
	      })
		}
  },

  spliter(){
  	return <div style={{ height : 1 ,background : "#E9E9E9" ,marginTop : 10, marginBottom : 10 }}></div>  
  }
}


export default Mixin
