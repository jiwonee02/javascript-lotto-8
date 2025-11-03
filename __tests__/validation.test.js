import {
    parseIntStrict,
    mustMoneyUnit,
    mustCount6,
    mustRange,
    mustNoDup,
    parseWinNumbers,
} from "../src/util/validation.js";
import { ERROR } from "../src/core/errors.js";

describe("validation utils", () => {
    test("parseIntStrict: 정수 파싱 성공", () => {
        expect(parseIntStrict("1000", ERROR.MONEY_FORMAT)).toBe(1000);
    });

    test("parseIntStrict: 정수 파싱 실패", () => {
        expect(() => parseIntStrict("1a", ERROR.MONEY_FORMAT)).toThrow();
        expect(() => parseIntStrict("", ERROR.MONEY_FORMAT)).toThrow();
    });

    test("mustMoneyUnit: 1000단위", () => {
        expect(() => mustMoneyUnit(3000)).not.toThrow();
        expect(() => mustMoneyUnit(3500)).toThrow(ERROR.MONEY_UNIT);
    });

    test("mustCount6: 6개만 허용", () => {
        expect(() => mustCount6([1, 2, 3, 4, 5, 6])).not.toThrow();
        expect(() => mustCount6([1, 2, 3])).toThrow(ERROR.WIN_NUM_COUNT);
    });

    test("mustRange: 1~45", () => {
        expect(() => mustRange(1)).not.toThrow();
        expect(() => mustRange(45)).not.toThrow();
        expect(() => mustRange(0)).toThrow(ERROR.WIN_NUM_RANGE);
        expect(() => mustRange(46)).toThrow(ERROR.WIN_NUM_RANGE);
    });

    test("mustNoDup: 중복 허용 안 함", () => {
        expect(() => mustNoDup([1, 2, 3, 4, 5, 6])).not.toThrow();
        expect(() => mustNoDup([1, 1, 2, 3, 4, 5])).toThrow(ERROR.WIN_NUM_DUP);
    });

    test("parseWinNumbers: 쉼표/공백 처리 및 검증", () => {
        expect(parseWinNumbers("1, 2,3,4,5,6")).toEqual([1, 2, 3, 4, 5, 6]);
        expect(() => parseWinNumbers("1,2,3,4,5")).toThrow(ERROR.WIN_NUM_COUNT);
        expect(() => parseWinNumbers("1,2,3,4,5,46")).toThrow(
            ERROR.WIN_NUM_RANGE
        );
        expect(() => parseWinNumbers("1,2,3,4,5,5")).toThrow(ERROR.WIN_NUM_DUP);
    });
});
