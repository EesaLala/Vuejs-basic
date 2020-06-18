new Vue({
    el:'#app',
    data: {
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function() {
            const damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;

            this.turns.unshift ({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function() {
            const damage = this.calculateDamage(8,19);
            this.monsterHealth -= damage;

            this.turns.unshift ({
                isPlayer: true,
                text: `Player hits Monster hard for ${damage}`
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
            this.playerHealth += 10;
            this.turns.unshift ({
                isPlayer: true,
                text: `Player heals by 10`
            });
            }; 
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            const damage = this.calculateDamage(4,12);
            this.playerHealth -= damage;

            this.turns.unshift ({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`
            });

            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max), min)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});