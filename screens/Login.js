import React, { Component, PropTypes } from "react"
import AuthLayout from "../components/layouts/AuthLayout"
import { InputInline, ButtonInline, Clearfix } from "../components/elements"
import styled from "styled-components/native"
import { MapView, Permissions, Location } from "expo"
import { getDirectionData, decodePopyline } from "../api/direction"

const Screen = styled.View`
  flex: 1;
`

export default class Login extends Component {
  state = {
    location: {},
    mapRegion: null,
    coords: [],
    lastLat: null,
    lastLong: null
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      })
    }

    let position = await Location.getCurrentPositionAsync({})
    let region = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    }
    this.setState({ mapRegion: region })
  }

  handleChangeMapRegion(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    })
  }

  async getDirection() {
    const resJson = await getDirectionData()
    if (resJson.routes.length) {
      this.setState({
        coords: decodePopyline(resJson.routes[0].overview_polyline.points) // definition below
      })
    }
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
            coordinates={[...this.state.coords]}
            strokeWidth={4}
          />
        </MapView>
      </Screen>
    )
  }
}
