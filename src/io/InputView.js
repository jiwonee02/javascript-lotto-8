import { Console } from "@woowacourse/mission-utils";
import { ERROR } from "../core/errors.js";
import {
    parseIntStrict,
    mustMoneyUnit,
    parseWinNumbers,
    mustRange,
} from "../util/validation.js";

const ask = (q) => Console.readLineAsync(q);

export const InputView = {
    async readMoney() {
        const s = await ask("구입금액을 입력해 주세요.\n");
        const n = parseIntStrict(s, ERROR.MONEY_FORMAT);
        mustMoneyUnit(n);
        return n;
    },

    async readWinNumbers() {
        const s = await ask("\n당첨 번호를 입력해 주세요.\n");
        return parseWinNumbers(s);
    },

    async readBonusNumber(winNums) {
        const s = await ask("\n보너스 번호를 입력해 주세요.\n");
        const n = parseIntStrict(s, ERROR.BONUS_FORMAT);
        mustRange(n);
        if (winNums.includes(n)) {
            throw new Error(ERROR.BONUS_DUP);
        }
        return n;
    },
};
