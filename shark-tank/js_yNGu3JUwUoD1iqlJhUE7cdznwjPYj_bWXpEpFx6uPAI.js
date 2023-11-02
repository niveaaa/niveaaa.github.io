(function (apricot) {
    Drupal.behaviors.bfArticleCarouselPanel = {
      attach: function(){
        document.querySelectorAll('.cb-bf-article-carousel-wrapper')
          .forEach(function (elem) {
            apricot.CBHorizontalCarousel({
              elem: elem,
              markup: false,
              scrollDistance: 350,
            });
          });
      }
    }
  })(cb.apricot);
  ;
  (function (drupalSettings) {
    'use strict';
  
    Drupal.behaviors.auth_hero = {
      attach: function (context, settings) {
        let iam = window.cb.core.iam;
        const hero = document.querySelector('#block-apricothero');
        const loader = document.querySelector('#hero-loader-wrapper');
        const authHero = document.querySelector('#block-authenticatedapricothero');
        const showHero = function () {
          hero.classList.remove('cb-hidden');
          hero.setAttribute('aria-hidden', 'false');
          authHero.classList.add('cb-hidden');
          authHero.setAttribute('aria-hidden', 'true');
        }
        const showAuthHero = function () {
          hero.classList.add('cb-hidden');
          hero.setAttribute('aria-hidden', 'true');
          authHero.classList.remove('cb-hidden');
          authHero.setAttribute('aria-hidden', 'false');
        }
        const session = iam.getAuthSession();
        loader.classList.add('cb-hidden');
        loader.setAttribute('aria-hidden', 'true');
        if (session.isLoggedIn) {
          showAuthHero();
        } else {
          showHero();
        }
        iam.getEventBus().addListener(iam.events.AWSLogin, showAuthHero);
        iam.getEventBus().addListener(iam.events.Logout, showHero);
      }
    };
  
  })(drupalSettings);
  ;