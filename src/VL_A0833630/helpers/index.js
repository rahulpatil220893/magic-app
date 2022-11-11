export const replaceLangInPath = (path, replacetext, lang = "{lang}") => {
  return path.replace(lang, replacetext);
};
