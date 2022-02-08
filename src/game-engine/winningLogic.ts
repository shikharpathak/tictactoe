let getHashValue = require("../helper/getHashedValue");
const winningSum = [41, 71, 109, 75, 71];
const winX = "X has won";
const winO = "O has won";

module.exports = function winningLogic(
  position: any,
  positionsOf_X: any,
  positionsOf_O: any,
  hashedMap: any
) {
  let hashedValue = getHashValue(hashedMap, position);

  console.log("here");
  const xHasWon = checkX(positionsOf_X, hashedValue);

  const oHasWon = checkO(positionsOf_O, hashedValue);
  if (xHasWon || oHasWon) return xHasWon || oHasWon;
};

function checkX(positionsOf_X: any[], hashedValue: any) {
  console.log("XXXXXX");
  positionsOf_X.push(hashedValue);

  positionsOf_X = positionsOf_X.filter((element: undefined) => {
    return element !== undefined;
  });

  const currentSum = positionsOf_X.reduce(
    (previous: any, current: any) => previous + current,
    0
  );
  console.log("currentSum", currentSum);
  const found = winningSum.find((sum) => sum === currentSum);

  if (found !== undefined && found >= 41 && found <= 110)
    return found == currentSum ? winX : false;
}

function checkO(positionsOf_O: any[], hashedValue: any) {
  positionsOf_O.push(hashedValue);
  console.log("OOOOO2");
  positionsOf_O = positionsOf_O.filter((element: undefined) => {
    return element !== undefined;
  });

  const currentSum = positionsOf_O.reduce(
    (previous: any, current: any) => previous + current,
    0
  );
  const found = winningSum.find((sum) => sum === currentSum);

  if (found !== undefined && found >= 41 && found <= 110)
    return found == currentSum ? winO : false;
}
