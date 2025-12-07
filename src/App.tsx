import { useState } from 'react';
import { User, Heart, Code, Copy, Check, TreeDeciduous, Map } from 'lucide-react';

// --- DATA TYPES & STRUCTURE ---

type Person = {
    id: string;
    name: string;
    age: number;
    sex: 'M' | 'F';
    role?: string;
    location?: string;
};

type FamilyNode = {
    father?: Person;
    mother?: Person;
    person?: Person;
    children?: FamilyNode[];
    mainDescendant?: 'father' | 'mother';
};

type RegionNode = {
    name: string;
    type: 'Federal' | 'Estadual' | 'Municipal';
    occupants: Person[];
    children?: RegionNode[];
};

// --- MOCKED DATA FROM PROLOG ---

const familySilva: FamilyNode = {
    father: { id: 'dom_pedro_silva', name: 'Dom Pedro Silva', age: 82, sex: 'M', role: 'Presidente', location: 'Brasil' },
    mother: { id: 'dona_elena_silva', name: 'Dona Elena Silva', age: 80, sex: 'F', role: 'Cidadã', location: 'Brasil' },
    children: [
        {
            mainDescendant: 'father',
            father: { id: 'roberto_silva', name: 'Roberto Silva', age: 55, sex: 'M', role: 'Governador', location: 'Bahia' },
            mother: { id: 'sandra_silva', name: 'Sandra Silva', age: 52, sex: 'F', role: 'Cidadã', location: 'Bahia' },
            children: [
                { person: { id: 'jorge_silva', name: 'Jorge Silva', age: 30, sex: 'M', role: 'Prefeito', location: 'Petrolina' } },
                { person: { id: 'ana_silva', name: 'Ana Silva', age: 28, sex: 'F', role: 'Vereador', location: 'Petrolina' } }
            ]
        },
        {
            person: { id: 'beatriz_silva', name: 'Beatriz Silva', age: 48, sex: 'F', role: 'Cidadã', location: 'Recife' }
        }
    ]
};

const familyOliveira: FamilyNode = {
    father: { id: 'mario_oliveira', name: 'Mario Oliveira', age: 75, sex: 'M', role: 'Governador', location: 'Pernambuco' },
    mother: { id: 'regina_oliveira', name: 'Regina Oliveira', age: 72, sex: 'F', role: 'Cidadã', location: 'Pernambuco' },
    children: [
        {
            mainDescendant: 'mother',
            father: { id: 'paulo_souza', name: 'Paulo Souza', age: 46, sex: 'M', role: 'Cidadão', location: 'Brasil' },
            mother: { id: 'carla_oliveira', name: 'Carla Oliveira', age: 45, sex: 'F', role: 'Senador', location: 'Brasil' },
            children: [
                { person: { id: 'lucas_oliveira', name: 'Lucas Oliveira', age: 18, sex: 'M', role: 'Cidadão', location: 'Petrolina' } }
            ]
        },
        { person: { id: 'bruno_oliveira', name: 'Bruno Oliveira', age: 42, sex: 'M', role: 'Prefeito', location: 'Recife' } },
        { person: { id: 'ricardo_oliveira', name: 'Ricardo Oliveira', age: 40, sex: 'M', role: 'Cidadão', location: 'Petrolina' } }
    ]
};

const familySantos: FamilyNode = {
    father: { id: 'sr_joao_santos', name: 'Sr. João Santos', age: 72, sex: 'M', role: 'Cidadão', location: 'Brasil' },
    mother: { id: 'dona_maria_santos', name: 'Dona Maria Santos', age: 70, sex: 'F', role: 'Dep. Federal', location: 'Brasil' },
    children: [
        {
            mainDescendant: 'father',
            father: { id: 'tiago_santos', name: 'Tiago Santos', age: 40, sex: 'M', role: 'Prefeito', location: 'Juazeiro' },
            mother: { id: 'aline_santos', name: 'Aline Santos', age: 38, sex: 'F', role: 'Cidadã', location: 'Juazeiro' },
            children: [
                { person: { id: 'pedrinho_santos', name: 'Pedrinho Santos', age: 10, sex: 'M', role: 'Cidadão', location: 'Juazeiro' } }
            ]
        },
        {
            mainDescendant: 'mother',
            father: { id: 'marcos_lima', name: 'Marcos Lima', age: 36, sex: 'M', role: 'Cidadão', location: 'Pernambuco' },
            mother: { id: 'julia_santos', name: 'Julia Santos', age: 35, sex: 'F', role: 'Dep. Estadual', location: 'Pernambuco' },
            children: [
                { person: { id: 'clara_santos', name: 'Clara Santos', age: 8, sex: 'F', role: 'Cidadã', location: 'Juazeiro' } }
            ]
        }
    ]
};

// --- REGIONAL HIERARCHY DATA ---

const regionalTree: RegionNode = {
    name: 'Brasil',
    type: 'Federal',
    occupants: [
        { id: 'dom_pedro_silva', name: 'Dom Pedro Silva', age: 82, sex: 'M', role: 'Presidente', location: 'Brasil' },
        { id: 'carla_oliveira', name: 'Carla Oliveira', age: 45, sex: 'F', role: 'Senador', location: 'Brasil' },
        { id: 'dona_maria_santos', name: 'Dona Maria Santos', age: 70, sex: 'F', role: 'Dep. Federal', location: 'Brasil' },
        { id: 'dona_elena_silva', name: 'Dona Elena Silva', age: 80, sex: 'F', role: 'Cidadã', location: 'Brasil' },
        { id: 'paulo_souza', name: 'Paulo Souza', age: 46, sex: 'M', role: 'Cidadão', location: 'Brasil' },
        { id: 'sr_joao_santos', name: 'Sr. João Santos', age: 72, sex: 'M', role: 'Cidadão', location: 'Brasil' },
    ],
    children: [
        {
            name: 'Bahia',
            type: 'Estadual',
            occupants: [
                { id: 'roberto_silva', name: 'Roberto Silva', age: 55, sex: 'M', role: 'Governador', location: 'Bahia' },
                { id: 'sandra_silva', name: 'Sandra Silva', age: 52, sex: 'F', role: 'Cidadã', location: 'Bahia' },
            ],
            children: [
                {
                    name: 'Juazeiro',
                    type: 'Municipal',
                    occupants: [
                        { id: 'tiago_santos', name: 'Tiago Santos', age: 40, sex: 'M', role: 'Prefeito', location: 'Juazeiro' },
                        { id: 'joao', name: 'João', age: 25, sex: 'M', role: 'Vereador', location: 'Juazeiro' },
                        { id: 'aline_santos', name: 'Aline Santos', age: 38, sex: 'F', role: 'Cidadã', location: 'Juazeiro' },
                        { id: 'pedrinho_santos', name: 'Pedrinho Santos', age: 10, sex: 'M', role: 'Cidadão', location: 'Juazeiro' },
                        { id: 'clara_santos', name: 'Clara Santos', age: 8, sex: 'F', role: 'Cidadã', location: 'Juazeiro' },
                        { id: 'heitor', name: 'Heitor', age: 30, sex: 'M', role: 'Cidadão', location: 'Juazeiro' },
                    ]
                }
            ]
        },
        {
            name: 'Pernambuco',
            type: 'Estadual',
            occupants: [
                { id: 'mario_oliveira', name: 'Mario Oliveira', age: 75, sex: 'M', role: 'Governador', location: 'Pernambuco' },
                { id: 'julia_santos', name: 'Julia Santos', age: 35, sex: 'F', role: 'Dep. Estadual', location: 'Pernambuco' },
                { id: 'regina_oliveira', name: 'Regina Oliveira', age: 72, sex: 'F', role: 'Cidadã', location: 'Pernambuco' },
                { id: 'marcos_lima', name: 'Marcos Lima', age: 36, sex: 'M', role: 'Cidadão', location: 'Pernambuco' },
            ],
            children: [
                {
                    name: 'Petrolina',
                    type: 'Municipal',
                    occupants: [
                        { id: 'jorge_silva', name: 'Jorge Silva', age: 30, sex: 'M', role: 'Prefeito', location: 'Petrolina' },
                        { id: 'ana_silva', name: 'Ana Silva', age: 28, sex: 'F', role: 'Vereador', location: 'Petrolina' },
                        { id: 'jean', name: 'Jean', age: 35, sex: 'M', role: 'Vereador', location: 'Petrolina' },
                        { id: 'ricardo_oliveira', name: 'Ricardo Oliveira', age: 40, sex: 'M', role: 'Cidadão', location: 'Petrolina' },
                        { id: 'lucas_oliveira', name: 'Lucas Oliveira', age: 18, sex: 'M', role: 'Cidadão', location: 'Petrolina' },
                        { id: 'joao', name: 'João', age: 25, sex: 'M', role: 'Cidadão', location: 'Petrolina' },
                    ]
                },
                {
                    name: 'Recife',
                    type: 'Municipal',
                    occupants: [
                        { id: 'bruno_oliveira', name: 'Bruno Oliveira', age: 42, sex: 'M', role: 'Prefeito', location: 'Recife' },
                        { id: 'beatriz_silva', name: 'Beatriz Silva', age: 48, sex: 'F', role: 'Cidadã', location: 'Recife' },
                        { id: 'maria', name: 'Maria', age: 25, sex: 'F', role: 'Cidadã', location: 'Recife' },
                    ]
                }
            ]
        }
    ]
};


const prologCode = `% --- Fatos de Poder ---
poder(presidente, 10).
poder(vice_presidente, 9).
poder(senador, 8).
poder(deputado_federal, 7).
poder(governador, 6).
poder(vice_governador, 5).
poder(deputado_estadual, 5).
poder(prefeito, 4).
poder(vice_prefeito, 3).
poder(vereador, 3).
poder(cidadao, 1).

% --- Regiões ---
regiao(br, 'Brasil (Federal)').
regiao(pe, 'Pernambuco (Estadual)').
regiao(ba, 'Bahia (Estadual)').
regiao(petrolina, 'Petrolina-PE (Municipal)').
regiao(recife, 'Recife-PE (Municipal)').
regiao(juazeiro, 'Juazeiro-BA (Municipal)').

% --- Localização ---
dentro_de(petrolina, pe).
dentro_de(recife, pe).
dentro_de(juazeiro, ba).
dentro_de(pe, br).
dentro_de(ba, br).

% --- Pessoas ---
pessoa(dom_pedro_silva, 82, 'M').
pessoa(dona_elena_silva, 80, 'F').
pessoa(roberto_silva, 55, 'M').
pessoa(sandra_silva, 52, 'F').
pessoa(jorge_silva, 30, 'M').
pessoa(ana_silva, 28, 'F').
pessoa(beatriz_silva, 48, 'F').
pessoa(mario_oliveira, 75, 'M').
pessoa(regina_oliveira, 72, 'F').
pessoa(carla_oliveira, 45, 'F').
pessoa(paulo_souza, 46, 'M').
pessoa(bruno_oliveira, 42, 'M').
pessoa(ricardo_oliveira, 40, 'M').
pessoa(lucas_oliveira, 18, 'M').
pessoa(dona_maria_santos, 70, 'F').
pessoa(sr_joao_santos, 72, 'M').
pessoa(tiago_santos, 40, 'M').
pessoa(aline_santos, 38, 'F').
pessoa(julia_santos, 35, 'F').
pessoa(marcos_lima, 36, 'M').
pessoa(pedrinho_santos, 10, 'M').
pessoa(clara_santos, 8, 'F').
pessoa(jean, 35, 'M').
pessoa(joao, 25, 'M').
pessoa(maria, 25, 'F').
pessoa(heitor, 30, 'M').

% --- Ocupações ---
ocupa(dom_pedro_silva, presidente, br).
ocupa(roberto_silva, governador, ba).
ocupa(jorge_silva, prefeito, petrolina).
ocupa(ana_silva, vereador, petrolina).
ocupa(beatriz_silva, cidadao, recife).
ocupa(mario_oliveira, governador, pe).
ocupa(carla_oliveira, senador, br).
ocupa(bruno_oliveira, prefeito, recife).
ocupa(ricardo_oliveira, cidadao, petrolina).
ocupa(lucas_oliveira, cidadao, petrolina).
ocupa(dona_maria_santos, deputado_federal, br).
ocupa(tiago_santos, prefeito, juazeiro).
ocupa(julia_santos, deputado_estadual, pe).
ocupa(pedrinho_santos, cidadao, juazeiro).
ocupa(clara_santos, cidadao, juazeiro).
ocupa(jean, vereador, petrolina).
ocupa(joao, vereador, juazeiro).
ocupa(maria, cidadao, recife).
ocupa(heitor, cidadao, juazeiro).

% --- Parentesco ---
progenitor(dom_pedro_silva, roberto_silva).
progenitor(dona_elena_silva, roberto_silva).
progenitor(dom_pedro_silva, beatriz_silva).
progenitor(dona_elena_silva, beatriz_silva).
progenitor(roberto_silva, jorge_silva).
progenitor(sandra_silva, jorge_silva).
progenitor(roberto_silva, ana_silva).
progenitor(sandra_silva, ana_silva).
progenitor(mario_oliveira, carla_oliveira).
progenitor(regina_oliveira, carla_oliveira).
progenitor(mario_oliveira, bruno_oliveira).
progenitor(regina_oliveira, bruno_oliveira).
progenitor(mario_oliveira, ricardo_oliveira).
progenitor(regina_oliveira, ricardo_oliveira).
progenitor(paulo_souza, lucas_oliveira).
progenitor(carla_oliveira, lucas_oliveira).
progenitor(sr_joao_santos, tiago_santos).
progenitor(dona_maria_santos, tiago_santos).
progenitor(sr_joao_santos, julia_santos).
progenitor(dona_maria_santos, julia_santos).
progenitor(tiago_santos, pedrinho_santos).
progenitor(aline_santos, pedrinho_santos).
progenitor(marcos_lima, clara_santos).
progenitor(julia_santos, clara_santos).

% --- Idade Mínima ---
idade_minima(presidente, 35).
idade_minima(vice_presidente, 35).
idade_minima(senador, 35).
idade_minima(governador, 30).
idade_minima(vice_governador, 30).
idade_minima(deputado_federal, 21).
idade_minima(deputado_estadual, 21).
idade_minima(prefeito, 21).
idade_minima(vice_prefeito, 21).
idade_minima(vereador, 18).
idade_minima(cidadao, 1).`;
const prologCode2 = `
% =========================================================
% REGRAS LÓGICAS 
% =========================================================
% --- Recursividade Geográfica (Localização) ---
% Verifica se a Região X está contida na Região Y
esta_em(X, X).
esta_em(X, Y) :- dentro_de(X, Y).
esta_em(X, Z) :- dentro_de(X, Y), esta_em(Y, Z).

% --- Regras Auxiliares de Parentesco ---

% 1. Ancestral: Pais, Avós, Bisavós...
ancestral(X, Y) :- progenitor(X, Y).
ancestral(X, Z) :- progenitor(X, Y), ancestral(Y, Z).

% 2. Descendente: Filhos, Netos...
descendente(Y, X) :- ancestral(X, Y).

% 3. Irmão: Compartilham progenitor e não são a mesma pessoa
irmao(X, Y) :- 
    progenitor(Z, X), 
    progenitor(Z, Y), 
    X \= Y.

% --- Módulo de Verificação de Idade ---
idade_de_elegibilidade(P, C) :-
    pessoa(P, I, _),
    idade_minima(C, M),
    I >= M.

% --- Módulo de Verificação de Conflitos (Regras Separadas) ---

% Conflito A: Ancestral no mesmo cargo na mesma jurisdição
conflito_por_ancestral(P, C, R) :-
    ancestral(A, P),
    ocupa(A, C, L),
    esta_em(R, L).

% Conflito B: Descendente no mesmo cargo na mesma jurisdição
conflito_por_descendente(P, C, R) :-
    descendente(D, P),
    ocupa(D, C, L),
    esta_em(R, L).

% Conflito C: Irmão no mesmo cargo na mesma jurisdição
conflito_por_irmao(P, C, R) :-
    irmao(I, P),
    ocupa(I, C, L),
    esta_em(R, L).

% Regra Agrupadora de Conflitos
% Retorna VERDADEIRO se qualquer um dos conflitos acima ocorrer
conflito_de_parentes(P, C, R) :- conflito_por_ancestral(P, C, R); 
    conflito_por_descendente(P, C, R); 
    conflito_por_irmao(P, C, R).

% --- REGRA PRINCIPAL: ELEGIBILIDADE ---
% Verifica se a pessoa pode se candidatar ao cargo na região
% 1. A região deve existir.
% 2. A pessoa deve ter idade suficiente.
% 3. NÃO pode haver conflito de parentes (Ancestral, Descendente ou Irmão).
pode_se_eleger(P, C, R) :-
    regiao(R, _),
    idade_de_elegibilidade(P, C),
    \+(conflito_de_parentes(P, C, R)).`;

// --- COMPONENTS ---

const PersonCard = ({ person, isGhost = false }: { person?: Person; isGhost?: boolean }) => {
    if (isGhost || !person) {
        return <div className="w-[140px] flex-shrink-0"></div>;
    }

    const getRoleColor = (role?: string) => {
        if (!role) return 'bg-gray-100 text-gray-600';
        if (role.toLowerCase().includes('presidente')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (role.toLowerCase().includes('governador')) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (role.toLowerCase().includes('prefeito')) return 'bg-green-100 text-green-800 border-green-200';
        if (role.toLowerCase().includes('senador') || role.toLowerCase().includes('deputado')) return 'bg-purple-100 text-purple-800 border-purple-200';
        if (role.toLowerCase().includes('vereador')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        return 'bg-gray-50 text-gray-600 border-gray-200';
    };

    const getGenderStyle = (sex: 'M' | 'F') => {
        return sex === 'M' ? 'border-b-4 border-b-blue-400' : 'border-b-4 border-b-pink-400';
    };

    return (
        <div className={`relative flex flex-col items-center p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 ${getGenderStyle(person.sex)} w-[140px] transition-transform hover:-translate-y-1 hover:shadow-md z-20 flex-shrink-0`}>
            <div className="flex items-center gap-1 mb-1">
                {person.sex === 'M' ? <User size={12} className="text-blue-500" /> : <User size={12} className="text-pink-500" />}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{person.age} ANOS</span>
            </div>

            <h3 className="font-bold text-gray-800 text-xs text-center leading-tight mb-2 truncate w-full" title={person.name}>{person.name}</h3>

            {person.role && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium mb-1 truncate max-w-full ${getRoleColor(person.role)}`}>
                    {person.role}
                </span>
            )}
        </div>
    );
};

// --- FAMILY TREE SPECIFIC COMPONENTS ---

const SpouseConnector = ({ hasChildren }: { hasChildren: boolean }) => (
    <div className="w-10 flex flex-col items-center relative flex-shrink-0 h-20 justify-center">
        <div className="w-[200%] -ml-[50%] h-px bg-slate-400 absolute top-1/2 -translate-y-1/2"></div>
        <div className="bg-white p-1 rounded-full z-10 border border-slate-100 shadow-sm relative">
            <Heart size={10} className="text-red-400 fill-red-400" />
        </div>
        {hasChildren && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-[80px] bg-slate-400 -z-10 origin-top"></div>
        )}
    </div>
);

const ConnectorSpacer = () => <div className="w-10 flex-shrink-0"></div>;

const TreeNode = ({ node }: { node: FamilyNode }) => {
    const hasParents = node.father && node.mother;
    const hasChildren = !!(node.children && node.children.length > 0);

    if (!hasParents && node.person) {
        return (
            <div className="flex flex-col items-center">
                <PersonCard person={node.person} />
                {hasChildren && (
                    <div className="flex flex-col items-center w-full">
                        <div className="h-8 w-px bg-slate-400"></div>
                        <ChildrenRow childrenNodes={node.children!} />
                    </div>
                )}
            </div>
        );
    }

    let layoutContent;
    let childrenOffsetStyle = {};

    if (!node.mainDescendant) {
        layoutContent = (
            <>
                <PersonCard person={node.father!} />
                <SpouseConnector hasChildren={hasChildren} />
                <PersonCard person={node.mother!} />
            </>
        );
    } else if (node.mainDescendant === 'father') {
        childrenOffsetStyle = { transform: 'translateX(90px)' }; // Adjusted slightly for card size
        layoutContent = (
            <>
                <PersonCard isGhost />
                <ConnectorSpacer />
                <PersonCard person={node.father!} />
                <SpouseConnector hasChildren={hasChildren} />
                <PersonCard person={node.mother!} />
            </>
        );
    } else {
        childrenOffsetStyle = { transform: 'translateX(-90px)' }; // Adjusted slightly for card size
        layoutContent = (
            <>
                <PersonCard person={node.father!} />
                <SpouseConnector hasChildren={hasChildren} />
                <PersonCard person={node.mother!} />
                <ConnectorSpacer />
                <PersonCard isGhost />
            </>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center">
                {layoutContent}
            </div>
            {hasChildren && (
                <div className="pt-5" style={childrenOffsetStyle}>
                    <ChildrenRow childrenNodes={node.children!} />
                </div>
            )}
        </div>
    );
};

const ChildrenRow = ({ childrenNodes }: { childrenNodes: FamilyNode[] }) => {
    return (
        <div className="flex justify-center relative">
            {childrenNodes.map((child, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === childrenNodes.length - 1;
                const isOnly = childrenNodes.length === 1;

                return (
                    <div key={idx} className="flex flex-col items-center relative px-4">
                        {!isOnly && (
                            <>
                                <div className={`absolute top-0 h-px bg-slate-400 ${isFirst ? 'left-[50%] w-[50%]' : 'left-0 w-[50%]'}`}></div>
                                <div className={`absolute top-0 h-px bg-slate-400 ${isLast ? 'right-[50%] w-[50%]' : 'right-0 w-[50%]'}`}></div>
                            </>
                        )}
                        <div className="h-8 w-px bg-slate-400"></div>
                        <TreeNode node={child} />
                    </div>
                );
            })}
        </div>
    )
}

// --- REGIONAL TREE COMPONENTS ---

const RegionTreeNode = ({ node }: { node: RegionNode }) => {
    const hasChildren = node.children && node.children.length > 0;

    // Separate Occupants: Officials vs Citizens
    const isCitizen = (role?: string) => {
        return !role || role.toLowerCase().includes('cidad');
    };

    const officials = node.occupants.filter(p => !isCitizen(p.role));
    const citizens = node.occupants.filter(p => isCitizen(p.role));

    // Sort officials by importance
    const sortedOfficials = [...officials].sort((a, b) => {
        const roleScore = (role?: string) => {
            if (!role) return 0;
            if (role.toLowerCase().includes('presidente')) return 10;
            if (role.toLowerCase().includes('governador')) return 8;
            if (role.toLowerCase().includes('senador')) return 7;
            if (role.toLowerCase().includes('deputado')) return 6;
            if (role.toLowerCase().includes('prefeito')) return 5;
            if (role.toLowerCase().includes('vereador')) return 4;
            return 1;
        };
        return roleScore(b.role) - roleScore(a.role);
    });

    const getRegionColor = (type: string) => {
        if (type === 'Federal') return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        if (type === 'Estadual') return 'bg-blue-50 border-blue-200 text-blue-800';
        return 'bg-green-50 border-green-200 text-green-800';
    };

    return (
        <div className="flex flex-col items-center px-4">
            {/* 1. Government / Officials Card */}
            <div className={`border-2 rounded-xl p-4 text-center shadow-md ${getRegionColor(node.type)} min-w-[280px] max-w-[500px] z-10 bg-white bg-opacity-95`}>
                <div className="mb-3 border-b border-black/5 pb-2">
                    <h3 className="font-bold text-lg uppercase tracking-wider">{node.name}</h3>
                    <span className="text-xs opacity-70 font-semibold">{node.type} (Governo)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    {sortedOfficials.length > 0 ? (
                        sortedOfficials.map(person => (
                            <PersonCard key={person.id} person={person} />
                        ))
                    ) : (
                        <span className="text-xs italic opacity-50 py-2">Sem ocupantes de cargo registrados</span>
                    )}
                </div>
            </div>

            {/* 2. Children Regions */}
            {hasChildren && (
                <div className="flex flex-col items-center w-full">
                    {/* Connector Line Down */}
                    <div className="h-8 w-px bg-slate-400 z-0"></div>

                    {/* Children Row */}
                    <div className="flex justify-center relative">
                        {node.children!.map((child, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === node.children!.length - 1;
                            const isOnly = node.children!.length === 1;

                            return (
                                <div key={child.name} className="flex flex-col items-center relative px-8">
                                    {/* Horizontal Lines */}
                                    {!isOnly && (
                                        <>
                                            <div className={`absolute top-0 h-px bg-slate-400 ${isFirst ? 'left-[50%] w-[50%]' : 'left-0 w-[50%]'}`}></div>
                                            <div className={`absolute top-0 h-px bg-slate-400 ${isLast ? 'right-[50%] w-[50%]' : 'right-0 w-[50%]'}`}></div>
                                        </>
                                    )}
                                    {/* Vertical Line to Child */}
                                    <div className="h-8 w-px bg-slate-400 -mt-0 mb-0"></div>

                                    <RegionTreeNode node={child} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* 3. Citizens "A parte" (Now at the bottom of the hierarchy stack) */}
            {citizens.length > 0 && (
                <div className="mt-8 w-[90%] bg-slate-50 rounded-lg border border-dashed border-slate-300 p-3 flex flex-col items-center shadow-sm z-0 relative">
                    {/* Connector from top if no children, or distinct separation */}
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-1">
                        <User size={10} /> População (Cidadãos)
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {citizens.map(person => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- PROLOG VIEWER COMPONENT ---

const PrologViewer = ({ code, title }: { code: string; title: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-900 rounded-lg shadow-inner overflow-hidden border border-slate-700 text-left mb-6">
            <div className="flex justify-between items-center bg-slate-800 px-4 py-2 border-b border-slate-700">
                <div className="flex items-center gap-2 text-slate-200">
                    <Code size={18} />
                    <span className="font-mono text-sm font-bold">{title}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 transition-colors"
                >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copied ? 'Copiado!' : 'Copiar Código'}
                </button>
            </div>
            <div className="p-4 overflow-auto max-h-[500px]">
                <pre className="font-mono text-xs sm:text-sm text-green-400 leading-relaxed whitespace-pre-wrap">
                    {code}
                </pre>
            </div>
        </div>
    );
};

export default function FamilyTreeApp() {
    const [activeTab, setActiveTab] = useState<'silva' | 'oliveira' | 'santos'>('silva');
    const [viewMode, setViewMode] = useState<'visual' | 'regional' | 'code'>('visual');

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
            <div className="max-w-[1800px] mx-auto overflow-hidden">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">Sistema de Genealogia e Poder</h1>
                    <p className="text-slate-500 font-medium">Visualização hierárquica de famílias, cargos regionais e lógica Prolog</p>
                </header>

                {/* View Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200 inline-flex gap-1 flex-wrap justify-center">
                        <button
                            onClick={() => setViewMode('visual')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'visual' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <TreeDeciduous size={16} />
                            Árvore Familiar
                        </button>
                        <button
                            onClick={() => setViewMode('regional')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'regional' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <Map size={16} />
                            Hierarquia Regional
                        </button>
                        <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'code' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <Code size={16} />
                            Código Prolog
                        </button>
                    </div>
                </div>

                {viewMode === 'visual' && (
                    <>
                        {/* Family Tabs */}
                        <div className="flex justify-center mb-12">
                            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 inline-flex gap-1 flex-wrap justify-center">
                                <button
                                    onClick={() => setActiveTab('silva')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'silva' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    Família Silva
                                </button>
                                <button
                                    onClick={() => setActiveTab('oliveira')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'oliveira' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    Família Oliveira
                                </button>
                                <button
                                    onClick={() => setActiveTab('santos')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'santos' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    Família Santos
                                </button>
                            </div>
                        </div>

                        {/* Canvas Area - UPDATED to handle scrolling without clipping left side */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-16 overflow-x-auto min-h-[600px]">
                            <div className="min-w-max mx-auto transform scale-100 origin-top flex justify-center">
                                {activeTab === 'silva' && <TreeNode node={familySilva} />}
                                {activeTab === 'oliveira' && <TreeNode node={familyOliveira} />}
                                {activeTab === 'santos' && <TreeNode node={familySantos} />}
                            </div>
                        </div>
                    </>
                )}

                {viewMode === 'regional' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-16 overflow-x-auto min-h-[600px]">
                        <div className="min-w-max mx-auto transform scale-100 origin-top flex justify-center">
                            <RegionTreeNode node={regionalTree} />
                        </div>
                    </div>
                )}

                {viewMode === 'code' && (
                    <div className="max-w-4xl mx-auto">
                        <PrologViewer code={prologCode} title="1. Fatos e Base de Conhecimento (base_conhecimento.pl)" />
                        <PrologViewer code={prologCode2} title="2. Regras Lógicas e Elegibilidade (regras.pl)" />

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                            <strong>Nota:</strong> Copie ambos os códigos acima para um arquivo <code>.pl</code> ou carregue-os em seu interpretador Prolog para testar as regras de elegibilidade e conflitos.
                        </div>
                    </div>
                )}

                {viewMode !== 'code' && (
                    /* Legend */
                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <div className="w-2.5 h-2.5 bg-yellow-100 border border-yellow-300 rounded-full"></div>
                            <span>Presidente</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <div className="w-2.5 h-2.5 bg-blue-100 border border-blue-300 rounded-full"></div>
                            <span>Governador</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <div className="w-2.5 h-2.5 bg-green-100 border border-green-300 rounded-full"></div>
                            <span>Prefeito</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <div className="w-2.5 h-2.5 bg-purple-100 border border-purple-300 rounded-full"></div>
                            <span>Senador/Deputado</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <div className="w-2.5 h-2.5 bg-indigo-100 border border-indigo-300 rounded-full"></div>
                            <span>Vereador</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
