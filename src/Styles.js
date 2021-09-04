import { StyleSheet, Dimensions } from 'react-native'
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
  HEIGHT: HEIGHT
}

// styles
export const App_Base = StyleSheet.create({
  mainAppScreen: {
    flex: 1,
    backgroundColor: CLR_BG,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH
  },

  ScrollView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: CLR_3,
  }
})

export const ScreenSelector = StyleSheet.create({
  Selector: {
    backgroundColor: CLR_1,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 6,
    paddingBottom: 4
  },

  Active_Screen: {
    backgroundColor: CLR_2,
    borderRadius: 24
  },

  Selector_button: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 56
  },

  Selector_text: {
    color: CLR_ACCENT,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center"
  },

  Selector_icon: {
    height: 24,
    width: 24
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
