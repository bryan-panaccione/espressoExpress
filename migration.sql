DROP TABLE IF EXISTS userAccounts;
DROP TABLE IF EXISTS docBox;


CREATE TABLE docBox (
    id SERIAL PRIMARY KEY,
    doc_name TEXT,
    doc TEXT
);


CREATE TABLE userAccounts (
    id SERIAL PRIMARY KEY,
    userName TEXT,
    authToken TEXT
);



INSERT INTO userAccounts(userName, authToken) VALUES ('admin', 'Basic YWRtaW46bWVvd21peA=='); --admin meowmix
INSERT INTO userAccounts(userName, authToken) VALUES ('danny', 'Basic ZGFubnk6bWVvd21lb3c='); --danny meowmeow
INSERT INTO userAccounts(userName, authToken) VALUES ('bryan', 'Basic ZGFubnk6bWVvd21lb3c='); --bryan erikthecat

