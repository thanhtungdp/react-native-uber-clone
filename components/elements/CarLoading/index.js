import React, { Component, PropTypes } from "react"
import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone
import LottieSource from "./lottie.json"

const CarLoadingContainer = styled.View`
  padding-horizontal: 8
`

const { width } = Dimensions.get("window")

export default class CarLoading extends Component {
  static propTypes = {}
  componentDidMount() {
    this.animation.reset()
    this.animation.play()
  }

  render() {
    return (
      <CarLoadingContainer>
        <Lottie
          ref={animation => {
            this.animation = animation
          }}
          style={{
            width: width - 16,
            height: 180,
            backgroundColor: "#fafbfb"
          }}
          source={LottieSource}
        />
      </CarLoadingContainer>
    )
  }
}
