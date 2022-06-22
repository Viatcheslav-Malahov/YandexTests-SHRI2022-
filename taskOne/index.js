let rootNode = document.querySelector('.root');
function renderWaterfall(rootNode, columnCount, elementGap) {
    const childrenNodesArray = Array.from(rootNode.children);
    let columnHeightArray = [];

    for (let i = 0; i < childrenNodesArray.length; i++) {
        childrenNodesArray[i].remove()
    }

    let columnsCountRow = '';
    for (let i = 0; i < columnCount; i++) {
        if (i === 0) {
            columnsCountRow += '1fr'
        }
        else {
            columnsCountRow += ' 1fr'
        }

        const element = document.createElement('div');
        element.classList.add(`col${i}`)
        element.style.display = 'grid';
        element.style.gridTemplateColumns = '1fr';
        element.style.gridGap = elementGap + 'em';
        rootNode.append(element)
        columnHeightArray.push(0);
    }

    rootNode.style.display = 'grid';
    rootNode.style.gridGap = elementGap + 'em';
    rootNode.style.gridTemplateColumns = columnsCountRow;
    rootNode.innerHtml = '';

    for (let i = 0; i < childrenNodesArray.length; i++) {
        childrenNodesArray[i].classList.add(`child${i}`)
        document.querySelector(`.col${0}`).append(childrenNodesArray[i]);
        const childrenNodeHeight = +window.getComputedStyle(childrenNodesArray[i], null).height.slice(0, -2);
        document.querySelector(`.col${0}`).querySelector(`.child${i}`).remove();
        console.log(childrenNodeHeight);

        const limits = columnHeightArray.reduce(function (limits, element, index, array) {
            limits.max = element > array[limits.max] ? index : limits.max;
            limits.min = element < array[limits.min] ? index : limits.min;
            return limits;
        }, { max: 0, min: 0 });

        columnHeightArray[limits.min] += childrenNodeHeight
        document.querySelector(`.col${limits.min}`).append(childrenNodesArray[i]);
        
    }
}
