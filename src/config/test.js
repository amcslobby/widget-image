/* global config: true */
/* exported config */
if (typeof angular !== "undefined") {
  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX", "locales/translation_")
    .constant("LOCALES_SUFIX", ".json");

  angular.module("risevision.widget.common.storage-selector.config")
    .value("STORAGE_MODAL", "https://storage-stage-rva-test.risevision.com/files/");
}

if (typeof config === "undefined") {
  var config = {
    STORAGE_ENV: "test"
  };
}
