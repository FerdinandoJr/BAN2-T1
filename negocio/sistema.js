//const url = "https://www.eleicaofacil.com/junior/ban/";
const url = "../t1/persistencia/";
const pages = ['estudante', 'professor', 'projeto', 'turma', 'curso', 'departamento'];

class Sistema {
    constructor() {
		this.estudantes = [];
		this.professores = [];
        this.projetos = [];
        this.turmas = [];
        this.cursos = [];
        this.departamentos = [];
		this.paginaatual = undefined;
		this.popupativo = undefined;
		this.pageAjax = undefined;
		this.ultline = undefined;
		this.ultindex = undefined;
		this.popUpInsert = undefined;
    }
    
	/* CRIA UMA TABELA */
	createTable(obj, col, dados, size=[]){
		var key = "";
		var d = "";
		let table = document.createElement('div');
		let head = document.createElement('div');
		let body = document.createElement('div');
		let grid = ""; 
		
		
		table.classList.add("u-table");
		head.classList.add("u-table-head");
		body.classList.add("u-table-body");
		
		let head_line = document.createElement('div');
		head_line.classList.add("u-table-line");
		
		let col_size = col.length;
		for(var i=0 ; i < col_size; i++){
			let head_col = document.createElement('div');
			head_col.classList.add("u-table-col");
			head_col.innerHTML = col[i];
			head_line.appendChild(head_col);
			
			if(size!=[]){
				grid += size[i]+" ";
			}
		}
		
		grid = (grid == []) ? (100/col_size)+"".repeat(col_size): grid;
		head_line.style.gridTemplateColumns = grid;
		
		head.appendChild(head_line);
		
		for (key in dados) {	
			let body_line = document.createElement('div');
			body_line.classList.add("u-table-line");
			for (d in dados[key]) {	
				let body_col = document.createElement('div');
				body_col.classList.add("u-table-col");
				var da = dados[key][d];
				body_col.innerHTML = (da == "" || da == null) ? "--" :dados[key][d];			
				body_line.appendChild(body_col);	
			}
			body_line.style.gridTemplateColumns = grid;
			body.appendChild(body_line);
		}
		
		table.appendChild(head);
		table.appendChild(body);
		
		obj.find(".u-dados").html(table);
	}

	setEventEstudantes(local){
		const sys = this;
		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idestudante = $("#idestudante");
		const nomeestudante = $("#nomeestudante");
		const idadeestudante = $("#idadeestudante");
		const aconselhadorestudante = $("#aconselhadorestudante");				
		const turmaestudante = $("#turmaestudante");

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */		
			sys.ultline = l;
			sys.ultindex = index;		
			sys.pageAjax = 0;

			/* COLOCA O VALOR NO INPUT*/
			idestudante.val(sys.estudantes[index].getMatricula())
			nomeestudante.val(sys.estudantes[index].getNome()) 					
			idadeestudante.val(sys.estudantes[index].getIdade())
			turmaestudante.val(sys.estudantes[index].getTurma())					
			aconselhadorestudante.val(sys.estudantes[index].getAconselhador())

			/* ATIVA O POPUP */
			sys.popup("estudantePop")
		})
	}

	setEventDepartamento(local){
		const sys = this;
		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const iddepartamento = $("#iddepartamento");
		const nomedepartamento = $("#nomedepartamento");
		const escritoriodepartamento = $("#escritoriodepartamento");

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */				
			sys.ultline = l;
			sys.ultindex = index;
			sys.pageAjax = 5;

			/* COLOCA O VALOR NO INPUT*/
			iddepartamento.val(sys.departamentos[index].getNumero())
			nomedepartamento.val(sys.departamentos[index].getNome()) 
			escritoriodepartamento.val(sys.departamentos[index].getEscritorio())					

			/*PREPARA AMBIENTE*/
			const o = $(".u-tab-d");
			o.removeClass("u-tab-act");
			o.eq(0).addClass("u-tab-act");

			const a = $(".u-pop-tab-d");		
			a.removeClass("u-popup-tab-act");
			a.eq(0).addClass("u-popup-tab-act");

			const tabbtns = $(".u-tab-btn-d");

			/*MOSTRA QUAL BOTAO FOI APERTADO*/
			tabbtns.hide();
			tabbtns.eq(0).show();
			/* ATIVA O POPUP */
			sys.popup("departamentoPop")
			sys.getDepartamentoProfessor(sys.departamentos[index].getNumero());
		})
	}

	setEventProfessor(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idprofessor = $("#idprofessor");
		const nomeprofessor = $("#nomeprofessor");
		const idadeprofessor = $("#idadeprofessor");
		const especialidadeprofessor = $("#especialidadeprofessor");				
		const salaprofessor = $("#salaprofessor");

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */		
			sys.ultline = l;
			sys.ultindex = index;		
			sys.pageAjax = 1;

			/* COLOCA O VALOR NO INPUT*/
			idprofessor.val(sys.professores[index].getMatricula())
			nomeprofessor.val(sys.professores[index].getNome()) 					
			idadeprofessor.val(sys.professores[index].getIdade())
			salaprofessor.val(sys.professores[index].getSala())					
			especialidadeprofessor.val(sys.professores[index].getEspecialidade())

			/* ATIVA O POPUP */
			sys.popup("professorPop")
		})	
	}

	setEventCurso(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idcurso = $("#idcurso");
		const nomecurso = $("#nomecurso");
		
		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */				
			sys.ultline = l;
			sys.ultindex = index;
			sys.pageAjax = 4;

			/* COLOCA O VALOR NO INPUT*/
			idcurso.val(sys.cursos[index].getCodCurso())
			nomecurso.val(sys.cursos[index].getNome()) 

			/* ATIVA O POPUP */
			sys.popup("cursoPop")
		})	
	}

	setEventTurma(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idprojeto = $("#idturma");
		const anoturma = $("#anoturma");
		const semestreturma = $("#semestreturma");
		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */	
			sys.ultline = l;
			sys.ultindex = index;			
			sys.pageAjax = 3;

			/* COLOCA O VALOR NO INPUT*/
			idprojeto.val(sys.turmas[index].getNumero())
			anoturma.val(sys.turmas[index].getAno()) 					
			semestreturma.val(sys.turmas[index].getSemestre())											
			
			/* ATIVA O POPUP */
			sys.popup("turmaPop")
		})
	}

	setEventProjeto(local){
		const sys = this;
		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idprojeto = $("#idprojeto");
		const nomeprojeto = $("#nomeprojeto");
		const orgaoprojeto = $("#orgaoprojeto");
		const inicioprojeto = $("#inicioprojeto");				
		const fimprojeto = $("#fimprojeto");
		const orcamentoprojeto = $("#orcamentoprojeto");
		const pesquisadorprojeto = $("#pesquisadorprojeto");
		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */	
			sys.ultline = l;
			sys.ultindex = index;			
			sys.pageAjax = 2;

			/* COLOCA O VALOR NO INPUT*/
			idprojeto.val(sys.projetos[index].getNumero())
			nomeprojeto.val(sys.projetos[index].getNome()) 					
			orgaoprojeto.val(sys.projetos[index].getOrgao())											
			inicioprojeto.val(sys.projetos[index].getData_ini())
			fimprojeto.val(sys.projetos[index].getData_fim())		
			orcamentoprojeto.val(sys.projetos[index].getOrcamento())
			pesquisadorprojeto.val(sys.projetos[index].getPesquisador())
			/* ATIVA O POPUP */
			sys.popup("projetoPop")

			sys.getEstudanteProjeto(sys.projetos[index].getNumero());
			sys.getProfessorProjeto(sys.projetos[index].getNumero());
		})
	}

	getEstudanteProjeto(cod){
		const sys = this;
		$.ajax({
            url: url+"/projeto_estudante.php",
            data:"op=0&cod="+cod,
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var estu = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						estu.push(e);
					}
				}
				const local = $("#EstProj");

				sys.createTable(local, ["id", "nome"], estu, ["10%", "90%"]);
				

				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var est = sys.estudantes;
				var control = false;
				for(var i=0;i<est.length;i++){
					var b = est[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_estudante"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_estudante"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;
					
				}
				
				const ac = $("#selEstProj");
				const select = ac.find("select")
				
				if(opt == ""){
					ac.hide();
				}else{
					select.html(opt1+""+opt);						
					select.val("");
					ac.show();
				}
				
			}});
	}
	getProfessorProjeto(cod){
		const sys = this;
		$.ajax({
            url: url+"/projeto_professor.php",
            data:"op=0&cod="+cod,
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var prof = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						prof.push(e);
					}
				}
				const local = $("#ProfProj");

				sys.createTable(local, ["id", "nome"], prof, ["10%", "90%"]);
				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var prof = sys.professores;
				var control = false;
				for(var i=0;i<prof.length;i++){
					var b = prof[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_prof"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_prof"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;					
				}
				const select = $("#selProfProj");
				const pai = select.parent();
				if(opt==""){
					pai.hide();
				}else{
					select.html(opt1+""+opt);						
					select.val("");
					pai.show();
				}
		}});
	}
	
	getDepartamentoProfessor(cod){
		const sys = this;
		$.ajax({
            url: url+"/departamento_professor.php",
            data:"op=0&cod="+cod,
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var prof = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						prof.push(e);
					}
				}
				const local = $("#deparProf");

				sys.createTable(local, ["id", "nome"], prof, ["10%", "90%"]);
				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var prof = sys.professores;
				var control = false;
				for(var i=0;i<prof.length;i++){
					var b = prof[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_prof"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_prof"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;					
				}
				const select = $("#selDeparProf");
				const pai = select.parent();
				if(opt==""){
					pai.hide();
				}else{
					select.html(opt1+""+opt);						
					select.val("");
					pai.show();
				}
		}});
	}
	
    /* PEGA TODOS OS ESTUDANTES DO BANCO DE DADOS E COLOCA NA VARIAVEL 'ESTUDANTES' */
    setAllEstudantes(){
		const sys = this;
        $.ajax({
            url: url+"/estudante.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = new Estudante(b[0],b[1],b[2],b[3],b[4]); 
						sys.estudantes.push(e);
					}
				}
				const local = $("#estudante");

				sys.createTable(local, ["id", "nome", "idade", "aconselhador", "turma"], sys.estudantes, ["5%", "30%", "15%", "30%", "20%"]);							

				sys.setEventEstudantes(local);

				$("#turmaAll").find("select").on("change",function(){
					const v = $(this).val();
					var opt = "";
					var opt1 = "<option value=''>Selecionar</option>";
					var key;
					for (key in o) {
						var b = o[key];                                        					
						if(b[4] < v){						
							//var e = new Estudante(b[0],b[1],b[2],b[3],b[4]); 
							opt += "<option value='"+b[0]+"'>"+b[1]+"</option>";
						}
					}
					const ac = $("#aconselhaAll");
					const select = ac.find("select")
					select.html(opt1);						
					select.val("");
					ac.hide();
					if(opt == ""){
						
					}else{
						select.append(opt);
						ac.show();
					}

					
				})
			}
        });
    }
    /* PEGA TODOS OS PROFESSORES DO BANCO DE DADOS E COLOCA NA VARIAVEL 'PROFESSORES' */
    setAllProfessores(){
		const sys = this;
        $.ajax({
            url: url+"/professor.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Professor(b[0],b[1],b[2],b[3],b[4]); 
						sys.professores.push(e);
					}
				}
				const local = $("#professor");
				sys.createTable(local, ["id", "nome", "idade", "sala", "especialidade"], sys.professores, ["5%", "35%", "10%", "10%", "40%"]);
				
				sys.setEventProfessor(local);

				var op = sys.createOptionProfessor();
				$("#pesquisadorAll").html(op);
				$("#selOriProj").html(op);
				$("#selProfProj").html(op);
            }
        });
	}

    /* PEGA TODOS OS Cursos DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Cursos' */
    setAllCursos(){
		const sys = this;
        $.ajax({
            url: url+"/curso.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Curso(b[0],b[1]); 
						sys.cursos.push(e);
					}
				}
				/* PEGA ELEMENTO ONDE FICARÁ A TABELA */
				const local = $("#curso");				
				/* CRIA TABELA */
				sys.createTable(local, ["id", "nome"], sys.cursos, ["40%", "60%"]);
				
				sys.setEventCurso(local);

				
            }
        });
	}

    /* PEGA TODOS OS Turma DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Turma' */
    setAllTurma(){
		const sys = this;
        $.ajax({
            url: url+"/turma.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var opt = "";
				opt += "<option value=''>Selecionar..</option>";
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Turma(b[0],b[1], b[2]); 
						sys.turmas.push(e);

						opt += "<option value='"+b[0]+"'>"+b[1]+"/"+b[2]+"</option>";
					}
				}
				/* PEGA ELEMENTO ONDE FICARÁ A TABELA */
				const local = $("#turma");

				sys.createTable(local, ["id", "ano", "semestre"], sys.turmas, ["10%", "45%", "45%"]);
						
				sys.setEventTurma(local);

				$("#turmaAll").find("select").html(opt);
				
            }
        });
	}

	createOptionTurma(){
		var opt = "";
		var o = this.turmas;
		for (var i = 0; i< o.length;i++) {
			var b = o[i];   
			opt += "<option value='"+b["cd_turma"]+"'>"+b["ano"]+"/"+b['semestre']+"</option>";			
		} 
		
		return opt;
	}

	createOptionProfessor(){
		var opt = "";
		var o = this.professores;
		for (var i = 0; i< o.length;i++) {
			var b = o[i];   
			opt += "<option value='"+b["mat_prof"]+"'>"+b["nome"]+"</option>";			
		} 
		
		return opt;
	}

    /* PEGA TODOS OS Departamento DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Departamento' */
    setAllDepartamento(){
		const sys = this;
        $.ajax({
            url: url+"/departamento.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var opt = "<option value=''>Selecionar..</option>";
                
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Departamento(b[0],b[1], b[2]); 
						sys.departamentos.push(e);
						opt += "<option value='"+b[0]+"'>"+b[1]+"</option>";					
					}
				}
				const local = $("#departamento");
				sys.createTable(local, ["id", "nome", "escritorio"], sys.departamentos, ["10%", "45%", "45%"]);
				
				sys.setEventDepartamento(local);

				$("#departamentoAll").html(opt);
            }
        });
	}

    /* PEGA TODOS OS Projeto DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Projeto' */
    setAllProjeto(){
		const sys = this;
        $.ajax({
            url: url+"/projeto.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Projeto(b[0],b[1], b[2], b[3],b[4],b[5],b[6]); 
						sys.projetos.push(e);
					}
				}
				const local = $("#projeto");
				sys.createTable(local, ["id", "nome", "orgão", "data inicial", "data final", "orçamento", "pesquisador"], sys.projetos, ["10%", "20%", "10%", "10%", "10%" , "10%" ,"30%"]);
				
				sys.setEventProjeto(local);
            }
        });
	}

	
	setValSelect(sel, val){
		sel.prop("selected", false);
		sel.find("option[value='"+val+"']").prop("selected", true);
	}

	formataDados(obj, type){
		const body = obj.find(".u-popup-body");
		const inp = body.find("input").not("input[type='hidden']");
		const sel = body.find("select");

		const r = inp.add(sel);
		var result = ""+r.eq(0).val();
		for(var i = 1; i< r.length; i++){
			result += "^"+r.eq(i).val();
		}
		
		
		return result;
	}

	updateTable(dados){
		const obj = this.ultline.find(".u-table-col");
		if(obj == undefined) return;

		for(var i= 0 ; i < obj.length; i++){
			obj.eq(i).html(dados[i]);
		}

	}

	/* ATUALIZA NO BANCO DE DADOS */
	update(){
		const sys = this;
		const p = pages[sys.pageAjax];
		const dados = sys.formataDados(sys.popupativo);
		const id = $("#id"+p).val();
		const index = sys.ultindex;		
		
        $.ajax({
            url: url+"/"+p+".php",
            data:"op=2&dados="+dados+"&m="+id,
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
				let a = "";
				if(p=="estudante"){	
					a = sys.estudantes[index].update(dados).getArray();				
				}else if(p=="professor"){
					a = sys.professores[index].update(dados).getArray();
				}else if(p=="curso"){
					a = sys.cursos[index].update(dados).getArray();					
				}else if(p=="turma"){
					a = sys.turmas[index].update(dados).getArray();					
				}else if(p=="projeto"){
					a = sys.projetos[index].update(dados).getArray();					
				}else if(p=="departamento"){
					a = sys.departamentos[index].update(dados).getArray();					
				}

				sys.updateTable(a);
				sys.closePopup();
			}
        });
	}

	insertEstudanteProj(){
		const sys = this;
		var cod = sys.projetos[sys.ultindex].getNumero();
		const selEstProj = $("#selEstProj").find("select");		
		const selOriProj = $("#selOriProj");		
		if(selEstProj.val() == "") return;

		$.ajax({
            url: url+"/projeto_estudante.php",
            data:"op=1&cod="+cod+"&codE="+selEstProj.val()+"&codP="+selOriProj.val(),
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var estu = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						estu.push(e);
					}
				}
				const local = $("#EstProj");

				sys.createTable(local, ["id", "nome"], estu, ["10%", "90%"]);
				
				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var est = sys.estudantes;
				var control = false;
				for(var i=0;i<est.length;i++){
					var b = est[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_estudante"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_estudante"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;
					
				}
				
				const select = selEstProj;
				select.html(opt1+""+opt);						
				select.val("");
			}});
	}

	insertProfessorProj(){
		const sys = this;
		var cod = sys.projetos[sys.ultindex].getNumero();		
		const selProfProj = $("#selProfProj");		
		if(selProfProj.val() == "") return;

		$.ajax({
            url: url+"/projeto_professor.php",
            data:"op=1&cod="+cod+"&codP="+selProfProj.val(),
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var profs = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						profs.push(e);
					}
				}
				const local = $("#ProfProj");

				sys.createTable(local, ["id", "nome"], profs, ["10%", "90%"]);
				
				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var prof = sys.professores;
				var control = false;
				for(var i=0;i<prof.length;i++){
					var b = prof[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_prof"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_prof"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;					
				}
				const select = selProfProj;
					
				if(opt==""){
					select.hide();
				}else{
					select.html(opt1+""+opt);						
					select.val("");
					select.show();
				}
				
			}});
	}

	getInsertDepartProfessor(){
		const sys = this;
		var cod = sys.departamentos[sys.ultindex].getNumero();		
		const selDeparProf = $("#selDeparProf");		
		if(selDeparProf.val() == "") return;

		$.ajax({
            url: url+"/departamento_professor.php",
            data:"op=1&cod="+cod+"&codP="+selDeparProf.val(),
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var profs = []
                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];                                        
						var e = {'id':b[0], 'nome': b[1]}; 
						profs.push(e);
					}
				}
				const local = $("#deparProf");

				sys.createTable(local, ["id", "nome"], profs, ["10%", "90%"]);
				
				var opt = "";
				var opt1 = "<option value=''>Selecionar</option>";
				var key;
				var prof = sys.professores;
				var control = false;
				for(var i=0;i<prof.length;i++){
					var b = prof[i];                                        										
					for (key in o) {
						var c = o[key];						
						if(c[0] == b["mat_prof"]){												
							control = true;
						}
					}		
					if(!control){
						opt += "<option value='"+b["mat_prof"]+"'>"+b["nome"]+"</option>";			
					}
					control = false;					
				}
				const select = selDeparProf;
					
				if(opt==""){
					select.hide();
				}else{
					select.html(opt1+""+opt);						
					select.val("");
					select.show();
				}
				
			}});
	}

	insert(obj){
		const sys = this;
		const p = sys.pageAjax;
		const dados = sys.formataDados(sys.popupativo);		
		console.log(dados)

		$.ajax({
            url: url+"/"+p+".php",
            data:"op=1&dados="+dados,
            type:"POST",
            cache:false,
            error:function(e) {alert("ERROR")},
            success: function(r){
				r = r.replace("\n", "");
				r = r.replace("\r", "");
				var d = r.split("^");
				var a = "";
				if(p=="departamento"){
					a = new Departamento(d[0], d[1], d[2]);					
					sys.departamentos.push(a);
					const local = $("#departamento");
					sys.createTable(local, ["id", "nome", "escritorio"], sys.departamentos, ["10%", "45%", "45%"]);
					sys.setEventDepartamento(local);
					var op = sys.createOptionTurma();
					$("#turmaAll").find("select").html(op);
				
				}else if(p=="turma"){
					a = new Turma(d[0], d[1], d[2]);
					sys.turmas.push(a);
					const local = $("#turma");
					sys.createTable(local, ["id", "ano", "semestre"], sys.turmas, ["10%", "45%", "45%"]);
					sys.setEventTurma(local);
					
				}else if(p == "curso"){
					a = new Curso(d[0], d[1]);
					sys.cursos.push(a);
					const local = $("#curso");									
					sys.createTable(local, ["id", "nome"], sys.cursos, ["40%", "60%"]);
					sys.setEventCurso(local);

				}else if(p == "professor"){
					a = new Professor(d[0], d[1], d[2],d[3],d[4]);
					sys.professores.push(a);
					const local = $("#professor");
					sys.createTable(local, ["id", "nome", "idade", "sala", "especialidade"], sys.professores, ["5%", "35%", "10%", "10%", "40%"]);
					sys.setEventProfessor(local);
					var op = sys.createOptionProfessor();
					$("#pesquisadorAll").html(op);
					$("#selOriProj").html(op);
					$("#selProfProj").html(op);
				}else if(p == "projeto"){
					a = new Projeto(d[0], d[1], d[2],d[3],d[4],d[5],d[6]);
					sys.projetos.push(a);
					const local = $("#projeto");
					sys.createTable(local, ["id", "nome", "orgão", "data inicial", "data final", "orçamento", "pesquisador"], sys.projetos, ["10%", "20%", "10%", "10%", "10%" , "10%" ,"30%"]);
					sys.setEventProjeto(local);
					
				}else if(p == "estudante"){
					a = new Estudante(d[0],d[1],d[2],d[3],d[4]);
					sys.estudantes.push(a);
					const local = $("#estudante");
					sys.createTable(local, ["id", "nome", "idade", "aconselhador", "turma"], sys.estudantes, ["5%", "30%", "15%", "30%", "20%"]);							
					sys.setEventEstudantes(local);
				}

				sys.closePopup();
									
			}
        });
	}

	/* MOSTRA POPUP */
	popup(id){
		const pop = $("#"+id);
		const pops = $(".u-popup");
		this.popupativo = pop;

		pops.removeClass("u-popup-act");
		pop.addClass("u-popup-act");
	}

	/* FECHA TODOS OS POPUP*/
	closePopup(){
		const pops = $(".u-popup");
		this.popupativo = undefined;
		pops.removeClass("u-popup-act");
	}
    /* TROCA AS TELAS */
    href(obj){
		const h = obj.attr("h");
        const o = $("#"+h);
        const all = $(".u-content-page");
		this.paginaatual = o;
		this.popUpInsert = h+"PopInsert";
        all.removeClass("u-content-act");        
        o.addClass("u-content-act");
    }
}

const Sys = new Sistema();
    

/* JQUERY - COMEÇA AQUI */
$(document).ready(function(){
    
    
    /* EVENTOS CLICKS*/
    $(".u-nav-li").click(function(){ Sys.href($(this))});
	$(".u-closed-pop").click(function(){ Sys.closePopup()});
	$(".u-popup-att").click(function(){Sys.update()})
	$(".u-popup-insert").click(function(){Sys.insert()});
	$(".u-top-btn").click(function(){Sys.pageAjax = $(this).attr("h");Sys.popup(Sys.popUpInsert)})
	$("#EstudanteProj").click(function(){Sys.insertEstudanteProj()});
    $("#ProfessorProj").click(function(){{Sys.insertProfessorProj()}});
	$("#DepartamentoProf").click(function(){{Sys.getInsertDepartProfessor()}});

	$(".u-tab").click(function(){
		const o = $(this);
		const all = $(".u-tab");

		/*MOSTRA QUAL BOTAO FOI CLICADO*/
		all.removeClass("u-tab-act")
		o.addClass("u-tab-act");

		/* FAZ  APARECER A TELA QUE EU CLIQUEI*/
		const a = $(".u-popup-tab");		
		a.removeClass("u-popup-tab-act");
		a.eq(o.index()).addClass("u-popup-tab-act");

		const tabbtns = $(".u-tab-btn");

		/*MOSTRA QUAL BOTAO FOI APERTADO*/
		tabbtns.hide();
		tabbtns.eq(o.index()).show();

	});

	$(".u-tab-d").click(function(){
		const o = $(this);
		const all = $(".u-tab-d");

		/*MOSTRA QUAL BOTAO FOI CLICADO*/
		all.removeClass("u-tab-act")
		o.addClass("u-tab-act");

		/* FAZ  APARECER A TELA QUE EU CLIQUEI*/
		const a = $(".u-pop-tab-d");		
		a.removeClass("u-popup-tab-act");
		a.eq(o.index()).addClass("u-popup-tab-act");

		const tabbtns = $(".u-tab-btn-d");

		/*MOSTRA QUAL BOTAO FOI APERTADO*/
		tabbtns.hide();
		tabbtns.eq(o.index()).show();

	});

	$("#inicioprojeto").mask("99/99/9999");
	$("#fimprojeto").mask("99/99/9999");
	$("#cadDataF").mask("99/99/9999");
	$("#cadDataI").mask("99/99/9999");

	Sys.setAllEstudantes();
	Sys.setAllProfessores();
	Sys.setAllCursos();
	Sys.setAllTurma();
	Sys.setAllDepartamento();
	Sys.setAllProjeto();	
	Sys.href($("#aluno"));
	
});