const mysql = require("mysql2");

// Create connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pooja@2005"
});

// Connect to MySQL
con.connect((err) => {
    if (err) {
        console.error("Connection Failed!");
        console.error(err);
        return;
    }

    console.log("✅ Connected to MySQL!");

    // Create Database
    con.query("CREATE DATABASE IF NOT EXISTS appon", (err) => {
        if (err) throw err;
        console.log("✅ Database 'appon' created.");

        // Use Database
        con.query("USE appon", (err) => {
            if (err) throw err;

            // Create Table
            const createTable = `
            CREATE TABLE IF NOT EXISTS alia (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20),
                address VARCHAR(20)
            )`;

            con.query(createTable, (err) => {
                if (err) throw err;
                console.log("✅ Table created.");

                // Insert Records
                const insertData = `
                INSERT INTO alia(name,address)
                VALUES
                ('sanjay','new delhi'),
                ('maya','mysore'),
                ('sanju','bangalore'),
                ('manju','mangalore')`;

                con.query(insertData, (err) => {
                    if (err) throw err;
                    console.log("✅ Records inserted.");

                    // Display Records
                    con.query("SELECT * FROM alia", (err, result) => {
                        if (err) throw err;

                        console.log("\n===== ALL RECORDS =====");
                        console.table(result);

                        // Display One Record
                        con.query(
                            "SELECT * FROM alia WHERE id=1",
                            (err, result) => {
                                if (err) throw err;

                                console.log("\n===== RECORD WITH ID=1 =====");
                                console.table(result);

                                // Update Record
                                con.query(
                                    "UPDATE alia SET name='Mamatha' WHERE id=3",
                                    (err) => {
                                        if (err) throw err;
                                        console.log("✅ Record updated.");

                                        // Delete Record
                                        con.query(
                                            "DELETE FROM alia WHERE id=2",
                                            (err) => {
                                                if (err) throw err;
                                                console.log("✅ Record deleted.");

                                                // Show Final Records
                                                con.query(
                                                    "SELECT * FROM alia",
                                                    (err, result) => {
                                                        if (err) throw err;

                                                        console.log("\n===== FINAL TABLE =====");
                                                        console.table(result);

                                                        console.log("\n🎉 Assignment Completed Successfully!");

                                                        con.end();
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    });
                });
            });
        });
    });
});