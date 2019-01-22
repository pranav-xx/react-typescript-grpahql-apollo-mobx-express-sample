import { LoginStore, loginStore } from "./login.store";
import { TradeStore, tradeStore } from "./trade.store";

export class RootStore {
    loginStore: LoginStore = loginStore;
    tradeStore: TradeStore = tradeStore;
}

export const rootStore = new RootStore();