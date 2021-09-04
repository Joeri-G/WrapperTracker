import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {App_Base as Styles } from './Styles'

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempTimer: 0
    }
    this.timer = setInterval(() => this.setState({tempTimer: this.state.tempTimer + 1}), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <View style={Styles.mainAppScreen}>
        <Text>Saved ({this.state.tempTimer} s)</Text>
      </View>
  )}
}
