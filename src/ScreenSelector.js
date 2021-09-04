import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { ScreenSelector as Styles } from './Styles';


export default class ScreenSelector extends Component {
  render() {
    return <View style={Styles.Selector}>
      {
        this.props.screenList.map((item, i) => {
          let buttonStyle = i == this.props.currentScreen ? [Styles.Selector_button, Styles.Active_Screen] : Styles.Selector_button
          return (
            <Pressable
              style={buttonStyle}
              key={i}
              onPress={() => this.props.screenSwitch(item.id, i)}
              buttonID={item.id} >
                <Image source={item.icon} style={Styles.Selector_icon} />
                <Text style={Styles.Selector_text}> {item.title} </Text>
            </Pressable>
        )})
      }
    </View>
  }
}
