import { Form } from "./form.store";
import { observable, ObservableMap, action, computed } from "mobx";
import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { httpLink } from "../../config";
import { Trade } from "../domain/trade";

const tradesQuery = gql`{
    trades {
        id,
        date,
        commodity{
          id
        },
        side,
        quantity,
        price,
        counterParty{
          id,
          firstName,
          lastName
        },
        location{
          id,
          name
        },
        status
    }
}`;
const deletTradeMutation = gql`
    mutation DeleteTrade($id: ID!) {
        deleteTrade(id: $id)
    }
`;
export class TradeStore {
    @observable trades = new ObservableMap();
    constructor() {
        this.getTrades();
    }
    @action getTrades() {
        return makePromise(execute(httpLink, {query: tradesQuery}))
            .then((result: any) => {
                if (result.data.trades) {
                    result.data.trades.map((trade: any) => {
                        this.trades.set(trade.id, new Trade(
                            trade.id,
                            trade.side,
                            trade.status,
                            trade.price,
                            trade.quantity,
                            trade.counterParty.id,
                            `${trade.counterParty.firstName} ${trade.counterParty.lastName}`,
                            trade.commodity.id,
                            trade.location.id,
                            trade.date
                        ))
                    })
                }
            })
            .catch((error: any) => {})
    }
    @computed get tradesRowData(): Array<Trade> {
        return Array.from(this.trades.values());
    }
    @action deleteTrade(id: string) {
        return makePromise(execute(httpLink, {query: deletTradeMutation, variables: {id}}))
            .then()
    }
}

export const tradeStore = new TradeStore();
