-- step 1 incase there is a database already, drop it
DROP DATABASE IF EXISTS reserve;

--step 2 create the db
CREATE DATABASE reserve; 

--step 3 connect to the db
\c reserve; 

--step 4 create the tables
DROP TABLE IF EXISTS meeting;
CREATE TABLE meeting(
    meeting_roomid SERIAL PRIMARY KEY,
    room_name TEXT,
    capacity INTEGER,
    floor INTEGER
   
);

DROP TABLE IF EXISTS booking;
CREATE TABLE booking(
    booking_id SERIAL PRIMARY KEY,
    meeting_name TEXT,
    book_meeting_roomid INTEGER NOT NULL REFERENCES meeting(meeting_roomid)
    ON DELETE CASCADE,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    attendees TEXT
);

