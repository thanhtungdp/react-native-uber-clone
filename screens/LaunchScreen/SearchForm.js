import React, { Component } from "react"
import PropTypes from "prop-types"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native"
import { InputInline } from "../../components/elements"
import { SimpleLineIcons } from "@expo/vector-icons"

const SearchFormContainer = styled.View`
  position: absolute;
  top: 25;
  left: 10;
  right: 10;
  padding-horizontal: 0;
  padding-vertical: 0;
  background-color: #ffffff;
`

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,.4);
  justify-content: center;
  align-items: center;
`

export default class SearchForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  state = {
    origin: "78 Tran Van Ky",
    destination: "181 Quang Trung Go Vap"
  }

  handleChangeInput(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleSubmit(e) {
    if (e.nativeEvent.key === "Enter") {
      this.props.onSubmit({
        origin: this.state.origin,
        destination: this.state.destination
      })
    }
  }

  render() {
    return (
      <SearchFormContainer>
        <InputInline
          label={<SimpleLineIcons name="home" />}
          labelWidth={30}
          placeholder="Nhập điểm đón"
          value={this.state.origin}
          onChangeText={this.handleChangeInput.bind(this, "origin")}
        />
        <InputInline
          label={<SimpleLineIcons name="location-pin" />}
          labelWidth={30}
          placeholder="Nhập điểm đến"
          value={this.state.destination}
          returnKeyType="go"
          onChangeText={this.handleChangeInput.bind(this, "destination")}
          onKeyPress={this.handleSubmit.bind(this)}
        />
        {this.props.isLoading &&
          <LoadingOverlay>
            <ActivityIndicator />
          </LoadingOverlay>}
      </SearchFormContainer>
    )
  }
}
