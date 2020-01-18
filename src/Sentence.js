import React, { Component } from 'react';
import './css/sentence.css';


class Sentence extends Component{

    render(){
        const className= 'undone'
        // const link = this.props.done ? '現れる' : '英文を隠す'
        return(
            <li  key={this.props.id} className={className}>
                <p className="en__stc">
                <span>{this.props.title}</span>
                </p>
                <p>{this.props.main} </p>
                {/* <a href="" onClick={(e) => {e.preventDefault(); this.props.setSentenceStatus(this.props)}} className="stc__link">{link}</a> */}
            </li>
        );
    }
}

export default Sentence