import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Button } from 'react-native-material-ui';
import { ScreenSelector as Styles } from './Styles';

export default class SubScreenSelector extends Component {
  render() {
    return <View style={Styles.SubSelector}>
      {this.props.screenList.map((item, i) => <Button
        accent
        raised={this.props.currentScreen == i}
        onPress={() => this.props.screenSwitch(item.id, i)}
        text={item.title}
        key={i}
        style={{ container: { flex: 1 }, text: { fontWeight: "bold" } }}
      />)}
    </View>;
  }
}
