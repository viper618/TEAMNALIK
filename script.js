document.addEventListener('DOMContentLoaded', () => {
    // Получение ссылки на базу данных
    const database = firebase.database();

    // Функции для работы с данными команды
    const teamOperations = {
        // Получить данные команды
        getTeamData: () => {
            return database.ref('team').once('value');
        },
        // Обновить данные команды
        updateTeamData: (newData) => {
            return database.ref('team').update(newData);
        }
    };

    // Функции для работы с составом команды
    const rosterOperations = {
        // Получить всех игроков
        getAllPlayers: () => {
            return database.ref('roster').once('value');
        },
        // Добавить нового игрока
        addPlayer: (playerId, playerData) => {
            return database.ref(`roster/${playerId}`).set(playerData);
        },
        // Обновить данные игрока
        updatePlayer: (playerId, newData) => {
            return database.ref(`roster/${playerId}`).update(newData);
        },
        // Удалить игрока
        deletePlayer: (playerId) => {
            return database.ref(`roster/${playerId}`).remove();
        }
    };

    // Функции для работы с расписанием
    const scheduleOperations = {
        // Получить все матчи
        getAllMatches: () => {
            return database.ref('schedule').once('value');
        },
        // Добавить новый матч
        addMatch: (matchId, matchData) => {
            return database.ref(`schedule/${matchId}`).set(matchData);
        },
        // Обновить матч
        updateMatch: (matchId, newData) => {
            return database.ref(`schedule/${matchId}`).update(newData);
        },
        // Удалить матч
        deleteMatch: (matchId) => {
            return database.ref(`schedule/${matchId}`).remove();
        }
    };

    // Функции для работы с партнерами
    const partnerOperations = {
        // Получить всех партнеров
        getAllPartners: () => {
            return database.ref('partners').once('value');
        },
        // Добавить нового партнера
        addPartner: (partnerId, partnerData) => {
            return database.ref(`partners/${partnerId}`).set(partnerData);
        },
        // Обновить данные партнера
        updatePartner: (partnerId, newData) => {
            return database.ref(`partners/${partnerId}`).update(newData);
        },
        // Удалить партнера
        deletePartner: (partnerId) => {
            return database.ref(`partners/${partnerId}`).remove();
        }
    };

    // Функция для инициализации базы данных данными
    function initializeDatabase() {
        const teamData = {
            team: {
                name: "TEAM NALIK",
                description: "Добро пожаловать в мир профессионального киберспорта"
            },
            roster: {
                player1: {
                    nickname: "Finn 'karrigan' Andersen",
                    role: "IGL",
                    photo: "./images/player1.jpg"
                },
                player2: {
                    nickname: "Ilya 'm0NESY' Osipov",
                    role: "Sniper",
                    photo: "./images/player2.jpg"
                },
                player3: {
                    nickname: "Boris 'magixx' Vorobiev",
                    role: "Support",
                    photo: "./images/player3.jpg"
                },
                player4: {
                    nickname: "Danil 'donk' Kryshkovets",
                    role: "Entry fragger",
                    photo: "./images/player4.jpg"
                },
                player5: {
                    nickname: "Robin 'ropz' Kool",
                    role: "Lurker",
                    photo: "./images/player5.jpg"
                }
            },
            schedule: {
                match1: {
                    date: "02.07.2025",
                    team1: "Team Nalik",
                    team2: "Team Spirit",
                    time: "19:00"
                },
                match2: {
                    date: "05.07.2025",
                    team1: "Team Nalik",
                    team2: "Virtus.pro",
                    time: "21:00"
                },
                match3: {
                    date: "07.07.2025",
                    team1: "Team Nalik",
                    team2: "Faze Clan",
                    time: "17:00"
                }
            },
            partners: {
                partner1: {
                    name: "BetBoom",
                    logo: "./images/partner1.png"
                },
                partner2: {
                    name: "Zowie",
                    logo: "./images/partner2.png"
                },
                partner3: {
                    name: "RedBull",
                    logo: "./images/partner3.png"
                }
            }
        };

        // Добавление данных в базу
        database.ref().set(teamData)
            .then(() => {
                console.log('Данные успешно добавлены в базу данных!');
            })
            .catch((error) => {
                console.error('Ошибка при добавлении данных:', error);
            });
    }

    // Вызов функции инициализации базы данных
    initializeDatabase();

    // Загрузка данных о команде
    function loadTeamData() {
        const teamRef = database.ref('team');
        teamRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.querySelector('.hero h1').textContent = data.name;
                document.querySelector('.hero p').textContent = data.description;
            }
        });
    }

    // Загрузка данных о составе команды
    function loadRoster() {
        const rosterRef = database.ref('roster');
        rosterRef.on('value', (snapshot) => {
            const roster = snapshot.val();
            const rosterContainer = document.querySelector('.roster-grid');
            if (roster && rosterContainer) {
                rosterContainer.innerHTML = '';
                Object.values(roster).forEach(player => {
                    const playerCard = `
                        <div class="player-card">
                            <img src="${player.photo}" alt="${player.nickname}">
                            <h3>${player.nickname}</h3>
                            <p>${player.role}</p>
                        </div>
                    `;
                    rosterContainer.innerHTML += playerCard;
                });
            }
        });
    }

    // Загрузка расписания
    function loadSchedule() {
        const scheduleRef = database.ref('schedule');
        scheduleRef.on('value', (snapshot) => {
            const schedule = snapshot.val();
            const scheduleContainer = document.querySelector('.schedule-list');
            if (schedule && scheduleContainer) {
                scheduleContainer.innerHTML = '';
                Object.values(schedule).forEach(match => {
                    const matchElement = `
                        <div class="match-card">
                            <div class="match-date">${match.date}</div>
                            <div class="match-teams">
                                <span>${match.team1}</span>
                                <span class="vs">VS</span>
                                <span>${match.team2}</span>
                            </div>
                            <div class="match-tournament">${match.tournament}</div>
                        </div>
                    `;
                    scheduleContainer.innerHTML += matchElement;
                });
            }
        });
    }

    // Загрузка информации о партнерах
    function loadPartners() {
        const partnersRef = database.ref('partners');
        partnersRef.on('value', (snapshot) => {
            const partners = snapshot.val();
            const partnersContainer = document.querySelector('.partners-grid');
            if (partners && partnersContainer) {
                partnersContainer.innerHTML = '';
                Object.values(partners).forEach(partner => {
                    const partnerCard = `
                        <div class="partner-card">
                            <img src="${partner.logo}" alt="${partner.name}">
                            <h3>${partner.name}</h3>
                            <p>${partner.description}</p>
                        </div>
                    `;
                    partnersContainer.innerHTML += partnerCard;
                });
            }
        });
    }

    // Загрузка всех данных
    loadTeamData();
    loadRoster();
    loadSchedule();
    loadPartners();

    // Обработка навигации
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Функция отображения секции
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(sectionId).classList.add('active');

        // Обновление активной ссылки в навигации
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Обработка кликов по навигации
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            showSection(sectionId);
            
            // Плавная прокрутка к секции
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Обработка изменений хэша (для прямых ссылок)
    function handleHashChange() {
        const hash = window.location.hash || '#home';
        showSection(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Начальная загрузка

    // Добавление анимации прокрутки для элементов
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Наблюдение за всеми секциями
    sections.forEach(section => {
        observer.observe(section);
    });

    // Добавление эффекта наведения для карточек игроков
    const playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Добавление эффекта наведения для карточек партнеров
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Примеры использования:

    // 1. Обновить название команды
    function updateTeamName(newName) {
        teamOperations.updateTeamData({ name: newName })
            .then(() => console.log('Название команды обновлено'))
            .catch(error => console.error('Ошибка:', error));
    }

    // 2. Добавить нового игрока
    function addNewPlayer() {
        const newPlayer = {
            nickname: "Новый игрок",
            role: "Новая роль",
            photo: "./images/new-player.jpg"
        };
        rosterOperations.addPlayer('player6', newPlayer)
            .then(() => console.log('Игрок добавлен'))
            .catch(error => console.error('Ошибка:', error));
    }

    // 3. Добавить новый матч
    function addNewMatch() {
        const newMatch = {
            date: "15.07.2025",
            team1: "Team Nalik",
            team2: "Natus Vincere",
            time: "20:00"
        };
        scheduleOperations.addMatch('match4', newMatch)
            .then(() => console.log('Матч добавлен'))
            .catch(error => console.error('Ошибка:', error));
    }

    // 4. Добавить нового партнера
    function addNewPartner() {
        const newPartner = {
            name: "Новый партнер",
            logo: "./images/new-partner.png"
        };
        partnerOperations.addPartner('partner4', newPartner)
            .then(() => console.log('Партнер добавлен'))
            .catch(error => console.error('Ошибка:', error));
    }

    // Функция для добавления оставшихся матчей
    function addRemainingMatches() {
        const remainingMatches = {
            match4: {
                date: "08.07.2025",
                team1: "Team Nalik",
                team2: "Falcons",
                time: "23:00"
            },
            match5: {
                date: "10.07.2025",
                team1: "Team Nalik",
                team2: "Vitality",
                time: "11:00"
            },
            match6: {
                date: "12.07.2025",
                team1: "Team Nalik",
                team2: "Team Space",
                time: "19:00"
            }
        };

        // Добавляем матчи в базу данных
        database.ref('schedule').update(remainingMatches)
            .then(() => {
                console.log('Оставшиеся матчи успешно добавлены!');
            })
            .catch((error) => {
                console.error('Ошибка при добавлении матчей:', error);
            });
    }

    // Вызываем функцию добавления матчей
    addRemainingMatches();
}); 