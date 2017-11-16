var game = new Phaser.Game(600, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
		game.load.image('back', 'assets/back.jpg');
		game.load.image('ground', 'assets/plataforma.png');
    game.load.image('star', 'assets/estrellita.png');
    game.load.spritesheet('mario', 'assets/personaje.png', 15, 16);
		game.load.spritesheet('donkey', 'assets/donkey.png', 46, 32);
		game.load.spritesheet('barril', 'assets/barrel.png', 12, 10);
}

var platforms;
var stars;
var barril;
var barrilC;
var score = 0;
var scoreText;

function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'back');

		platforms = game.add.group();
		platforms.enableBody = true;

		var ground = platforms.create(0, game.world.height - 15, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
		ground = platforms.create(300, game.world.height - 15, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

		var ledge = platforms.create(0, 600, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(0, 490, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(0, 380, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(0, 270, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(0, 160, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(435, 600, 'ground');
		ledge.scale.setTo(1.1, 2);
		ledge.body.immovable = true;

		ledge = platforms.create(435, 490, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(435, 380, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(435, 270, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(435, 160, 'ground');
		ledge.scale.setTo(1.1, 2);
    ledge.body.immovable = true;

		ledge = platforms.create(225, 550, 'ground');
		ledge.scale.setTo(1, 2);
		ledge.body.immovable = true;

		ledge = platforms.create(225, 430, 'ground');
		ledge.scale.setTo(1, 2);
		ledge.body.immovable = true;

		ledge = platforms.create(225, 320, 'ground');
		ledge.scale.setTo(1, 2);
		ledge.body.immovable = true;

		ledge = platforms.create(225, 210, 'ground');
		ledge.scale.setTo(1, 2);
		ledge.body.immovable = true;

		ledge = platforms.create(225, 100, 'ground');
		ledge.scale.setTo(1, 2);
		ledge.body.immovable = true;

		player = game.add.sprite(12, game.world.height - 40, 'mario');
		player.scale.setTo(1.5, 1.5);

    game.physics.arcade.enable(player);

		player.body.bounce.y = 0.0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

		player.animations.add('left', [0, 1, 2], 10, true);
    player.animations.add('right', [3, 4, 5], 10, true);

		enemy = game.add.sprite(230, 52, 'donkey');
		enemy.scale.setTo(1.5, 1.5);
		game.physics.arcade.enable(enemy);
		enemy.animations.add('left', [0, 1], 5, true);

		barril = game.add.group();

		barrilC = barril.create(240, 62, 'barril');

		//barril = game.add.sprite(240, 62, 'barril');
		barrilC.scale.setTo(1.5, 1.5);
		game.physics.arcade.enable(barrilC);
		barrilC.body.velocity.x=300;
    barrilC.body.gravity.y=300;
    barrilC.body.bounce.y=0.2;
		barrilC.body.bounce.x=1;
		barrilC.body.collideWorldBounds = true;
		barrilC.animations.add('left', [0, 1, 2, 3], 10, true);

		stars = game.add.group();

    stars.enableBody = true;

		for (var i = 0; i < 5; i++){
        var star = stars.create(0, i*145, 'star');
        star.body.gravity.y = 100;
        star.body.bounce.y = 0.3;

				star = stars.create(575, i*145, 'star');
				star.body.gravity.y = 300;
				star.body.bounce.y = 0.3;
    }

		scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
		var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(barril, platforms);

		game.physics.arcade.overlap(player, stars, collectStar, null, this);
		game.physics.arcade.overlap(player, enemy, finish, null, this);
		game.physics.arcade.overlap(player, barril, finish, null, this);

		player.body.velocity.x = 0;

    if (cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){
				player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else if (player.body.touching.down){
        player.animations.stop();
        player.frame = 5;
    }

		if (cursors.up.isDown && player.body.touching.down && hitPlatform){
        player.body.velocity.y = -230;
    }

		enemy.animations.play('left');
		barrilC.animations.play('left');
}

function collectStar (player, star) {
    star.kill();

		score += 100;
    scoreText.text = 'Score: ' + score;
}

function finish (player , barril){
  	player.kill();
  	game.state.start(game.state.current);
}
