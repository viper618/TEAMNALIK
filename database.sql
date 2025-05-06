-- Создание базы данных
CREATE DATABASE team_nalik;
USE team_nalik;

-- Таблица игроков
CREATE TABLE players (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(50) NOT NULL,
    real_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    photo_path VARCHAR(255),
    join_date DATE NOT NULL,
    country VARCHAR(50),
    age INT,
    social_media JSON,
    achievements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица турниров
CREATE TABLE tournaments (
    tournament_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    prize_pool DECIMAL(10,2),
    location VARCHAR(100),
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    logo_path VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица матчей
CREATE TABLE matches (
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT,
    opponent_team VARCHAR(100) NOT NULL,
    match_date DATETIME NOT NULL,
    score VARCHAR(20),
    status ENUM('scheduled', 'live', 'completed') DEFAULT 'scheduled',
    map VARCHAR(50),
    vod_link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
);

-- Таблица партнеров
CREATE TABLE partners (
    partner_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    logo_path VARCHAR(255),
    website VARCHAR(255),
    partnership_start DATE NOT NULL,
    partnership_end DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE news (
    news_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    publish_date DATETIME NOT NULL,
    author VARCHAR(100),
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица достижений
CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date_achieved DATE NOT NULL,
    tournament_id INT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
);

-- Вставка тестовых данных для игроков
INSERT INTO players (nickname, real_name, role, photo_path, join_date, country, age) VALUES
('karrigan', 'Finn Andersen', 'IGL', 'images/player1.jpg', '2025-05-01', 'Denmark', 33),
('m0NESY', 'Ilya Osipov', 'Sniper', 'images/player2.jpg', '2025-05-01', 'Russia', 18),
('magixx', 'Boris Vorobiev', 'Support', 'images/player3.jpg', '2025-05-01', 'Russia', 20),
('donk', 'Danil Kryshkovets', 'Entry fragger', 'images/player4.jpg', '2025-05-01', 'Russia', 17),
('ropz', 'Robin Kool', 'Lurker', 'images/player5.jpg', '2025-05-01', 'Estonia', 24);

-- Вставка тестовых данных для партнеров
INSERT INTO partners (name, logo_path, website, partnership_start) VALUES
('BetBoom', 'images/partner1.png', 'https://betboom.com', '2025-05-01'),
('Zowie', 'images/partner2.png', 'https://zowie.com', '2025-05-01'),
('RedBull', 'images/partner3.png', 'https://redbull.com', '2025-05-01');

-- Вставка тестовых данных для матчей
INSERT INTO matches (opponent_team, match_date, status, map) VALUES
('Team Spirit', '2025-07-02 19:00:00', 'scheduled', 'Mirage'),
('Virtus.pro', '2025-07-05 21:00:00', 'scheduled', 'Inferno'),
('Faze Clan', '2025-07-07 17:00:00', 'scheduled', 'Nuke'),
('Falcons', '2025-07-08 23:00:00', 'scheduled', 'Ancient'),
('Vitality', '2025-07-10 11:00:00', 'scheduled', 'Overpass'),
('Team Space', '2025-07-12 19:00:00', 'scheduled', 'Dust2'); 