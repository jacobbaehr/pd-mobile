import Share from 'react-native-share';

export namespace ExportService {

    export const shareCSVFile = async (message: string, filePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const sharableURL = `file://${filePath}`;
            console.log(sharableURL);
            Share.open({
                title: 'PoolDash Data Export',
                message: message,
                url: sharableURL
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
