import { Random } from "@woowacourse/mission-utils";
import Lotto from "../domain/Lotto.js";
import { MIN, MAX, PICK_COUNT, PRICE, PRIZE } from "../core/constants.js";

const sortAsc = (arr) => [...arr].sort((a, b) => a - b);

export class LottoService {
    issueTickets(money) {
        const count = Math.floor(money / PRICE);
        return Array.from({ length: count }, () => {
            const nums = Random.pickUniqueNumbersInRange(MIN, MAX, PICK_COUNT);
            return new Lotto(sortAsc(nums));
        });
    }

    judgeOne(ticket, winNums, bonus) {
        const set = new Set(winNums);
        const matched = ticket.numbers.filter((n) => set.has(n)).length;

        if (matched === 6) return 1;
        if (matched === 5 && ticket.numbers.includes(bonus)) return 2;
        if (matched === 5) return 3;
        if (matched === 4) return 4;
        if (matched === 3) return 5;
        return 0;
    }

    aggregate(tickets, winNums, bonus) {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        tickets.forEach((t) => {
            const r = this.judgeOne(t, winNums, bonus);
            if (r) counts[r] += 1;
        });
        return counts;
    }

    totalPrize(counts) {
        let sum = 0;
        sum += counts[1] * PRIZE[1];
        sum += counts[2] * PRIZE[2];
        sum += counts[3] * PRIZE[3];
        sum += counts[4] * PRIZE[4];
        sum += counts[5] * PRIZE[5];
        return sum;
    }

    rate(totalPrize, money) {
        return (totalPrize / money) * 100;
    }
}
