import { InputView } from "./io/InputView.js";
import { OutputView } from "./io/OutputView.js";
import { LottoService } from "./service/LottoService.js";

class App {
    #svc = new LottoService();

    async run() {
        try {
            const money = await this.#retry(InputView.readMoney);
            const tickets = this.#svc.issueTickets(money);
            OutputView.printIssued(tickets);

            const win = await this.#retry(InputView.readWinNumbers);
            const bonus = await this.#retry(() =>
                InputView.readBonusNumber(win)
            );

            const counts = this.#svc.aggregate(tickets, win, bonus);
            const prize = this.#svc.totalPrize(counts);
            const rate = this.#svc.rate(prize, money);
            OutputView.printStats(counts, rate);
        } catch {}
    }

    async #retry(fn) {
        for (;;) {
            try {
                return await fn();
            } catch (e) {
                OutputView.printError(e);
            }
        }
    }
}

export default App;
