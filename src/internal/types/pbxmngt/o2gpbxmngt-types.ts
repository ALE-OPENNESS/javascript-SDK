/*
* Copyright 2021 ALE International
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this 
* software and associated documentation files (the "Software"), to deal in the Software 
* without restriction, including without limitation the rights to use, copy, modify, merge, 
* publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
* to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or 
* substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


export type O2GAttributeModel = {
    name: string;
    mandatory: boolean;
    typeValue: string;
    multiValue: boolean;
    allowedValues: string[];
    lengthValue: string;
    defaultValue: string;
    filtering: boolean;
    usedWhen: string;
}


export type O2GObjectModel = {
    objectName: string;
    attributes: O2GAttributeModel[];
    objects: O2GObjectModel[];
    hidden: boolean;
    create: boolean;
    delete: boolean;
    set: boolean;
    get: boolean;
    otherActions: string[];
}

export type O2GPbxComplexAttribute = {
    name: string;
    attributes: O2GPbxAttribute[];
}


export type O2GPbxAttribute = {
    name: string;
    value?: string[];
    complexValue?: O2GPbxComplexAttribute[];
}

export type O2GPbxObject = {
    objectName: string;
    objectId: string;
    attributes: O2GPbxAttribute[];
    objectNames: string[];
}

export type O2GPbxList = {
    nodeIds: string[];
}

export type O2GPbxObjectIds = {
    objectIds: string[];
}