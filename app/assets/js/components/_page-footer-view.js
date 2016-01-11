class PageFooter {
  constructor() {
    this.ln = $('html').attr('lang');
    this.mydata = {
      "meta": [
        {
          "name": "Ofte stilte spørsmål",
          "url": "/studier/opptak/slik-soker-du-opptak/ofte-stilte-sporsmal"
        },
        {
          "name": "Samordna opptak logg inn",
          "url": "http://www.samordnaopptak.no/info/"
        },
        {
          "name": "Søknadsweb logg inn",
          "url": "https://fsweb.no/soknadsweb/login.seam?inst=hiof"
        },
        {
          "name": "EVUWeb logg inn",
          "url": "https://fsweb.no/evuweb/Kursoversikt.seam?inst=hiof"
        },
        {
          "name": "Kontakt opptakskontoret",
          "url": "/studier/opptak/kontakt-opptakskontoret"
        }
      ]
    };
  }
  getData(){
    let data = {};

    // Mockup data until other pages require similar functionality

    return data;
  }
  render(pageCategory){
    //console.log(pageCategory);
    let templateSource = Hiof.Templates['footer/pageFooter'],
    markup = templateSource(this.mydata);
    //console.log(this.mydata);
    $('#content').append(markup);
  }
}


// On document load
$(function() {
  //console.log('Hello from PageFooter plugin');
  let footer = new PageFooter(),
  pageCategory = $('#main').attr('data-page-category');
  if (pageCategory == 'admission') {
    //console.log('pageCategory is admission...');
    //Hiof.getListViewData();
    footer.render(pageCategory);
  }

});
