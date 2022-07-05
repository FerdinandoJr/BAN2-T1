class Projeto {
    constructor(nr_projeto, nome, orgao, data_ini, data_fim, orcamento, pesquisador) {
		this.nr_projeto = nr_projeto;
		this.nome = nome;
		this.orgao = orgao;
		this.data_ini = data_ini;
		this.data_fim = data_fim;
		this.orcamento = orcamento;
		this.pesquisador = pesquisador;
    }

    getNumero() {     
        return this.nr_projeto;
    }
    getNome() {     
        return this.nome;
    }
    getOrgao() {     
        return this.orgao;
    }
    getData_ini() {     
        return this.data_ini;
    }
    getData_fim() {     
        return this.data_fim;
    }
    getOrcamento() {     
        return this.orcamento;
    }
    getPesquisador() {     
        return this.pesquisador;
    }
    getArray(){
        return [this.nr_projeto, this.nome, this.orgao, this.data_ini, this.data_fim, this.orcamento, this.pesquisador];
    }

    update(str){
        const d = str.split("^");
    
        this.nome = d[0];
        this.orgao = d[1]; 
        this.data_ini = d[2];
        this.data_fim = d[3];  
        this.orcamento = d[4];
        this.pesquisador = d[5];         
        return this;
    }

}

