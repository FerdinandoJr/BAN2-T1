class Estudante {
    constructor(mat_estudante, nome, idade, aconselhador, cd_turma) {
		this.mat_estudante = mat_estudante;
		this.nome = nome;
		this.idade = idade;
		this.aconselhador = aconselhador;
		this.cd_turma = cd_turma;
    }

    getMatricula() {     
        return this.mat_estudante;
    }
    getNome() {     
        return this.nome;
    }
    getIdade() {     
        return this.idade;
    }
    getAconselhador() {     
        return this.aconselhador;
    }
    getTurma() {     
        return this.cd_turma;
    }

    update(str){
        const d = str.split("^");
    
        this.nome = d[0];
        this.idade = d[1];
        this.aconselhador = d[2];
        this.cd_turma = d[3];

        
        return this;
    }

    getArray(){
        return [this.mat_estudante, this.nome, this.idade, this.aconselhador, this.cd_turma];
    }

}

