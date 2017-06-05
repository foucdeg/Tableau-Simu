import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Scenar from '../../components/Scenar/Scenar'
import ScenarForm from '../../components/ScenarForm/ScenarForm'
import UserInfo from '../../components/UserInfo/UserInfo'
import './App.css'

class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    scenars: PropTypes.array.isRequired,
    formScenar: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  submit() {
    console.log('Submitting')
  }

  subscribe() {
    console.log('Subscribing')
  }


  render() {
    const { user, scenars, formScenar } = this.props
    return (
      <div className="masonry">
        <UserInfo user={user} />
        <ScenarForm submit={this.submit} data={formScenar} handleKey={this.handleKey}/>
        {
          scenars.map((scenar) =>
            <Scenar key={scenar.slug} data={scenar} subscribe={this.subscribe} />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { user, scenars, formScenar } = state

  return {
    user,
    scenars,
    formScenar
  }
}

export default connect(mapStateToProps)(App)
