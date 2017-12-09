// A class that represents an individual reading
export class Reading {
    // The user-visible name of the reading
    name: string;
    
    // A unique string used to identify the reading programatically
    identifier: string;
    
    // The value of the reading (null or undefined if reading not taken)
    value?: number

    constructor(name: string, identifier: string, value?: number) {
        this.name = name;
        this.identifier = identifier;
        this.value = value;
    }

    /// Returns the value as a string, or an empty string if the value is undefined
    getValueAsString = (): string => {
        return (this.value === undefined) ? '' : `${this.value}`;
    }
};
