cc.Class({
    extends: cc.Component,

    properties: {
        jiantou1: cc.Prefab,
        jiantou2: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._list = new Array;
        for (let i = 0; i < 19; i++) {
            let node = cc.instantiate(this.jiantou1)
            node.parent = cc.find("Canvas")
            node.position = cc.v2(0, -300)
            node.scale = 0.2 + i / 18 * 0.8
            node.rotation = 270

            this._list[i] = node;
        }

        let node2 = cc.instantiate(this.jiantou2);
        node2.parent = cc.find("Canvas")
        node2.position = cc.v2(0, -300)
        node2.rotation = 270
        this._list.push(node2);
    },

    start() {
        this.node.on('touchstart', (event) => {
            let pos = this.node.convertToNodeSpaceAR(event.getLocation())
            this.reset(cc.v2(0, -300), pos)
        }, this);

        this.node.on('touchmove', (event) => {
            let pos = this.node.convertToNodeSpaceAR(event.getLocation())
            this.reset(cc.v2(0, -300), pos)
        }, this);
    },

    reset(startPos, endPos) {
        var ctrlAPos = cc.v2()
        var ctrlBPos = cc.v2()

        ctrlAPos.x = startPos.x + (startPos.x - endPos.x) * 0.1;
        ctrlAPos.y = endPos.y - (endPos.y - startPos.y) * 0.2;
        ctrlBPos.y = endPos.y + (endPos.y - startPos.y) * 0.3;
        ctrlBPos.x = startPos.x - (startPos.x - endPos.x) * 0.3;

        for (let i = 0; i < 20; i++) {
            var t = (i * 1.0) / 19
            var pos = startPos.mul((1 - t) * (1 - t) * (1 - t))
                .add(ctrlAPos.mul(3 * t * (1 - t) * (1 - t)))
                .add(ctrlBPos.mul(3 * t * t * (1 - t)))
                .add(endPos.mul(t * t * t))

            this._list[i].position = pos
        }

        this.updateAngle();
    },

    updateAngle() {
        for (let i = 0; i < 20; i++) {
            if (i === 0) {
                this._list[i].rotation = 270
            } else {
                let current = this._list[i];
                let last = this._list[i - 1];
                var lenVec = current.position.subSelf(last.position);
                var radian = lenVec.signAngle(cc.Vec2.RIGHT);
                var degree = cc.misc.radiansToDegrees(radian);

                current.rotation = degree;
            }
        }
    }

    // update (dt) {},
});
