import React, { Component, PropTypes } from "react"
import Screen from "../../components/layouts/Screen"
import { getPriceText } from "../../utils"
import { Clearfix, IconWithLabel, NavbarBack } from "../../components/elements"
import CarLoading from "../../components/elements/CarLoading"
import styled from "styled-components/native"
import Color from "../../themes/colors"

const BoxWhite = styled.View`
  background-color: #ffffff;
  margin-top: 8;
  margin-left: 8;
  margin-right: 8;
  padding-horizontal: 8;
  padding-vertical: 16;
`

export default class BookScreen extends Component {
  render() {
    const { direction } = this.props.navigation.state.params
    return (
      <Screen>
        <NavbarBack
          title="Đặt xe"
          onBack={() => this.props.navigation.goBack(null)}
        />
      </Screen>
    )
  }
}
