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
import type { JHipsterCommandDefinition } from '../../lib/command/index.js';

const command = {
  options: {},
  configs: {
    enableGradleDevelocity: {
      cli: {
        type: Boolean,
      },
      prompt: {
        type: 'confirm',
        message: 'Do you want to enable Gradle Develocity integration?',
      },
      default: false,
      description: 'Enable Gradle Develocity integration',
      scope: 'storage',
    },
    gradleDevelocityHost: {
      cli: {
        type: String,
      },
      prompt: {
        when: answers => answers.enableGradleDevelocity,
        type: 'input',
        message: 'Enter your Gradle Develocity host',
        validate: input => (input.length === 0 ? 'Please enter your Gradle Develocity host' : true),
      },
      description: 'Gradle Develocity Host',
      scope: 'storage',
    },
  },
  import: [],
} as const satisfies JHipsterCommandDefinition;

export default command;
