class Curso {
    constructor(cd_curso, nome) {
		this.cd_curso = cd_curso;
		this.nome = nome;		
    }

    getCodCurso() {     
        return this.cd_curso;
    }
    getNome() {     
        return this.nome;
    }

    getArray(){
        return [this.cd_curso, this.nome];
    }

    update(str){
        const d = str.split("^");
    
        this.nome = d[0];
        return this;
    }



}

