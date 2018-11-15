import * as Realm from 'realm';

import { Pool } from './Pool';
import { Input } from './Recipe/Input';
import { Output } from './Recipe/Output';
import { Recipe } from './Recipe/Recipe';
import { initialData } from '../InitialData';

export class Database {
    static realm: Realm;

    /**
     * Initializes the Realm instance for the app. Also takes the liberty of running version-checks and
     * pre-populating or migrating any necessary data. Maybe that should be de-coupled... meh.
     */
    static prepare = async () => {
        if (Database.realm !== null && Database.realm !== undefined) {
            return Promise.resolve();
        }
        await Realm.open({schema: [Pool, Recipe, Input, Output]}).then((value: Realm) => {
            Database.realm = value;
            // Database.createInitialRecipes();
            return Promise.resolve();
        }).catch((e: any) => {
            console.log('error openening databse');
            console.error(e);
            return Promise.reject(e);
        });
    }

    static loadPools = (): Realm.Results<Pool> => {
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        return Database.realm.objects<Pool>(Pool);
    }

    // TODO: try/catch in case pool doesn't exist.
    static loadPool = (objectId: string): Pool => {
        if (Database.realm === undefined) {
            console.error('loadPool called before realm loaded');
        }
        return Database.realm.objects<Pool>(Pool).filtered('objectId = $0', objectId)[0];
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

    static loadRecipes = (): Realm.Results<Recipe> => {
        if (Database.realm === undefined) {
            console.error('wait on realm to load');
        }
        return Database.realm.objects<Recipe>(Recipe);
    }

    static loadRecipe = (objectId: string): Recipe => {
        if (Database.realm === undefined) {
            console.error('loadRecipe called before realm loaded');
        }
        return Database.realm.objects<Recipe>(Recipe).filtered('objectId = $0', objectId)[0];
    }
    
    static createInitialRecipes = () => {
        const realm = Database.realm;
        initialData.recipes[0].inputs.forEach((input: Input) => {
            input.objectId = getObjectId();
        });
        initialData.recipes[0].outputs.forEach((output: Output) => {
            output.objectId = getObjectId();
        });
        try {
            realm.write(() => {
                realm.create(Recipe.schema.name, initialData.recipes[0]);
            });
        } catch (e) {
            console.log(e);
            //  TODO: use async-storage to check necessary version, support migrations.
            // console.error('Error saving recipes');
        }
    }

    // Very unsafely commits the provided changes to the Realm store. This is the pattern Realm makes us use,
    // it's unfortunately not async.
    static commitUpdates = (updates: () => void) => {
        if (Database.realm === undefined) {
            console.error('commitUpdates called before realm loaded');
        }
        const realm = Database.realm;
        realm.write(() => {
            updates();
        });
    }
}

const getObjectId = (): string => {
    return Math.random().toString(36).slice(2);
}
