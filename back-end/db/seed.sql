\c reserve;
-- Insert 'meeting'
-- Seed data for the "meeting" table
INSERT INTO meetingRoom (room_name, capacity, floor) VALUES
  ('Meeting Room 101', 10, 1),
  ('Meeting Room 102', 8, 1),
  ('Conference Room A', 20, 2),
  ('Conference Room B', 15, 2),
  ('Board Room 1', 12, 3),
  ('Board Room 2', 10, 3),
  ('Small Meeting Room', 6, 1),
  ('Training Room 1', 30, 2),
  ('Training Room 2', 25, 2),
  ('Executive Suite', 5, 4);

-- Seed data for the "booking" table

-- Seed data for the "booking" table with working hours and time intervals in the afternoon (PM) in EST time
INSERT INTO booking (meeting_name, book_meeting_roomid, start_time, end_time, attendees) VALUES
  ('Team Meeting', 1, '2023-10-27 19:00:00.000Z', '2023-10-27 20:00:00.000Z', 'john@example.com, mary@example.com, alice@example.com'),
  ('Client Presentation', 3, '2023-10-27 19:30:00.000Z', '2023-10-27 20:30:00.000Z', 'david@example.com, sarah@example.com'),
  ('Board Meeting', 5, '2023-10-28 20:00:00.000Z', '2023-10-28 21:00:00.000Z', 'michael@example.com, lisa@example.com'),
  ('Training Session', 8, '2023-10-29 19:30:00.000Z', '2023-10-29 20:30:00.000Z', 'jennifer@example.com, richard@example.com'),
  ('Team Meeting', 2, '2023-10-30 20:00:00.000Z', '2023-10-30 21:00:00.000Z', 'robert@example.com, emily@example.com'),
  ('Conference Call', 4, '2023-10-31 19:00:00.000Z', '2023-10-31 20:30:00.000Z', 'daniel@example.com, jessica@example.com'),
  ('Client Meeting', 6, '2023-11-01 21:30:00.000Z', '2023-11-01 22:30:00.000Z', 'karen@example.com, christopher@example.com'),
  ('Workshop', 9, '2023-11-02 18:00:00.000Z', '2023-11-02 19:00:00.000Z', 'mark@example.com, laura@example.com'),
  ('Executive Meeting', 10, '2023-11-03 20:30:00.000Z', '2023-11-03 21:30:00.000Z', 'william@example.com, elizabeth@example.com'),
  ('Team Huddle', 7, '2023-11-04 19:30:00.000Z', '2023-11-04 20:30:00.000Z', 'john@example.com, mary@example.com');

