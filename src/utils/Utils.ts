
//@ts-ignore 
import * as ld_get from 'lodash/get';
//@ts-ignore
import * as ld_set from 'lodash/set';

export class Utils {
    public static INSTANCE: Utils = new Utils();


    public static get(obj: Object | undefined, key: string): any {
        return ld_get(obj, key);
    }

    public static set(obj: Object, key: string, value: any): any {
        return ld_set(obj, key, value);
    }

    public static unique<T>(input?: T[]): T[] | undefined {
        if (!input || input.length === 0) {
            return input;
        }

        return Array.from(new Set(input));
    }

}
