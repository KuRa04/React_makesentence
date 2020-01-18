import React, { Component } from 'react'
import './css/form.css'

class Form extends Component {
    render() {
        return (
            <div className="form">
                <form onSubmit={this.props.handleSubmit} name="input-form">
                    <input name="title" type="text" className="form__ttl" placeholder="英文を入力" /><br />
                    <textarea name="main" className="form__main" placeholder="意味を入力"></textarea>
                    <button type="submit" className="form__btn">英文を作成</button>
                </form>

            </div>


        )
    }
}


export default Form