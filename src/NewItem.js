import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {App_Base as Styles, Constants } from './Styles'
// import DataHandler from './DataHandler'

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={Styles.mainAppScreen}>
        <Text>New Item</Text>
        <Button onPress={(e) => { this.props.DataHandler.doSomething() }} title="db test 1" color={Constants.CLR_ACCENT} />
      </View>
  }
}
