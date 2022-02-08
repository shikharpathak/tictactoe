import getHashedValue from "../helper/getHashedValue";

const winningSum = [41, 71, 109, 75, 71];
const winX = "X has won";
const winO = "O has won";

export default function winningLogic(
  turn,
  position,
  positionsOf_X,
  positionsOf_O,
  hashedMap
) {
  let hashedValue = getHashedValue(hashedMap, position);

  const xWon = checkX(positionsOf_X, hashedValue);

  const oWon = checkO(positionsOf_O, hashedValue);

  return xWon || oWon;
}

function checkX(positionsOf_X, hashedValue) {
  positionsOf_X.push(hashedValue);

  positionsOf_X = positionsOf_X.filter((element) => {
    return element !== undefined;
  });

  const currentSum = positionsOf_X.reduce(
    (previous, current) => previous + current,
    0
  );
  const found = winningSum.find((sum) => sum === currentSum);

  if (found >= 41 && found <= 110) return found == currentSum ? winX : false;
}

function checkO(positionsOf_O, hashedValue) {
  positionsOf_O.push(hashedValue);

  positionsOf_O = positionsOf_O.filter((element) => {
    return element !== undefined;
  });

  const currentSum = positionsOf_O.reduce(
    (previous, current) => previous + current,
    0
  );
  const found = winningSum.find((sum) => sum === currentSum);

  if (found >= 41 && found <= 110) return found == currentSum ? winO : false;
}
