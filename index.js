import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

//mine - "postgresql://shahzebakhtar66:z7v6bFPRiafu@ep-rough-salad-a5d5qaw2.us-east-2.aws.neon.tech/prisma_migrate_shadow_db_13c76688-1fee-4e73-8528-e144b56639fd?sslmode=require"
//chirag -"postgresql://hostel_management_owner:asZVF0OIb5lR@ep-young-glitter-a5e90unc.us-east-2.aws.neon.tech/hostel_management?sslmode=require"
const app = express()
app.use(cors());
app.use(express.json())
let pool;
try {
     pool = new Pool({
        connectionString:"postgresql://hostel_management_owner:asZVF0OIb5lR@ep-young-glitter-a5e90unc.us-east-2.aws.neon.tech/hostel_management?sslmode=require"
    })
    console.log("Connect to DATABASE")
} catch (error) {
    console.log("erro in connecting to db",error)
}

// const createTAble = pool.query(
//     `
//     CREATE TABLE IF NOT EXISTS hostel_manage (
//         id SERIAL PRIMARY KEY,
//         roomNo INTEGER NOT NULL UNIQUE,
//         hostelName VARCHAR(255) NOT NULL,
//         student1 VARCHAR(255)  ,
//         student2 VARCHAR(255) 
//     )
//     `,
//     (err, res) => {
//         if (err) {
//             console.error("Error creating hostel_manage table:", err);
//         } else {
//             console.log("Hostel table created successfully");
//         }
//     }
// );
// const createTAble2 = pool.query(
//     `
//     CREATE TABLE IF NOT EXISTS occupancy (
//         id SERIAL PRIMARY KEY,
//         roomNo INTEGER ,
//         hostelName VARCHAR(255) NOT NULL,
//         student1 VARCHAR(255) ,
//         student2 VARCHAR(255) ,
//         occupied INTEGER NOT NULL DEFAULT 0
//     )
// `
// ,(err,res)=>{
//     if (err) {
//         console.error("Error creating occupancy table:", err);
//     } else {
//         console.log("Occupancy table created successfully");
//     }
// })

app.post("/book-room",async(req,res)=>{
    
    const {roomNo,hostelName,username} = req.body;
    console.log(roomNo,hostelName,username)
    try {
        // Check if the room is already occupied
        const checkOccupancyQuery = `
            SELECT * FROM hostel_manage
            WHERE roomNo = $1 AND hostelName = $2
        `;
        const occupancyCheckResult = await pool.query(checkOccupancyQuery, [roomNo, hostelName]);

        if (occupancyCheckResult.rows.length > 0) {
            const existingBooking = occupancyCheckResult.rows[0];
            if (!existingBooking.student1) {
                // If student1 is null, fill student1
                const updateQuery = `
                    UPDATE hostel_manage
                    SET student1 = $1
                    WHERE roomNo = $2 AND hostelName = $3
                    RETURNING *
                `;
                const updateResult = await pool.query(updateQuery, [username, roomNo, hostelName]);
                const updateOcc = `
                UPDATE occupancy
                SET student1 = $1,
                WHERE roomNo = $2 AND hostelName = $3 
                RETURNING *
                `;
                const updateOccuResu = await pool.query(updateOcc, [username, roomNo, hostelName]);
                return res.status(200).json({ message: "Room booked successfully", booking: updateResult.rows[0] });
            } else if (!existingBooking.student2) {
                // If student1 is not null but student2 is null, fill student2
                const updateQuery = `
                    UPDATE hostel_manage
                    SET student2 = $1
                    WHERE roomNo = $2 AND hostelName = $3
                    RETURNING *
                `;
                console.log("Over here")
                const updateOcc = `
                UPDATE occupancy
                SET student2 = $1,
                    occupied = 1
                WHERE roomNo = $2 AND hostelName = $3 
                RETURNING *
                `;
                const updateResult = await pool.query(updateQuery, [username, roomNo, hostelName]);
                const updateOcuupa = await pool.query(updateOcc, [username, roomNo, hostelName]);
                
                return res.status(200).json({ message: "Room booked successfully", booking: updateResult.rows[0] });
            } else {
                return res.status(400).json({ message: "Room is already fully occupied" });
            }
        } else {
            // Insert a new booking into the hostel_manage table
            const insertBookingQuery = `
                INSERT INTO hostel_manage (roomNo, hostelName, student1)
                VALUES ($1, $2, $3)
                RETURNING *
            `;

            const insertOccupancy = `INSERT INTO occupancy (roomNo,hostelName,student1) VALUES ($1, $2, $3)
            RETURNING *`

            const insertResult = await pool.query(insertBookingQuery, [roomNo, hostelName, username]);

            const occupancyRes = await pool.query(insertOccupancy,[roomNo, hostelName, username]);
            return res.status(200).json({ message: "Room booked successfully", booking: insertResult.rows[0],occupancyRes:occupancyRes });
        }
    } catch (error) {
        console.error("Error in booking room:", error);
        return res.status(500).json({ message: "Failed to book room" });
    }
    
})

app.post("/hostel-rooms",async(req,res)=>{
    const {hostelName,occupied} = req.body;
   
    console.log(hostelName,occupied)

    try {
        if(occupied==null){
        const quStatment = `
        SELECT student1,student2,roomNo FROM occupancy WHERE hostelName = $1 `
        const query = await pool.query(quStatment,[hostelName]);
        return res.json({message:query.rows})
        }
        else{
            const quStatment = `
            SELECT student1,student2,roomNo FROM occupancy WHERE hostelName = $1 AND occupied = $2`
            const query = await pool.query(quStatment,[hostelName,occupied]);
            return res.json({message:query.rows})
            }
       
    } catch (error) {
        return res.status(400).json({message:error})
    }
})


app.get("/",(req,res)=>{
    return res.json("dskjbds");
})

app.listen(3000,()=>{
    console.log("Server is running")
})