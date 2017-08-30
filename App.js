console.disableYellowBox = true;

import React from "react"
import { StackNavigator } from "react-navigation"
import { StyleSheet, Text, View } from "react-native"


import LaunchScreen from "./screens/LaunchScreen"
import BookScreen from "./screens/BookScreen"

const AppNavigation = new StackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen
    },
    BookScreen: {
      screen: BookScreen
    }
  },
  {
    headerMode: "none"
  }
)

export default AppNavigation
