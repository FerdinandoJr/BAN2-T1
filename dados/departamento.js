class Departamento {
    constructor(nr_depart, nome, escritorio) {
		this.nr_depart = nr_depart;
		this.nome = nome;
		this.escritorio = escritorio;
    }

    getNumero() {     
        return this.nr_depart;
    }
    getNome() {     
        return this.nome;
    }
    getEscritorio() {     
        return this.escritorio;
    }
    getArray(){
        return [this.nr_depart, this.nome, this.escritorio];
    }
    update(str){
        const d = str.split("^");
        this.nome = d[0];
        this.escritorio = d[1];
        return this;
    }
}

