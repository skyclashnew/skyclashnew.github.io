// Skyclash: Tap to Triumph - Phaser 3 Basic Prototype

import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let player;
let cursors;
let enemies;
let score = 0;
let scoreText;

new Phaser.Game(config);

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('ground', 'assets/ground.png');
}

function create() {
    this.add.image(240, 400, 'ground').setScale(2);

    player = this.physics.add.sprite(240, 600, 'player').setScale(1.5);
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    enemies = this.physics.add.group();

    this.time.addEvent({
        delay: 2000,
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });

    scoreText = this.add.text(10, 10, 'Score: 0', {
        fontSize: '24px',
        fill: '#fff'
    });

    this.input.on('pointerdown', () => {
        if (player.body.touching.down) {
            player.setVelocityY(-550);
        }
    });

    this.physics.add.overlap(player, enemies, hitEnemy, null, this);
}

function update() {
    // Player updates handled by input only
    enemies.children.iterate(enemy => {
        if (enemy.y > 800) enemy.destroy();
    });
}

function spawnEnemy() {
    const x = Phaser.Math.Between(50, 430);
    const enemy = enemies.create(x, 0, 'enemy');
    enemy.setVelocityY(100);
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1);
}

function hitEnemy(player, enemy) {
    if (player.body.velocity.y > 0 && player.y < enemy.y) {
        enemy.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
        player.setVelocityY(-400); // bounce back
    } else {
        this.scene.restart();
        score = 0;
    }
}
