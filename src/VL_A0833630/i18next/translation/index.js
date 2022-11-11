import globalEN from "./global.en";
import globalES from "./global.es";
import defaultEN from "./default.en";
import defaultES from "./default.es";

export default {
  en: {
    translation: { ...globalEN, ...defaultEN },
  },
  es: {
    translation: { ...globalES, ...defaultES },
  },
};
