
import { ApiService } from './ApiService';
import { StoreService } from './StoreService';
class Builder<T> {
    private instance: T;

    public build(creator: () => T) {
        if (!this.instance) {
            this.instance = creator();
        }

        return this.instance;
    }
}

// tslint:disable:typedef
export class ServiceFactory {
    private _metadata = new Builder<ApiService>();
    get metadata(): ApiService {
        return this._metadata.build(() => new ApiService());
    }

    private _store = new Builder<StoreService>();
    get store(): StoreService {
        return this._store.build(() => new StoreService());
    }


}

export const Sf: ServiceFactory = new ServiceFactory();

