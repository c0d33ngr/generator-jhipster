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
import type { GENERATOR_NAME } from '../../converters/exporters/export-utils.ts';
import type JDLJSONEntity from '../basic-types/json-entity.ts';

export type JDLJSONApplicationContent = {
  entities?: string[];
  creationTimestamp?: number;
} & Record<string, any>;

export type JDLJSONApplication = {
  [GENERATOR_NAME]: JDLJSONApplicationContent;
  namespaceConfigs: Record<string, Record<string, any>>;
};

export type JDLJSONBlueprint = {
  name: string;
};

export type JDLJSONMicrofrontend = {
  baseName: string;
};

export type PostProcessedJDLJSONApplication = {
  blueprints: JDLJSONBlueprint[];
  microfrontends: JDLJSONMicrofrontend[];
} & JDLJSONApplication;

export type RawJDLJSONApplication = {
  entityNames?: string;
  frontEndBuilder?: string;
  blueprints?: string;
  microfrontends?: string;
} & JDLJSONApplication;

export type JhipsterJSONJDLApplicationExporter = {
  forSeveralApplications?: boolean;
  name: string;
  type: string;
};

export type JhipsterJSONJDLExporterWrapper = {
  entities: JDLJSONEntity[];
  application: JhipsterJSONJDLApplicationExporter;
};
