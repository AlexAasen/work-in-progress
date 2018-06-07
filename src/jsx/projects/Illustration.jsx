const React = require('react')
const { illustrationImgs } = require('constants/projects')
const GalleryView = require('./GalleryView.jsx')

class ViS extends React.Component {
  render(){
    return <GalleryView list={illustrationImgs} type="img"/>
  }
}

module.exports = ViS
