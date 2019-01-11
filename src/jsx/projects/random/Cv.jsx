const React = require('react')
const html2canvas = require('html2canvas')
const { handlePng } = require('api/exportPng')

class Cv extends React.Component {
  captureScreen(){
    var pngBody = document.querySelector("#cv-page")
    var pngAttr = pngBody.getBoundingClientRect()
    const options = {
      scale: 4,
      width: pngAttr.width,
      height: pngAttr.height
    }

    html2canvas(pngBody, options)
        .then(function(canvas) {
          var ctx = canvas.getContext("2d")
          ctx.webkitImageSmoothingEnabled = false

          handlePng(canvas)
        })
  }

  render(){
    return(
      <div className="cv-page page-container" id="cv-page" onClick={this.captureScreen.bind(this)}>
        <div className="header-container">
          <img src="src/img/me.jpg"></img>
          <div className="header-content">
            <div className="header">
              <h1>Alexandra Aasen</h1>
              <img className="specialization" src="src/img/1562726.png"></img>
              <img className="specialization" src="src/img/react-logo.png"></img>
              <img className="specialization" src="src/img/HTML5_CSS_JavaScript.png"></img>
            </div>
            <p className="career-title">Frontend-utvecklare - 2 år i branschen</p>
            <span className="horizontal-line"></span>
            <p className="ingress">Javascript utvecklare specialiserad inom React och D3. Älskar att lära sig nya saker och att ge liv till sina egna och andras idéer.</p>
          </div>
        </div>
        <div className="contact-info">
          <div className="entry">
            <span className="icon icon-mail"></span>
            <p>alexaasen@outlook.com</p>
          </div>
          <div className="entry">
            <span className="icon icon-location"></span>
            <p>Stockholm, Sverige</p>
          </div>
          <div className="entry">
            <span className="icon icon-linkedin"></span>
            <p>linkedin.com/in/alexandra-aasen/</p>
          </div>
          <div className="entry">
            <span className="icon icon-attachment"></span>
            <p>alexaasen.com</p>
          </div>
          <div className="entry">
            <span className="icon icon-mobile"></span>
            <p>073 733 99 57</p>
          </div>
        </div>
        <div className="keywords">
          <h2>Kompetens</h2>
          <div className="keyword-wrapper">
            <span>Javascript</span>
            <span>React</span>
            <span>D3</span>
            <span>Node.js</span>
            <span>Git</span>
            <span>Css/Sass</span>
            <span>Fuse.js</span>
            <span>Ramda</span>
            <span>HTML5</span>
            <span>Datavisualisering</span>
            <span>Responsiv webbutveckling</span>
            <span>Speldesign</span>
            <span>Photoshop</span>
          </div>
        </div>
        <div className="work experience">
          <h2>Arbetserfarenhet</h2>
          <div className="entry">
            <img src="src/img/hiq-skane-ab.png"/>
            <div className="text">
              <h3>HiQ</h3>
              <p className="time-label">2016 Q4 - Pågående</p>
              <p className="work-title">Frontend-utvecklare - Vården i Siffror</p>
              <span className="horizontal-line"></span>
              <p className="description">Jag arbetar som konsult för Vården i Siffror. Vården i siffror ämnar att visualisera data bakom Sveriges sjukvård för att genom transparens och tillgänglighet uppnå en mer jämlik vård. Projektet använder sig utav Javascript med verktyg så som React, Node.js samt agila metoder så som Scrum.
              Mina arbetsuppgifter varierar mellan att refaktorera gammal kod, implementera ny funktionalitet, diskutera fram vad som bör vidareutvecklas eller nyutvecklas samt att testa och kvalitetssäkra koden.
              Under min tid på projektet har vi hunnit byta ut hela kodbasen ifrån Angular till React, samt tillfört en mängd olika ingångar för att förenkla för våra användare. T.ex finns en ny indikator-sida som låter dig undersöka en specifik indikator. Det finns även rapport-ingångar så att vårdpersonal själva kan skapa sammanställningar av resultat som de sedan kan dela med andra. Samt att det finns en översiktsingång där man kan välja ett urval av indikatorer och enheter och jämföra dessa med varandra i en förenklad vy.</p>
            </div>
          </div>
          <div className="entry">
            <img src="src/img/H2u2DUjE_400x400.jpg"/>
            <div className="text">
              <h3>Gamestop</h3>
              <p className="time-label">2016 Q1 - 2016 Q3</p>
              <p className="work-title">Butikssäljare</p>
              <span className="horizontal-line"></span>
              <p className="description">Jag jobbade extra på Gamestop medan jag pluggade. Mina arbetsuppgifter varierade mellan att stå i kassan, plocka upp leveranser samt städa och hålla ordning i lagret. Jag höll mig även uppdaterad om kommande titlar och produkter för att kunna ge kunder tips baserat på vad de tidigare köpt.</p>
            </div>
          </div>
        </div>
        <div className="education experience">
          <h2>Utbildning</h2>
          <div className="entry">
            <img src="src/img/c3l.png"/>
            <div className="text">
              <h3>Systemutveckling, Java</h3>
              <p className="time-label">2015 Q3 - 2017 Q2</p>
              <p className="work-title">C3L KY-utbildning</p>
              <span className="horizontal-line"></span>
              <p className="description">Utbildning inom systemutveckling med fokus på Java. Utbildningen avslutades med en 6 månaders praktik som jag spenderade på HiQ i projektet Vården i Siffror.</p>
              <div className="keyword-wrapper">
                <span>Java</span>
                <span>Advanced java</span>
                <span>Android development</span>
                <span>Javascript</span>
                <span>React</span>
              </div>
            </div>
          </div>
          <div className="entry">
            <img src="src/img/UU_logo.jpg"/>
            <div className="text">
              <h3>Speldesign och grafik</h3>
              <p className="time-label">2011 Q3 - 2014 Q2</p>
              <p className="work-title">Uppsala Universitet</p>
              <span className="horizontal-line"></span>
              <p className="description">Utbildning som gick ut på att designa samt utveckla spel. Varje kurs höll ramar för vilken typ av spel som skulle utvecklas, t.ex pussel-spel, brädspel eller mer traditionella datorspel i en rad olika genrer. Jag skrev min kandidatuppsats på ämnet 'inclusive design', hur man designar en stark och intressant kvinnlig karaktär och hur man undviker sexualisering i karaktärsdesign.</p>
              <div className="keyword-wrapper">
                <span>Game design</span>
                <span>Advanced game design</span>
                <span>Level design</span>
                <span>Concept art</span>
                <span>3d modeling</span>
              </div>
            </div>
          </div>
        </div>
        <div className="other">

        </div>
      </div>
    )
  }
}

module.exports = Cv
