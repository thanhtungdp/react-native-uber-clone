import React, { Component, PropTypes } from "react"
import Screen from "../../components/layouts/Screen"
import { getPriceText } from "../../utils"
import { Clearfix, IconWithLabel, NavbarBack } from "../../components/elements"
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
        <BoxWhite>
          <IconWithLabel iconColor={Color.green} icon="home">
            {direction.origin.text}
          </IconWithLabel>
          <Clearfix height={16} />
          <IconWithLabel iconColor={Color.orange} icon="location-pin">
            {direction.destination.text}
          </IconWithLabel>
          <Clearfix height={16} />
          <IconWithLabel
            iconColor={Color.yellow}
            color={Color.textDescription}
            icon="direction"
          >
            {direction.distance.text}
          </IconWithLabel>
          <Clearfix height={16} />
          <IconWithLabel
            iconColor={Color.primary}
            color={Color.primary}
            icon="wallet"
            fontSize={20}
          >
            {getPriceText(direction.distance)}
          </IconWithLabel>
        </BoxWhite>
      </Screen>
    )
  }
}
