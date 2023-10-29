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
INSERT INTO booking (meeting_name, meeting_roomid, start_time, end_time, attendees) VALUES
  ('Team Meeting', 1, '2023-10-27T09:00:00.000Z', '2023-10-27T10:30:00.000Z', 'John.Smith@example.com, Mary.Johnson@example.com, Alice.Davis@example.com'),
  ('Client Presentation', 3, '2023-10-27T14:00:00.000Z', '2023-10-27T16:00:00.000Z', 'David.Wilson@example.com, Sarah.Brown@example.com'),
  ('Board Meeting', 5, '2023-10-28T10:00:00.000Z', '2023-10-28T12:00:00.000Z', 'Michael.Anderson@example.com, Lisa.Martinez@example.com'),
  ('Training Session', 8, '2023-10-29T15:00:00.000Z', '2023-10-29T17:00:00.000Z', 'Jennifer.Taylor@example.com, Richard.White@example.com'),
  ('Team Meeting', 2, '2023-10-30T09:30:00.000Z', '2023-10-30T11:00:00.000Z', 'Robert.Jackson@example.com, Emily.Lee@example.com'),
  ('Conference Call', 4, '2023-10-31T11:30:00.000Z', '2023-10-31T12:30:00.000Z', 'Daniel.Thomas@example.com, Jessica.Hall@example.com'),
  ('Client Meeting', 6, '2023-11-01T16:00:00.000Z', '2023-11-01T17:30:00.000Z', 'Karen.Perez@example.com, Christopher.Adams@example.com'),
  ('Workshop', 9, '2023-11-02T13:00:00.000Z', '2023-11-02T16:00:00.000Z', 'Mark.Scott@example.com, Laura.Evans@example.com'),
  ('Executive Meeting', 10, '2023-11-03T10:00:00.000Z', '2023-11-03T11:30:00.000Z', 'William.Rodriguez@example.com, Elizabeth.Harris@example.com'),
  ('Team Huddle', 7, '2023-11-04T09:30:00.000Z', '2023-11-04T10:30:00.000Z', 'John.Smith@example.com, Mary.Johnson@example.com');


