import type { RequireOneOrNone } from 'type-fest';
import type {
  Application as JavaBootstrapApplication,
  Config as JavaBootstrapConfig,
  Entity as JavaBootstrapEntity,
  Options as JavaBootstrapOptions,
  Source as JavaBootstrapSource,
} from '../java/generators/bootstrap/types.d.ts';
import type {
  Application as BuildToolApplication,
  Config as BuildToolConfig,
  Options as BuildToolOptions,
  Source as BuildToolSource,
} from '../java/generators/build-tool/types.d.ts';
import type { HandleCommandTypes } from '../../lib/command/types.js';
import type GradleCommand from './command.js';

export type GradleComment = { comment?: string };

export type GradleScript = { script: string };

export type GradleLibraryDependency = { libraryName: string; scope?: string };

export type GradleDependency = (
  | { groupId: string; artifactId: string; version?: string; scope: string; classifier?: string }
  | Required<GradleLibraryDependency>
) & { closure?: string[] };

export type GradlePlugin = { id: string; version?: string };

export type GradleProperty = { property: string; value?: string };

export type GradleRepository = { url: string; username?: string; password?: string };

export type GradleTomlVersion = { name: string; version?: string };

export type GradleTomlAnyItemVersion = RequireOneOrNone<{ version: string; 'version.ref': string }, 'version' | 'version.ref'>;

export type GradleTomlLibraryId = { module: string } | { group: string; name: string };

export type GradleLibrary = GradleLibraryDependency & ({ library: string } | (GradleTomlLibraryId & GradleTomlAnyItemVersion));

export type GradleTomlPlugin = { pluginName: string; addToBuild?: boolean } & (
  | { plugin: string }
  | ({ id: string } & GradleTomlAnyItemVersion)
);

export type GradleFileNeedleOptions = { gradleFile?: string };
export type GradleCatalogNeedleOptions = { gradleVersionCatalogFile?: string };

export type GradleNeedleOptions = GradleFileNeedleOptions & GradleCatalogNeedleOptions;

export type Source = JavaBootstrapSource &
  BuildToolSource & {
    _gradleDependencies?: GradleDependency[];
    applyFromGradle?(script: GradleScript): void;
    addGradleDependency?(dependency: GradleDependency, options?: GradleFileNeedleOptions): void;
    addGradleDependencies?(dependency: GradleDependency[], options?: GradleFileNeedleOptions): void;
    addGradlePlugin?(plugin: GradlePlugin): void;
    addGradlePluginManagement?(pluginManagement: GradlePlugin): void;
    addGradleProperty?(property: GradleProperty & GradleComment): void;
    addGradleMavenRepository?(repository: GradleRepository): void;
    addGradleBuildSrcDependency?(dependency: GradleDependency): void;

    addGradleDependencyCatalogVersion?(catalogVersion: GradleTomlVersion, options?: GradleCatalogNeedleOptions): void;
    addGradleDependencyCatalogVersions?(catalogVersion: GradleTomlVersion[], options?: GradleCatalogNeedleOptions): void;
    addGradleDependencyCatalogLibrary?(catalogVersion: GradleLibrary, options?: GradleNeedleOptions): void;
    addGradleDependencyCatalogLibraries?(catalogVersion: GradleLibrary[], options?: GradleNeedleOptions): void;
    addGradleDependencyCatalogPlugin?(catalogVersion: GradleTomlPlugin): void;
    addGradleDependencyCatalogPlugins?(catalogVersion: GradleTomlPlugin[]): void;

    addGradleBuildSrcDependencyCatalogVersion?(catalogVersion: GradleTomlVersion): void;
    addGradleBuildSrcDependencyCatalogVersions?(catalogVersion: GradleTomlVersion[]): void;
    addGradleBuildSrcDependencyCatalogLibraries?(catalogVersion: GradleLibrary[]): void;
  };

type Command = HandleCommandTypes<typeof GradleCommand>;

export { JavaBootstrapEntity as Entity };

export type Config = Command['Config'] & JavaBootstrapConfig & BuildToolConfig;

export type Options = Command['Options'] & JavaBootstrapOptions & BuildToolOptions;

export type Application<E extends JavaBootstrapEntity = JavaBootstrapEntity> = Command['Application'] &
  JavaBootstrapApplication<E> &
  BuildToolApplication<E> & {
    gradleVersion?: string;
    gradleBuildSrc?: string;
    enableGradleDevelocity?: boolean;
  };
