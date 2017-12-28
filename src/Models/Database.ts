import * as Realm from 'realm';

import { Pool } from '../Models/Pool';

export class Database {
    static realm: Realm;

    static prepare = async () => {
        if (Database.realm !== null && Database.realm !== undefined) {
            return Promise.resolve();
        }
        await Realm.open({schema: [Pool]}).then((value: Realm) => {
            Database.realm = value;
            return Promise.resolve();
        }).catch((e: any) => {
            console.log('error openening databse');
            console.error(e);
            return Promise.reject(e);
        });
    }

    static loadPools = (): Realm.Results<Pool> => {
        console.log('loading pools!!!!!!!!!!!!!!!!')
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        return Database.realm.objects<Pool>(Pool);
    }

    static saveNewPool = (pool: Pool) => {
        const realm = Database.realm;
        pool.objectId = getObjectId();
        try {
            realm.write(() => {
                realm.create(Pool.schema.name, {
                    volume: pool.volume,
                    name: pool.name,
                    objectId: pool.objectId
                });
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
        }
        return pool.objectId;
    }
}

const getObjectId = (): string => {
    return Math.random().toString(36).slice(2);
}
