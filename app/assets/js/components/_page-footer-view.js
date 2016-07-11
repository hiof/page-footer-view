class PageFooter {
  constructor() {
    this.view = new View();
    this.defaults = {
      // These are the default.
      id: null,
      //category: 'admission',
      url: 'http://hiof.no/api/v1/contact/',
      //lang: this.view.ln,
    };
  }
  render(options = {}){
    //console.log(pageCategory);
    options.category = $('#main').attr('data-page-category');
    let settings = Object.assign(
      {},
      this.defaults,
      options
    );
    //console.log('Settings from render');
    //console.log(settings);
    let that = this;
    this.view.getData(settings, that).success(function(data){
      let templateSource = Hiof.Templates['footer/pageFooter'],
          markup = templateSource(data);
      //console.log('Data:');
      //console.log(data);
      $('#content').append(markup);
    });
  }
}


// On document load
$(function() {
  //console.log('Hello from PageFooter plugin');
  let footer = new PageFooter();



  footer.render();
  //if (pageCategory == 'admission') {
    //console.log('pageCategory is admission...');
    //Hiof.getListViewData();

  //}

});
