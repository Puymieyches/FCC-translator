'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (text === '') {
          return res.json({ error: 'No text to translate' });
      }

      const validLocales = ['american-to-british', 'british-to-american'];
      if (!validLocales.includes(locale)) {
          return res.json({ error: 'Invalid value for locale field' });
      }

      if (!text || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Translate
      const translation = translator.translate(text, locale);

      // If no translation occurred, return the success message
      if (translation === "Everything looks good to me!") {
          return res.json({ text, translation });
      }

      // Return the original text and the translated text
      return res.json({ text, translation });
      
    });
};
