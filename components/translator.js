const americanOnly = require('./american-only.js');
const britishOnly = require('./british-only.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const americanToBritishSpelling = require('./american-to-british-spelling.js');

class Translator {
    
    constructor() {
        this.americanOnly = americanOnly;
        this.britishOnly = britishOnly;
        this.americanToBritishTitles = americanToBritishTitles;
        this.britishToAmericanTitles = this.invertDictionary(americanToBritishTitles);
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.britishToAmericanSpelling = this.invertDictionary(americanToBritishSpelling);
        this.translationOccurred = false;
    }

    invertDictionary(obj) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[obj[key]] = key;
            return acc;
        }, {});
    }

    translate(text, locale) {
        let translatedText = text;
        this.translationOccurred = false;

        if (locale === 'american-to-british') {
            translatedText = this.translateTitles(translatedText, this.americanToBritishTitles, locale);
            translatedText = this.translateSpelling(translatedText, this.americanToBritishSpelling);
            translatedText = this.translatePhrases(translatedText, this.americanOnly, this.britishOnly);
            translatedText = this.translateTimes(translatedText, 'american-to-british');
        } else if (locale === 'british-to-american') {
            translatedText = this.translateTitles(translatedText, this.britishToAmericanTitles, locale);
            translatedText = this.translateSpelling(translatedText, this.britishToAmericanSpelling);
            translatedText = this.translatePhrases(translatedText, this.britishOnly, this.americanOnly);
            translatedText = this.translateTimes(translatedText, 'british-to-american');
        }

        if (!this.translationOccurred) {
            return "Everything looks good to me!";
        }

        return translatedText;
    }

    translateTitles(text, dictionary, locale) {    
        for (let [key, value] of Object.entries(dictionary)) {
            
            let regex;    
            if (locale === 'american-to-british') {
                regex = new RegExp(`\\b${this.escapeRegExp(key)}\\.?`, 'gi');
                text = text.replace(regex, (match) => {
                    this.translationOccurred = true;
                    return `<span class="highlight">${this.preserveCase(match.replace('.', ''), value)}</span>`;
                });
            } else if (locale === 'british-to-american') {
                regex = new RegExp(`\\b${this.escapeRegExp(key)}\\b(?=\\s[A-Za-z])`, 'gi');
                text = text.replace(regex, (match) => {
                    this.translationOccurred = true;

                    const charAfterTitle = text.charAt(text.indexOf(match) + match.length);

                    if (charAfterTitle !== '.') {
                        return `<span class="highlight">${this.preserveCase(match, key)}.</span>`;
                    } else {
                        return `<span class="highlight">${this.preserveCase(match, value)}</span>`;
                    }
                });
            };
        }
        return text;
    }    

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    translateSpelling(text, dictionary) {
        for (let [key, value] of Object.entries(dictionary)) {
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            text = text.replace(regex, (match) => {
                this.translationOccurred = true;
                return `<span class="highlight">${this.preserveCaseWord(match, value)}</span>`;
            });
        }
        return text;
    }

    translatePhrases(text, dictionary) {
        const sortedEntries = Object.entries(dictionary).sort((a, b) => b[0].length - a[0].length);
    
        for (let [key, value] of sortedEntries) {
            // Create regex to match whole phrases
            const regex = new RegExp(`\\b${this.escapeRegExp(key)}\\b`, 'gi');
            text = text.replace(regex, (match) => {
                this.translationOccurred = true;
                return `<span class="highlight">${this.preserveCaseWord(match, value)}</span>`;
            });
        }
        return text;
    }

    translateTimes(text, locale) {
        let regex, replacement;
        if (locale === 'american-to-british') {
            regex = /(\d{1,2}):(\d{2})/g;
            replacement = `<span class="highlight">$1.$2</span>`;
        } else if (locale === 'british-to-american') {
            regex = /(\d{1,2})\.(\d{2})/g;
            replacement = `<span class="highlight">$1:$2</span>`;
        }
        if (regex.test(text)) {
            text = text.replace(regex, replacement);
            this.translationOccurred = true;
        }
        return text;
    }

    preserveCase(original, translated) {
        const originalStringArray = original.split('');
        const translatedStringArray = translated.split('');
    
        const resultArray = translatedStringArray.map((char, index) => {
            if (index < originalStringArray.length) {
                if (originalStringArray[index] === originalStringArray[index].toUpperCase()) {
                    return char.toUpperCase();
                } else {
                    return char.toLowerCase();
                }
            }
            return char;
        });
    
        return resultArray.join('');
    }

    preserveCaseWord(original, translated) {
        const originalUpper = original.toUpperCase();
        const originalLower = original.toLowerCase();
        const originalTitleCase = original.charAt(0).toUpperCase() + original.slice(1).toLowerCase();

        if (original === originalUpper) {
            return translated.toUpperCase();
        } else if (original === originalLower) {
            return translated.toLowerCase();
        } else if (original === originalTitleCase) {
            return translated.charAt(0).toUpperCase() + translated.slice(1).toLowerCase();
        }

        return translated;
    }
    
}

module.exports = Translator;