'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageFooter = (function () {
  function PageFooter() {
    _classCallCheck(this, PageFooter);

    this.view = new View();
    this.defaults = {
      // These are the default.
      id: null,
      //category: 'admission',
      url: 'http://hiof.no/api/v1/contact/'
    };
  }

  _createClass(PageFooter, [{
    key: 'render',
    //lang: this.view.ln,
    value: function render() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      //console.log(pageCategory);
      options.category = $('#main').attr('data-page-category');
      var settings = _extends({}, this.defaults, options);
      //console.log('Settings from render');
      //console.log(settings);
      var that = this;
      this.view.getData(settings, that).success(function (data) {
        var templateSource = Hiof.Templates['footer/pageFooter'],
            markup = templateSource(data);
        //console.log('Data:');
        //console.log(data);
        $('#content').append(markup);
      });
    }
  }]);

  return PageFooter;
})();

// On document load

$(function () {
  //console.log('Hello from PageFooter plugin');
  var footer = new PageFooter();

  footer.render();
  //if (pageCategory == 'admission') {
  //console.log('pageCategory is admission...');
  //Hiof.getListViewData();

  //}
});
//# sourceMappingURL=_page-footer-view.js.map
