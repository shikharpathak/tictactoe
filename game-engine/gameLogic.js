const getHash = require("./mapper");

function winningLogic(turn, position) {
  const winningSum = [41, 71, 109, 75, 71];

  hash = getHash(position);

  if (turn == "X") {
    positionsOf_X.push(hash);
    const currentSum = positionsOf_X.reduce(
      (previous, current) => previous + current
    );
    const found = winningSum.find((sum) => sum === currentSum);
    return found ? "X has won " : " Continue";
  }

  positionsOf_O.push(hash);
  sum = positionsOf_O.reduce((previous, current) => previous + current);
  const found = winningSum.find((sum) => sum === currentSum);
  return found ? "O has won " : " Continue";
}

module.exports = winningLogic;
