import { MIN, MAX, PICK_COUNT } from "../core/constants.js";
import { ERROR } from "../core/errors.js";

export const isPositiveInt = (s) => /^\d+$/.test(s) && Number(s) > 0;

export const parseIntStrict = (s, errMsg) => {
    if (!/^\d+$/.test(s)) throw new Error(errMsg);
    return Number(s);
};

export const mustMoneyUnit = (n) => {
    if (n % 1000 !== 0) throw new Error(ERROR.MONEY_UNIT);
};

export const mustCount6 = (arr) => {
    if (arr.length !== PICK_COUNT) throw new Error(ERROR.WIN_NUM_COUNT);
};

export const mustRange = (n) => {
    if (n < MIN || n > MAX) throw new Error(ERROR.WIN_NUM_RANGE);
};

export const mustNoDup = (arr, errMsg = ERROR.WIN_NUM_DUP) => {
    const set = new Set(arr);
    if (set.size !== arr.length) throw new Error(errMsg);
};

export const parseWinNumbers = (raw) => {
    const parts = raw.split(",").map((x) => x.trim());
    mustCount6(parts);

    const nums = parts.map((p) => {
        const n = parseIntStrict(p, ERROR.WIN_NUM_FORMAT);
        mustRange(n);
        return n;
    });

    mustNoDup(nums);
    return nums;
};
