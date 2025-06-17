// src/components/EventScheduleCard.jsx
import React from 'react';
import { MapPin } from 'lucide-react';
import { colors } from '../config';

const EventScheduleCard = ({ campaign, onClick }) => {
  const [month, day] = campaign && campaign.data && typeof campaign.data === 'string' ? campaign.data.split(' ') : ["MÊS", "DIA"];

  return (
    <div
      className="rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col p-4 hover:opacity-80 transition-opacity duration-200"
      onClick={onClick}
      style={{ backgroundColor: colors.cardBg, borderColor: colors.borderLight, borderWidth: '1px' }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center justify-center text-center w-16 flex-shrink-0">
          <span className="text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>{month}</span>
          <span className="text-3xl font-bold" style={{ color: colors.textMain }}>{day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base font-semibold uppercase mb-1 truncate"
            style={{ color: colors.textMain }}
            title={campaign.nome || "Nome da campanha"}
          >
            {campaign.nome || "Campanha Sem Título"}
          </h3>
          <p
            className="text-xs mb-2 truncate"
            style={{ color: colors.textSecondary }}
            title={campaign.localizacao || "Local não definido"}
          >
            {campaign.localizacao && <MapPin size={12} className="inline mr-1" />} {campaign.localizacao || "Local não definido"}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: colors.textSecondary }}
            title={`Organizado por: ${campaign.organizador || "Organizador não definido"}`}
          >
            Organizado por: {campaign.organizador || "Organizador não definido"}
          </p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0" style={{borderColor: colors.borderLight}}>
        <button
          className="flex-1 text-xs uppercase py-2 px-3 rounded border hover:bg-opacity-70 flex items-center justify-center"
          style={{ backgroundColor: colors.buttonBg, color: colors.buttonText, borderColor: colors.buttonBorder }}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          Ver como Modelo
        </button>
        <button
          className="flex-1 text-xs uppercase py-2 px-3 rounded border hover:bg-opacity-70 flex items-center justify-center"
          style={{ backgroundColor: colors.buttonBg, color: colors.buttonText, borderColor: colors.buttonBorder }}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          Ver como Designer
        </button>
      </div>
    </div>
  );
};

export default EventScheduleCard;