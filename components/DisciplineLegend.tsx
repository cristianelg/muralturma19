import React from 'react';

const disciplines = [
    { name: 'Gestão de Pessoas', color: 'bg-blue-400' },
    { name: 'Estratégias Gerenciais', color: 'bg-yellow-500' },
    { name: 'Sistemas de Gestão', color: 'bg-pink-400' },
    { name: 'Tópicos Avançados', color: 'bg-green-400' },
    { name: 'Instrumentos Gerenciais', color: 'bg-indigo-400' },
    { name: 'Finanças Empresariais', color: 'bg-purple-400' },
    { name: 'Marketing', color: 'bg-cyan-400' },
    { name: 'Feriado Nacional', color: 'bg-red-500' },
];

export const DisciplineLegend: React.FC = () => {
    return (
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-lg mt-6">
            <h3 className="font-bold mb-3 text-center font-handwritten text-2xl text-slate-700">Legenda</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {disciplines.map(d => (
                    <div key={d.name} className="flex items-center">
                        <span className={`w-4 h-4 rounded-full mr-2 ${d.color}`}></span>
                        <span className="text-sm">{d.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};