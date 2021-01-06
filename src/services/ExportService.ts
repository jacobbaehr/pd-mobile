import Share, { Options, MultipleOptions } from 'react-native-share';
import { Config } from './Config';

export namespace ExportService {

    export const shareCSVFile = async (fileData: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const fileName = `pd-${(new Date()).toISOString()}`;
            const shareOptions: Options | MultipleOptions = {};
            if (Config.isAndroid) {
                const sharableURL = `data:text/comma-separated-values;base64,${fileData}`;
                console.log(sharableURL);
                shareOptions.url = sharableURL;
                shareOptions.type = 'text/csv';
                shareOptions.filename = fileName;
            } else {
                const sharableURL = `data:text/comma-separated-values;base64,${fileData}`;
                console.log(sharableURL);
                shareOptions.activityItemSources = [
                    {
                        placeholderItem: { type: 'text', content: 'pooldash.csv' },
                        item: {
                            default: {
                                type: 'url', content: sharableURL
                            },
                        },
                        dataTypeIdentifier: { default: 'kUTTypeCommaSeparatedText' },
                        subject: { default: `${fileName}.csv` },
                        linkMetadata: {
                            title: 'pooldash export',
                            originalUrl: `${fileName}.csv`
                        }
                    }
                ];
            }

            Share.open(shareOptions)
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
