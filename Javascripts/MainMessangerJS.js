import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCH1tXQjHYx_jOW2ez_tSz0ZNrie-TzGLk",
    authDomain: "mercury-messanger.firebaseapp.com",
    projectId: "mercury-messanger",
    storageBucket: "mercury-messanger.firebasestorage.app",
    messagingSenderId: "505117536743",
    appId: "1:505117536743:web:9426c1fc6da3fabdf18d42",
    measurementId: "G-S20ESYTBCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Проверка аутентификации при загрузке
document.addEventListener('DOMContentLoaded', function() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Пользователь не авторизован, перенаправляем на страницу входа
            window.location.href = "index.html";
        } else {
            // Пользователь авторизован, загружаем интерфейс мессенджера
            loadMessengerUI(user);
        }
    });
});

function loadMessengerUI() {}
    // Статистика пользователя
    const userStats = {
        registrationDate: new Date(2024, 0, 1), // Дата регистрации (1 января 2024)
        sentMessages: 0,
        receivedGifts: 0,
        onlineFriends: 0,
        // Активность по дням недели
        activity: {
            mon: 20,
            tue: 45,
            wed: 70,
            thu: 90,
            fri: 60,
            sat: 30,
            sun: 10
        }
    };

    // Обновление статистики при загрузке
    function updateStats() {
        // Рассчитываем количество дней в системе
        const today = new Date();
        const diffTime = Math.abs(today - userStats.registrationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Обновляем DOM
        document.getElementById('sent-messages').textContent = userStats.sentMessages;
        document.getElementById('gifts-received').textContent = userStats.receivedGifts;
        document.getElementById('days-active').textContent = diffDays;
        document.getElementById('online-friends').textContent = userStats.onlineFriends;

        // Обновляем график активности
        updateActivityGraph();
    }

    // Обновление графика активности
    function updateActivityGraph() {
        const graphContainer = document.getElementById('activity-graph');
        graphContainer.innerHTML = '';

        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const colors = [
            'var(--neon-blue)',
            'var(--neon-pink)',
            'var(--neon-purple)',
            'var(--neon-green)',
            'var(--neon-yellow)',
            'var(--neon-blue)',
            'var(--neon-pink)'
        ];

        days.forEach((day, index) => {
            const height = userStats.activity[day] + '%';
            const bar = document.createElement('div');
            bar.style.flex = '1';
            bar.style.background = colors[index];
            bar.style.height = height;
            bar.style.borderRadius = '5px';
            bar.style.transition = 'height 0.5s ease';
            bar.style.position = 'relative';

            // Добавляем подпись дня недели
            const label = document.createElement('div');
            label.textContent = dayNames[index];
            label.style.position = 'absolute';
            label.style.bottom = '-25px';
            label.style.left = '0';
            label.style.right = '0';
            label.style.textAlign = 'center';
            label.style.fontSize = '12px';
            label.style.color = 'var(--text-secondary)';

            bar.appendChild(label);
            bar.title = `Активность: ${userStats.activity[day]}%`;
            graphContainer.appendChild(bar);
        });
    }

    // Элементы интерфейса
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const saveProfileBtn = document.getElementById('save-profile');
    const profileAvatar = document.getElementById('profile-avatar');
    const avatarUpload = document.getElementById('avatar-upload');
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const statusInput = document.getElementById('status');
    const bioInput = document.getElementById('bio');
    const profileName = document.getElementById('profile-name');
    const profileStatus = document.getElementById('profile-status');
    const notification = document.getElementById('notification');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeOptions = document.querySelectorAll('.theme-option');
    const createChatBtn = document.getElementById('create-channel-btn');
    const createChatModal = document.getElementById('create-chat-modal');
    const closeCreateChatModal = document.getElementById('close-create-chat-modal');
    const createChatFormBtn = document.getElementById('create-chat-btn');
    const chatTypes = document.querySelectorAll('.chat-type');
    const chatNameInput = document.getElementById('chat-name');
    const chatDescriptionContainer = document.getElementById('chat-description-container');
    const participantsContainer = document.getElementById('participants-container');
    const chatsList = document.getElementById('chats-list');
    const stickerBtn = document.getElementById('sticker-btn');
    const stickersPanel = document.getElementById('stickers-panel');

    // Открытие модального окна профиля
    profileBtn.addEventListener('click', function() {
        profileModal.classList.add('active');
        updateStats(); // Обновляем статистику при открытии
    });

    // Закрытие модального окна
    closeProfileModal.addEventListener('click', function() {
        profileModal.classList.remove('active');
    });

    // Смена аватара
    profileAvatar.addEventListener('click', function() {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function(event) {
                profileAvatar.style.backgroundImage = `url(${event.target.result})`;
                profileAvatar.innerHTML = '<div class="change-avatar">Изменить аватар</div>';
                showNotification('Аватар успешно обновлен!', 'success');
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Переключение вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Добавляем активный класс текущей вкладке
            this.classList.add('active');

            // Показываем соответствующий контент
            const tabId = this.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active');

            // При открытии вкладки статистики обновляем данные
            if (tabId === 'stats') {
                updateStats();
            }
        });
    });

    // Выбор темы оформления
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            showNotification(`Тема "${this.textContent}" активирована!`, 'success');
        });
    });

    // Сохранение профиля
    saveProfileBtn.addEventListener('click', function() {
        // Обновляем данные профиля
        profileName.textContent = nameInput.value;

        if (statusInput.value) {
            profileStatus.textContent = statusInput.value;
        } else {
            profileStatus.textContent = "Статус не установлен";
        }

        // Показываем уведомление
        showNotification('Профиль успешно обновлен!', 'success');

        // Закрываем модальное окно через 1 секунду
        setTimeout(() => {
            profileModal.classList.remove('active');
        }, 1000);
    });

    // Функция показа уведомления
    function showNotification(text, type) {
        notification.textContent = text;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Отправка сообщений
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();

        if (message) {
            // Увеличиваем счетчик сообщений
            userStats.sentMessages++;

            // Обновляем активность
            const today = new Date();
            const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][today.getDay()];
            userStats.activity[dayOfWeek] = Math.min(100, userStats.activity[dayOfWeek] + 5);

            const messagesContainer = document.querySelector('.messages-container');
            const typingIndicator = document.querySelector('.typing-indicator');

            if (typingIndicator) {
                typingIndicator.remove();
            }

            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            messageElement.innerHTML = `
                        ${message}
                        <div class="message-time">${getCurrentTime()}</div>
                        
                        <div class="message-reactions">
                            <div class="add-reaction-btn">+</div>
                        </div>
                        
                        <div class="reactions-panel">
                            <div class="reaction-option">👍</div>
                            <div class="reaction-option">👎</div>
                            <div class="reaction-option">❤️</div>
                            <div class="reaction-option">😂</div>
                            <div class="reaction-option">😮</div>
                            <div class="reaction-option">😢</div>
                            <div class="reaction-option">👏</div>
                        </div>
                    `;

            messagesContainer.appendChild(messageElement);
            messageInput.value = '';

            // Прокрутка к последнему сообщению
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Инициализация реакций для нового сообщения
            initReactions(messageElement);

            // Проверка на промокод
            if (message.toLowerCase() === "milli") {
                // Активация подарка
                userStats.receivedGifts++;
                showNotification('Промокод активирован! Вы получили ракету-подарок!', 'success');

                // Анимация подарка
                animateRocketGift();
            }

            // Имитация ответа
            setTimeout(() => {
                const typing = document.createElement('div');
                typing.className = 'typing-indicator';
                typing.innerHTML = '<span></span><span></span><span></span>';
                messagesContainer.appendChild(typing);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;

                setTimeout(() => {
                    typing.remove();
                    const replyElement = document.createElement('div');
                    replyElement.className = 'message incoming';
                    replyElement.innerHTML = `
                                Отличный вариант! Я как раз хотел предложить это кафе. Забронируем столик на 18:00?
                                <div class="message-time">${getCurrentTime()}</div>
                                
                                <div class="message-reactions">
                                    <div class="add-reaction-btn">+</div>
                                </div>
                                
                                <div class="reactions-panel">
                                    <div class="reaction-option">👍</div>
                                    <div class="reaction-option">👎</div>
                                    <div class="reaction-option">❤️</div>
                                    <div class="reaction-option">😂</div>
                                    <div class="reaction-option">😮</div>
                                    <div class="reaction-option">😢</div>
                                    <div class="reaction-option">👏</div>
                                </div>
                            `;
                    messagesContainer.appendChild(replyElement);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    // Инициализация реакций для ответа
                    initReactions(replyElement);
                }, 2000);
            }, 1000);
        }
    }

    // Анимация подарка-ракеты
    function animateRocketGift() {
        const gift = document.getElementById('rocket-gift');
        gift.style.display = 'block';
        gift.style.position = 'fixed';
        gift.style.bottom = '20px';
        gift.style.right = '20px';
        gift.style.fontSize = '40px';
        gift.style.color = '#ff00ff';
        gift.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #ff00ff';
        gift.style.zIndex = '1000';
        gift.style.transition = 'all 2s ease-in-out';

        // Анимация полета
        setTimeout(() => {
            gift.style.transform = 'translateY(-100vh) translateX(-50vw) rotate(45deg)';
            gift.style.fontSize = '80px';
            gift.style.opacity = '0';

            // Сброс после анимации
            setTimeout(() => {
                gift.style.display = 'none';
                gift.style.transform = 'none';
                gift.style.opacity = '1';
                gift.style.fontSize = '40px';
            }, 2000);
        }, 500);
    }

    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    // Выбор чата
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Обновляем заголовок чата
            const chatName = this.querySelector('.chat-name').textContent;
            document.querySelector('.chat-title h3').textContent = chatName;

            // Обновляем количество друзей онлайн (случайное число)
            userStats.onlineFriends = Math.floor(Math.random() * 100);
            updateStats();
        });
    });

    // Функция создания чатов и каналов
    function setupChatCreation() {
        // Открытие модального окна создания чата
        createChatBtn.addEventListener('click', function() {
            createChatModal.classList.add('active');
            // Сброс формы
            chatNameInput.value = '';
            document.querySelectorAll('.chat-type').forEach(t => t.classList.remove('active'));
            document.querySelector('.chat-type[data-type="private"]').classList.add('active');
            chatDescriptionContainer.style.display = 'none';
            participantsContainer.style.display = 'none';
        });

        // Закрытие модального окна создания чата
        closeCreateChatModal.addEventListener('click', function() {
            createChatModal.classList.remove('active');
        });

        // Выбор типа чата
        chatTypes.forEach(type => {
            type.addEventListener('click', function() {
                chatTypes.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const chatType = this.dataset.type;

                // Показываем/скрываем дополнительные поля
                if (chatType === 'private') {
                    chatDescriptionContainer.style.display = 'none';
                    participantsContainer.style.display = 'none';
                } else if (chatType === 'group') {
                    chatDescriptionContainer.style.display = 'block';
                    participantsContainer.style.display = 'block';
                } else if (chatType === 'channel') {
                    chatDescriptionContainer.style.display = 'block';
                    participantsContainer.style.display = 'none';
                }
            });
        });

        // Создание нового чата
        createChatFormBtn.addEventListener('click', function() {
            const chatName = chatNameInput.value.trim();
            const chatType = document.querySelector('.chat-type.active').dataset.type;

            if (!chatName) {
                showNotification('Пожалуйста, введите название чата', 'error');
                return;
            }

            // Создаем новый чат
            createNewChat(chatName, chatType);

            // Закрываем модальное окно
            createChatModal.classList.remove('active');

            // Показываем уведомление
            showNotification(`Чат "${chatName}" успешно создан!`, 'success');
        });
    }

    // Функция создания нового чата
    function createNewChat(name, type) {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';

        // Генерируем случайный градиент для аватара
        const gradients = [
            `linear-gradient(135deg, var(--neon-pink), var(--neon-purple))`,
            `linear-gradient(135deg, var(--accent), var(--neon-blue))`,
            `linear-gradient(135deg, var(--neon-green), var(--neon-blue))`,
            `linear-gradient(135deg, var(--neon-purple), var(--neon-pink))`,
            `linear-gradient(135deg, var(--neon-yellow), var(--neon-pink))`
        ];

        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

        // Определяем иконку для типа чата
        let icon = '';
        if (type === 'private') icon = '<i class="fas fa-user-friends"></i>';
        else if (type === 'group') icon = '<i class="fas fa-users"></i>';
        else if (type === 'channel') icon = '<i class="fas fa-bullhorn"></i>';

        // Создаем HTML для нового чата
        chatItem.innerHTML = `
                    <div class="chat-avatar" style="background: ${randomGradient}">
                        ${icon}
                    </div>
                    <div class="chat-info">
                        <div class="chat-top">
                            <div class="chat-name">${name}</div>
                            <div class="chat-time">${getCurrentTime()}</div>
                        </div>
                        <div class="chat-preview">
                            <div class="chat-message">Новый чат</div>
                            <div class="unread-count">1</div>
                        </div>
                    </div>
                `;

        // Добавляем обработчик выбора чата
        chatItem.addEventListener('click', function() {
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            document.querySelector('.chat-title h3').textContent = name;
        });

        // Добавляем новый чат в начало списка
        chatsList.insertBefore(chatItem, chatsList.firstChild);
    }

    // Инициализация функционала создания чатов
    setupChatCreation();

    // Инициализация статистики при загрузке
    updateStats();

    // Инициализация друзей онлайн
    userStats.onlineFriends = Math.floor(Math.random() * 100);

    // Инициализация реакций
    function initReactions(container) {
        const addReactionBtns = container.querySelectorAll('.add-reaction-btn');
        const reactionPanels = container.querySelectorAll('.reactions-panel');

        addReactionBtns.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const panel = reactionPanels[index];

                // Скрыть все панели реакций
                document.querySelectorAll('.reactions-panel').forEach(p => {
                    if (p !== panel) p.classList.remove('active');
                });

                panel.classList.toggle('active');
            });
        });

        // Обработка выбора реакции
        container.querySelectorAll('.reaction-option').forEach(option => {
            option.addEventListener('click', function() {
                const emoji = this.textContent;
                const reactionsContainer = this.closest('.message').querySelector('.message-reactions');
                addReactionToContainer(reactionsContainer, emoji);

                // Скрыть панель после выбора
                this.closest('.reactions-panel').classList.remove('active');
            });
        });

        // Обработка существующих реакций
        container.querySelectorAll('.reaction').forEach(reaction => {
            reaction.addEventListener('click', function() {
                this.classList.toggle('active');

                const countElement = this.querySelector('.reaction-count');
                let count = parseInt(countElement.textContent) || 0;

                if (this.classList.contains('active')) {
                    count++;
                } else {
                    count = Math.max(0, count - 1);
                }

                countElement.textContent = count > 0 ? count : '';

                // Анимация для новой реакции
                if (count === 1) {
                    this.classList.add('new-reaction');
                    setTimeout(() => {
                        this.classList.remove('new-reaction');
                    }, 500);
                }
            });
        });
    }

    // Добавление реакции в контейнер
    function addReactionToContainer(container, emoji) {
        // Проверим, есть ли уже такая реакция
        let reactionElement = [...container.children].find(el =>
            el.classList.contains('reaction') &&
            el.dataset.emoji === emoji
        );

        if (reactionElement) {
            // Если реакция уже есть, просто активируем
            reactionElement.classList.add('active');
            const countElement = reactionElement.querySelector('.reaction-count');
            let count = parseInt(countElement.textContent) || 1;
            countElement.textContent = count + 1;

            // Анимация
            reactionElement.classList.add('new-reaction');
            setTimeout(() => {
                reactionElement.classList.remove('new-reaction');
            }, 500);
        } else {
            // Создаем новую реакцию
            reactionElement = document.createElement('div');
            reactionElement.className = 'reaction active new-reaction';
            reactionElement.dataset.emoji = emoji;
            reactionElement.innerHTML = `
                        <span class="reaction-emoji">${emoji}</span>
                        <span class="reaction-count">1</span>
                    `;

            // Вставляем перед кнопкой добавления
            const addBtn = container.querySelector('.add-reaction-btn');
            container.insertBefore(reactionElement, addBtn);

            // Инициализация обработчика клика
            reactionElement.addEventListener('click', function() {
                this.classList.toggle('active');

                const countElement = this.querySelector('.reaction-count');
                let count = parseInt(countElement.textContent) || 0;

                if (this.classList.contains('active')) {
                    count++;
                } else {
                    count = Math.max(0, count - 1);
                }

                countElement.textContent = count > 0 ? count : '';

                // Удалить реакцию если счетчик 0
                if (count === 0) {
                    this.remove();
                }
            });
        }
    }

    // Инициализация реакций для существующих сообщений
    document.querySelectorAll('.message').forEach(initReactions);

    // Обработчик клика вне панели реакций
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.reactions-panel') &&
            !e.target.closest('.add-reaction-btn')) {
            document.querySelectorAll('.reactions-panel').forEach(panel => {
                panel.classList.remove('active');
            });
        }
    });

    // Панель стикеров
    stickerBtn.addEventListener('click', function() {
        stickersPanel.classList.toggle('active');
    });

    // Выбор стикера
    stickersPanel.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('click', function() {
            const stickerContent = this.textContent;

            // Создаем сообщение со стикером
            const messagesContainer = document.querySelector('.messages-container');
            const messageElement = document.createElement('div');
            messageElement.className = 'message outgoing';
            messageElement.innerHTML = `
                        <div style="font-size: 48px; text-align: center;">${stickerContent}</div>
                        <div class="message-time">${getCurrentTime()}</div>
                        
                        <div class="message-reactions">
                            <div class="add-reaction-btn">+</div>
                        </div>
                        
                        <div class="reactions-panel">
                            <div class="reaction-option">👍</div>
                            <div class="reaction-option">👎</div>
                            <div class="reaction-option">❤️</div>
                            <div class="reaction-option">😂</div>
                            <div class="reaction-option">😮</div>
                            <div class="reaction-option">😢</div>
                            <div class="reaction-option">👏</div>
                        </div>
                    `;

            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Инициализация реакций для нового сообщения
            initReactions(messageElement);

            // Скрыть панель стикеров
            stickersPanel.classList.remove('active');
        });
    });

    // Клик вне панели стикеров
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.stickers-panel') &&
            !e.target.closest('#sticker-btn')) {
            stickersPanel.classList.remove('active');
        }
    });