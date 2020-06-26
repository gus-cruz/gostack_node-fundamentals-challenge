/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function reducer(accumulator: number, curentValue: number): number {
      return accumulator + curentValue;
    }

    let income = 0;
    let outcome = 0;
    let total = 0;

    if(this.transactions.find(transaction => transaction.type === 'income')){
      income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce(reducer);
    }

    if(this.transactions.find(transaction => transaction.type === 'outcome')){
      outcome = this.transactions
        .filter(transaction => transaction.type === 'outcome')
        .map(transaction => transaction.value)
        .reduce(reducer);
    }
    
    total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
