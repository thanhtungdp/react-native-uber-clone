import React, { Component, PropTypes } from "react"
import styled from "styled-components/native"
import { getPriceText } from "../../utils"
import { Button, Clearfix, Text } from "../../components/elements"
import Color from "../../themes/colors"

const FormDetailContainer = styled.View`
  position: absolute;
  bottom: 10;
  left: 10;
  right: 10;
`

const WhiteBox = styled.View`
  padding-horizontal: 15;
  padding-vertical: 15;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-between;
`

export default class FormDetail extends React.Component {
  static propTypes = {
    direction: PropTypes.shape({
      distance: PropTypes.object,
      duration: PropTypes.object,
      origin: PropTypes.object,
      destination: PropTypes.object,
      coords: PropTypes.array
    }),
    onBookPress: PropTypes.func
  }

  render() {
    const { direction } = this.props
    return (
      <FormDetailContainer>
        <WhiteBox>
          <Text color={Color.textDescription}>
            {direction.distance.text}
          </Text>
          <Text color={Color.primary}>
            {getPriceText(this.props.direction.distance)}
          </Text>
        </WhiteBox>
        <Clearfix height={8} />
        <Button onPress={this.props.onBookPress}>Đặt xe</Button>
      </FormDetailContainer>
    )
  }
}
