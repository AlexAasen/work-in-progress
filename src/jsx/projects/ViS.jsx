const React = require('react')
const { visImgs } = require('constants/projects')
const GalleryView = require('./GalleryView.jsx')

class ViS extends React.Component {
  render(){
    return <GalleryView list={visImgs} type="img"/>
  }
}

module.exports = ViS
