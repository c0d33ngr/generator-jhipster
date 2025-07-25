/**
 * Copyright 2013-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { before, describe, it } from 'esmocha';
import { expect } from 'chai';
import { relationshipTypes } from '../basic-types/index.js';
import { unaryOptions } from '../built-in-options/index.js';
import fieldTypes from '../../../jhipster/field-types.js';
import JDLObject from '../models/jdl-object.js';
import { JDLEntity, JDLEnum } from '../models/index.js';
import JDLField from '../models/jdl-field.js';
import JDLRelationship from '../models/jdl-relationship.js';
import JDLUnaryOption from '../models/jdl-unary-option.js';
import mergeJDLObjects from '../models/jdl-object-merger.js';
import { createJDLApplication } from '../__test-support__/index.js';
import { APPLICATION_TYPE_MONOLITH } from '../../../core/application-types.js';
import { createRuntime } from '../runtime.js';

const runtime = createRuntime();

describe('jdl - JDLObjectMerger', () => {
  describe('mergeJDLObjects', () => {
    describe('when not passing the first object', () => {
      it('should fail', () => {
        expect(() => mergeJDLObjects(undefined, {})).to.throw(/^Can't merge nil JDL objects\.$/);
      });
    });
    describe('when not passing the second object', () => {
      it('should fail', () => {
        expect(() => mergeJDLObjects({}, undefined)).to.throw(/^Can't merge nil JDL objects\.$/);
      });
    });
    describe('when passing two jdl objects', () => {
      let merged;
      let firstJDLObject;
      let secondJDLObject;
      let originalFirstJDLObjectToString;
      let originalSecondJDLObjectToString;
      let firstJDLObjectAfterMergeToString;
      let secondJDLObjectAfterMergeToString;

      before(() => {
        firstJDLObject = createFirstJDLObjectForTheMergeTest();
        secondJDLObject = createSecondJDLObjectForTheMergeTest();
        originalFirstJDLObjectToString = firstJDLObject.toString();
        originalSecondJDLObjectToString = secondJDLObject.toString();
        merged = mergeJDLObjects(firstJDLObject, secondJDLObject);
        firstJDLObjectAfterMergeToString = firstJDLObject.toString();
        secondJDLObjectAfterMergeToString = secondJDLObject.toString();
      });

      it('should not modify the first JDL object', () => {
        expect(originalFirstJDLObjectToString).to.equal(firstJDLObjectAfterMergeToString);
      });
      it('should not modify the second JDL object', () => {
        expect(originalSecondJDLObjectToString).to.equal(secondJDLObjectAfterMergeToString);
      });
      it('should merge the applications', () => {
        expect(merged.getApplicationQuantity()).to.equal(2);
      });
      it('should merge the entities', () => {
        expect(merged.getEntityQuantity()).to.equal(3);
      });
      it('should merge the enums', () => {
        expect(merged.getEnumQuantity()).to.equal(2);
      });
      it('should merge the relationships', () => {
        expect(merged.getRelationshipQuantity()).to.equal(2);
      });
      it('should merge the options', () => {
        expect(merged.getOptionQuantity()).to.equal(2);
      });
    });
  });
});

function createFirstJDLObjectForTheMergeTest() {
  const jdlObject = new JDLObject();
  const application = createJDLApplication(
    {
      applicationType: APPLICATION_TYPE_MONOLITH,
      baseName: 'anApp',
      databaseType: 'sql',
    },
    runtime,
  );
  const entityA = new JDLEntity({
    name: 'A',
  });
  const entityB = new JDLEntity({
    name: 'B',
  });
  const fieldForA = new JDLField({
    name: 'aa',
    type: fieldTypes.CommonDBTypes.STRING,
  });
  const relationship = new JDLRelationship({
    from: entityA.name,
    to: entityB.name,
    type: relationshipTypes.ONE_TO_ONE,
    injectedFieldInFrom: 'b',
  });
  const enumeration = new JDLEnum({
    name: 'AEnum',
    values: [{ key: 'AAA' }, { key: 'BBB' }],
  });
  const option = new JDLUnaryOption({
    name: unaryOptions.FILTER,
    entityNames: [entityA.name, entityB.name],
  });
  entityA.addField(fieldForA);
  jdlObject.addApplication(application);
  jdlObject.addEntity(entityA);
  jdlObject.addEntity(entityB);
  jdlObject.addRelationship(relationship);
  jdlObject.addEnum(enumeration);
  jdlObject.addOption(option);
  return jdlObject;
}

function createSecondJDLObjectForTheMergeTest() {
  const jdlObject = new JDLObject();
  const application = createJDLApplication(
    {
      applicationType: APPLICATION_TYPE_MONOLITH,
      baseName: 'anotherApp',
      databaseType: 'sql',
    },
    runtime,
  );
  const entityC = new JDLEntity({
    name: 'C',
  });
  const fieldForC = new JDLField({
    name: 'cc',
    type: fieldTypes.CommonDBTypes.STRING,
  });
  const relationship = new JDLRelationship({
    from: entityC.name,
    to: entityC.name,
    type: relationshipTypes.MANY_TO_ONE,
    injectedFieldInFrom: 'c2',
  });
  const enumeration = new JDLEnum({
    name: 'BEnum',
    values: [{ key: 'CCC' }],
  });
  const option = new JDLUnaryOption({
    name: unaryOptions.NO_FLUENT_METHOD,
    entityNames: [entityC.name],
  });
  entityC.addField(fieldForC);
  jdlObject.addApplication(application);
  jdlObject.addEntity(entityC);
  jdlObject.addRelationship(relationship);
  jdlObject.addEnum(enumeration);
  jdlObject.addOption(option);
  return jdlObject;
}
