import { Injectable } from '@angular/core';
import { Trade } from './trade';

//Imports to cater to API
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class TradeService {

    private baseUrl: string = 'http://localhost:8080';

    constructor(private http: Http) {
    }

    getAll(): Observable<Trade[]> {
        let trad$ = this.http
            .get(`${this.baseUrl}/v1/trade/`)
            .map(mapTrades);
        return trad$;
    }

    get(tradeId: string): Observable<Trade> {
        let trad$ = this.http
            .get(`${this.baseUrl}/v1/trade/${tradeId}`)
            .map(mapTrade);
        return trad$;

    }

    save(trade: Trade): Observable<Response> {
        return this
            .http
            .put(`${this.baseUrl}/v1/trade/${trade.tradeId}`,
            JSON.stringify(trade));
    }
}

function mapTrades(response: Response): Trade[] {
    return response.json().map(toTrade);
}

function mapTrade(response: Response): Trade {
    return toTrade(response.json());
}

function toTrade(tr: any): Trade {
    let trade = <Trade>({
        tradeId: tr.tradeId,
        url: tr.url,
        tradeName: tr.tradeName,
        quantity: Number.parseInt(tr),
    });
    console.log('Parsed trade:', trade);
    return trade;
}
