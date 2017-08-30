import React, { Component, PropTypes } from "react"
import styled from "styled-components/native"
import { SimpleLineIcons } from "@expo/vector-icons"
import Text from "./Text"

const IconWithLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
const IconWrapper = styled.View`
  width: 30;
  align-items: center;
`

const TextWrapper = styled.View`
  flex: 1;
`

export default function IconWithLabel({ icon, iconColor, children, fontSize, color }) {
  return (
    <IconWithLabelContainer>
      <IconWrapper>
        <SimpleLineIcons name={icon} color={iconColor}/>
      </IconWrapper>
      <TextWrapper>
        <Text fontSize={fontSize} color={color}>{children}</Text>
      </TextWrapper>
    </IconWithLabelContainer>
  )
}
IconWithLabel.propTypes = {
  icon: PropTypes.string,
	iconColor: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string
}
