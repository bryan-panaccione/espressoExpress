DROP TABLE IF EXISTS userAccounts;
DROP TABLE IF EXISTS docBox;
DROP TABLE IF EXISTS noteCards;
DROP TABLE IF EXISTS pets;


CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    breed TEXT,
    kind TEXT,
    vax_status BOOLEAN,
    good_w_kids BOOLEAN,
    good_w_animals BOOLEAN,
    about_pet TEXT
);


INSERT INTO pets(name, age, breed, kind, vax_status, good_w_kids, good_w_animals, about_pet) VALUES 
('Audie', 4, 'Lab-GSD Mix', 'dog', true, true, false, 'Audie is a high energy loving dog that is dominant-assertive'),
('Dewey', 7, 'Rottweiler-Heeler Mix', 'dog', true, true, true, 'Dewey is a laid back and chill pup'),
('Schmitt', 8, 'Orange Shorthair', 'cat', true, true, true, 'Schmitt is an adventurer'),
('Erik', 8, 'Grey Shorthair', 'cat', true, true, true, 'He likes to get up high and watch over his domain'),
('Jorge', 8, 'Calico', 'cat', true, false, true, 'She will bite your child'),
('Stella', 8, 'Chihuaha', 'dog', true, false, false, 'Seriously unpleasant, but weirdly cute and lovable'),
('Bella', 8, 'British Long Hair', 'cat', true, true, true, 'Highly instagramable feline companion'),
('Papaya', 8, 'Ball Python', 'reptile', false, true, false, 'It curls up in a ball, pretty much just chills'),
('Melon', 8, 'Rose Hair Tarantula', 'critter', false, false, false, 'Not as creepy as you would think'),
('Cash', 8, 'GSD', 'dog', true, false, false, 'Such a good boy'),
('Ruger', 8, 'English Shepherd', 'dog', true, false, false, 'Floof. lots of floof.'),
('Reeces', 2, 'Bearded Dragon', 'reptile', false, true, true, 'Them yella spotted lizerds will keel u. But not this one.'),
('Relish', 8, 'Spitting Cobra', 'reptile', false, false, false, 'One of the most murderous and dangerous things in existence'),
('Shark-bait', 8, 'Mouse, white', 'critter', false, true, true, 'We know he is most likely going to become snake food.')




