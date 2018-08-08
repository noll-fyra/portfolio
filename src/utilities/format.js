export const sortAlphabetically = (first, second) => {
  switch (true) {
    case first > second:
      return 1
    case first < second:
      return -1
    default:
      return -1
  }
}
