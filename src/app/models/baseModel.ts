import { JsonApiModel } from 'angular2-jsonapi';
import _ = require('lodash');


export abstract class BaseModel extends JsonApiModel {
    public getAttributeNames(shallow?: boolean): string[] {
        const objectEntries = Object.entries(this);
        const sanitizedAttributeNames: string[] = [];
        for (let index = 1; index < objectEntries.length; index++) {
            if ((objectEntries[index][1] instanceof BaseModel) && shallow) {
               continue;
            }
            let sanitizedAttributeName = '';
            sanitizedAttributeName = objectEntries[index][0].substr(objectEntries[index][0].indexOf('_') + 1);
            sanitizedAttributeName = _.upperFirst(sanitizedAttributeName);
            sanitizedAttributeNames.push(sanitizedAttributeName);
        }
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

    public isRelationShipAttribute(attributeToCheck: string): boolean {
        const objectEntries = Object.entries(this);
        for (let index = 1; index < objectEntries.length; index++) {
            if (objectEntries[index][1] instanceof BaseModel) {
                if (objectEntries[index][0].toLowerCase().includes(attributeToCheck.toLowerCase())) {
                    return true;
                }
            } else {
                continue;
            }
        }
        return false;
    }
}
