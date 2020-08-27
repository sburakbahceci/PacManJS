function Pacman(xCord, yCord, direction) {
    this.x = xCord;
    this.y = yCord;
    this.dir = direction;
    this.nextDir = undefined; //bir sonraki uygun dönme noktasındaki dönme yönü
    this.radius = PACMAN_RADIUS;
    this.mouthOpen = true;
}


Pacman.prototype.draw = function(color) {
    if (color == undefined) {
        ctx.fillStyle = PACMAN_COLOR;
    } else {
        ctx.fillStyle = color;
    }
    ctx.beginPath();

    if (!this.mouthOpen) {
        switch (this.dir) {
            case UP:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 11 / 18, 2 * Math.PI - Math.PI * 7 / 18, true);
                break;

            case DOWN:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 29 / 18, 2 * Math.PI - Math.PI * 25 / 18, true);
                break;

            case LEFT:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 10 / 9, 2 * Math.PI - Math.PI * 8 / 9, true);
                break;

            case RIGHT:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI / 9, 2 * Math.PI - Math.PI * 17 / 9, true);
                break;

            default:
                break;
        }
    } else {
        switch (this.dir) {
            case UP:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 7 / 9, 2 * Math.PI - Math.PI * 2 / 9, true);
                break;

            case DOWN:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 16 / 9, 2 * Math.PI - Math.PI * 11 / 9, true);
                break;

            case LEFT:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 23 / 18, 2 * Math.PI - Math.PI * 13 / 18, true);
                break;

            case RIGHT:
                ctx.arc(this.x, this.y, this.radius, 2 * Math.PI - Math.PI * 5 / 18, 2 * Math.PI - Math.PI * 31 / 18, true);
                break;

            default:
                break;

        }
    }




    ctx.lineTo(this.x, this.y);
    ctx.fill();
};

//geçerli konumun satır dizinini al
Pacman.prototype.getRow = function() {
    return getRowIndex(this.y);
};

//geçerli konumun sütun dizinini al
Pacman.prototype.getCol = function() {
    return getColIndex(this.x);
};

//Sarı Canavar'ı geçerli yön ve kiremit ile hareket edebilirse geri dön
Pacman.prototype.canMove = function(dir) {
    return canMove(this.x, this.y, dir);
};

//Sarı Canavar'ı çevir ve hareket ettirmeye çalış.
Pacman.prototype.move = function() {
    if (onGridCenter(this.x, this.y) === false) {
        if (this.nextDir != undefined && (
                (this.dir === UP && this.nextDir === DOWN) ||
                (this.dir === DOWN && this.nextDir === UP) ||
                (this.dir === LEFT && this.nextDir === RIGHT) ||
                (this.dir === RIGHT && this.nextDir === LEFT)
            )) {
            this.dir = this.nextDir;
            this.nextDir = undefined;
        }

        this.moveOneStep();

        return;
    } else {
        //ızgara merkezinde. gerekirse yönü değiştir.

        if (this.nextDir != undefined && this.canMove(this.nextDir)) {
            this.dir = this.nextDir;
            this.nextDir = undefined;
            this.moveOneStep();
        } else {
            //SarI Canavar'ın hareket etmeye devam edip etmediğini kontrol et.
            if (this.canMove(this.dir)) {
                this.moveOneStep();
            }
        }
    }
};

//izin veriliyorsa geçerli yönde bir adım hareket ettir.
Pacman.prototype.moveOneStep = function() {
    var newX = 0;
    var newY = 0;
    if (!canMove(this.x, this.y, this.dir)) {
        return;
    }
    switch (this.dir) {

        case UP:
            newY = this.y - speed;
            if (newY - this.radius - WALL_WIDTH > 0) {
                this.y = newY;
                this.mouthOpen = !this.mouthOpen;
            }
            break;

        case DOWN:
            newY = this.y + speed;
            if (newY + this.radius + WALL_WIDTH < CANVAS_HEIGHT) {
                this.y = newY;
                this.mouthOpen = !this.mouthOpen;

            }
            break;


        case LEFT:
            newX = this.x - speed;
            if (newX - this.radius - WALL_WIDTH > 0) {
                this.x = newX;
                this.mouthOpen = !this.mouthOpen;
            }
            break;

        case RIGHT:
            newX = this.x + speed;

            if (newX + this.radius + WALL_WIDTH < CANVAS_WIDTH) {
                this.x = newX;
                this.mouthOpen = !this.mouthOpen;
            }
            break;

        default:
            break;
    }
};