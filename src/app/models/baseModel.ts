import { element } from 'protractor';
import { JsonApiModel } from 'angular2-jsonapi';
import { RequiredDecorator } from './decorators/requiredDecorator';


export abstract class BaseModel extends JsonApiModel {
    public abstract simpleAttributeNames: RequiredDecorator[];
    public abstract hasManyAttributes: RequiredDecorator[];
    public abstract belongsToAttributes: RequiredDecorator[];

    public getAttributeNames(shallow?: boolean): string[] {
        const attributeNames = [];
        for (let index = 0; index < this.simpleAttributeNames.length; index++) {
            const element = this.simpleAttributeNames[index];
            attributeNames.push(element.name);
        }

        if (!shallow) {
            for (let index = 0; index < this.belongsToAttributes.length; index++) {
                const element = this.belongsToAttributes[index];
                attributeNames.push(element.name);
            }
            for (let index = 0; index < this.hasManyAttributes.length; index++) {
                const element = this.hasManyAttributes[index];
                attributeNames.push(element.name);
            }
        }
        return attributeNames;
    }

    public getAttributeNamesForCreation(): string[] {
        const attributeNames = [];
        for (let index = 1; index < this.simpleAttributeNames.length; index++) {
            const element = this.simpleAttributeNames[index];
            attributeNames.push(element.name);
        }
        for (let index = 0; index < this.belongsToAttributes.length; index++) {
            const element = this.belongsToAttributes[index];
            attributeNames.push(element.name);
        }
        return attributeNames;
    }

    public isRequiredAttribute(attributeName: string): boolean {
        let attributes: RequiredDecorator[];
        attributes = [];
        attributes = attributes.concat(this.simpleAttributeNames);
        attributes = attributes.concat(this.belongsToAttributes);

        for (let index = 0; index < attributes.length; index++) {
            const element = attributes[index];
            if (element.required && element.name.includes(attributeName)) {
                return true;
            }
        }
        return false;
    }

    private shouldBeResolved(attributeName: string): boolean {
        switch (attributeName) {
            case '_datastore':
                return false;

            case 'simpleAttributeNames':
                return false;

            case 'hasManyAttributes':
                return false;

            case 'belongsToAttributes':
                return false;

            default:
                return true;
        }
    }

    public resolveAttributeName(sanitizedAttributeName: string): string {
        const objectEntries = Object.entries(this);
        for (let index = 0; index < objectEntries.length; index++) {
            if (this.shouldBeResolved(objectEntries[index][0])) {
                sanitizedAttributeName = sanitizedAttributeName.toLowerCase();
                if (objectEntries[index][0].toString().toLowerCase().includes(sanitizedAttributeName)) {
                    return objectEntries[index][1];
                }
            }
        }
          return '';
    }

    public resolveBelongsToRelationshipAttributeName(attributeName: string): string {
        for (let index = 0; index < this.belongsToAttributes.length; index++) {
            const element = this.belongsToAttributes[index];
            if (element.name.toLowerCase().includes(attributeName.toLowerCase())) {
                if (this[element.name.toLowerCase()]) {
                    return this[element.name.toLowerCase()]['name'];
                }
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
        for (let index = 0; index < this.hasManyAttributes.length; index++) {
            if (this.hasManyAttributes[index].name.toLowerCase().includes(attributeToCheck.toLowerCase())) {
              return true;
            }
        }
        for (let index = 0; index < this.belongsToAttributes.length; index++) {
            if (this.belongsToAttributes[index].name.toLowerCase().includes(attributeToCheck.toLowerCase())) {
              return true;
            }
        }
          return false;
    }

    public isBelongsToRelationship(attributeName: string): boolean {
        for (let index = 0; index < this.belongsToAttributes.length; index++) {
            if (this.belongsToAttributes[index].name.toLowerCase().includes(attributeName.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}
