export function getParent(el, parentSelector /* optional */)
{
    // If no parentSelector defined will bubble up all the way to *document*
    if (parentSelector === undefined) {
        parentSelector = document;
    }

    if (!el.matches(parentSelector + ' ' + el.tagName)) {
        // If element is not inside needed element, returning immediately.
        return null;
    }

    var p = el.parentNode;

    while (!p.matches(parentSelector)) {
        var o = p;
        //parents.push(o);
        p = o.parentNode;
    }
    return p;
}
