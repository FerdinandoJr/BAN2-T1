class Turma {
    constructor(cd_turma, ano, semestre) {
		this.cd_turma = cd_turma;
		this.ano = ano;
		this.semestre = semestre;
    }

    getNumero() {     
        return this.cd_turma;
    }
    getAno() {     
        return this.ano;
    }
    getSemestre() {     
        return this.semestre;
    }

    update(str){
        const d = str.split("^");
    
        this.ano = d[0];
        this.semestre = d[1];        
        return this;
    }

    getArray(){
        return [this.cd_turma, this.ano, this.semestre];
    }

}