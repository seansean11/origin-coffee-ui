import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for origin-coffee-ui', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be origin-coffee-ui', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('origin-coffee-ui');
    })
  });

  it('navbar-brand should be origin-coffee-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('origin-coffee-network@0.0.1');
  });

  
    it('Coffee component should be loadable',() => {
      page.navigateTo('/Coffee');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Coffee');
    });

    it('Coffee table should have 7 columns',() => {
      page.navigateTo('/Coffee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
