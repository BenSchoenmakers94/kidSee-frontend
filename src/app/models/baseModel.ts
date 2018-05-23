import { JsonApiModel } from 'angular2-jsonapi';


export abstract class BaseModel extends JsonApiModel {
    public abstract simpleAttributeNames: string[];
    public abstract relationShipAttributes: string[];

    public getAttributeNames(shallow?: boolean): string[] {
        let attributeNames = [];
        attributeNames = attributeNames.concat(this.simpleAttributeNames);
        if (!shallow) {
          attributeNames = attributeNames.concat(this.relationShipAttributes);
        }
        return attributeNames;
      }

    public resolveAttributeName(sanitizedAttributeName: string): string {
        const objectEntries = Object.entries(this);
        for (let index = 1; index < objectEntries.length; index++) {
            sanitizedAttributeName = sanitizedAttributeName.toLowerCase();
            if (objectEntries[index][0].includes(sanitizedAttributeName)) {
                return objectEntries[index][1];
            }
        }
          return 'No value';
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
        for (let index = 0; index < this.relationShipAttributes.length; index++) {
            if (this.relationShipAttributes[index].toLowerCase().includes(attributeToCheck.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
}
