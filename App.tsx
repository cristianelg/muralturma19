import React, { useState, useEffect, useMemo } from 'react';
import { KudosPage } from './pages/KudosPage';
import { MonthlyCalendar } from './components/MonthlyCalendar';
import { DisciplineLegend } from './components/DisciplineLegend';
import { EventFormModal } from './components/EventFormModal';
import { WeatherFooter } from './components/WeatherFooter';
import { CalendarEvent, LinkItem } from './types';
import { FaBookOpen, FaUsers, FaHeart, FaUniversity } from 'react-icons/fa';
import { LinkCard } from './components/LinkCard';

type Page = 'home' | 'kudos';

// Helper function to calculate Easter date
const getEaster = (year: number): Date => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) -1; // Month is 0-indexed
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
};

const getHolidaysForYear = (year: number): Omit<CalendarEvent, 'id'>[] => {
    const easter = getEaster(year);
    const holidays = [
        { date: `${year}-01-01`, title: 'Confraternização Universal', color: 'bg-red-500' },
        { date: `${year}-04-21`, title: 'Tiradentes', color: 'bg-red-500' },
        { date: `${year}-05-01`, title: 'Dia do Trabalho', color: 'bg-red-500' },
        { date: `${year}-09-07`, title: 'Independência do Brasil', color: 'bg-red-500' },
        { date: `${year}-10-12`, title: 'Nossa Senhora Aparecida', color: 'bg-red-500' },
        { date: `${year}-11-02`, title: 'Finados', color: 'bg-red-500' },
        { date: `${year}-11-15`, title: 'Proclamação da República', color: 'bg-red-500' },
        { date: `${year}-12-25`, title: 'Natal', color: 'bg-red-500' },
    ];
    
    // Mobile holidays based on Easter
    const carnival = new Date(easter);
    carnival.setDate(easter.getDate() - 47);
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60);

    holidays.push({
        date: `${year}-${String(carnival.getMonth() + 1).padStart(2, '0')}-${String(carnival.getDate()).padStart(2, '0')}`,
        title: 'Carnaval',
        color: 'bg-red-500'
    });
    holidays.push({
        date: `${year}-${String(goodFriday.getMonth() + 1).padStart(2, '0')}-${String(goodFriday.getDate()).padStart(2, '0')}`,
        title: 'Sexta-feira Santa',
        color: 'bg-red-500'
    });
    holidays.push({
        date: `${year}-${String(corpusChristi.getMonth() + 1).padStart(2, '0')}-${String(corpusChristi.getDate()).padStart(2, '0')}`,
        title: 'Corpus Christi',
        color: 'bg-red-500'
    });

    return holidays;
};

const classSchedule: Omit<CalendarEvent, 'id'>[] = [
    // Setembro 2025 (Ajustado)
    { date: '2025-09-12', title: '19:00-21:00 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-12', title: '21:00-23:00 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-13', title: '13:30-15:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-13', title: '15:30-17:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-19', title: '19:00-21:00 Tópicos Avançados', color: 'bg-green-400' },
    { date: '2025-09-19', title: '21:00-23:00 Tópicos Avançados', color: 'bg-green-400' },
    { date: '2025-09-20', title: '13:30-15:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-20', title: '15:30-17:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-26', title: '19:00-21:00 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-26', title: '21:00-23:00 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-09-27', title: '13:30-15:30 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-09-27', title: '15:30-17:30 Sistemas de Gestão', color: 'bg-pink-400' },
    // Outubro 2025
    { date: '2025-10-03', title: '19:00-21:00 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-03', title: '21:00-23:00 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-04', title: '13:30-15:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-10-04', title: '15:30-17:30 Gestão de Pessoas', color: 'bg-blue-400' },
    { date: '2025-10-10', title: '19:00-21:00 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-10', title: '21:00-23:00 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-11', title: '13:30-15:30 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-11', title: '15:30-17:30 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-17', title: '19:00-21:00 Tópicos Avançados', color: 'bg-green-400' },
    { date: '2025-10-18', title: '13:30-15:30 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-18', title: '15:30-17:30 Sistemas de Gestão', color: 'bg-pink-400' },
    { date: '2025-10-24', title: '19:00-21:00 Estratégias Gerenciais', color: 'bg-yellow-500' },
    { date: '2025-10-24', title: '21:00-23:00 Estratégias Gerenciais', color: 'bg-yellow-500' },
    { date: '2025-10-31', title: '19:00-21:00 Estratégias Gerenciais', color: 'bg-yellow-500' },
    { date: '2025-10-31', title: '21:00-23:00 Estratégias Gerenciais', color: 'bg-yellow-500' },
];

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<CalendarEvent | { date: string } | null>(null);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const holidays = getHolidaysForYear(year);
        const combinedEvents = [...classSchedule, ...holidays].map((event, index) => ({
            ...event,
            id: `event-${year}-${index}`
        }));
        setEvents(combinedEvents);
    }, [currentDate.getFullYear()]);


    const handleAddEvent = (event: Omit<CalendarEvent, 'id'>) => {
        const newEvent = { ...event, id: crypto.randomUUID() };
        setEvents(prev => [...prev, newEvent]);
        setIsModalOpen(false);
    };
    
    const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
        setIsModalOpen(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents(prev => prev.filter(e => e.id !== eventId));
        setIsModalOpen(false);
    };
    
    const openModalToAdd = (date: string) => {
        setEventToEdit({ date });
        setIsModalOpen(true);
    };

    const openModalToEdit = (event: CalendarEvent) => {
        setEventToEdit(event);
        setIsModalOpen(true);
    };

    const links: LinkItem[] = [
        { id: 1, title: 'Biblioteca', href: 'https://drive.google.com/drive/u/0/folders/1-t6iG0aANMAUqQjww12OSkAmeq5SKmXQ', icon: <FaBookOpen />, color: 'bg-sky-500' },
        { id: 4, title: 'Portal do Aluno FIA', href: 'https://fia.lyceum.com.br/AOnline3/#/login', icon: <FaUniversity />, color: 'bg-orange-500' },
        { id: 2, title: 'Lista de Alunos', href: 'https://docs.google.com/spreadsheets/d/1dROsEeQRsLrrQKj4oUuyDQ6T8EUK6yGa/edit?usp=drive_link&ouid=103045492800950556813&rtpof=true&sd=true', icon: <FaUsers />, color: 'bg-teal-500' },
        { id: 3, title: 'Mural de Kudos', onClick: () => setPage('kudos'), icon: <FaHeart />, color: 'bg-rose-500' },
    ];
    
    const cities = ['Campinas/Sousas', 'Florianopolis', 'Belo Horizonte', 'Osasco/SP', 'Cabo Frio', 'São Paulo', 'São Paulo', 'RMC Campinas, SP', 'Belo Horizonte', 'São Paulo', 'Curitiba', 'São Paulo', 'São Paulo e Indaiatuba', 'São Paulo', 'Maricá', 'São Bernardo do Campo', 'Brasília', 'São Paulo', 'Araraquara', 'São Paulo', 'Barretos', 'São Paulo', 'São Paulo', 'Santos', 'Caçapava', 'Olinda', 'São Paulo'];


    if (page === 'kudos') {
        return <KudosPage onBack={() => setPage('home')} />;
    }

    return (
        <div className="min-h-screen bg-amber-50" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cork-wallet.png')"}}>
            <main className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <div>
                        <h1 className="text-5xl font-bold text-slate-800 font-handwritten">CAP Executivo FIA</h1>
                        <h2 className="text-3xl text-slate-600 font-handwritten">Mural da Turma 19</h2>
                    </div>
                </header>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10">
                    {links.map(link => <LinkCard key={link.id} {...link} />)}
                </div>

                <MonthlyCalendar 
                    events={events}
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    onDayClick={openModalToAdd}
                    onEventClick={openModalToEdit}
                />
                
                <DisciplineLegend />

            </main>
            
            <WeatherFooter cities={cities} />

            {isModalOpen && (
                <EventFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddEvent}
                    onUpdate={handleUpdateEvent}
                    onDelete={handleDeleteEvent}
                    eventToEdit={eventToEdit}
                />
            )}
        </div>
    );
};

export default App;