DROP TABLE IF EXISTS userAccounts;
DROP TABLE IF EXISTS docBox;
DROP TABLE IF EXISTS noteCards;


CREATE TABLE docBox (
    id SERIAL PRIMARY KEY,
    doc_name TEXT,
    doc TEXT
);


CREATE TABLE noteCards (
    id SERIAL PRIMARY KEY,
    title TEXT,
    body_text TEXT
);


INSERT INTO noteCards(title, body_text) VALUES ('Note 1', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 2', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 3', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 4', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 5', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 6', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
INSERT INTO noteCards(title, body_text) VALUES ('Note 7', 'lorem kd;akln jdjdks kdkslke nkldsn nkfdlasie'); --bryan erikthecat
