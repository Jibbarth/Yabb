// Enable chromereload by uncommenting this line:
//import 'chromereload/devonly'
import elementReady from 'element-ready';

const dom = require('./dom-browse.js');
const hljs = require('highlight.js');

init();

function init()
{
    elementReady('.diff-container').then(() => {
        highlight();
    });
}

/**
 * Check when dom change to reapply highlight
 */
function checkChange()
{
    elementReady('#pr-tab-content').then(() => {
        // Configuration of the observer:
        const config = { childList: true, subtree: true };
        // Create an observer instance
        const observer = new MutationObserver(function (mutations) {
            var diff = document.querySelector('.diff-container');
            if (null != diff) {
                this.disconnect();
                highlight();
            }
        });

        const target = document.querySelector('#pr-tab-content');
        observer.observe(target, config);
    });
}
/**
 * Apply highlight on dom
*/
function highlight()
{
    var diffContainer = document.querySelectorAll('.diff-container');

    diffContainer.forEach(function(diff, index) {
        var diffLineBlock = diff.querySelectorAll('.udiff-line');

        diffLineBlock.forEach(function(block, i) {
            cleanBlock(block);
        });
    });

    checkChange();
}
/**
 * Clean a block, guess language, init highlight
 *
 * @param {HTMLElement} block
 */
function cleanBlock(block){
    var language = guessLanguage(block);
    var sourceBlock = block.querySelector('pre.source');

    if (null != sourceBlock) {
        // Don't highlight on patch
        if (language == 'patch') {
            return;
        }
        sourceBlock.classList.add(language);
        hljs.highlightBlock(sourceBlock);
    }
}

/**
 * Guess language of htmlElement by finding parents container with filename
 * and retrieving extension
 *
 * @param {HTMLElement} block
 */
function guessLanguage(block)
{
    var parent = dom.getParent(block, '.bb-udiff');
    var language = parent.dataset.identifier.split('.').pop();

    if (language == 'phtml') {
        language = 'php';
    }

    return language;
}
