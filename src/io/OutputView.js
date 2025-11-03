import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "../core/constants.js";
import { ERROR } from "../core/errors.js";

const print = (s) => Console.print(s);

export const OutputView = {
    printIssued(tickets) {
        try {
            print(`\n${tickets.length}개를 구매했습니다.`);
            tickets.forEach((t) => print(`[${t.numbers.join(", ")}]`));
        } catch {
            print(ERROR.OUTPUT_ERROR);
        }
    },

    printStats(counts, rate) {
        try {
            print("\n" + OUTPUT.STAT_HEADER);
            print(OUTPUT.STAT_RULE);
            print(`3개 일치 (5,000원) - ${counts[5] ?? 0}개`);
            print(`4개 일치 (50,000원) - ${counts[4] ?? 0}개`);
            print(`5개 일치 (1,500,000원) - ${counts[3] ?? 0}개`);
            print(
                `5개 일치, 보너스 볼 일치 (30,000,000원) - ${counts[2] ?? 0}개`
            );
            print(`6개 일치 (2,000,000,000원) - ${counts[1] ?? 0}개`);
            print(
                `${OUTPUT.RATE_PREFIX}${rate.toFixed(1)}${OUTPUT.RATE_SUFFIX}`
            );
        } catch {
            print(ERROR.OUTPUT_ERROR);
        }
    },

    printError(e) {
        print(e.message);
    },
};
