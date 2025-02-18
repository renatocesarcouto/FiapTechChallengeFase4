CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(120) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    teacher_id INTEGER REFERENCES teachers(id)
);

INSERT INTO teachers (name, email, password) VALUES
('Maria Silva', 'maria@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
('João Santos', 'joao@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
('Ana Oliveira', 'ana@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f');

INSERT INTO students (name, email, password) VALUES
('Pedro Alves', 'pedro@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
('Carla Santos', 'carla@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
('Lucas Mendes', 'lucas@fiap.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f');

INSERT INTO posts (title, content, author, teacher_id) VALUES
('Introdução à Matemática', 'A matemática é uma disciplina fundamental que permeia diversas áreas do conhecimento e do nosso cotidiano. Desde a contagem simples até conceitos mais complexos, como álgebra e geometria, a matemática nos ajuda a entender e interpretar o mundo ao nosso redor. A matemática é muito mais do que números e fórmulas; é uma linguagem universal que nos permite descrever padrões e resolver problemas. Ao se aprofundar nesse universo fascinante, você descobrirá um mundo cheio de lógica e beleza. Vamos explorar juntos!', 'Maria Silva', 1),
('História do Brasil', 'A história do Brasil é uma narrativa rica e complexa que se estende por séculos. Desde a chegada dos primeiros habitantes há mais de 22.000 anos até os dias atuais, o país passou por transformações significativas que moldaram sua identidade e cultura. A história do Brasil é um mosaico de culturas, lutas e transformações que continuam a moldar o país até hoje. Compreender esse passado é essencial para construir um futuro mais justo e inclusivo para todos os brasileiros.', 'João Santos', 2),
('Experimento de Ciência', 'Os experimentos científicos são uma parte emocionante e fundamental da ciência, permitindo-nos explorar, testar hipóteses e descobrir como o mundo funciona. Vamos mergulhar nesse universo fascinante! Lembre-se: a ciência está em toda parte. Com curiosidade e um pouco de criatividade, você pode transformar sua casa em um laboratório de descobertas incríveis!', 'Ana Oliveira', 3);