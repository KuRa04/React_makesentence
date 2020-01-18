import React, { Component } from 'react'
import SentenceList from './SentenceList'
import Form from './Form'
import './css/App.css'
import uuidv4 from 'uuid/v4'

const DATABASE_PATH = 'http://localhost:3001/sentences'

class App extends Component {


    constructor() {
        super()             //super()はComponentを継承するために必要
        //このクラスのstateを表している　sentencesという配列に各キーとバリューを設定
        const initialSentences = [
            {
                id: 1,
                title: "How are you?",
                main: "調子はどうですか？",
                done: false
            },

            {
                id: 2,
                title: "both",
                main: "両方",
                done: false
            },
        ]
        this.state = {
            initialSentences,
            sentences: [],
        }

        this.fetchSentences = this.fetchSentences.bind(this)

    }

    handleSubmit(e) {
        e.preventDefault();

        //formが空だったら送れないようにする
        const title = e.target.title.value;
        const main = e.target.main.value;
        //const countSentence = this.state.countSentence

        if (title === '' || main === '') {
            alert("入力してください。");
            return false;
        }



        const term = {
            id: uuidv4(),
            title,
            main,
            done: false
        }
        

        fetch(DATABASE_PATH, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(term)
        })
            .then
            ((res) => {
                console.log(res.json());
                this.fetchSentences()
            })
        e.target.main.value = '';

    }

    //clickしたら文を削除
    clicedelete=(e)=>{
        e.preventDefault();
        this.props.removesentences()
    }




    setSentenceStatus(clickSentence) {
        const sentences = this.state.sentences.slice();
        const sentence = sentences[clickSentence.id - 1];
        sentence.done = !sentence.done;

        this.setState({ sentences });
    }

    //clickしたら英文が消える
    clickhide = (cansee) => {
        document.getElementById('root').style.display = cansee;
    }

    //色のボックスをクリックしたら背景が変わる
    changeBgColor = (color) => {
        document.getElementById('root').style.backgroundColor = color;
    }


    componentDidMount() {
        this.fetchSentences()

    }
    //search機能 英文
    enfilterList = (e) => {
        const enupdateList = this.state.initialSentences.filter((term) => {
            return term.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        })
        this.setState({ sentences: enupdateList })
    }
    //search機能 意味
    jafilterList = (e) => {
        const jaupdateList = this.state.initialSentences.filter((term) => {
            return term.main.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        })
        this.setState({ sentences: jaupdateList })
    }
    //dataを取得する
    componentWillMount() {
    }

    fetchSentences() {
        fetch(DATABASE_PATH)
            .then(responce => responce.json())
            .then(json => {
                this.setState({
                    sentences: json,
                    initialSentences:json,
                })
            })
    }


    render() {


        const colors = ['red', 'blue', 'green', 'yellow', 'silver', 'orange', 'aquamarine', 'pink']
        const buttons = colors.map(color => {
            return (
                <button className="btn__col" style={{ background: color }} onClick={(e) => { this.changeBgColor(color) }}></button>
            )
        })

        return (                                //returnの中でHTMLを記述していく
            <div className="app" id='app__col'>

                <h1 className="app__ttl">英文を保存できるアプリ</h1>
                <div className="bgc__change">
                {buttons}
                </div>

                <Form handleSubmit={this.handleSubmit.bind(this)} />
                <div className="search__box">
                    {/* sentence */}
                    <form action="">
                        <input type="text" className="search__form" placeholder="英文から検索" onChange={this.enfilterList} />
                    </form>

                    {/* mean */}
                    <form action="">
                        <input type="text" className="search__form" placeholder="意味から検索" onChange={this.jafilterList} />
                    </form>

                </div>

                <SentenceList                           //呼び出したいコンポーネントは<SentenceList  />のように記述
                    sentences={this.state.sentences}    //sentences={this.state.sentences}のようにそのコンポーネントに渡したい内容を書く
                    setSentenceStatus={this.setSentenceStatus.bind(this)}
                />

            </div>

        );
    }
}

export default App