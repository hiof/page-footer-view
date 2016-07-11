'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = (function () {
  function View() {
    _classCallCheck(this, View);

    this.ln = $('html').attr('lang');
    this.pageCategory = $('#main').attr('data-page-category');
    this.distanceToTop = $(window).scrollTop();
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    this.distanceToTopBreakPoint = 0;
    this.distanceToSidebarSticky = 0;
    this.navigationBreakpoint = 770;
    this.contentHeight = $("#main").outerHeight();
    this.options = {
      distanceToTop: $(window).scrollTop(),
      windowWidth: $(window).width(),
      windowHeight: $(window).height(),
      distanceToTopBreakPoint: 0,
      distanceToSidebarSticky: 0,
      navigationBreakpoint: 770,
      contentHeight: $("#main").outerHeight(),
      language: this.languageCheck(this.ln),
      "meta": {
        "fbid": "265676486878954",
        "fbpublisher": "http://facebook.com/hiofnorge",
        "restimage": {
          "prefix": "http://staging.hiof.no/assets/images/rest/",
          "1200x675": {
            "0": "hiof-varmgraa.jpg",
            "1": "hiof-aqua.jpg",
            "2": "hiof-lavendel.jpg",
            "3": "hiof-lysgraa.jpg",
            "4": "hiof-rosa.jpg",
            "5": "hiof-sjoegroenn.jpg"
          }
        }
      }

    };
    this.i18n = this.getData({ url: "/assets/js/data/i18n.json" }, this).success(function (data) {
      return data;
    });
    this.defaults = {
      // These are the defaults.
      id: null,
      server: undefined,
      url: undefined,
      template: null
    };
    this.scrollDest = false;
    this.meta = this.storeInitialMetaInOptions();

    //this.meta = {
    //  "site_name": "Høgskolen i Østfold",
    //  "og:url": '//hiof.no',
    //  "og:type": "article",
    //  //"og:image": Hiof.options.meta["og:image"],
    //  "fb:app_id": "265676486878954",
    //  "og:title": $('title').text(),
    //  "og:description": Hiof.options.meta["og:description"],
    //  "article:author": Hiof.options.meta.author
    //};
  }

  _createClass(View, [{
    key: 'scrollTo',
    value: function scrollTo(destination) {
      console.log('scollto function is running..');
      setTimeout($.scrollTo($(destination), 500, { axis: 'y', offset: { top: -80 } }), 3000);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var that = arguments[1];

      // Setup the query
      var settings = _extends({}, this.defaults, options);
      var contentType = "application/x-www-form-urlencoded; charset=utf-8";
      if (window.XDomainRequest) {
        //for IE8,IE9
        contentType = "text/plain";
      }
      //console.log('options from articleViewClass');
      //console.log(options);
      //console.log('merged settings...');
      //console.log(settings);
      return $.ajax({
        url: settings.url,
        method: 'GET',
        async: true,
        dataType: 'json',
        data: settings,
        contentType: contentType,
        context: that
        //success: function(data) {
        //  //data.settings = settings;
        //  return data;
        //},
        //error: function(jqXHR, textStatus, errorThrown) {
        //  console.log("You can not send Cross Domain AJAX requests: " + errorThrown);
        //}

      });
    }
  }, {
    key: 'createModal',
    value: function createModal(options) {

      //console.log("Hiof.createModal  is running");
      var settings = $.extend({
        // These are the defaults.
        header: "",
        content: "",
        footer: ""
      }, options);

      var div = document.createElement('div'),
          modal,
          modalWrapper = $(div).clone().addClass("modal fade"),
          modalDialog = $(div).clone().addClass("modal-dialog"),
          modalContent = $(div).clone().addClass("modal-content"),
          modalHeader = $(div).clone().addClass("modal-header"),
          modalBody = $(div).clone().addClass("modal-body"),
          modalFooter = $(div).clone().addClass("modal-footer");

      if (settings.header) {
        //header = "";
        $(modalContent).append($(modalHeader).append(settings.header));
      }

      if (settings.content) {
        //content = "";
        $(modalContent).append($(modalBody).append(settings.content));
      }

      if (settings.footer) {
        //footer = "";
        $(modalContent).append($(modalFooter).append(settings.footer));
      }
      $(modalDialog).append($(modalContent));
      $(modalWrapper).append($(modalDialog));
      modal = $(modalWrapper);

      return modal;
    }
  }, {
    key: 'setupClientInformationInOptions',
    value: function setupClientInformationInOptions() {
      var ua = detect.parse(navigator.userAgent);
      if (ua.browser) {
        var browserVersionMajor, browserVersionMinor, browserVersionPatch;
        if (ua.browser.major) {
          browserVersionMajor = ua.browser.major;
        } else {
          browserVersionMajor = '0';
        }
        if (ua.browser.minor) {
          browserVersionMinor = ua.browser.minor;
        } else {
          browserVersionMinor = '0';
        }
        if (ua.browser.patch) {
          browserVersionPatch = ua.browser.patch;
        } else {
          browserVersionPatch = '0';
        }

        browserVersion = browserVersionMajor + '.' + browserVersionMinor + '.' + browserVersionPatch;
      }
      if (ua.os) {
        var osVersionMajor, osVersionMinor, osVersionPatch;
        if (ua.os.major) {
          osVersionMajor = ua.os.major;
        } else {
          osVersionMajor = '0';
        }
        if (ua.os.minor) {
          osVersionMinor = ua.os.minor;
        } else {
          osVersionMinor = '0';
        }
        if (ua.os.patch) {
          osVersionPatch = ua.os.patch;
        } else {
          osVersionPatch = '0';
        }

        osVersion = osVersionMajor + '.' + osVersionMinor + '.' + osVersionPatch;
      }
      var options = this.options;
      options.client = {};
      options.client.url = window.location.href;
      options.client.osName = ua.os.family;
      options.client.osVersion = osVersion;
      options.client.browserName = ua.browser.family;
      options.client.browserVersion = browserVersion;
      options.client.viewportWidth = window.innerWidth;
      options.client.viewportHeight = window.innerHeight;
    }
  }, {
    key: 'scrollToElement',

    //setupi18n() {
    //  $.ajax({
    //    dataType: "json",
    //    url: "/assets/js/data/i18n.json",
    //    async: false,
    //    success: function(data) {
    //      console.log(data);
    //      return data;
    //    },
    //    done: function(){
    //      console.log('done from setupi18n():');
    //      console.log(this.options.i18n);
    //    }
    //  });
    //};

    value: function scrollToElement(destination) {
      var thisDestination;

      if ($(destination).length) {

        //debug('element exsist.. This is the value:');
        //debug(destination);
        thisDestination = $(destination + "");
      } else if ($('a[name="' + destination.substr(1) + '"]').length) {
        //debug('element does exsist with a name slector..');
        thisDestination = $('a[name="' + destination.substr(1) + '"]');
      } else {
        //debug('Element does not exsist..');
        return;
      }
      $.scrollTo(thisDestination, 500, {
        axis: 'y',
        offset: {
          top: -80
        }
      });
    }
  }, {
    key: 'languageCheck',
    value: function languageCheck(language) {

      //var language = this.options.language;

      if (typeof language === 'undefined') {
        language = "nor";
      }
      return language;
    }
  }, {
    key: 'getUrlParameterByName',
    value: function getUrlParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }, {
    key: 'getUrlParameter',
    value: function getUrlParameter(sParam) {

      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&');

      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
      }
    }
  }, {
    key: 'storeInitialMetaInOptions',
    value: function storeInitialMetaInOptions() {
      var documentTitle = $('head title').text(),
          documentDescription = "",
          documentAuthor = "",
          documentImage = this.options.meta.restimage.prefix + this.options.meta.restimage["1200x675"]["1"];
      //debug(documentTitle);
      if ($('#content header h1').length) {
        documentTitle = $('#content header h1').text();
      } else if ($('#content > h1').length) {
        documentTitle = $('#content > h1').text();
      }
      if ($('head meta[name="Description"]').length) {
        documentDescription = $('head meta[name="Description"]').attr("content");
      }
      if ($('head meta[name="Author"]').length) {
        documentAuthor = $('head meta[name="Author"]').attr("content");
      }
      //Hiof.options.meta = {};
      //var meta = this.options.meta;
      //console.log('this.options.i18n from storeInitialMetaInOptions()');
      //console.log(this.options.i18n);
      //meta.site_name = this.options.i18n.nb.meta.name;
      //meta["og:url"] = window.location.href;
      //meta["og:title"] = documentTitle;
      //meta["og:description"] = documentDescription;
      //meta["og:type"] = "website";
      //meta["og:image"] = documentImage;
      //meta.author = documentAuthor;
      //meta["fb:app_id"] = Hiof.options.i18n.meta.fbid;

      // TODO: i18n this
      var meta = {
        "site_name": "Høgskolen i Østfold",
        "og:url": window.location.href,
        "og:title": documentTitle,
        "og:description": documentDescription,
        "og:type": "website",
        "og:image": documentImage,
        "author": documentAuthor
      };
      return meta;
    }
  }, {
    key: 'createAndApplyMetaElement',
    value: function createAndApplyMetaElement(key, value) {
      var meta = document.createElement('meta');
      $(meta).attr('property', key).attr('content', value);
      //meta.setAttributes({
      //  'property': key,
      //  'content': value
      //});
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, {
    key: 'syncHeadMeta',
    value: function syncHeadMeta() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      // Setup the settings
      //var settings = $.extend({
      //  // These are the defaults.
      //  "site_name": Hiof.options.meta.site_name,
      //  "og:url": Hiof.options.meta["og:url"],
      //  "og:title": Hiof.options.meta["og:title"],
      //  "og:description": Hiof.options.meta["og:description"],
      //  "og:type": Hiof.options.meta["og:type"],
      //  "og:image": Hiof.options.meta["og:image"],
      //  "fb:app_id": Hiof.options.meta.fbid,
      //  "article:author": Hiof.options.meta.author
      //}, options);

      var settings = _extends({}, this.meta, options);
      var that = this;
      // Updated / create meta-tags
      $.each(settings, function (key, value) {
        if (key === "og:title") {
          // If the string contains pipe, remove it and everything after the pipe
          if (value.indexOf('|')) {
            //value = value.substring(0, value.indexOf('|'));
          }

          if ($('meta[property="' + key + '"]').length) {
            $('head title').text(value + ' | ' + settings.site_name);
            $('meta[property="' + key + '"]').attr('content', value);
          } else {
            $('head title').text(value + ' | ' + settings.site_name);
            that.createAndApplyMetaElement(key, value);
          }
        } else if (key === "article:author") {
          if ($('meta[property="' + key + '"]').length) {
            $('meta[property="' + key + '"]').attr('content', value);
            $('meta[name="Author"]').attr('content', value);
          } else {
            that.createAndApplyMetaElement(key, value);
          }
        } else if (key === "og:description") {
          if ($('meta[property="' + key + '"]').length) {
            $('meta[property="' + key + '"]').attr('content', value);
            $('meta[name="Description"]').attr('content', value);
          } else {
            that.createAndApplyMetaElement(key, value);
          }
        } else if ($('meta[property="' + key + '"]').length) {
          $('meta[property="' + key + '"]').attr('content', value);
        } else {
          that.createAndApplyMetaElement(key, value);
        }
      });
    }
  }, {
    key: 'getSvgIcon',
    value: function getSvgIcon(icon) {
      var req;

      if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
      }

      if (req !== null) {

        var url = "/assets/images/icons/" + icon + ".svg";

        req.open("GET", url, false);

        req.onreadystatechange = function () {
          if (req.readyState == 4 && req.status == 200) {}
        };

        if (req.overrideMimeType) req.overrideMimeType("image/svg+xml");
        req.send();

        var response = req.responseXML.documentElement;
        return response;
      } else {
        // Unable to get the data
      }
    }
  }, {
    key: 'updateAnalytics',
    value: function updateAnalytics() {
      //ga('set', 'page', document.location.href);
      //ga('send', 'pageview');
    }
  }]);

  return View;
})();

;

(function (Hiof, undefined) {
  var view = new View();
  Hiof.view = view;

  // Handlebars helper
  Handlebars.registerHelper('each_upto', function (ary, max, options) {
    if (!ary || ary.length === 0) return options.inverse(this);
    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i) {
      result.push(options.fn(ary[i]));
    }return result.join('');
  });
  Handlebars.registerHelper('trimString70', function (passedString) {
    var theString = passedString.substring(0, 70);
    return new Handlebars.SafeString(theString) + "...";
  });

  Handlebars.registerHelper('capitalizeFirstLetter', function (value) {
    if (value) {
      return new Handlebars.SafeString(value.charAt(0).toUpperCase() + value.slice(1));
    }
  });
  Handlebars.registerHelper('eachProperty', function (context, options) {
    var ret = "";
    for (var prop in context) {
      ret = ret + options.fn({
        property: prop,
        value: context[prop]
      });
    }
    return ret;
  });
  Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // This is our "rescue" method.
  function notFound() {
    if ($('#studie').length) {} else {
      //$("#content").html("Fant ikke det du lette etter.");
    }
  }

  // Error message
  Path.rescue(notFound);

  // Backward compability
  window.Hiof.Options = view.options;
  window.Hiof.options = view.options;
  window.Hiof.createModal = view.createModal;
  window.Hiof.setupClientInformationInOptions = view.setupClientInformationInOptions;
  //window.Hiof.setupi18n = view.setupi18n;
  window.Hiof.syncMetaInformation = view.syncHeadMeta;
  window.Hiof.storeInitialMetaInOptions = view.storeInitialMetaInOptions;
  window.Hiof.updateAnalytics = view.updateAnalytics;
  window.Hiof.scrollToElement = view.scrollToElement;

  // Run setups to bind data to view
  //view.setupClientInformationInOptions();
  //view.setupi18n();
  //view.storeInitialMetaInOptions();
})(window.Hiof = window.Hiof || {});
//# sourceMappingURL=_view.js.map
