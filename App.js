import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { App_Base as Styles, Icons, Constants } from './src/Styles'
import ScreenSelector from './src/ScreenSelector'
import FoodDb from './src/FoodDb'
import NewItem from './src/NewItem'
import Stats from './src/Stats'
import DataHandler from './src/DataHandler'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreenID: Screens[0].id,
      currentScreenIndex: 0,
      quickSrcolling: false,
      quickSrcollingTarget: null
    }
    this.dataHandler = new DataHandler()
  }

  handleScreenSwitch = (screenID, screenIndex) => {
    if (screenIndex !== this.state.currentScreenIndex) {
      this.setState({
        currentScreenID:  screenID,
        currentScreenIndex: screenIndex
      })
      this.scrollView.scrollTo({x: Constants.WIDTH * screenIndex, y: 0, animated: true})
      this.setState({
        quickSrcolling: true, // quickscrolling is activated so that the buttons wont flash as the screen swipes past them
        quickSrcollingTarget: screenIndex
      })
    }
  }

  handleOnScroll = (e) => {
    // if the center of the screen is on a tab that is not selected in the bottom menu, select it
    let x = e.nativeEvent.contentOffset.x + Constants.WIDTH * 0.5
    for (var i = 0; i < Screens.length; i++) {
      if (x >= Constants.WIDTH * i && x <= Constants.WIDTH * (i + 1) - 1) {
        if (this.state.currentScreenIndex !== i && !this.state.quickSrcolling) {
          this.setState({currentScreenIndex: i})
        }
        if (this.state.quickSrcolling && this.state.quickSrcollingTarget == i) {
          this.setState({
            quickSrcolling: false,
            quickSrcollingTarget: null
          })
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          onScroll={this.handleOnScroll}
          horizontal={true}
          style={Styles.ScrollView}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
            <FoodDb />
            <NewItem dataHandler={this.dataHandler} />
            <Stats />
      </ScrollView>
        <ScreenSelector
          screenList={Screens}
          currentScreen={this.state.currentScreenIndex}
          screenSwitch={this.handleScreenSwitch}
        />
        <StatusBar style="auto" />
      </React.Fragment>
  )}
}

const Screens = [
  {
    title: "Saved",
    icon: Icons.food_db,
    id: "food_db"
  },
  {
    title: "New",
    icon: Icons.new_meal,
    id: "new_item"
  },
  {
    title: "Stats",
    icon: Icons.stats,
    id: "stats"
  }
]
