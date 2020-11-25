import Share from 'react-native-share';
import { Util } from './Util';

export namespace ExportService {

    export const shareCSVFile = async (message: string, fileData: string): Promise<void> => {
        return new Promise((resolve, reject) => {

            const sharableURL = `data:text/comma-separated-values;base64,${fileData}`;
            const fileName = (new Date()).toISOString();
            console.log(sharableURL);
            Share.open({
                title: 'PoolDash Data Export',
                message: message,
                url: sharableURL,
                filename: fileName,
                type: 'csv'
            })
                .then((res) => {
                    console.log(res);
                    resolve();
                })
                .catch((err) => {
                    err && console.log(err);
                    reject(err);
                });
        });
    }
}
