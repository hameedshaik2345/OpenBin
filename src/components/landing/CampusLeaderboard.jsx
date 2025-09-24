import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function CampusLeaderboardItem({ name, course, points, rank, avatarText }) {
  let rankColor = "bg-gray-200 text-gray-700";
  let rankIcon;
  if (rank === 1) { rankColor = "bg-yellow-400 text-yellow-900 shadow-yellow-300/50"; rankIcon = "🥇"; }
  if (rank === 2) { rankColor = "bg-slate-300 text-slate-800 shadow-slate-300/50"; rankIcon = "🥈"; }
  if (rank === 3) { rankColor = "bg-orange-300 text-orange-800 shadow-orange-300/50"; rankIcon = "🥉"; }
  
  return (
    <motion.div 
      className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: rank * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
          <AvatarImage src={`https://avatar.vercel.sh/${name.replace(/\s+/g, '')}.png?size=48`} alt={name} />
          <AvatarFallback className="bg-emerald-100 text-emerald-600 font-semibold">{avatarText}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-800 text-sm sm:text-base">{name}</p>
          <p className="text-xs sm:text-sm text-gray-500">{course}</p>
        </div>
      </div>
      <div className={`px-3 py-1.5 text-sm font-bold rounded-full ${rankColor} flex items-center gap-1 shadow-sm`}>
        {rankIcon && <span className="text-lg">{rankIcon}</span>}
        <span>{points} pts</span>
      </div>
    </motion.div>
  );
}