//@ts-ignore
import { Utils } from '../utils';

const category_records: string = 'records';
const multiple_category_record_ids: string = 'mcr_ids';
const category_key2id: string = 'key2id_mappings';
const category_lists: string = 'lists';
 

// tslint:disable:no-stateless-class
// tslint:disable:no-unnecessary-local-variable
// tslint:disable:no-string-literal
export class StoreUtils {

    public static deleteRecord(state: any, object: string, recordId: string) {
        let newState = state;

        const recordList: any = this.getRecords(newState, object) as Object;
        if (!recordList) {
            return;
        }
        const updatedList: Object = {};
        Object.keys(recordList).forEach((record: any) => {
            const obj: any = recordList[record] as any;
            if (record !== recordId) {
                Object.assign(updatedList, { [record as string]: obj });
                newState = this.setNewRecord(newState, object, obj);
            }
        });

        //FIX_ME : Store needs to be updated - remove deleted record from category_records
        //newState = this.setRecord(newState, object, updatedList);

        //Delete record we need to make sure it is cleaned in various places.
        //1. Delete the record from category_records


        return newState;
    }





    public static getRecord(state: any, object: string, idOrKey: string): any | undefined {
        let record = this.getValue(state, category_records, object, idOrKey) as any;
        if (!record) {
            const idByKey = this.getValue(state, category_key2id, object, idOrKey) as string;
            if (idByKey) {
                record = this.getValue(state, category_records, object, idByKey) as any;
            }
        }

        return record;
    }

    public static getNewRecord(state: any, object: string): any | undefined {
        const record = this.getValue(state, category_records, object, 'new') as any;
        return record;
    }

    public static setRecord(state: any, object: string, value: any): any {
        const recordId = value.id;
        const recordKey = value.key;

        let newState = this.setValue(state, category_records, object, recordId, value);

        if (recordKey) {
            newState = this.setValue(newState, category_key2id, object, recordKey, recordId);
        }

        return newState;
    }


    public static setNewRecord(state: any, object: string, value: any): any {
        const newState = this.setValue(state, category_records, object, 'new', value);
        return newState;
    }


    public static getRecords(state: any, object: string): Object | undefined {
        return this.getValue(state, category_records, object, null);
    }

    public static getList(state: any, listType: string, listKey: string): any | undefined {
        return this.getValue(state, category_lists, listType, listKey) as any;
    }

    public static setList(state: any, listType: string, listKey: string, value: any): any {
        return this.setValue(state, category_lists, listType, listKey, value);
    }
    public static setLocalStorage(objectKey: string, storeObj: any) {
        let storeKey = multiple_category_record_ids;
        if (objectKey) {
            storeKey = storeKey + ':' + objectKey;
        }
        localStorage.setItem(storeKey, JSON.stringify(storeObj));
    }

    public static getLocalStorage(objectKey: string): string {
        let storeKey = multiple_category_record_ids;
        if (objectKey) {
            storeKey = storeKey + ':' + objectKey;
        }
        return localStorage.getItem(storeKey) || '';
    }

    public static removeLocalStorage(objectKey: string) {
        let storeKey = multiple_category_record_ids;
        if (objectKey) {
            storeKey = storeKey + ':' + objectKey;
        }
        localStorage.removeItem(storeKey);
    }

    public static clearLocalStogareByKey(key: string) {
        Object.entries(localStorage)
            .map(x => x[0])
            .filter(x => x.substring(0, key.length) == key)
            .map(x => localStorage.removeItem(x));
    }

    public static clearLocalStogare() {
        localStorage.clear();
    }

    private static getValue(state: any, category: string, nodeType: string | undefined | null, key: string | undefined | null): Object | undefined {
        return Utils.get(state, this.getValueKey(category, nodeType, key));
    }

    public static updateValue(state: any, category: string, nodeType: string, key: string, value: Object | undefined): any {
        return this.setValue(state, category, nodeType, key, Object.assign({}, this.getValue(state, category, nodeType, key), value));
    }

    private static setValue(state: any, category: string, nodeType: string | undefined | null, key: string | undefined | null, value: Object | undefined): any {
        const oldParentObject = this.getValue(state, category, nodeType, null);
        let newParentObject;
        if (key == "") {
            newParentObject = Object.assign({}, oldParentObject, value);
        } else {
            newParentObject = Object.assign({}, oldParentObject, { [key as string]: value });
        }
        const categoryNodeKey = this.getValueKey(category, nodeType, null);
        const newState = Object.assign({}, state, { [categoryNodeKey]: oldParentObject }, { [categoryNodeKey]: newParentObject });
        return newState;
    }

    private static getValueKey(category: string, nodeType: string | undefined | null, key: string | undefined | null) {
        let storeKey = category;
        if (nodeType) {
            storeKey = storeKey + ':' + nodeType;
        }
        if (key) {
            storeKey = storeKey + '.' + key;
        }
        //return category + ':' + nodeType + (Utils.isNotBlank(key) ? '.' + key : '');
        return storeKey;
    }

}
