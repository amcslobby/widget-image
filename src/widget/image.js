/* global gadgets */

var RiseVision = RiseVision || {};
RiseVision.Image = {};

RiseVision.Image = (function (gadgets) {
  "use strict";

  var params,
    prefs = new gadgets.Prefs(),
    img = document.getElementById("image"),
    separator = "",
    message = null,
    refreshInterval = 300000;  // 5 minutes

  /*
   *  Private Methods
   */
  function init() {
    var storage = null,
      str;

    img.className = params.position;
    img.className = params.scaleToFit ? img.className + " scale-to-fit" : img.className;
    document.body.style.background = params.background.color;

    if (Object.keys(params.storage).length === 0) {
      str = params.url.split("?");

      if (str.length === 1) {
        separator = "?";
      }
      else {
        separator = "&";
      }

      img.style.backgroundImage = "url(" + params.url + separator + "cb=" + new Date().getTime() + ")";
      startTimer();
      ready();
    }
    // Rise Storage
    else {
      // create instance of message
      message = new RiseVision.Common.Message(document.getElementById("container"),
        document.getElementById("messageContainer"));

      // show wait message while Storage initializes
      message.show("Please wait while your image is downloaded.");

      storage = new RiseVision.Image.Storage(params);
      storage.init();

      ready();
    }
  }

  function noStorageFile() {
    message.show("The selected image does not exist.");
  }

  function startTimer() {
    setTimeout(function() {
      img.style.backgroundImage = "url(" + params.url + separator + "cb=" + new Date().getTime() + ")";
      startTimer();
    }, refreshInterval);
  }

  /*
   *  Public Methods
   */
  function getAdditionalParams(names, values) {
    if (Array.isArray(names) && names.length > 0 && names[0] === "additionalParams") {
      if (Array.isArray(values) && values.length > 0) {
        params = JSON.parse(values[0]);

        document.getElementById("container").style.height = prefs.getInt("rsH") + "px";
        init();
      }
    }
  }

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), false,
      false, false, true, false);
  }

  function storageFileUpdate() {
    // remove a message previously shown
    message.hide();
  }

  return {
    "getAdditionalParams": getAdditionalParams,
    "noStorageFile": noStorageFile,
    "storageFileUpdate": storageFileUpdate
  };
})(gadgets);
