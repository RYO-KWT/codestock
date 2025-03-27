'use strict';
{
  document.addEventListener('DOMContentLoaded', () => {
    // setupScrollVisible
    const setupScrollVisible = () => {
      const header = document.querySelector('.js-header');
      const backToTop = document.querySelector('.js-back-to-top');

      if (!header || !backToTop) return;

      const showElement = () => {
        header.classList.add('is-active');
        backToTop.classList.add('is-active');
      };

      const hideElement = () => {
        header.classList.remove('is-active');
        backToTop.classList.remove('is-active');
      };

      const toggleElement = () => {
        window.scrollY > 100 ? showElement() : hideElement();
      };

      const addEvent = () => {
        window.addEventListener('scroll', toggleElement);
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      };

      addEvent();
    };

    // hamburger
    const setupHamburger = () => {
      const hamburger = document.querySelector('.js-header-hamburger');
      const nav = document.querySelector('.js-header-nav');
      const navLinks = document.querySelectorAll('.js-header-nav__link');
      const body = document.querySelector('.js-body');

      if (!hamburger || !nav || !navLinks.length || !body) return;

      const openNav = () => {
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'メニューを閉じる');
        nav.classList.add('is-active');
        body.classList.add('is-active');
      };

      const closeNav = () => {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        nav.classList.remove('is-active');
        body.classList.remove('is-active');
      };

      const toggleNav = () => {
        nav.classList.contains('is-active') ? closeNav() : openNav();
      };

      const addEvent = () => {
        hamburger.addEventListener('click', toggleNav);
        nav.addEventListener('click', (e) => { if (e.target === nav) closeNav() });
        navLinks.forEach(el => el.addEventListener('click', closeNav));
      };

      addEvent();
    };

    // accordion
    const setupAccordion = () => {
      const headers = document.querySelectorAll('.js-accordion__header');
      if (!headers.length) return;

      const openAccordion = (header) => {
        const item = header.closest('.js-accordion__item');
        const body = item.querySelector('.js-accordion__body');
        if (!item || !body) return;

        header.setAttribute('aria-expanded', 'true');
        item.setAttribute('open', '');
        item.classList.add('is-active');
        body.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => body.style.maxHeight = `${body.scrollHeight}px`);
      };

      const closeAccordion = (header) => {
        const item = header.closest('.js-accordion__item');
        const body = item.querySelector('.js-accordion__body');
        if (!item || !body) return;

        header.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-active');
        body.style.maxHeight = '0px';
        body.setAttribute('aria-hidden', 'true');
        setTimeout(() => item.removeAttribute('open'), 300);
      };

      const toggleAccordion = (e) => {
        const header = e.currentTarget;
        const item = header.closest('.js-accordion__item');
        const activeItems = document.querySelectorAll('.js-accordion__item.is-active');
        if (!item || !activeItems) return;

        activeItems.forEach(activeItem => {
          if (activeItem !== item) closeAccordion(activeItem.querySelector('.js-accordion__header'));
        });
        item.classList.contains('is-active') ? closeAccordion(header) : openAccordion(header);
      };

      const addEvent = () => {
        headers.forEach(el => el.addEventListener('click', (e) => {
          e.preventDefault();
          toggleAccordion(e);
        }));
      };

      addEvent();
    };

    // dropdown
    const setupDropdown = () => {

      const hamburger = document.querySelector('.js-dropdown-hamburger');
      const nav = document.querySelector('.js-dropdown-nav');
      const navItems = document.querySelectorAll('.js-dropdown-nav__item');
      const navHeaders = document.querySelectorAll('.js-dropdown-nav__header');
      const bodyLinks = document.querySelectorAll('.js-dropdown-body__link');
      const body = document.querySelector('.js-body');
      if (!hamburger || !nav || !navItems.length || !navHeaders.length || !bodyLinks.length || !body) return;

      const isHoverDevice = window.matchMedia('(any-hover: hover)').matches;

      const openNav = () => {
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'メニューを閉じる');
        nav.classList.add('is-active');
        body.classList.add('is-active');
      };

      const closeNav = () => {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        nav.classList.remove('is-active');
        body.classList.remove('is-active');

        const activeItems = document.querySelectorAll('.js-dropdown-nav__item.is-active');
        activeItems.forEach(activeItem => {
          closeItem(activeItem.querySelector('.js-dropdown-nav__header'));
        });
      };

      const toggleNav = () => {
        nav.classList.contains('is-active') ? closeNav() : openNav();
      };

      const openItem = (header) => {
        const item = header.closest('.js-dropdown-nav__item');
        const body = item.querySelector('.js-dropdown-body');
        if (!item || !body) return;

        header.setAttribute('aria-expanded', 'true');
        item.classList.add('is-active');
        requestAnimationFrame(() => body.style.maxHeight = `${body.scrollHeight}px`);
        body.setAttribute('aria-hidden', 'false');
      };

      const closeItem = (header) => {
        const item = header.closest('.js-dropdown-nav__item');
        const body = item.querySelector('.js-dropdown-body');
        if (!item || !body) return;

        header.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-active');
        body.style.maxHeight = '0px';
        body.setAttribute('aria-hidden', 'true');
      };

      const toggleItem = (e) => {
        const header = e.currentTarget;
        const item = header.closest('.js-dropdown-nav__item');
        const activeItems = document.querySelectorAll('.js-dropdown-nav__item.is-active');
        if (!item || !activeItems) return;

        activeItems.forEach(activeItem => {
          if (activeItem !== item) closeItem(activeItem.querySelector('.js-dropdown-nav__header'));
        });
        item.classList.contains('is-active') ? closeItem(header) : openItem(header);
      };

      const addEvent = () => {
        hamburger.addEventListener('click', toggleNav);
        nav.addEventListener('click', (e) => {
          if (e.target === nav) closeNav();
        });
        navHeaders.forEach(el => el.addEventListener('click', (e) => toggleItem(e)));
        bodyLinks.forEach(el => el.addEventListener('click', closeNav));

        navItems.forEach(el => {
          const header = el.querySelector('.js-dropdown-nav__header');
          el.addEventListener('focusout', (e) => {
            if (!el.contains(e.relatedTarget)) closeItem(header);
          });
        });

        if (isHoverDevice) {
          navItems.forEach(el => {
            const header = el.querySelector('.js-dropdown-nav__header');
            el.addEventListener('mouseenter', () => openItem(header));
            el.addEventListener('mouseleave', () => closeItem(header));
          });
        }
      };

      addEvent();
    };

    // tab
    const setupTab = () => {
      const headers = document.querySelectorAll('.js-tab-nav__header');
      if (!headers.length) return;

      const openTab = (header) => {
        const bodyId = header.getAttribute('aria-controls');
        const body = document.getElementById(bodyId);

        header.classList.add('is-active');
        header.setAttribute('aria-expanded', 'true');
        header.setAttribute('aria-selected', 'true');
        body.classList.add('is-active');
        body.setAttribute("aria-hidden", "false");
      };

      const closeTab = (header) => {
        const bodyId = header.getAttribute('aria-controls');
        const body = document.getElementById(bodyId);

        header.classList.remove('is-active');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-selected', 'false');
        body.classList.remove('is-active');
        body.setAttribute("aria-hidden", "true");
      };

      const toggleTab = (e) => {
        const header = e.currentTarget;

        if (header.classList.contains('is-active')) return;
        headers.forEach(activeHeader => {
          if (activeHeader !== header) closeTab(activeHeader);
        });

        openTab(header);
      };

      const addEvent = () => {
        headers.forEach(header => header.addEventListener('click', toggleTab));
      };

      addEvent();
    };

    // modal
    const setupModal = () => {
      const modals = document.querySelectorAll('.js-modal');
      const openButtons = document.querySelectorAll('.js-modal-open');
      const closeButtons = document.querySelectorAll('.js-modal-close');
      const body = document.querySelector('.js-body');
      if (!modals.length || !openButtons.length || !closeButtons.length || !body) return;

      const openModal = (e) => {
        const button = e.currentTarget;
        const modalId = button.getAttribute('aria-controls');
        const modal = document.getElementById(modalId);

        modal.showModal();
        modal.classList.add('is-active');
        body.classList.add('is-active');
      };

      const closeModal = (e) => {
        const button = e.currentTarget;
        const modalId = button.getAttribute('aria-controls');
        const modal = document.getElementById(modalId);

        body.classList.remove('is-active');
        modal.classList.remove('is-active');
        setTimeout(() => modal.close(), 300);
      };

      const addEvent = () => {
        openButtons.forEach(el => el.addEventListener('click', (e) => openModal(e)));
        closeButtons.forEach(el => el.addEventListener('click', (e) => closeModal(e)));
        modals.forEach(el => el.addEventListener('click', (e) => {
          if (e.target === el) closeModal({ currentTarget: el.querySelector('.js-modal-close') });
        }));
      };

      addEvent();
    };

    // slider
    const setupSlider = () => {
      if (!document.querySelector('.swiper01') || !document.querySelector('.swiper02')) return;

      const swiper01 = new Swiper('.swiper01', {
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 5000,
        },

        spaceBetween: 16,
        grabCursor: true,

        pagination: {
          el: '.swiper-pagination01',
          clickable: true,
        },

        navigation: {
          nextEl: '.swiper-button-next01',
          prevEl: '.swiper-button-prev01',
        },

        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          }
        }
      });

      const swiper02 = new Swiper('.swiper02', {
        speed: 1000,
        loop: true,
        loopAdditionalSlides: 1,
        spaceBetween: 16,
        grabCursor: true,
        watchSlidesProgress: true,

        pagination: {
          el: '.swiper-pagination02',
          clickable: true,
        },

        navigation: {
          nextEl: '.swiper-button-next02',
          prevEl: '.swiper-button-prev02',
        },

        breakpoints: {
          320: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
          }
        }
      });
    };

    // contact
    const setupContact = () => {
      const form = document.querySelector('.js-form');
      const name = document.getElementById('name');
      const tel = document.getElementById('tel');
      const email = document.getElementById('email');
      const confirmEmail = document.getElementById('confirm-email');
      const age = document.getElementById('age');
      const postalCode = document.getElementById('postal-code');
      const addressLevel1 = document.getElementById('address-level1');
      const addressLevel2 = document.getElementById('address-level2');
      const addressLine1 = document.getElementById('address-line1');
      const addressLine2 = document.getElementById('address-line2');
      const genders = document.querySelectorAll('.js-form__input[name="gender"]');
      const business = document.getElementById('business');
      const categories = document.querySelectorAll('.js-form__input[name="category"]');
      const materials = document.querySelectorAll('.js-form__input[name="material-type"]');
      const textarea = document.getElementById('textarea');
      const consent = document.getElementById('consent');
      const button = document.querySelector('.js-form__button');

      if (!form || !name || !tel || !email || !confirmEmail || !age ||
        !postalCode || !addressLevel1 || !addressLevel2 || !addressLine1 ||
        !addressLine2 || !business || !categories || !genders || !materials ||
        !textarea || !consent || !button) return;

      const showError = (element, message) => {
        const item = element.closest('.js-form__item');
        const error = item.querySelector('.js-form__error');
        if (!item || !error) return;

        error.classList.add('is-active');
        error.textContent = message;
      };

      const hideError = (element) => {
        const item = element.closest('.js-form__item');
        const error = item.querySelector('.js-form__error');
        if (!item || !error) return;

        error.classList.remove('is-active');
        error.textContent = '';
      };

      // name
      const validateName = () => {
        const errorFiled = 'お名前を入力してください。';

        if (!name.value.trim()) {
          showError(name, errorFiled);
          return false;
        } else {
          hideError(name);
          return true;
        }
      };

      // tel
      const validateTel = () => {
        const errorFiled = '電話番号を入力してください。';
        const errorFormat = '正しい電話番号を入力してください（例: 09012345678）。';
        const pattern = /^[0-9]{10,11}$/;

        if (!tel.value.trim()) {
          showError(tel, errorFiled);
          return false;
        } else if (!pattern.test(tel.value.trim())) {
          showError(tel, errorFormat);
          return false;
        } else {
          hideError(tel);
          return true;
        }
      };

      // email
      const validateEmail = () => {
        const errorFiled = 'メールアドレスを入力してください。';
        const errorFormat = '正しいメールアドレスを入力してください。（例: sample@gmail.com）。';
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.value.trim()) {
          showError(email, errorFiled);
          return false;
        } else if (!pattern.test(email.value.trim())) {
          showError(email, errorFormat);
          return false;
        } else {
          hideError(email);
          return true;
        }
      };

      // confirm email
      const validateConfirmEmail = () => {
        const errorFiled = 'メールアドレスを入力してください。';
        const errorEmail = 'メールアドレスが一致しません。';

        if (!confirmEmail.value.trim()) {
          showError(confirmEmail, errorFiled);
          return false;
        } else if (email.value !== confirmEmail.value) {
          showError(confirmEmail, errorEmail);
          return false;
        } else {
          hideError(confirmEmail);
          return true;
        }
      };

      // age
      const validateAge = () => {
        const errorFiled = '年齢を入力してください。';
        const errorFormat = '1〜100で入力してください（例: 25）。';
        const pattern = /^[1-9][0-9]?$|^100$/;

        if (!age.value.trim()) {
          showError(age, errorFiled);
          return false;
        } else if (!pattern.test(age.value.trim())) {
          showError(age, errorFormat);
          return false;
        } else {
          hideError(age);
          return true;
        }
      };

      // postal code
      const validatePostalCode = () => {
        const errorFiled = '郵便番号を入力してください。';
        const errorFormat = '半角数字７桁で入力してください（例: 3471234）。';
        const pattern = /^\d{7}$/;

        if (!postalCode.value.trim()) {
          showError(postalCode, errorFiled);
          return false;
        } else if (!pattern.test(age.value.trim())) {
          showError(postalCode, errorFormat);
          return false;
        } else {
          hideError(postalCode);
          return true;
        }
      };

      // addressLevel1
      const validateAddressLevel1 = () => {
        const errorFiled = '都道府県を入力してください。';

        if (!addressLevel1.value.trim()) {
          showError(addressLevel1, errorFiled);
          return false;
        } else {
          hideError(addressLevel1);
          return true;
        }
      };

      // addressLevel2
      const validateAddressLevel2 = () => {
        const errorFiled = '市区町村を入力してください。';

        if (!addressLevel2.value.trim()) {
          showError(addressLevel2, errorFiled);
          return false;
        } else {
          hideError(addressLevel2);
          return true;
        }
      };

      // addressLine1
      const validateAddressLine1 = () => {
        const errorFiled = '番地を入力してください。';

        if (!addressLine1.value.trim()) {
          showError(addressLine1, errorFiled);
          return false;
        } else {
          hideError(addressLine1);
          return true;
        }
      };

      // addressLine2
      const validateAddressLine2 = () => {
        const errorFiled = '建物名・部屋番号を入力してください。';

        if (!addressLine2.value.trim()) {
          showError(addressLine2, errorFiled);
          return false;
        } else {
          hideError(addressLine2);
          return true;
        }
      };

      // gender
      const validateGender = () => {
        const errorFiled = '性別を選択してください。';
        const radios = Array.from(genders);
        const isChecked = radios.some(radio => radio.checked);
        const firstRadio = radios[0];

        if (!isChecked) {
          showError(firstRadio, errorFiled);
          return false;
        } else {
          hideError(firstRadio);
          return true;
        }
      };

      // select
      const validateBusiness = () => {
        const errorFiled = 'ご職業を選択してください。';

        if (!business.value.trim()) {
          showError(business, errorFiled);
          return false;
        } else {
          hideError(business);
          return true;
        }
      };

      // categories
      const validateCategory = () => {
        const errorFiled = '問い合わせ種別を選択してください。';
        const radios = Array.from(categories);
        const isChecked = radios.some(radio => radio.checked);
        const firstRadio = radios[0];

        if (!isChecked) {
          showError(firstRadio, errorFiled);
          return false;
        } else {
          hideError(firstRadio);
          return true;
        }
      };

      // material
      const validateMaterial = () => {
        const errorFiled = '請求資料を選択してください。';
        const radios = Array.from(materials);
        const isChecked = radios.some(radio => radio.checked);
        const firstRadio = radios[0];

        if (!isChecked) {
          showError(firstRadio, errorFiled);
          return false;
        } else {
          hideError(firstRadio);
          return true;
        }
      };

      // textarea
      const validateTextArea = () => {
        const errorFiled = 'お問い合わせ内容を入力してください。';

        if (!textarea.value.trim()) {
          showError(textarea, errorFiled);
          return false;
        } else {
          hideError(textarea);
          return true;
        }
      };

      // consent
      const validateConsent = () => {
        const errorFiled = '利用規約に同意してください。';

        if (!consent.checked) {
          showError(consent, errorFiled);
          return false;
        } else {
          hideError(consent);
          return true;
        }
      };

      // form
      const validateForm = () => {
        const isNameValid = validateName();
        const isTelValid = validateTel();
        const isEmailValid = validateEmail();
        const isConfirmEmailValid = validateConfirmEmail();
        const isAgeValid = validateAge();
        const isPostalCode = validatePostalCode();
        const isAddressLevel1Valid = validateAddressLevel1();
        const isAddressLevel2Valid = validateAddressLevel2();
        const isAddressLine1Valid = validateAddressLine1();
        const isAddressLine2Valid = validateAddressLine2();
        const isGenderValid = validateGender();
        const isBusinessValid = validateBusiness();
        const isCategoryValid = validateCategory();
        const isMaterialValid = validateMaterial();
        const isTextAreaValid = validateTextArea();
        const isConsentValid = validateConsent();

        return (
          isNameValid &&
          isTelValid &&
          isEmailValid &&
          isConfirmEmailValid &&
          isAgeValid &&
          isPostalCode &&
          isAddressLevel1Valid &&
          isAddressLevel2Valid &&
          isAddressLine1Valid &&
          isAddressLine2Valid &&
          isGenderValid &&
          isBusinessValid &&
          isCategoryValid &&
          isMaterialValid &&
          isTextAreaValid &&
          isConsentValid
        );
      };

      const addEvent = () => {
        name.addEventListener('focusout', validateName);
        tel.addEventListener('focusout', validateTel);
        email.addEventListener('focusout', validateEmail);
        confirmEmail.addEventListener('focusout', validateConfirmEmail);
        age.addEventListener('focusout', validateAge);
        postalCode.addEventListener('focusout', validatePostalCode);
        addressLevel1.addEventListener('focusout', validateAddressLevel1);
        addressLevel2.addEventListener('focusout', validateAddressLevel2);
        addressLine1.addEventListener('focusout', validateAddressLine1);
        addressLine2.addEventListener('focusout', validateAddressLine2);
        genders.forEach(el => el.addEventListener('focusout', validateGender));
        business.addEventListener('focusout', validateBusiness);
        categories.forEach(el => el.addEventListener('focusout', validateCategory));
        materials.forEach(el => el.addEventListener('focusout', validateMaterial));
        textarea.addEventListener('focusout', validateTextArea);
        consent.addEventListener('change', validateConsent);
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (validateForm()) {
            form.submit();
          }
        });
      };

      addEvent();
    };

    const setupAll = () => {
      setupScrollVisible();
      setupHamburger();
      setupAccordion();
      setupDropdown();
      setupTab();
      setupModal();
      setupSlider();
      setupContact();
    };

    setupAll();
  });
}

