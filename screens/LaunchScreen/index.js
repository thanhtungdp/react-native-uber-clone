import React, { Component, PropTypes } from "react"
import { getDirectionData, decodePopyline } from "../../api/direction"
import styled from "styled-components/native"
import { MapView, Permissions, Location } from "expo"

import SearchForm from "./SearchForm"
import DetaillForm from "./DetaillForm"

const Screen = styled.View`
  flex: 1;
`

export default class Login extends Component {
  state = {
    location: {},
    isLoading: false,
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    haveDirection: false,
    direction: {
      distance: null,
      duration: null,
      origin: null,
      destination: null,
      coords: []
    }
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  async getLocationAsync() {

  }

  handleChangeMapRegion(region, lastLat, lastLong) {

  }

  async getDirection({ origin, destination }) {
    this.setState({ isLoading: true })

  }

  handleBookPress() {
    this.props.navigation.navigate("BookScreen", {
      //direction: this.state.direction
    })
  }

  render() {
    return (
      <Screen>
        <MapView
          style={{ flex: 1 }}
          region={this.state.mapRegion}
          showsUserLocation
          onRegionChange={this.handleChangeMapRegion.bind(this)}
        >
          <MapView.Polyline
            coordinates={this.state.direction.coords}
            strokeWidth={4}
          />
        </MapView>
        <SearchForm
          isLoading={this.state.isLoading}
          onSubmit={this.getDirection.bind(this)}
        />
        {this.state.haveDirection &&
          <DetaillForm
            onBookPress={this.handleBookPress.bind(this)}
            direction={this.state.direction}
          />}
      </Screen>
    )
  }
}
