import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {App_Base as Styles } from './Styles'

export default class StartScreen extends Component {
  render() {
    return (
      <View style={Styles.mainAppScreen}>
        <Text>Stats</Text>
      </View>
  )}
}
