import styled from "styled-components/native"

const Text = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : 16)};
  ${props => (props.color ? `color: ${props.color}` : "")}
`

export default Text
