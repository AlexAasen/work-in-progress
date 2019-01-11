const React = require('react')
const qa = require('constants/qa')

class QA extends React.Component {
  render(){
    const entries = qa.map((x, idx) => {
      return <div key={idx} className="qa-entry">
        <h3 className="question">{x.question}</h3>
        <p className="answer">{x.answer}</p>
      </div>
    })

    return(
      <div className="page-container qa">
        <p className="page-header">Q&A with Alex Aasen</p>
        <div className="news-spread">
          <div className="interview-spread">
            <h1 className="cover-title">I love to bring ideas to life</h1>
            <p className="cover-ingress">
              {"Alex Aasen, 27, is a front-end developer living with her boyfriend and their cat " +
              "Zoey in Stockholm, Sweden." +
              " She's currently specialized in React and enjoys testing her skills by recreating " +
              "her favourite puzzle games. She spends her spare time playing Heroes of the Storm and " +
              "she's terrified of bugs."}
            </p>
            <div className="columns">
              {entries}
            </div>
          </div>
          <div className="img"></div>
        </div>
      </div>)
  }
}

module.exports = QA
