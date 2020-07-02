 

// tslint:disable-next-line:export-name
export const GetRecord_Success: string = 'Service_GetRecord_Success';
export const getRecordSuccess = (object: string, record: Object) => {
    return {
        type: GetRecord_Success,
        object,
        record,
    };
};

export const ChangeDataview: string = 'Service_ChangeDataview';
export const changeDataview = (object: string, dataviewId: string) => {
    return {
        type: ChangeDataview,
        object,
        dataviewId,
    };
};

export const GetNewRecord_Success: string = 'Service_GetNewRecord_Success';
export const getNewRecordSuccess = (object: string, record: Object) => {
    return {
        type: GetNewRecord_Success,
        object,
        record,
    };
};

export const AppendToList: string = 'Service_AppendToList';
export const appendToList = (listType: string, listKey: string, listItemId: string) => {
    return {
        type: AppendToList,
        listType,
        listKey,
        listItemId,
    };
};

export const GetRecords_Success: string = 'Service_GetRecord_Success';
export const getRecordsSuccess = (object: string, records: Object[]) => {
    return {
        type: GetRecords_Success,
        object,
        records,
    };
};

export const GetList_Success: string = 'Service_GetList_Success';
export const getListSuccess = <T>(listCategory: string, listType: string, listKey: string, listObject: string, listResponse: any) => {
    return {
        type: GetList_Success,
        listType,
        listKey,
        listObject,
        listResponse,
    };
};
 
 
 
 

 

export const DeleteRecord: string = 'Service_DeleteRecord';
export const deleteRecord = (object: string, recordId: string) => {
    return {
        type: DeleteRecord,
        object,
        recordId,
    };
};

 

