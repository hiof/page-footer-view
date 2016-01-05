class PageFooter {
  constructor() {
    ln = $('html').attr('lang');
  }
  getData(){
    let data = {};

    // Mockup data until other pages require similar functionality
    data.meta = {
      "Samordna opptak logg inn": "https://fsweb.no/soknadsweb/login.seam?inst=hiof",
      "Søknadsweb logg inn": "https://fsweb.no/soknadsweb/login.seam?inst=hiof",
      "EVUWeb opptak logg inn": "https://fsweb.no/soknadsweb/login.seam?inst=hiof",
      "Kontakt opptakskontoret": "/studier/opptak/kontakt-opptakskontoret",
    };
    return data;
  }
  render(pageCategory){
    let templateSource = Hiof.Templates['footer/pageFooter'],
    markup = templateSource(this.getData);
    $('#content').append(markup);
  }
}


// On document load
$(function() {
  let footer = new PageFooter(),
      pageCategory = $('#main').attr('data-page-category');
  if (pageCategory == 'admission') {
    //Hiof.getListViewData();
    footer.render(pageCategory);
  }

});
