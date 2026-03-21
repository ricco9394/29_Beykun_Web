class Card {
    #id;
    #name;
    #cost;
    #description;
    #type;
    #imageUrl;

    constructor(id, name, cost, description, type = "Base", imageUrl = "") {
        this.#id = id;
        this.#name = name;
        this.#cost = cost;
        this.#description = description;
        this.#type = type;
        this.#imageUrl = imageUrl;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get cost() { return this.#cost; }
    get description() { return this.#description; }
    get type() { return this.#type; }
    get imageUrl() { return this.#imageUrl; }

    set name(val) { this.#name = val; }
    set cost(val) { this.#cost = val; }
    set description(val) { this.#description = val; }
    set imageUrl(val) { this.#imageUrl = val; }

    toHTML(isEditMode = false) {
        const inputOrText = (value, field, type = "text") => {
            return isEditMode 
                ? `<input class="card-input" value="${value}" onchange="app.updateCard(${this.#id}, '${field}', this.value)" type="${type}">`
                : `<span>${value}</span>`;
        };

        const imageHtml = this.#imageUrl 
            ? `<img src="${this.#imageUrl}" alt="${this.#name}" onerror="this.parentElement.innerHTML='${this.getIcon()}'">`
            : this.getIcon();

        return `
            <div class="card">
                <button class="delete-btn" onclick="app.deleteCard(${this.#id})">X</button>
                <div class="card-header">
                    ${inputOrText(this.#name, 'name')}
                    <div class="card-cost">${inputOrText(this.#cost, 'cost', 'number')}</div>
                </div>
                <div class="card-image">
                    ${imageHtml}
                </div>
                <div class="card-desc">
                    ${inputOrText(this.#description, 'description')}
                </div>
                ${this.getExtraStatsHTML(isEditMode)}
            </div>
        `;
    }

    getIcon() { return "🎴"; }
    getExtraStatsHTML(isEditMode) { return ""; }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            cost: this.#cost,
            description: this.#description,
            type: this.#type,
            imageUrl: this.#imageUrl
        };
    }
}

class Minion extends Card {
    #attack;
    #health;

    constructor(id, name, cost, desc, attack, health, imageUrl = "") {
        super(id, name, cost, desc, "Minion", imageUrl);
        this.#attack = attack;
        this.#health = health;
    }

    get attack() { return this.#attack; }
    get health() { return this.#health; }
    set attack(val) { this.#attack = val; }
    set health(val) { this.#health = val; }

    getIcon() { return "🤖"; }

    getExtraStatsHTML(isEditMode) {
        const inputOrText = (value, field) => {
            return isEditMode 
                ? `<input class="card-input" style="width: 40px" value="${value}" onchange="app.updateCard(${this.id}, '${field}', this.value)" type="number">`
                : `<span>${value}</span>`;
        };

        return `
            <div class="card-stats">
                <div>ATK: ${inputOrText(this.#attack, 'attack')}</div>
                <div>HP: ${inputOrText(this.#health, 'health')}</div>
            </div>
        `;
    }

    toJSON() {
        return { ...super.toJSON(), attack: this.#attack, health: this.#health };
    }
}

class Spell extends Card {
    #damage;

    constructor(id, name, cost, desc, damage, imageUrl = "") {
        super(id, name, cost, desc, "Spell", imageUrl);
        this.#damage = damage;
    }

    get damage() { return this.#damage; }
    set damage(val) { this.#damage = val; }

    getIcon() { return "⚡"; }

    getExtraStatsHTML(isEditMode) {
        const inputOrText = (value, field) => {
            return isEditMode 
                ? `<input class="card-input" style="width: 40px" value="${value}" onchange="app.updateCard(${this.id}, '${field}', this.value)" type="number">`
                : `<span>${value}</span>`;
        };
        return `<div class="card-stats"><div>Dmg: ${inputOrText(this.#damage, 'damage')}</div></div>`;
    }

    toJSON() {
        return { ...super.toJSON(), damage: this.#damage };
    }
}

class Artifact extends Card {
    #durability;

    constructor(id, name, cost, desc, durability, imageUrl = "") {
        super(id, name, cost, desc, "Artifact", imageUrl);
        this.#durability = durability;
    }

    get durability() { return this.#durability; }
    set durability(val) { this.#durability = val; }

    getIcon() { return "🛡️"; }

    getExtraStatsHTML(isEditMode) {
        const inputOrText = (value, field) => {
            return isEditMode 
                ? `<input class="card-input" style="width: 40px" value="${value}" onchange="app.updateCard(${this.id}, '${field}', this.value)" type="number">`
                : `<span>${value}</span>`;
        };
        return `<div class="card-stats"><div>Dur: ${inputOrText(this.#durability, 'durability')}</div></div>`;
    }

    toJSON() {
        return { ...super.toJSON(), durability: this.#durability };
    }
}

class DeckApp {
    constructor() {
        this.cards = [];
        this.isEditMode = false;
        this.loadFromStorage();
        
        if (this.cards.length === 0) {
            this.initDemoData();
        }
    }

    initDemoData() {
        this.cards = [
            new Minion(1, "Toxi$", 5, "Лучший мем года", 8, 8, "https://cdnn21.img.ria.ru/images/07e9/08/0a/2034412883_0:120:2048:1271_1920x1080_80_0_0_32bedf72ca8a57d35bb0d7d07acec7d3.jpg"),
            new Spell(2, "Данил Колбасенко", 3, "Легенда рилсов", 6, "https://i.ytimg.com/vi/-0rsJkgNCEI/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBaMcei-oUc8S_bLfwdz49WNhkFdw&usqp=CCk"),
            new Artifact(3, "Колбаса без мяса", 4, "Сытная и вкусная", 10, "https://ir.ozone.ru/s3/multimedia-v/c1000/6533354215.jpg")
        ];
        this.saveToStorage();
    }

    saveToStorage() {
        const data = this.cards.map(c => c.toJSON());
        localStorage.setItem('EpicGameData', JSON.stringify(data));
    }

    loadFromStorage() {
        const data = localStorage.getItem('EpicGameData');
        if (data) {
            const parsed = JSON.parse(data);
            this.cards = parsed.map(obj => {
                if (obj.type === 'Minion') return new Minion(obj.id, obj.name, obj.cost, obj.description, obj.attack, obj.health, obj.imageUrl);
                if (obj.type === 'Spell') return new Spell(obj.id, obj.name, obj.cost, obj.description, obj.damage, obj.imageUrl);
                if (obj.type === 'Artifact') return new Artifact(obj.id, obj.name, obj.cost, obj.description, obj.durability, obj.imageUrl);
                return new Card(obj.id, obj.name, obj.cost, obj.description, obj.type, obj.imageUrl);
            });
        }
    }

    updateCard(id, field, value) {
        const card = this.cards.find(c => c.id === id);
        if (card) {
            card[field] = value;
            this.saveToStorage();
        }
    }

    deleteCard(id) {
        if(confirm("Удалить эту карту?")) {
            this.cards = this.cards.filter(c => c.id !== id);
            this.saveToStorage();
            this.renderApp();
        }
    }

    addNewCard() {
        const type = prompt("Тип карты (Minion, Spell, Artifact):", "Minion");
        if (!type) return;
        
        const name = prompt("Название карты:", "Новая карта");
        const cost = prompt("Стоимость:", "1");
        const desc = prompt("Описание:", "Нет описания");
        const imageUrl = prompt("URL картинки (оставьте пустым для иконки):", "");
        
        const id = Date.now();
        let newCard;

        if (type === "Minion") {
            const attack = prompt("Атака:", "1");
            const health = prompt("Здоровье:", "1");
            newCard = new Minion(id, name, cost, desc, attack, health, imageUrl);
        } else if (type === "Spell") {
            const damage = prompt("Урон:", "1");
            newCard = new Spell(id, name, cost, desc, damage, imageUrl);
        } else {
            const durability = prompt("Прочность:", "1");
            newCard = new Artifact(id, name, cost, desc, durability, imageUrl);
        }

        this.cards.push(newCard);
        this.saveToStorage();
        this.renderApp();
    }

    setEditMode(state) {
        this.isEditMode = state;
        this.renderApp();
    }

    renderApp() {
        const body = document.body;
        body.innerHTML = ''; 

        const header = document.createElement('header');
        header.innerHTML = `
            <h1>Epic Card Game</h1>
            <div class="controls">
                <button class="mode-btn ${!this.isEditMode ? 'active' : ''}" onclick="app.setEditMode(false)">
                    Режим просмотра
                </button>
                <button class="mode-btn ${this.isEditMode ? 'active' : ''}" onclick="app.setEditMode(true)">
                    Режим редактирования
                </button>
                ${this.isEditMode ? `<button class="add-btn" onclick="app.addNewCard()">+ Добавить карту</button>` : ''}
            </div>
        `;
        body.appendChild(header);

        const container = document.createElement('div');
        container.id = 'app-container';
        if (this.isEditMode) container.classList.add('edit-mode');

        this.cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = card.toHTML(this.isEditMode);
            container.appendChild(cardDiv.firstElementChild); 
        });

        body.appendChild(container);
    }
}

const app = new DeckApp();
app.renderApp();