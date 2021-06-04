const { Pool } = require('pg');

const db = new Pool();

// IIFE : Instantly Invoked Function Expression
(async () => {
    await db.connect();

    await db.end();

    await db.connect();
})();