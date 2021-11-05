INSERT INTO books (ID, title, release_year, genre_id, language_id)
VALUES
    (1, 'Taru Sormustern Herrasta', 1954, 2, 1),
    (2, 'Silmarillion', 1977, 2, 2),
    (3, 'Hitchhiker', 1979, 1, 1);

CREATE TABLE books (
    ID INT PRIMARY KEY          NOT NULL,
    title           CHAR(50)    NOT NULL,
    release_year    INT         NOT NULL,
    genre_id        INT         NOT NULL,
    language_id     INT         NOT NULL
);