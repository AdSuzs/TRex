(function () {

    const FPS = 300;
    const PROB_NUVEM = 4;
    const PROB_CACTO = 5;
    var gameLoop;
    var deserto;
    var dPassaro;
    var dino;
    var nuvens = [];
    var cactos = [];

    function init(){
        deserto = new Deserto();
        dino = new Dino();
        gameLoop = setInterval(run, 1000/FPS); //seta o tempo para ele andar
    }

    window.addEventListener("keydown", function (e) {
        if(e.key == "ArrowUp" && dino.status==0) dino.status = 1;
        if(e.key == 'p') clearInterval(gameLoop);
        if(e.key == "ArrowDown")dino.status = 3;
    });
    window.addEventListener("keyup", function (e) {
        if(e.key == "ArrowDown") dino.status = 0;
    });

    function Deserto(){
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    function Dino(){
        this.sprites = {
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'agacha1': '-941px',
            'agacha2': '-1000px'
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = "87px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        this.element.style.left = "20px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if(this.status == 0){
            this.element.style.width = '45px';
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
        }
        else if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
        else if(this.status == 3){
            this.element.style.width = '60px';
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agacha1)?this.sprites.agacha2:this.sprites.agacha1;
        }
    }

    function Nuvem(){
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random()*120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function(){
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function DPassaro(){
        this.sprites = {
            'voa1' : "-134px",
            'voa2' : "-180px",
        }
        this.element = document.createElement("div");
        this.element.className = "dPassaro";
        this.element.style.right = "0px";
        var a = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        switch(a){
            case 1:
                this.element.style.top = "90px";
                break;

            case 2:
                this.element.style.top = "45px";
                break;
            
            case 3:
                this.element.style.top = "10px";
                break;
        }        
        deserto.element.appendChild(this.element);
    }

    DPassaro.prototype.voar = function(){
        this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.voa1)?this.sprites.voa2:this.sprites.voa1;
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function Cacto(){
        this.sprites = {
            'peq_um':'-228px',
            'peq_dois':'-245px',
            'peq_tres':'-279px',

            'grd_um':'-332px',
            'grd_dois':'-358px',
            'grd_quatro':'-407px'
        };
        this.element = document.createElement("div");
        this.element.className = "cacto";
        this.element.style.bottom = "0px";
        this.element.style.right = "0px";
        var a = Math.floor(Math.random() * (6 - 1 + 1) + 1); 
        switch(a){    
            case 1: 
                this.element.style.width = "25px";
                this.element.style.height = "49px";
                this.element.style.backgroundPositionX = this.sprites.grd_um;
                break;
            case 2: 
                this.element.style.width = "50px";
                this.element.style.height = "49px";
                this.element.style.backgroundPositionX = this.sprites.grd_dois;
                break; 
            case 3: 
                this.element.style.width = "75px";
                this.element.style.height = "49px";
                this.element.style.backgroundPositionX = this.sprites.grd_quatro;
                break;
            case 4: 
                this.element.style.height = "35px";
                this.element.style.width = "17px";
                this.element.style.backgroundPositionX = this.sprites.peq_um;
                break;
            case 5: 
                this.element.style.height = "35px";
                this.element.style.width = "34px";
                this.element.style.backgroundPositionX = this.sprites.peq_dois;
                break;        
            case 6: 
                this.element.style.height = "35px";
                this.element.style.width = "51px";
                this.element.style.backgroundPositionX = this.sprites.peq_tres;
                break; 
        } 
        deserto.element.appendChild(this.element)
    }

    Cacto.prototype.mover = function(){

        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function run () {
        dino.correr();
        deserto.mover();
        if (Math.floor(Math.random()*1000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
        }
        if (Math.floor(Math.random()*10000) <= PROB_CACTO) {
            // var a = Math.floor(Math.random() * (2 - 1 + 1) + 1);
            // if(a == 1){
            //     cactos.push(new Cacto());
            // }
            // else{
                dPassaro.voar();
            //}
        }
        nuvens.forEach(function (n) {
            n.mover();
        })
        // cactos.forEach(function (c) {
        //     c.mover();
        // });
        //Em caso de game over
        //clearInterval(gameLoop);
    }
    init();
})();