// NanoBaseCallbacks is where the base callbacks (common to all templates) are stored
NanoBaseCallbacks = (function () {
  // _canClick is used to disable clicks for a short period after each click (to avoid mis-clicks)
  var _canClick = true;

  var _baseBeforeUpdateCallbacks = {};

  var _baseAfterUpdateCallbacks = {
    // this callback is triggered after new data is processed
    // it updates the status/visibility icon and adds click event handling to buttons/links
    status: function (updateData) {
      var uiStatusClass;
      if (updateData.config.status === 2) {
        uiStatusClass = "far fa-eye uiStatusGood";
        $("div.button[disabled]").attr("enabled", "");
      } else if (updateData.config.status === 1) {
        uiStatusClass = "far fa-eye uiStatusAverage";
        $("div.button").attr("enabled", null);
      } else {
        uiStatusClass = "far fa-eye uiStatusBad";
        $("div.button").attr("enabled", null);
      }

      $("#uiStatusIcon").attr("class", uiStatusClass);

      $("div.button[enabled]")
        .off("click")
        .on("click", function (event) {
          event.preventDefault();

          var href = $(this).data("href");
          window.location.href = href;
        });

      return updateData;
    },
    nanomap: function (updateData) {
      $(".mapIcon")
        .off("mouseenter mouseleave")
        .on("mouseenter", function (event) {
          var self = this;
          $("#uiMapTooltip")
            .html($(this).children(".tooltip").html())
            .show()
            .stopTime()
            .oneTime(5000, "hideTooltip", function () {
              $(this).fadeOut(500);
            });
        });

      $(".zoomLink")
        .off("click")
        .on("click", function (event) {
          event.preventDefault();
          var zoomLevel = $(this).data("zoomLevel");
          var uiMapObject = $("#uiMap");
          var uiMapWidth = uiMapObject.width() * zoomLevel;
          var uiMapHeight = uiMapObject.height() * zoomLevel;

          uiMapObject.css({
            zoom: zoomLevel,
            left: "50%",
            top: "50%",
            marginLeft: "-" + Math.floor(uiMapWidth / 2) + "px",
            marginTop: "-" + Math.floor(uiMapHeight / 2) + "px",
          });
        });

      $("#uiMapImage").attr(
        "src",
        updateData["config"]["mapName"] +
          "-" +
          updateData["config"]["mapZLevel"] +
          ".png"
      );

      return updateData;
    },
  };

  return {
    addCallbacks: function () {
      NanoStateManager.addBeforeUpdateCallbacks(_baseBeforeUpdateCallbacks);
      NanoStateManager.addAfterUpdateCallbacks(_baseAfterUpdateCallbacks);
    },
    removeCallbacks: function () {
      for (var callbackKey in _baseBeforeUpdateCallbacks) {
        if (_baseBeforeUpdateCallbacks.hasOwnProperty(callbackKey)) {
          NanoStateManager.removeBeforeUpdateCallback(callbackKey);
        }
      }
      for (var callbackKey in _baseAfterUpdateCallbacks) {
        if (_baseAfterUpdateCallbacks.hasOwnProperty(callbackKey)) {
          NanoStateManager.removeAfterUpdateCallback(callbackKey);
        }
      }
    },
  };
})();
