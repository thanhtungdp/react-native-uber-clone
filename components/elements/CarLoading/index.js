import React, { Component, PropTypes } from "react"
import styled from "styled-components/native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone
import LottieSource from "./lottie.json"

const CarLoadingContainer = styled.View`
    
`

export default class CarLoading extends Component {
  static propTypes = {}
  componentWillMount() {
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
            width: 400,
            height: 400,
            backgroundColor: "#eee"
          }}
          source={LottieSource}
        />
      </CarLoadingContainer>
    )
  }
}
