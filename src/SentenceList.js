import React,{ Component } from 'react';
import Sentence from './Sentence';
import './css/sentence.css';


class SentenceList extends Component {


    render(){
        const sentences = this.props.sentences.map( sentence =>   //親コンポーネントから渡されたものはthis.propsを使って受け取ることが出来る
            <Sentence
            key={sentence.id}
            {...sentence}                                       //{...sentence}はsentenceに入っている要素ををすべて引き継ぐという意味
            setSentenceStatus={this.props.setSentenceStatus}
            />
            )


            return (
                <ol>
                    {sentences}
                </ol>
            );
    }
}


export default SentenceList