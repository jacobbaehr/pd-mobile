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
            console.log('got it!~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
        console.log('saving!!!');
        console.log(pool.poolVolume);
        const newPool = new Pool(pool.poolVolume, pool.poolName, getObjectId());
        const poolMap = {
            poolVolume: newPool.poolVolume,
            poolName: newPool.poolName,
            objectId: newPool.id
        }
        try {
            realm.write(() => {
                realm.create(Pool.schema.name, poolMap);
            });
        } catch (e) {
            console.log(e);
            console.error('couldnt save it');
        }
        return pool.id;
    }
}

const getObjectId = (): string => {
    return Math.random().toString(36).slice(2);
}
