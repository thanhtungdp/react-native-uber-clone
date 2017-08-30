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

  async getDirection({ origin, destination }) {
    this.setState({ isLoading: true })
    const resJson = await getDirectionData({ origin, destination })
    if (resJson.routes.length) {
      let routeFirst = resJson.routes[0]
      let leg = routeFirst.legs[0]
      let direction = {
        coords: decodePopyline(routeFirst.overview_polyline.points),
        origin: {
          text: leg.start_address,
          latitudeDelta: leg.start_location.lat,
          longitudeDelta: leg.start_location.lng
        },
        destination: {
          text: leg.end_address,
          latitudeDelta: leg.end_location.lat,
          longitudeDelta: leg.end_location.lng
        },
        distance: leg.distance,
        duration: leg.duration
      }
      this.setState({ direction, haveDirection: true, isLoading: false })
    } else {
      alert("Địa điểm không được tìm thấy vui lòng thử lại")
      this.setState({
        haveDirection: false,
        isLoading: false
      })
    }
  }

  handleBookPress() {
    this.props.navigation.navigate("BookScreen", {
      direction: this.state.direction
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
