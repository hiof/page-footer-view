class PageFooter {
  constructor() {
    this.ln = $('html').attr('lang');
    this.mydata = {
      "en": {
        "meta": [
          {
            "name": "Norwegian Universities and Colleges admission service login",
            "url": "http://www.samordnaopptak.no/info/"
          },
          {
            "name": "SøknadsWeb login",
            "url": "https://fsweb.no/soknadsweb/login.seam?inst=hiof"
          },
          {
            "name": "EVUWeb login",
            "url": "https://fsweb.no/evuweb/Kursoversikt.seam?inst=hiof"
          },
          {
            "name": "Frequently asked questions",
            "url": "/studies/admission/frequently-asked-questions"
          },
          {
            "name": "Contact admission office",
            "url": "/studies/admission/contact-the-admissions-office"
          }
        ]
      },
      "nb":{
        "meta": [
          {
            "name": "Samordna opptak logg inn",
            "url": "http://www.samordnaopptak.no/info/"
          },
          {
            "name": "SøknadsWeb logg inn",
            "url": "https://fsweb.no/soknadsweb/login.seam?inst=hiof"
          },
          {
            "name": "EVUWeb logg inn",
            "url": "https://fsweb.no/evuweb/Kursoversikt.seam?inst=hiof"
          },
          {
            "name": "Ofte stilte spørsmål",
            "url": "/studier/slik-soker-du-opptak/ofte-stilte-sporsmal"
          },
          {
            "name": "Kontakt opptakskontoret",
            "url": "/studier/slik-soker-du-opptak/kontakt-opptakskontoret"
          }
        ]
      }
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
    markup = templateSource(this.mydata[this.ln]);
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
