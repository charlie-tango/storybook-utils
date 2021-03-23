const excludedPaths = ["src", "."];

/**
 * This method takes the base from `paths.macro` and, converts it to usable Storybook path.
 *
 * ```
 * import { createStoryPath } from '../../utils/storybook-utils'
 * import base from 'paths.macro'
 *
 * export default {
 *   title: createStoryPath(base),
 *   component: Header,
 * } as Meta;
 * ```
 * @param base
 * @returns {string}
 */
export function createStoryPath(base: string) {
  return base
    .split("/")
    .filter((name) => name && !excludedPaths.includes(name))
    .join("/");
}
