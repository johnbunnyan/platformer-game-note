import Phaser from 'phaser';

class Play extends Phaser.Scene {
    
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);

        const player = this.createPlayer();

        this.physics.add.collider(player, layers.platfromsColliders);

    }

    createMap() {
        const map = this.make.tilemap({key:'map'});
        map.addTilesetImage('main_lev_build_1', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1');
        
        //platfromsColliders->environment->platforms
        //순으로 레이어 함수 할당 순서를 지정
        const platfromsColliders = map.createDynamicLayer('platforms_colliders', tileset);            
        const environment = map.createStaticLayer('environment', tileset);
        // static보다 더 많은 기능 사용가능
        const platforms = map.createDynamicLayer('platforms', tileset);
        
       // platfromsColliders.setCollisionByExclusion(-1, true);
       platfromsColliders.setCollisionByProperty({ collides: true });

        return { environment, platforms, platfromsColliders };
    }


    createPlayer(){
        const player = this.physics.add.sprite(100, 250, 'player');
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true);
        return player;
    }
}

export default Play;