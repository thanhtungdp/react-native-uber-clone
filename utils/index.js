import numeral from "numeral"
import { PRICE_PER_KM } from "../config"

export function getPriceText(distance) {
  const price = PRICE_PER_KM * (distance.value / 1000)
  return numeral(price).format("0a") + " VND"
}
