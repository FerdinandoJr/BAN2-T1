class Professor {
    constructor(mat_prof, nome, idade, sala, especialidade) {
		this.mat_prof = mat_prof;
		this.nome = nome;
		this.idade = idade;
		this.sala = sala;
		this.especialidade = especialidade;
    }

    getMatricula() {     
        return this.mat_prof;
    }
    getNome() {     
        return this.nome;
    }
    getIdade() {     
        return this.idade;
    }
    getSala() {     
        return this.sala;
    }
    getEspecialidade() {     
        return this.especialidade;
    }
    getArray(){
        return [this.mat_prof, this.nome, this.idade, this.sala, this.especialidade];
    }
    update(str){
        const d = str.split("^");
        this.nome = d[0];
        this.idade = d[1];
        this.sala = d[2];
        this.especialidade = d[3];
        return this;
    }
}
