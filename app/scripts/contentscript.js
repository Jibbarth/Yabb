// Enable chromereload by uncommenting this line:
//import 'chromereload/devonly'
const hljs = require('highlight.js');
const $ = require("jquery")
const waitRender = require('./wait-render.js');


waitRender('.diff-container').then(() => {
    console.info("[Yabb] Init Highlight");

    $('pre.source').each(function(i, block) {
        // Add language as class to help Highlight
        var language = guessLanguage(block);
        $(block).addClass(language);

        hljs.highlightBlock(block);
    });
});

/**
 * Guess language of htmlElement by finding parents container with filename
 * and retrieving extension
 *
 * @param {HTMLElement} block
 */
function guessLanguage(block)
{
    return $(block).parents('.iterable-item').data('identifier').split('.').pop();
}
