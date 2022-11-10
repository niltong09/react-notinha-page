export function formatNumber(val, decimalPlaces = 0, showZero = false) {
  if (!val) {
    return showZero ? (0).toFixed(decimalPlaces).replace(".", ",") : "";
  }
  return val.toFixed(decimalPlaces).replace(".", ",");
}
