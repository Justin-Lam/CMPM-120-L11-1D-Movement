class OneDimensionalMovement extends Phaser.Scene {
	constructor() {
		super("oneDimensionalMovementScene");
		this.my = {sprite: {bullets: []}};

		this.playerStartingX = 400;
		this.playerY = 500;
		this.bulletYOffsetFromPlayer = 150;

		this.playerMoveSpeed = 15;
		this.bulletMoveSpeed = 30;
		this.aKey = null;
		this.dKey = null;
	}

	preload() {
		this.load.setPath("./assets/");

		this.load.image("player", "player.png");
		this.load.image("bullet", "bullet.png");
	}

	create() {
		let my = this.my;

		my.sprite.player = this.add.sprite(this.playerStartingX, this.playerY, "player");

		this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		spaceKey.on("down", (key, event) =>
		{
			my.sprite.bullets.push(this.add.sprite(my.sprite.player.x, my.sprite.player.y - this.bulletYOffsetFromPlayer, "bullet"));
		});
	}

	update() {
		let my = this.my;

		// Movement
		if (this.aKey.isDown)
		{
			my.sprite.player.x -= this.playerMoveSpeed;
			if (my.sprite.player.x < 0)
			{
				my.sprite.player.x = 0;
			}
		}
		else if (this.dKey.isDown)
		{
			my.sprite.player.x += this.playerMoveSpeed;
			if (my.sprite.player.x > 800)
			{
				my.sprite.player.x = 800;
			}
		}

		// Bullet Behavior
		for (let bullet of my.sprite.bullets)
		{
			bullet.y -= this.bulletMoveSpeed;
		}
	}
}