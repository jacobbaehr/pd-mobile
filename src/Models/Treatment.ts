
export class Treatment {
    name: string;

    identifier: string;

    amount: number;

    constructor(name: string, identifier: string, amount: number) {
        this.name = name;
        this.identifier = identifier;
        this.amount = amount;
    }
}
