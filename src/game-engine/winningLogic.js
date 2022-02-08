"use strict";
let getHashedValue = require("../helper/getHashedValue");
const winningSum = [41, 71, 109, 75, 71];
const winX = "X has won";
const winO = "O has won";
module.exports = function winningLogic(position, positionsOf_X, positionsOf_O, hashedMap) {
    let hashedValue = getHashedValue(hashedMap, position);
    const xHasWon = checkX(positionsOf_X, hashedValue);
    const oHasWon = checkO(positionsOf_O, hashedValue);
    return xHasWon || oHasWon;
};
function checkX(positionsOf_X, hashedValue) {
    positionsOf_X.push(hashedValue);
    positionsOf_X = positionsOf_X.filter((element) => {
        return element !== undefined;
    });
    const currentSum = positionsOf_X.reduce((previous, current) => previous + current, 0);
    const found = winningSum.find((sum) => sum === currentSum);
    if (found >= 41 && found <= 110)
        return found == currentSum ? winX : false;
}
function checkO(positionsOf_O, hashedValue) {
    positionsOf_O.push(hashedValue);
    positionsOf_O = positionsOf_O.filter((element) => {
        return element !== undefined;
    });
    const currentSum = positionsOf_O.reduce((previous, current) => previous + current, 0);
    const found = winningSum.find((sum) => sum === currentSum);
    if (found >= 41 && found <= 110)
        return found == currentSum ? winO : false;
}
