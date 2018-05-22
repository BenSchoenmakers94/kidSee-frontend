import { JsonApiModel } from 'angular2-jsonapi';
import _ = require('lodash');


export abstract class BaseModel extends JsonApiModel {
    public getAttributeNames(): string[] {
        const unsanitizedAttributeNames = Object.getOwnPropertyNames(this);
        const sanitizedAttributeNames: string[] = [];
        unsanitizedAttributeNames.forEach(unsanitizedAttributeName => {
            if (!unsanitizedAttributeName.includes('datastore')) {
                let sanitizedAttributeName = '';
                sanitizedAttributeName = unsanitizedAttributeName.substr(unsanitizedAttributeName.indexOf('_') + 1);
                sanitizedAttributeName = _.upperFirst(sanitizedAttributeName);
                sanitizedAttributeNames.push(sanitizedAttributeName);
              }
        });
        return sanitizedAttributeNames;
    }

    public resolveAttributeName(sanitizedAttributeName: string): string {
        const objectEntries = Object.entries(this);
        for (let index = 1; index < objectEntries.length; index++) {
            sanitizedAttributeName = sanitizedAttributeName.toLowerCase();
            if (objectEntries[index][0].includes(sanitizedAttributeName)) {
                return objectEntries[index][1];
            }
        }
          return '';
    }

    public hasValue(valueToCheck: string): boolean {
        const objectValues = Object.values(this);
        for (let index = 1; index < objectValues.length; index++) {
            if (objectValues[index] instanceof BaseModel) {
                continue;
            } else {
                if (objectValues[index].toString().toLowerCase().includes(valueToCheck)) {
                    return true;
                }
            }
        }
        return false;
    }
}
