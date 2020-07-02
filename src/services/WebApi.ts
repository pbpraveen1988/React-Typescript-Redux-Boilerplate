
import 'whatwg-fetch';

export class WebApi {
    private apiHost: string;
    private apiPort: number | undefined;
    private apiPath: string | undefined;


    constructor(host: string | undefined, port: number | undefined, path: string | undefined) {

        if (!Promise) {
            // tslint:disable:no-string-literal
            // tslint:disable:no-require-imports
            window['Promise'] = require('es6-promise');
        }

        if (host) {
            this.apiHost = host;
        } else {
            // tslint:disable-next-line:no-http-string
            //http method for local testing. uncomment http and comment https for testing in local

            this.apiHost = 'https://webapi.' + window.location.hostname;
            //this.apiHost = 'http://webapi.' + window.location.hostname;

        }

        //remove port definition for apis
        //port  for local testing. uncomment port for testing in local

        //this.apiPort = port;
        this.apiPath = path;


    }

    public httpPost(path: string, body?: string | Object): Promise<Object> {
        return this.send('POST', path, body);
    }

    public httpPatch(path: string, body: string | Object): Promise<Object> {
        return this.send('PATCH', path, body);
    }

    public httpGet<T>(path: string): Promise<Object> {
        return this.send('GET', path);
    }

    public httpDelete(path: string): Promise<Object> {
        return this.send('DELETE', path);
    }

    public list<T>(path: string): Promise<any> {
        return this.httpGet(path).then((body) => body);
    }

     

    private getUrl(path: string): string {
        return this.apiHost + (this.apiPort ? ':' + this.apiPort : '') + (this.apiPath ? this.apiPath : '') + path;
    }

    private checkStatus(resp: any): Promise<any> {

        if (resp.status_code && resp.status_code >= 200 && resp.status_code < 300) {
            return new Promise((resolve, reject) => {
                resolve(resp);
            });
        } else {
            //This is to make sure we do not show unnecesary errors
            //while login page is loading.
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(true), 5000);
            });
        }


    }


    private readBody(response: any): any {
        return new Promise((resolve, reject) => {
            response.text().then((body: string) => {
                const apiResp = new Object();
                apiResp.url = response.url;
                apiResp.status_code = response.status;

                if (body) {
                    apiResp.body = JSON.parse(body);
                }

                resolve(apiResp);
            }).catch(reject);
        });
    }


     


    private send(httpMethod: string, path: string, body?: Object): Promise<Object> {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        return fetch(this.getUrl(path), {
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
            headers: myHeaders,
            method: httpMethod,
        })
            .then(this.readBody)
            .then(this.checkStatus)
            .then((apiResp: any) => {
                return new Promise((resolve, reject) => {
                    resolve(apiResp.body);
                });
            });
    }

 
}
