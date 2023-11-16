/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
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
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'esmocha';
import lodash from 'lodash';

import Generator from './index.mjs';
import { defaultHelpers as helpers, result as runResult } from '../../test/support/index.mjs';
import { fieldTypes } from '../../jdl/jhipster/index.mjs';
import { shouldSupportFeatures } from '../../test/support/tests.mjs';

const {
  CommonDBTypes: { UUID },
} = fieldTypes;

const { snakeCase } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatorPath = join(__dirname, 'index.mts');
const generator = basename(__dirname);

const expectedField = () => ({
  generateFakeData: expect.any(Function),
  createRandexp: expect.any(Function),

  entity: expect.any(Object),
  reference: expect.any(Object),
});

const expectedRelationship = () => ({
  otherEntity: expect.any(Object),
});

const expectedPrimaryKeyId = () => ({
  field: expect.any(Object),
});

const expectedPrimaryKey = primaryKey => ({
  ownFields: expect.any(Array),
  fields: expect.any(Array),
  derivedFields: expect.any(Array),
  ids: primaryKey.ids.map(expectedPrimaryKeyId),
});

const expectedEntity = entity => ({
  faker: expect.any(Object),
  generateFakeData: expect.any(Function),
  resetFakerSeed: expect.any(Function),

  allReferences: expect.any(Array),
  otherEntities: expect.any(Array),
  regularEagerRelations: expect.any(Array),
  reactiveEagerRelations: expect.any(Array),
  reactiveRegularEagerRelations: expect.any(Array),

  dtoReferences: expect.any(Array),
  otherReferences: expect.any(Array),
  otherDtoReferences: expect.any(Array),

  fields: entity.fields.map(expectedField),
  relationships: entity.relationships.map(expectedRelationship),
  primaryKey: expectedPrimaryKey(entity.primaryKey),
  reactiveOtherEntities: expect.any(Set),
  reactiveUniqueEntityTypes: expect.any(Set),
});

describe(`generator - ${generator}`, () => {
  it('generator-list constant matches folder name', async () => {
    await expect((await import('../generator-list.mjs'))[`GENERATOR_${snakeCase(generator).toUpperCase()}`]).toBe(generator);
  });
  shouldSupportFeatures(Generator);

  describe('with', () => {
    describe('default config', () => {
      before(async () => {
        await helpers.run(generatorPath).withJHipsterConfig({}, [
          {
            name: 'EntityA',
            changelogDate: '20220129025419',
            fields: [
              {
                fieldName: 'id',
                fieldType: UUID,
              },
            ],
          },
          {
            name: 'User',
            changelogDate: '20220129025420',
            fields: [
              {
                fieldName: 'id',
                fieldType: UUID,
              },
            ],
          },
        ]);
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
{
  ".jhipster/EntityA.json": {
    "contents": "{
  "annotations": {
    "changelogDate": "20220129025419"
  },
  "changelogDate": "20220129025419",
  "fields": [
    {
      "fieldName": "id",
      "fieldType": "UUID"
    }
  ],
  "name": "EntityA",
  "relationships": []
}
",
    "stateCleared": "modified",
  },
  ".jhipster/User.json": {
    "contents": "{
  "annotations": {
    "changelogDate": "20220129025420"
  },
  "changelogDate": "20220129025420",
  "fields": [
    {
      "fieldName": "id",
      "fieldType": "UUID"
    }
  ],
  "name": "User",
  "relationships": []
}
",
    "stateCleared": "modified",
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
[
  "User",
  "EntityA",
]
`);
      });
      it('should prepare User', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().User;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
{
  "adminUserDto": "AdminUserDTO",
  "allReferences": Any<Array>,
  "annotations": {
    "changelogDate": "20220129025420",
  },
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": true,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "builtIn": true,
  "builtInUser": true,
  "changelogDate": "20220129025420",
  "changelogDateForRecent": 2022-01-29T02:54:20.000Z,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": true,
  "dtoClass": "UserDTO",
  "dtoInstance": "userDTO",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.User",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "User",
  "entityAngularNamePlural": "Users",
  "entityApi": "",
  "entityApiDescription": undefined,
  "entityApiUrl": "users",
  "entityClass": "User",
  "entityClassHumanized": "User",
  "entityClassPlural": "Users",
  "entityClassPluralHumanized": "Users",
  "entityContainsCollectionField": false,
  "entityFileName": "user",
  "entityFolderName": "user",
  "entityI18nVariant": "default",
  "entityInstance": "user",
  "entityInstanceDbSafe": "jhiUser",
  "entityInstancePlural": "users",
  "entityJavaPackageFolder": "",
  "entityJavadoc": undefined,
  "entityModelFileName": "user",
  "entityNameCapitalized": "User",
  "entityNamePlural": "Users",
  "entityNamePluralizedAndSpinalCased": "users",
  "entityPackage": undefined,
  "entityPage": "user",
  "entityParentPathAddition": "",
  "entityPluralFileName": "usersundefined",
  "entityReactName": "User",
  "entityServiceFileName": "user",
  "entityStateName": "user",
  "entitySuffix": "",
  "entityTableName": "jhi_user",
  "entityTranslationKey": "user",
  "entityTranslationKeyMenu": "user",
  "entityUrl": "user",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "ID",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "global.field.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesMaxlength": undefined,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "javaValueGenerator": "UUID.randomUUID()",
      "javaValueSample1": "UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")",
      "javaValueSample2": "UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")",
      "jpaGeneratedValue": true,
      "jpaGeneratedValueIdentity": false,
      "jpaGeneratedValueSequence": false,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "propertyNameCapitalized": "Id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "login",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Login",
      "fieldIsEnum": false,
      "fieldName": "login",
      "fieldNameAsDatabaseColumn": "login",
      "fieldNameCapitalized": "Login",
      "fieldNameHumanized": "Login",
      "fieldNameUnderscored": "login",
      "fieldTranslationKey": "jhipsterApp.user.login",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "javaValueGenerator": "UUID.randomUUID().toString()",
      "javaValueSample1": ""login1"",
      "javaValueSample2": ""login2"",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "login",
      ],
      "propertyName": "login",
      "propertyNameCapitalized": "Login",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "first_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "FirstName",
      "fieldIsEnum": false,
      "fieldName": "firstName",
      "fieldNameAsDatabaseColumn": "first_name",
      "fieldNameCapitalized": "FirstName",
      "fieldNameHumanized": "First Name",
      "fieldNameUnderscored": "first_name",
      "fieldTranslationKey": "jhipsterApp.user.firstName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "javaValueGenerator": "UUID.randomUUID().toString()",
      "javaValueSample1": ""firstName1"",
      "javaValueSample2": ""firstName2"",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "firstName",
      ],
      "propertyName": "firstName",
      "propertyNameCapitalized": "FirstName",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
    {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "last_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "LastName",
      "fieldIsEnum": false,
      "fieldName": "lastName",
      "fieldNameAsDatabaseColumn": "last_name",
      "fieldNameCapitalized": "LastName",
      "fieldNameHumanized": "Last Name",
      "fieldNameUnderscored": "last_name",
      "fieldTranslationKey": "jhipsterApp.user.lastName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "javaValueGenerator": "UUID.randomUUID().toString()",
      "javaValueSample1": ""lastName1"",
      "javaValueSample2": ""lastName2"",
      "loadColumnType": "string",
      "nullable": true,
      "path": [
        "lastName",
      ],
      "propertyName": "lastName",
      "propertyNameCapitalized": "LastName",
      "reference": Any<Object>,
      "relationshipsPath": [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.user",
  "i18nKeyPrefix": "jhipsterApp.user",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "User",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "User",
  "persistInstance": "user",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasInteger": false,
    "hasLong": false,
    "hasUUID": true,
    "hibernateSnakeCaseName": "id",
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "string",
    "type": "UUID",
    "typeInteger": false,
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsByOtherEntity": {},
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "UserDTO",
  "restInstance": "userDTO",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": {},
  "updatableEntity": true,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`,
        );
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
{
  "allReferences": Any<Array>,
  "annotations": {
    "changelogDate": "20220129025419",
  },
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": true,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": "no",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiDescription": undefined,
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "",
  "entityJavadoc": undefined,
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "javaValueGenerator": "UUID.randomUUID()",
      "javaValueSample1": "UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")",
      "javaValueSample2": "UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")",
      "jpaGeneratedValue": true,
      "jpaGeneratedValueIdentity": false,
      "jpaGeneratedValueSequence": false,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "propertyNameCapitalized": "Id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasInteger": false,
    "hasLong": false,
    "hasUUID": true,
    "hibernateSnakeCaseName": "id",
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "string",
    "type": "UUID",
    "typeInteger": false,
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsByOtherEntity": {},
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`,
        );
      });
    });

    describe('skipUserManagement', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withJHipsterConfig(
          {
            skipUserManagement: true,
          },
          [
            {
              name: 'EntityA',
              changelogDate: '20220129025419',
              fields: [
                {
                  fieldName: 'id',
                  fieldType: UUID,
                },
              ],
            },
          ],
        );
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
{
  ".jhipster/EntityA.json": {
    "contents": "{
  "annotations": {
    "changelogDate": "20220129025419"
  },
  "changelogDate": "20220129025419",
  "fields": [
    {
      "fieldName": "id",
      "fieldType": "UUID"
    }
  ],
  "name": "EntityA",
  "relationships": []
}
",
    "stateCleared": "modified",
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
[
  "EntityA",
]
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
{
  "allReferences": Any<Array>,
  "annotations": {
    "changelogDate": "20220129025419",
  },
  "anyFieldHasDocumentation": false,
  "anyFieldHasFileBasedContentType": false,
  "anyFieldHasImageContentType": false,
  "anyFieldHasTextContentType": false,
  "anyFieldIsBigDecimal": false,
  "anyFieldIsBlobDerived": false,
  "anyFieldIsDateDerived": false,
  "anyFieldIsDuration": false,
  "anyFieldIsInstant": false,
  "anyFieldIsLocalDate": false,
  "anyFieldIsTimeDerived": false,
  "anyFieldIsUUID": true,
  "anyFieldIsZonedDateTime": false,
  "anyPropertyHasValidation": false,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": {},
  "dto": "no",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiDescription": undefined,
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "",
  "entityJavadoc": undefined,
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": [],
  "fields": [
    {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "filterableField": true,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "javaValueGenerator": "UUID.randomUUID()",
      "javaValueSample1": "UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")",
      "javaValueSample2": "UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")",
      "jpaGeneratedValue": true,
      "jpaGeneratedValueIdentity": false,
      "jpaGeneratedValueSequence": false,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": [
        "id",
      ],
      "propertyName": "id",
      "propertyNameCapitalized": "Id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": [],
    },
  ],
  "fieldsContainNoOwnerOneToOne": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasInteger": false,
    "hasLong": false,
    "hasUUID": true,
    "hibernateSnakeCaseName": "id",
    "ids": [
      {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": [],
    "tsType": "string",
    "type": "UUID",
    "typeInteger": false,
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": [],
  "relationshipsByOtherEntity": {},
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`,
        );
      });
    });
  });
});
