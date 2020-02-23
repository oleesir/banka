/**
 *
 * @param {string} str snake_cased
 * @returns {string} a camelCased string
 */
export default function snakeToCamelCase(str) {
  const matcher = /_[a-z]{1}/;
  const [match] = str.match(matcher) || [];

  if (match) return str.replace(matcher, match[1].toUpperCase());

  return str;
}
