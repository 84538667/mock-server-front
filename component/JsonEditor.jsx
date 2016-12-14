import React from 'react'
import Mixin from '../common/Mixin.jsx'

const Resource = React.createClass({

    getInitialState() {
        return {
            editor: null
        }
    },

    mixins: [Mixin],

    componentWillReceiveProps(nextProps){
        if(this.state.editor) {
            this.state.editor.setMode(nextProps.view ? 'view' : 'code');
        }
    },

    componentDidMount(){
        if(!this.state.editor){
            const container = document.getElementById('jsoneditor' + this.props.uniqueKey);
            const that = this;
            var options = {
                mode: this.props.view ? 'view' : 'code',
                modes: ['view' , 'code'], // allowed modes
                onChange: function() {
                    that.onChange()
                }
            };
            this.setState({editor : new JSONEditor(container, options, JSON.parse(this.props.value))});
        }
    },

    render() {
        const jsoneditorId = "jsoneditor" + this.props.uniqueKey;
        return (<div>
            <div id={jsoneditorId} style={{height:400}}></div>
        </div>)
    },

    onChange(){
        console.log(this.state.editor.getText());
        if(this.props.onChange){
            this.props.onChange(this.state.editor.getText());
        }
    }


});

export default Resource
