CREATE TABLE curso(
cd_curso INT auto_increment ,
nome varchar(50),
PRIMARY KEY(cd_curso)
);

CREATE TABLE turma(
cd_turma int auto_increment,
ano int,
semestre INT,
PRIMARY KEY(cd_turma)
);

CREATE TABLE estudante(
mat_estudante int auto_increment,
nome VARCHAR(50),
idade INTEGER,
aconselhador int,
cd_turma int, 
PRIMARY KEY (mat_estudante),
foreign key (aconselhador) references estudante(mat_estudante),
foreign key (cd_turma) references turma(cd_turma)
);

create table professor(
mat_prof int auto_increment,
nome varchar(50),
idade integer,
sala varchar(4),
especialidade varchar(50),
PRIMARY KEY(mat_prof)
);

CREATE TABLE projeto(
nr_projeto int auto_increment,
nome VARCHAR(50),
orgao VARCHAR(50),
data_ini DATE,
data_fim DATE,
orcamento FLOAT,
pesquisador int,
PRIMARY KEY(nr_projeto),
foreign key (pesquisador) references professor(mat_prof)
);

create table departamento(
nr_depart int auto_increment,
nome varchar(50),
escritorio varchar(50),
primary KEY(nr_depart)
);

create table curso_estudante( 
mat_estudante int,
cd_curso INT,
foreign key (mat_estudante) references estudante(mat_estudante),
foreign key (cd_curso) references curso(cd_curso)
);

CREATE TABLE estudante_projeto(
mat_estudante int,
nr_projeto int,
mat_prof INT,
foreign key (mat_estudante) references estudante(mat_estudante),
foreign key (nr_projeto) references projeto(nr_projeto),
foreign key (mat_prof) references professor(mat_prof)
);

create table departamento_professor(
nr_matricula int,
nr_depart int,
foreign key (nr_matricula) references professor(mat_prof),
foreign key (nr_depart) references departamento(nr_depart)
);

create table departamento_curso(
cd_curso int,
nr_depart INT,
foreign key (cd_curso) references curso(cd_curso),
foreign key (nr_depart) references departamento(nr_depart)
);

create table professor_projeto(
nr_matricula int,
nr_projeto INT,
foreign key(nr_matricula) references professor(mat_prof),
foreign key(nr_projeto) references projeto(nr_projeto)
);


insert into turma (ano, semestre) values
(2019, 2),
(2020, 1),
(2020, 2);

insert into estudante(nome, idade,aconselhador, cd_turma) values
('Carlos', 41, NULL,1),
('Alberto', 21, NULL,1),
('Rodolfo', 22, NULL,1),
('João', 26, NULL,1),
('André', 50, NULL,1),
('Maria', 23, NULL,1),
('Julia', 56, NULL,1),
('Natalia', 42, NULL,1),
('Bruna', 19, NULL,1),
('Vitor', 41, 1,2),
('Anderson', 21, 2,2);



insert into curso(nome) values
('TADS'),
('BCC'),
('ENGM'),
('ENGP');


insert into professor(nome, idade, sala, especialidade) values
('Adilson', 50, 'f203', 'Computação gráfica'),
('Guilherme', 43, 'f204', 'Física'),
('Vitória', 34, 'f202', 'Eletrônica');

insert into projeto (nome, orgao, data_ini, data_fim, orcamento, pesquisador) values
('Chips e Microchips', 'DCC', '2019-06-01','2020-06-01', 1000.0, 1),
('Servidores', 'DCC', '2020-01-01','2020-07-01', 3000.0, 2),
('Robotica', 'DCC', '2020-01-01','2020-09-01', 1600.0, 3);


insert into departamento (nome, escritorio) values
('DCC', 'E200'),
('Física','E201'),
('Eletrônica', 'E202');

insert into curso_estudante values
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,2),
(8,2),
(9,2),
(10,3),
(11,3);


insert into estudante_projeto values
(1,1,1),
(2,2,2),
(3,3,3);

insert into departamento_professor values
(1,1),
(2,2),
(3,3);

insert into departamento_curso values
(1,1),
(2,1),
(3,2),
(4,3);

insert into professor_projeto values
(1,2),
(2,2),
(3,3);



