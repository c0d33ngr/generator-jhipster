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

import type { ITokenConfig } from 'chevrotain';
import { Lexer } from 'chevrotain';
import applicationOptions from '../../../../jhipster/application-options.ts';
import type { JDLTokenConfig } from '../../types/parsing.js';
import createTokenFromConfig from '../../parsing/lexer/token-creator.js';
import { KEYWORD, UNARY_OPTION } from '../../parsing/lexer/shared-tokens.js';

const { OptionNames } = applicationOptions;

const {
  APPLICATION_TYPE,
  AUTHENTICATION_TYPE,
  BASE_NAME,
  BLUEPRINT,
  BLUEPRINTS,
  BUILD_TOOL,
  CACHE_PROVIDER,
  CLIENT_FRAMEWORK,
  CLIENT_PACKAGE_MANAGER,
  CLIENT_THEME,
  CLIENT_THEME_VARIANT,
  CREATION_TIMESTAMP,
  DATABASE_TYPE,
  DEV_DATABASE_TYPE,
  DTO_SUFFIX,
  EMBEDDABLE_LAUNCH_SCRIPT,
  ENABLE_HIBERNATE_CACHE,
  ENABLE_SWAGGER_CODEGEN,
  ENABLE_TRANSLATION,
  ENTITY_SUFFIX,
  GATEWAY_SERVER_PORT,
  JHIPSTER_VERSION,
  JHI_PREFIX,
  JWT_SECRET_KEY,
  LANGUAGES,
  MICROFRONTEND,
  MICROFRONTENDS,
  NATIVE_LANGUAGE,
  PACKAGE_NAME,
  PROD_DATABASE_TYPE,
  REACTIVE,
  REMEMBER_ME_KEY,
  SEARCH_ENGINE,
  SERVER_PORT,
  SKIP_CLIENT,
  SKIP_SERVER,
  SKIP_USER_MANAGEMENT,
  TEST_FRAMEWORKS,
  WEBSOCKET,
  WITH_ADMIN_UI,
  ENABLE_GRADLE_DEVELOCITY,
  GRADLE_DEVELOCITY_HOST,
} = OptionNames;

export const applicationConfigCategoryToken = createTokenFromConfig({ name: 'CONFIG_KEY', pattern: Lexer.NA });

export const buildApplicationTokens = (tokenConfigs: JDLTokenConfig[]) => {
  const applicationConfigTokens: Pick<ITokenConfig, 'name' | 'pattern'>[] = [
    { name: 'BASE_NAME', pattern: BASE_NAME },
    { name: 'BLUEPRINTS', pattern: BLUEPRINTS },
    { name: 'BLUEPRINT', pattern: BLUEPRINT },
    { name: 'EMBEDDABLE_LAUNCH_SCRIPT', pattern: EMBEDDABLE_LAUNCH_SCRIPT },
    { name: 'CREATION_TIMESTAMP', pattern: CREATION_TIMESTAMP },
    { name: 'GATEWAY_SERVER_PORT', pattern: GATEWAY_SERVER_PORT },
    { name: 'PACKAGE_NAME', pattern: PACKAGE_NAME },
    { name: 'AUTHENTICATION_TYPE', pattern: AUTHENTICATION_TYPE },
    { name: 'CACHE_PROVIDER', pattern: CACHE_PROVIDER },
    { name: 'ENABLE_HIBERNATE_CACHE', pattern: ENABLE_HIBERNATE_CACHE },
    { name: 'WEBSOCKET', pattern: WEBSOCKET },
    { name: 'DATABASE_TYPE', pattern: DATABASE_TYPE },
    { name: 'DEV_DATABASE_TYPE', pattern: DEV_DATABASE_TYPE },
    { name: 'PROD_DATABASE_TYPE', pattern: PROD_DATABASE_TYPE },
    { name: 'BUILD_TOOL', pattern: BUILD_TOOL },
    { name: 'SEARCH_ENGINE', pattern: SEARCH_ENGINE },
    { name: 'ENABLE_TRANSLATION', pattern: ENABLE_TRANSLATION },
    { name: 'APPLICATION_TYPE', pattern: APPLICATION_TYPE },
    { name: 'TEST_FRAMEWORKS', pattern: TEST_FRAMEWORKS },
    { name: 'LANGUAGES', pattern: LANGUAGES },
    { name: 'SERVER_PORT', pattern: SERVER_PORT },
    { name: 'JHI_PREFIX', pattern: JHI_PREFIX },
    { name: 'JWT_SECRET_KEY', pattern: JWT_SECRET_KEY },
    { name: 'JHIPSTER_VERSION', pattern: JHIPSTER_VERSION },
    { name: 'CLIENT_PACKAGE_MANAGER', pattern: CLIENT_PACKAGE_MANAGER },
    { name: 'CLIENT_FRAMEWORK', pattern: CLIENT_FRAMEWORK },
    { name: 'CLIENT_THEME_VARIANT', pattern: CLIENT_THEME_VARIANT },
    { name: 'CLIENT_THEME', pattern: CLIENT_THEME },
    { name: 'WITH_ADMIN_UI', pattern: WITH_ADMIN_UI },
    { name: 'NATIVE_LANGUAGE', pattern: NATIVE_LANGUAGE },
    { name: 'FRONT_END_BUILDER', pattern: 'frontendBuilder' }, // TODO always valid?
    { name: 'SKIP_USER_MANAGEMENT', pattern: SKIP_USER_MANAGEMENT },
    { name: 'ENABLE_SWAGGER_CODEGEN', pattern: ENABLE_SWAGGER_CODEGEN },
    { name: 'REACTIVE', pattern: REACTIVE },
    { name: 'ENTITY_SUFFIX', pattern: ENTITY_SUFFIX },
    { name: 'DTO_SUFFIX', pattern: DTO_SUFFIX },
    { name: 'SKIP_CLIENT', pattern: SKIP_CLIENT },
    { name: 'SKIP_SERVER', pattern: SKIP_SERVER },
    { name: 'REMEMBER_ME_KEY', pattern: REMEMBER_ME_KEY },
    { name: 'ENABLE_GRADLE_DEVELOCITY', pattern: ENABLE_GRADLE_DEVELOCITY },
    { name: 'GRADLE_DEVELOCITY_HOST', pattern: GRADLE_DEVELOCITY_HOST },
    { name: 'MICROFRONTENDS', pattern: MICROFRONTENDS },
    { name: 'MICROFRONTEND', pattern: MICROFRONTEND },
    ...tokenConfigs,
  ];
  return {
    categoryToken: applicationConfigCategoryToken,
    tokens: [
      applicationConfigCategoryToken,
      ...applicationConfigTokens.map((tokenConfig: ITokenConfig) => {
        tokenConfig.categories = [applicationConfigCategoryToken];
        // This is actually needed as the skipClient & skipServer options are both entity & app options...
        if (['SKIP_CLIENT', 'SKIP_SERVER'].includes(tokenConfig.name)) {
          tokenConfig.categories.push(KEYWORD);
          tokenConfig.categories.push(UNARY_OPTION);
        }
        return createTokenFromConfig(tokenConfig);
      }),
    ],
  };
};
