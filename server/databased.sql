create table task (
    id serial primary key,
    description varchar(255) not null

);
insert into task (description) values
('Complete the project documentation'),
('Review code for the new feature'),
('Fix bugs reported by QA team'),
('Prepare presentation for the client meeting'),
('Update the project roadmap');