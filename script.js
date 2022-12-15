document.addEventListener('DOMContentLoaded', function () {

    /**
     * Get the actual width of an element, taking into account margins
     * as well:
     */
    function getElementWidth(element) {
        const style = window.getComputedStyle(element);

        // Assuming margins are in px:
        return element.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    }

    /**
     * Find the index of the widest element that fits in the available
     * space:
     */
    function getBestFit(elements, availableSpace) {
        let minAvailableSpace = availableSpace;
        let bestFitIndex = -1;

        elements.forEach((element, i) => {
            if (element.used) {
                return;
            }

            const elementAvailableSpace = availableSpace - element.width;

            if (elementAvailableSpace >= 0 && elementAvailableSpace < minAvailableSpace) {
                minAvailableSpace = elementAvailableSpace;
                bestFitIndex = i;
            }
        });

        return bestFitIndex;
    }

    /**
     * Get the first element that hasn't been used yet.
     */
    function getFirstNotUsed(elements) {
        for (let element of elements) {
            if (!element.used) {
                return element;
            }
        }
    }


// Sort the elements according to their actual width:

    const categoryList = document.getElementById('categoryList');
    const rows = categoryList.dataset.rows || null;
    const columns = categoryList.dataset.columns || null;
    const totalSpace = categoryList.clientWidth;
    const items = Array.from(categoryList.children).map((element) => {
        return {
            element,
            used: false,
            width: getElementWidth(element),
        };
    });

    if (rows) {

    }

    if (columns) {
        let columnItems = {};
        for (let i = 0; i < columns; i++) {
            columnItems[i] = document.createElement('div');
        }

        const columnWidth = totalSpace / columns;

    }

    const totalItems = items.length;

// We want to keep the first element in the first position:
    const firstItem = items[0];
    const sortedElements = [firstItem.element];

    firstItem.used = true;

// We calculate the remaining space in the first row:
    let availableSpace = totalSpace - firstItem.width;

// We sort the other elements:
    for (let i = 1; i < totalItems; ++i) {
        const bestFitIndex = getBestFit(items, availableSpace);

        let item;

        if (bestFitIndex === -1) {
            // If there's no best fit, we just take the first element
            // that hasn't been used yet to keep their order as close
            // as posible to the initial one:
            item = getFirstNotUsed(items);
            availableSpace = totalSpace - item.width;
        } else {
            item = items[bestFitIndex];
            availableSpace -= item.width;
        }

        sortedElements.push(item.element);
        item.used = true;
    }

    sortedElements.forEach((element) => {
        // When appending an element that is already a child, it will not
        // be duplicated, but removed from the old position first and then
        // added to the new one, which is exactly what we want:

        categoryList.appendChild(element);
    });

    // Expande elementos para ocupar o espaço disponível
    categoryList.classList.add('expand');

}, false);
