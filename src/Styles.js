import { StyleSheet, Dimensions, StatusBar } from 'react-native'
import fallback_icon from '../assets/icons/fallback_icon.png'

// constants
const CLR_1 = "#16697A"
const CLR_2 = "#234D58"
const CLR_3 = "#82C0CC"
const CLR_4 = "#EDE7E3"
const CLR_5 = "#FFA62B"

const CLR_BG = CLR_4
const CLR_TXT = "#000000"
const CLR_ACCENT = CLR_5

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const STAUSBAR_HEIGHT = typeof StatusBar.currentHeight == "number" ? StatusBar.currentHeight : 0
const PANE_MARGIN = 8

export const Constants = {
  CLR_1: CLR_1,
  CLR_2: CLR_2,
  CLR_3: CLR_3,
  CLR_4: CLR_4,
  CLR_5: CLR_5,
  CLR_BG: CLR_BG,
  CLR_TXT: CLR_TXT,
  CLR_ACCENT: CLR_ACCENT,
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
  STAUSBAR_HEIGHT: STAUSBAR_HEIGHT,
  PANE_MARGIN: PANE_MARGIN
}

// styles
export const App_Base = StyleSheet.create({
  mainAppScreen: {
    flex: 1,
    backgroundColor: CLR_BG,
    width: WIDTH - PANE_MARGIN * 2,
    margin: PANE_MARGIN
  },

  StatusBarHack: {
    height: STAUSBAR_HEIGHT,
    backgroundColor: CLR_5
  },

  ScrollView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: CLR_BG
  }
})

export const ScreenSelector = StyleSheet.create({
  SubSelector: {
    backgroundColor: CLR_4,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 4
  }
})

export const Icons = {
  meal_history: fallback_icon,
  food_db: fallback_icon,
  new_meal: fallback_icon,
  new_food: fallback_icon,
  stats: fallback_icon,
  new_item: fallback_icon
}

export const globalAppTheme = {
  iconSet: 'MaterialIcons',
  fontFamily: 'Roboto',
  palette: {
    // main theme colors
    primaryColor: CLR_1,
    secondaryColor: CLR_2,
    accentColor: CLR_ACCENT,
    // text color palette
    primaryTextColor: CLR_TXT
  }
}
