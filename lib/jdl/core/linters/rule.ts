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

import { merge } from '../utils/object-utils.js';
import type { RuleLevel } from './rule-levels.js';
import { INFO } from './rule-levels.js';

/**
 * Represents a rule for the linters.
 */
export default class Rule {
  name: any;

  level: RuleLevel;

  comment: any;

  /**
   * Creates a new rule from an arg object.
   * @param args the argument object, keys:
   *               - name: the rule's name
   *               - level: the rule's level (INFO, WARNING, etc.), default: RuleLevels.INFO
   *               - comment: a possible comment for the rule
   */
  constructor(args: { name: any; level: RuleLevel; comment: any }) {
    if (!args?.name) {
      throw new Error('A rule must at least have a name.');
    }
    const merged = merge(defaults(), args) as any;
    this.name = merged.name;
    this.level = merged.level;
    this.comment = merged.comment;
  }

  /**
   * Compares this rule to another.
   * @param otherRule the other rule.
   * @returns 1 if this rule has a higher priority, 0 if they are equal, -1 otherwise.
   */
  compareTo(otherRule: Rule): number {
    if (!otherRule) {
      throw new Error('A rule has to be passed so as to be compared.');
    }
    if (this.level.priority === otherRule.level.priority) {
      return 0;
    }
    if (this.level.priority > otherRule.level.priority) {
      return 1;
    }
    return -1;
  }
}

function defaults() {
  return {
    level: INFO,
  };
}
