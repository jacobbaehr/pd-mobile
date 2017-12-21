/**
 * Represents a swimming pool (duh).
 */
export class Pool{

    // The pool's volume, in gallons.
    volume: number;

    // The pool's user-visible name
    name: string

    constructor(volume:number){
        this.volume = volume;
    };
}
