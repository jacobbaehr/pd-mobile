import { IPool } from '~/models/Pool';
import { WaterTypeValue } from '~/models/Pool/WaterType';
import { Database } from '~/repository/Database';
import { RealmUtil } from '../RealmUtil';
import { Util } from '../Util';

export namespace PoolDoctorImportService {
    export const mapPoolDoctorPoolToPoolDashPool = (doctorPool: PoolDoctorPool): IPool => {
        const gallons = doctorPool.isGallons
            ? doctorPool.volume
            : doctorPool.volume * 0.264172;

        let waterType: WaterTypeValue = 'chlorine';
        if (doctorPool.type === 1) {
            waterType = 'salt_water';
        } else if (doctorPool.type === 2) {
            waterType = 'bromine';
        }

        return {
            objectId: Util.generateUUID(),
            name: doctorPool.name,
            gallons,
            wallType: 'plaster',
            waterType,
            poolDoctorId: doctorPool.modified_at,       // We actually didn't use an id at all, I'm thankful this is here.
        };
    };

    export const createOrOverwriteImportedPool = async (p: IPool): Promise<'created' | 'updated' | 'error'> => {
        if (!p.poolDoctorId) {
            console.warn('Tried to save non-imported pool -- this method is only intended for Pool Doctor pools');
            return 'error';
        }
        const matchingPools = await Database.loadPools(`poolDoctorId = "${p.poolDoctorId}"`);
        const existingPool = Util.firstOrNull(RealmUtil.poolsToPojo(matchingPools));
        if (existingPool) {
            Database.updatePool(p);
            return 'updated';
        } else {
            Database.saveNewPool(p);
            return 'created';
        }
    };
}

export interface PoolDoctorPool {
    // format is tbd
    modified_at: string,
    name: string;
    // The volume might be gallons or liters (yikes)
    volume: number;
    isGallons: boolean;
    // 0 == chlorine, 1 == salt, 2 == bromine?
    type: number;
}
