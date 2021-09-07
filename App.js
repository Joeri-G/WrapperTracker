import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { App_Base as Styles, Icons, Constants, globalAppTheme } from './src/Styles'
import { ThemeContext, getTheme, BottomNavigation } from 'react-native-material-ui';
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

  quickSwitch = (screenID, screenIndex) => {
    if (screenIndex !== this.state.currentScreenIndex) {
      this.setState({
        currentScreenID:  screenID,
        currentScreenIndex: screenIndex,
        quickSrcolling: true, // quickscrolling is activated so that the buttons wont flash as the screen swipes past them
        quickSrcollingTarget: screenIndex
      })
      this.scrollView.scrollTo({x: Constants.WIDTH * screenIndex, y: 0, animated: true})
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
    return <ThemeContext.Provider value={getTheme(globalAppTheme)}>
      <View style={Styles.StatusBarHack}></View>
      {/* Padding so that the top status bar doesn't screw with things */}
      <ScrollView
        ref={scrollView => this.scrollView = scrollView}
        onScroll={this.handleOnScroll}
        horizontal={true}
        style={Styles.ScrollView}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}>
          <FoodDb DataHandler={this.dataHandler} />
          <NewItem DataHandler={this.dataHandler} />
          <Stats DataHandler={this.dataHandler} />
      </ScrollView>
      <BottomNavigation>
        {Screens.map((item, i) => <BottomNavigation.Action
          key={i}
          icon={item.icon}
          label={item.title}
          onPress={() => this.quickSwitch(item.id, i)}
          style={this.state.currentScreenIndex == i ? {
            // inline styles that highlight the currently active button
            icon: { color: Constants.CLR_ACCENT },
            label: { color: Constants.CLR_ACCENT }
          } : undefined}
        />)}
      </BottomNavigation>
      <StatusBar style="auto" />
    </ThemeContext.Provider>
  }
}

const Screens = [
  {
    title: "Saved",
    icon: "list",
    id: "food_db"
  },
  {
    title: "New",
    icon: "add-circle-outline",
    id: "new_item"
  },
  {
    title: "Stats",
    icon: "insights",
    id: "stats"
  }
]
