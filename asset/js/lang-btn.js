const changeContentToEnglish = () => {
    const elements = document.querySelectorAll('[data-lang-en]');
    elements.forEach(element => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', element.getAttribute('data-lang-en'));
        }
        if (element.type === 'button' || element.type === 'submit') {
          element.value = element.getAttribute('data-lang-en');
        }
      } else {
        element.innerText = element.getAttribute('data-lang-en');
      }
    });
  };

const changeContentToPortuguese = () => {
    const elements = document.querySelectorAll('[data-lang-pt]');
    elements.forEach(element => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', element.getAttribute('data-lang-pt'));
        }
        if (element.type === 'button' || element.type === 'submit') {
          element.value = element.getAttribute('data-lang-pt');
        }
      } else {
        element.innerText = element.getAttribute('data-lang-pt');
      }
    });
  };
  
  const switchLanguage = () => {
    const currentLang = document.documentElement.lang;
    const button = document.getElementById('lang-btn');
  
    if (currentLang === 'pt') {
      document.documentElement.lang = 'en';
      button.innerText = button.getAttribute('data-lang-en');
      changeContentToEnglish();
      storeLanguagePreference('en');
    } else {
      document.documentElement.lang = 'pt';
      button.innerText = button.getAttribute('data-lang-pt');
      changeContentToPortuguese();
      storeLanguagePreference('pt');
    }
  };
  
  const storeLanguagePreference = (lang) => {
    localStorage.setItem('language', lang);
  };
  
  const getStoredLanguage = () => {
    return localStorage.getItem('language');
  };
  
  const applyStoredLanguage = () => {
    const storedLang = getStoredLanguage();
    if (storedLang) {
      document.documentElement.lang = storedLang;
      const button = document.getElementById('lang-btn');
      if (storedLang === 'en') {
        button.innerText = button.getAttribute('data-lang-en');
        changeContentToEnglish();
      } else {
        button.innerText = button.getAttribute('data-lang-pt');
        changeContentToPortuguese();
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
      applyStoredLanguage();
      document.getElementById('lang-btn').addEventListener('click', switchLanguage);
  });

  function carregarConteudo(url, event) {
      event.preventDefault();
      fetch(url)
          .then(response => response.text())
          .then(data => {
              document.getElementById('conteudo-principal').innerHTML = data;
              applyStoredLanguage(); 
          })
          .catch(error => console.error("Erro ao carregar conteúdo:", error));
  }