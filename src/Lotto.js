class Lotto {
    #numbers;

    constructor(numbers) {
        this.#validate(numbers);
        this.#numbers = numbers;
    }

    #validate(numbers) {
        if (numbers.length !== 6) {
            throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
        }
        if (!Array.isArray(numbers)) {
            throw new Error("[ERROR] 당첨 번호 형식이 올바르지 않습니다.");
        }

        const seen = new Set();
        for (const n of numbers) {
            if (!Number.isInteger(n)) {
                throw new Error(
                    "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."
                );
            }
            if (n < 1 || n > 45) {
                throw new Error(
                    "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다."
                );
            }
            if (seen.has(n)) {
                throw new Error("[ERROR] 당첨 번호에 중복이 있습니다.");
            }
            seen.add(n);
        }
    }

    get numbers() {
        return [...this.#numbers];
    }

    includes(num) {
        return this.#numbers.includes(num);
    }
}

export default Lotto;
