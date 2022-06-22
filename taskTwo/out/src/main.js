// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
function pointToString(point) {
    return '' + point.x + ':' + point.y;
}
const visited = new Set();
let stop = false;
export default function main(game, start) {
    return new Promise((resolve) => {
        function bPoint(point) {
            if (stop)
                return;
            const pointString = pointToString(point);
            if (visited.has(pointString)) {
                return;
            }
            visited.add(pointString);
            const { x, y } = point;
            game.state(x, y).then((state) => {
                if (state.finish) {
                    resolve({ x, y });
                    stop = true;
                }
            });
            let nextPoint;
            nextPoint = { x, y: y - 1 };
            if (!visited.has(pointToString(nextPoint)))
                game
                    .up(x, y)
                    .then(() => bPoint({ x, y: y - 1 }))
                    .catch(() => { });
            nextPoint = { x: x + 1, y };
            if (!visited.has(pointToString(nextPoint)))
                game
                    .right(x, y)
                    .then(() => bPoint({ x: x + 1, y }))
                    .catch(() => { });
            nextPoint = { x, y: y + 1 };
            if (!visited.has(pointToString(nextPoint)))
                game
                    .down(x, y)
                    .then(() => bPoint({ x, y: y + 1 }))
                    .catch(() => { });
            nextPoint = { x: x - 1, y };
            if (!visited.has(pointToString(nextPoint)))
                game
                    .left(x, y)
                    .then(() => bPoint({ x: x - 1, y }))
                    .catch(() => { });
        }
        bPoint(start);
    }).then((result) => result);
}
