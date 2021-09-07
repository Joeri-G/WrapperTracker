import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { App_Base as Styles , Constants} from './Styles'
import SubScreenSelector from './SubScreenSelector'
import { Toolbar, Divider, Button } from 'react-native-material-ui'

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreenID: Screens[0].id,
      currentScreenIndex: 0,
      quickSrcolling: false,
      quickSrcollingTarget: null
    }
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
    // TODO: Add an actual list of the items
    return <View style={Styles.mainAppScreen}>
        <SubScreenSelector
          screenList={Screens}
          currentScreen={this.state.currentScreenIndex}
          screenSwitch={this.quickSwitch}
        />
        <Divider style={{container: { height: 1 }}} />
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          onScroll={this.handleOnScroll}
          horizontal={true}
          style={Styles.ScrollView}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
            <View style={Styles.mainAppScreen}>
              <Text>Pane 1</Text>
              <Button primary raised text="SQL dump" onPress={() => { this.props.DataHandler.retrieveConsumptionByUUID("e9153a82-a68e-4a33-8844-cf1011678209", (trans, res) => { console.log(res.rows.item(0)); }) }} />
            </View>
            <View style={Styles.mainAppScreen}>
              <Text>Pane 2</Text>
            </View>
        </ScrollView>
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
