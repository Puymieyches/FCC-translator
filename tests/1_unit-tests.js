const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
    suite('To British English', () => {
        test('Mangoes are my favorite fruit.', function() {
            const input = "Mangoes are my favorite fruit.";
            assert.equal(
                translator.translate(input, "american-to-british"), `Mangoes are my <span class="highlight">favourite</span> fruit.`
            );
        });
        test('I ate yogurt for breakfast.', function() {
            const input = "I ate yogurt for breakfast.";
            assert.equal(
                translator.translate(input, "american-to-british"), `I ate <span class="highlight">yoghurt</span> for breakfast.`
            );
        });
        test("We had a party at my friend's condo.", function() {
            const input = "We had a party at my friend's condo.";
            assert.equal(
                translator.translate(input, "american-to-british"), `We had a party at my friend's <span class="highlight">flat</span>.`
            );
        });
        test("Can you toss this in the trashcan for me?", function() {
            const input = "Can you toss this in the trashcan for me?";
            assert.equal(
                translator.translate(input, "american-to-british"), `Can you toss this in the <span class="highlight">bin</span> for me?`
            );
        });
        test("The parking lot was full.", function() {
            const input = "The parking lot was full.";
            assert.equal(
                translator.translate(input, "american-to-british"), `The <span class="highlight">car park</span> was full.`
            );
        });
        test("Like a high tech Rube Goldberg machine.", function() {
            const input = "Like a high tech Rube Goldberg machine.";
            assert.equal(
                translator.translate(input, "american-to-british"), `Like a high tech <span class="highlight">Heath Robinson device</span>.`
            );
        });
        test("To play hooky means to skip class or work.", function() {
            const input = "To play hooky means to skip class or work.";
            assert.equal(
                translator.translate(input, "american-to-british"), `To <span class="highlight">bunk off</span> means to skip class or work.`
            );
        });
        test("No Mr. Bond, I expect you to die.", function() {
            const input = "No Mr. Bond, I expect you to die.";
            assert.equal(
                translator.translate(input, "american-to-british"), `No <span class="highlight">Mr</span> Bond, I expect you to die.`
            );
        });
        test("Dr. Grosh will see you now.", function() {
            const input = "Dr. Grosh will see you now.";
            assert.equal(
                translator.translate(input, "american-to-british"), `<span class="highlight">Dr</span> Grosh will see you now.`
            );
        });
        test("Lunch is at 12:15 today.", function() {
            const input = "Lunch is at 12:15 today.";
            assert.equal(
                translator.translate(input, "american-to-british"), `Lunch is at <span class="highlight">12.15</span> today.`
            );
        });
    });

    suite('To American English', () => {
        test("We watched the footie match for a while.", function() {
            const input = "We watched the footie match for a while.";
            assert.equal(
                translator.translate(input, "british-to-american"), `We watched the <span class="highlight">soccer</span> match for a while.`
            );
        });
        test("Paracetamol takes up to an hour to work.", function() {
            const input = "Paracetamol takes up to an hour to work.";
            assert.equal(
                translator.translate(input, "british-to-american"), `<span class="highlight">Tylenol</span> takes up to an hour to work.`
            );
        });
        test("First, caramelise the onions.", function() {
            const input = "First, caramelise the onions.";
            assert.equal(
                translator.translate(input, "british-to-american"), `First, <span class="highlight">caramelize</span> the onions.`
            );
        });
        test("I spent the bank holiday at the funfair.", function() {
            const input = "I spent the bank holiday at the funfair.";
            assert.equal(
                translator.translate(input, "british-to-american"), `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
            );
        });
        test("I had a bicky then went to the chippy.", function() {
            const input = "I had a bicky then went to the chippy.";
            assert.equal(
                translator.translate(input, "british-to-american"), `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`
            );
        });
        test("I've just got bits and bobs in my bum bag.", function() {
            const input = "I've just got bits and bobs in my bum bag.";
            assert.equal(
                translator.translate(input, "british-to-american"), `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
            );
        });
        test("The car boot sale at Boxted Airfield was called off.", function() {
            const input = "The car boot sale at Boxted Airfield was called off.";
            assert.equal(
                translator.translate(input, "british-to-american"), `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
            );
        });
        test("Have you met Mrs Kalyani?", function() {
            const input = "Have you met Mrs Kalyani?";
            assert.equal(
                translator.translate(input, "british-to-american"), `Have you met <span class="highlight">Mrs.</span> Kalyani?`
            );
        });
        test("Prof Joyner of King's College, London.", function() {
            const input = "Prof Joyner of King's College, London.";
            assert.equal(
                translator.translate(input, "british-to-american"), `<span class="highlight">Prof.</span> Joyner of King's College, London.`
            );
        });
        test("Tea time is usually around 4 or 4.30.", function() {
            const input = "Tea time is usually around 4 or 4.30.";
            assert.equal(
                translator.translate(input, "british-to-american"), `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
            );
        });
    });

    suite('Highlight', () => {
        test('Mangoes are my favorite fruit.', function() {
            const input = "Mangoes are my favorite fruit.";
            assert.equal(
                translator.translate(input, "american-to-british"), `Mangoes are my <span class="highlight">favourite</span> fruit.`
            );
        });
        test('I ate yogurt for breakfast.', function() {
            const input = "I ate yogurt for breakfast.";
            assert.equal(
                translator.translate(input, "american-to-british"), `I ate <span class="highlight">yoghurt</span> for breakfast.`
            );
        });
        test("We watched the footie match for a while.", function() {
            const input = "We watched the footie match for a while.";
            assert.equal(
                translator.translate(input, "british-to-american"), `We watched the <span class="highlight">soccer</span> match for a while.`
            );
        });
        test("Paracetamol takes up to an hour to work.", function() {
            const input = "Paracetamol takes up to an hour to work.";
            assert.equal(
                translator.translate(input, "british-to-american"), `<span class="highlight">Tylenol</span> takes up to an hour to work.`
            );
        });
    });
});
