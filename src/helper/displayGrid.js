"use strict";
module.exports = function displayGrid(wss, grid) {
    wss.clients.forEach(function each(client) {
        client.send(`\n ${grid.slice(0, 3).join(" | ")} \n\n ${grid
            .slice(3, 6)
            .join(" | ")} \n\n ${grid.slice(6, 9).join(" | ")}  \n `);
    });
};
