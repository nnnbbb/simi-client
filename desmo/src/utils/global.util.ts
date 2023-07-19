import * as prettier from 'prettier';

export function lowercaseFirstLetter(s: string) {
  const string = s.charAt(0).toLowerCase() + s.slice(1);
  return string;
}

export function camelize(string: string) {
  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
  // Ensure 1st char is always lowercase
  return string.substring(0, 1).toLowerCase() + string.substring(1);
}

export function format(fileContent: string, prettierOpts = {}) {
  try {
    return prettier.format(fileContent, {
      parser: 'typescript',
      trailingComma: 'all',
      singleQuote: true,
      ...prettierOpts,
    });
  } catch (e) {
    console.error(`代码格式化报错! ${e.toString()}\n代码为: ${fileContent}`);
    return fileContent;
  }
}
