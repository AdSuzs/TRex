(function () {

    const FPS = 300;
    const PROB_NUVEM = 4;
    const PROB_CACTO = 3;
    var gameLoop;
    var deserto;
       var dino;
    var nuvens = [];
    var obstaculo = [];

    function init(){
        deserto = new Deserto();
        dino = new Dino();
        gameLoop = setInterval(run, 1000/FPS); //seta o tempo para ele andar
    }

    window.addEventListener("keydown", function (e) {
        if(e.key == "ArrowUp" && dino.status==0 || dino.status==5) dino.status = 1;
        if(e.key == 'f') clearInterval(gameLoop);
        if(e.key == 'p') dino.status = 5;
        if(e.key == "ArrowDown" && dino.status==0 || dino.status==5)dino.status = 3;
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
            'parado' : '-40px',
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'agacha1': '-941px',
            'agacha2': '-1000px',
            'dead' : '-852px'
        };
        this.status = 5; // 0:correndo; 1:subindo; 2: descendo; 3: agachado; 4: morto; 5: parado 
        this.alturaMaxima = "87px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.parado;
        this.element.style.bottom = "0px";
        this.element.style.right = "420px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if(this.status == 0){
            this.element.style.width = '45px';
            this.element.style.height = '45px';
            this.element.style.backgroundPositionY = '-3px';
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
            this.element.style.height = '30px';
            this.element.style.backgroundPositionY = '-20px';
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agacha1)?this.sprites.agacha2:this.sprites.agacha1;
        }
        else if(this.status == 4){
            this.element.style.backgroundPositionX = this.sprites.dead;
            clearInterval(gameLoop);
        }
        else if(this.status == 5){
            this.element.style.backgroundPositionX = this.sprites.parado;
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
            'voa2' : "-180px"
        };
        this.element = document.createElement("div");
        this.element.className = "dPassaro";
        this.element.style.right = "0px";
        this.element.style.backgroundPositionX = this.sprites.voa1;
        var a = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        
        switch(a){
            case 1:
                this.element.style.bottom = "15px";
                break;

            case 2:
                this.element.style.bottom = "50px";
                break;
            
            case 3:
                this.element.style.bottom = "38px";
                break;
        }        
        deserto.element.appendChild(this.element);
    }

    DPassaro.prototype.mover = function(){
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
        // dino.correr();
        if(dino.status != 5){
            dino.correr();
            deserto.mover();
    
            if (Math.floor(Math.random()*1000) <= PROB_NUVEM) {
                nuvens.push(new Nuvem());
            }
            //Coloca um obstáculo aleatoriamente
            if (Math.floor(Math.random()*1000) <= PROB_CACTO) {
                //  var a = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                //  if(a == 1){
                    // obstaculo.push(new Cacto());
                // }
                // if(a == 2){
                    obstaculo.push(new DPassaro());
                // }
             }    
             //Adiciona as núvens
             nuvens.forEach(function (n) {
                 n.mover();
             });
    
            console.log("dino pos bottom "+dino.element.style.bottom);
            console.log("dino pos right "+dino.element.style.right);
            obstaculo.forEach(function (c) {
                c.mover();
                var ob_posBott = parseInt(c.element.style.bottom);
                var ob_posRight = parseInt(c.element.style.right);
                var ob_tam = parseInt(c.element.style.width) - 5;
                var di_posBott = parseInt(dino.element.style.bottom);
                var di_posRight = parseInt(dino.element.style.right);
    
                if((ob_posRight + ob_tam > di_posRight && ob_posRight - ob_tam <= di_posRight) && ob_posBott == di_posBott){
                    dino.status = 4;
                }
                else if((ob_posBott == 15 && di_posBott == 0) && (ob_posRight > di_posRight - 45 && ob_posRight <= di_posRight + 45)){
                    dino.status = 4;
                }
                else if((ob_posBott == 50 && ob_posBott <= di_posBott + 40) && (ob_posRight > di_posRight - 45 && ob_posRight <= di_posRight + 45)){
                    dino.status = 4;
                }
                else if((ob_posBott == 38 && di_posBott == 0) && dino.status == 0){
                    if(ob_posRight > di_posRight - 30 && ob_posRight <= di_posRight + 35){
                        dino.status = 4;
                    }
                }
            });
                  
            //Em caso de game over
            //clearInterval(gameLoop);
        }
    }

    init();
})();