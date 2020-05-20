import { useEffect, useState } from "react"
import Realm from 'realm';
import { Pool } from "~/models/Pool";
import { Database } from "~/repository/Database";


export const useRealmPoolsHook = (): Realm.Collection<Pool> => {
    const [data, setData] = useState({
        data: Database.loadPools(),
        a: Date.now()
    });

    // This runs around the time when ComponentDidMount used to be called
    useEffect(() => {
        const handleChange = (newData: Realm.Collection<Pool>) => {
            setData({
                data: newData,
                // The date is here to trigger a rerender on each change (the list is shallow-compared)
                a: Date.now()
            });
        }
        const dataQuery = Database.loadPools();
        dataQuery.addListener(handleChange)

        // This will run sort-of like componentWillUnmount or whatever that lifecycle method was called
        return () => {
            dataQuery.removeAllListeners()
        }
    }, []);

    return data.data;           // this hook will return only the data from realm
}