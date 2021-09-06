import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { App_Base as Styles } from './Styles'
import { SubScreenSelector } from './ScreenSelector'

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreenID: "consumptions",
      currentScreenIndex: 0
    }
  }

  handleScreenSwitch = (screenID, screenIndex) => {
    if (screenIndex !== this.state.currentScreenIndex) {
      this.setState({
        currentScreenID:  screenID,
        currentScreenIndex: screenIndex
      })
    }
  }

  render() {
    // TODO: Add an actual list of the items
    return <View style={Styles.mainAppScreen}>
        <SubScreenSelector
          screenList={Screens}
          currentScreen={this.state.currentScreenIndex}
          screenSwitch={this.handleScreenSwitch}
        />
        <View >

        </View>
      </View>
  }
}

const Screens = [
  {
    title: "History",
    // icon: Icons.food_db,
    id: "consumptions"
  },
  {
    title: "Foods List",
    // icon: Icons.new_meal,
    id: "nutritional_information"
  }
]
