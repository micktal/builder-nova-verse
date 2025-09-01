import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Zap,
  Mail,
  Coffee,
  Users,
  MessageSquare,
  Clock,
  Moon,
  Sun,
  Target,
  Lightbulb,
  Heart,
  Brain,
} from "lucide-react";

const TransformationTimeline = () => {
  const [activeWeek, setActiveWeek] = useState<"week1" | "week2" | "both">(
    "both",
  );
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const weekData = {
    week1: {
      title: "Semaine 1 - Sans techniques",
      color: "red",
      trend: "ascending",
      days: [
        {
          day: "Lundi",
          icon: Mail,
          stress: 30,
          description: "Surcharge emails → stress +20%",
          details:
            "Boîte mail débordante dès le matin. Difficile de prioriser, sentiment d'urgence constant.",
          emoji: "😰",
        },
        {
          day: "Mardi",
          icon: Users,
          stress: 50,
          description: "3 réunions imprévues → tensions accrues",
          details:
            "Planning bouleversé, pas de pause entre les réunions. Fatigue mentale qui s'accumule.",
          emoji: "😵",
        },
        {
          day: "Mercredi",
          icon: MessageSquare,
          stress: 60,
          description: "Conflit mineur non résolu",
          details:
            "Malentendu avec un collègue. Ruminations pendant la journée, concentration perturbée.",
          emoji: "😤",
        },
        {
          day: "Jeudi",
          icon: Moon,
          stress: 70,
          description: "Manque de sommeil → concentration ↓",
          details:
            "Nuit agitée à cause du stress. Erreurs répétées, irritabilité croissante.",
          emoji: "🥱",
        },
        {
          day: "Vendredi",
          icon: Clock,
          stress: 85,
          description: "Deadline urgente → fatigue + irritabilité",
          details:
            "Course contre la montre pour finir un projet. Tension maximale, snacking compulsif.",
          emoji: "😡",
        },
        {
          day: "Samedi",
          icon: Brain,
          stress: 75,
          description: "Rumination mentale",
          details:
            "Impossible de décrocher du travail. Pensées en boucle sur les problèmes de la semaine.",
          emoji: "🤯",
        },
        {
          day: "Dimanche",
          icon: Sun,
          stress: 80,
          description: "Anticipation anxieuse de la semaine suivante",
          details:
            "Angoisse du dimanche soir. Sommeil difficile, appréhension du lundi.",
          emoji: "😟",
        },
      ],
    },
    week2: {
      title: "Semaine 2 - Avec techniques",
      color: "green",
      trend: "descending",
      days: [
        {
          day: "Lundi",
          icon: Coffee,
          stress: 25,
          description: "Respiration 4-6 → calme + meilleure priorisation",
          details:
            "Routine matinale avec respiration. Emails triés méthodiquement, priorités claires.",
          emoji: "😌",
        },
        {
          day: "Mardi",
          icon: Users,
          stress: 20,
          description: "Pauses actives → récupération rapide",
          details:
            "Micro-pauses entre réunions. Étirements de 2 min, énergie maintenue toute la journée.",
          emoji: "😊",
        },
        {
          day: "Mercredi",
          icon: Target,
          stress: 15,
          description: "Matrice Eisenhower → moins de surcharge",
          details:
            "Tâches classées par urgence/importance. Sensation de contrôle, efficacité accrue.",
          emoji: "😎",
        },
        {
          day: "Jeudi",
          icon: Lightbulb,
          stress: 20,
          description: "Reframing → passage en mode solution",
          details:
            "Problème reformulé positivement. Focus sur les solutions plutôt que les obstacles.",
          emoji: "🤔",
        },
        {
          day: "Vendredi",
          icon: MessageSquare,
          stress: 25,
          description: "Communication assertive → tension relationnelle évitée",
          details:
            "Modèle DESC appliqué avec succès. Discussion franche et respectueuse avec un collègue.",
          emoji: "😇",
        },
        {
          day: "Samedi",
          icon: Heart,
          stress: 15,
          description: "Activité sportive → détente physique",
          details:
            "Session sport de 30 min. Endorphines naturelles, évacuation des tensions.",
          emoji: "🏃‍♂️",
        },
        {
          day: "Dimanche",
          icon: Moon,
          stress: 10,
          description: "Routine relaxation → sommeil réparateur",
          details:
            "Relaxation progressive avant le coucher. Nuit paisible, réveil en forme.",
          emoji: "😴",
        },
      ],
    },
  };

  const maxStress = 100;

  const getStressColor = (stress: number, weekType: "week1" | "week2") => {
    if (weekType === "week1") {
      if (stress >= 70) return "bg-red-500";
      if (stress >= 50) return "bg-orange-500";
      return "bg-yellow-500";
    } else {
      if (stress <= 20) return "bg-green-500";
      if (stress <= 40) return "bg-blue-500";
      return "bg-yellow-500";
    }
  };

  const getStressLabel = (stress: number) => {
    if (stress >= 70) return "🔥 Élevé";
    if (stress >= 40) return "⚡ Modéré";
    return "😌 Bas";
  };

  const scrollToTechniques = () => {
    const techniquesSection = document.querySelector(
      '[data-scroll-target="techniques"]',
    );
    if (techniquesSection) {
      techniquesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const replayAnimation = () => {
    setAnimationPlayed(false);
    setTimeout(() => setAnimationPlayed(true), 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationPlayed) {
          setAnimationPlayed(true);
        }
      },
      { threshold: 0.3 },
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, [animationPlayed]);

  const TimelineSVG = ({
    week,
    weekKey,
  }: {
    week: typeof weekData.week1;
    weekKey: "week1" | "week2";
  }) => {
    const width = 600;
    const height = 120;
    const padding = 40;
    const pointRadius = 6;

    const points = week.days.map((day, index) => ({
      x: padding + (index * (width - 2 * padding)) / 6,
      y: height - padding - (day.stress / maxStress) * (height - 2 * padding),
      stress: day.stress,
      day: day.day,
      index,
    }));

    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${point.x} ${point.y}`;
    }, "");

    return (
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id={`gradient-${weekKey}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={weekKey === "week1" ? "#ef4444" : "#10b981"}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={weekKey === "week1" ? "#ef4444" : "#10b981"}
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[25, 50, 75].map((value) => (
          <line
            key={value}
            x1={padding}
            y1={height - padding - (value / maxStress) * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - (value / maxStress) * (height - 2 * padding)}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}

        {/* Stress level curve */}
        <path
          d={pathData}
          fill="none"
          stroke={weekKey === "week1" ? "#ef4444" : "#10b981"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animationPlayed ? "animate-draw-path" : ""}
          style={{
            strokeDasharray: animationPlayed ? "none" : "1000",
            strokeDashoffset: animationPlayed ? "0" : "1000",
            transition: "stroke-dashoffset 2s ease-in-out",
          }}
        />

        {/* Area under curve */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#gradient-${weekKey})`}
          className={animationPlayed ? "animate-fill-area" : ""}
          style={{
            opacity: animationPlayed ? 1 : 0,
            transition: "opacity 1.5s ease-in-out 0.5s",
          }}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={pointRadius}
              fill={weekKey === "week1" ? "#dc2626" : "#059669"}
              stroke="white"
              strokeWidth="2"
              className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
                animationPlayed ? "animate-point-appear" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.2 + 1}s`,
              }}
              onClick={() => setActiveDay(activeDay === index ? null : index)}
            />

            {/* Day labels */}
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              className={animationPlayed ? "animate-fade-in" : "opacity-0"}
              style={{
                animationDelay: `${index * 0.1 + 1.5}s`,
              }}
            >
              {point.day.slice(0, 3)}
            </text>

            {/* Stress percentage */}
            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              fontSize="10"
              fill={weekKey === "week1" ? "#dc2626" : "#059669"}
              fontWeight="bold"
              className={animationPlayed ? "animate-fade-in" : "opacity-0"}
              style={{
                animationDelay: `${index * 0.1 + 2}s`,
              }}
            >
              {point.stress}%
            </text>
          </g>
        ))}

        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((value) => (
          <text
            key={value}
            x={padding - 10}
            y={
              height -
              padding -
              (value / maxStress) * (height - 2 * padding) +
              4
            }
            textAnchor="end"
            fontSize="10"
            fill="#9ca3af"
          >
            {value}%
          </text>
        ))}
      </svg>
    );
  };

  const DayDetail = ({
    weekKey,
    dayIndex,
  }: {
    weekKey: "week1" | "week2";
    dayIndex: number;
  }) => {
    const day = weekData[weekKey].days[dayIndex];
    const Icon = day.icon;

    return (
      <Card
        className={`border-2 ${weekKey === "week1" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"} animate-slide-up`}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`p-3 rounded-full ${weekKey === "week1" ? "bg-red-100" : "bg-green-100"}`}
            >
              <Icon
                className={`w-6 h-6 ${weekKey === "week1" ? "text-red-600" : "text-green-600"}`}
              />
            </div>
            <div>
              <h4 className="font-bold text-lg flex items-center gap-2">
                {day.day}
                <span className="text-2xl">{day.emoji}</span>
              </h4>
              <Badge className={getStressColor(day.stress, weekKey)}>
                {getStressLabel(day.stress)} - {day.stress}%
              </Badge>
            </div>
          </div>
          <p className="font-medium text-gray-800 mb-3">{day.description}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{day.details}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      ref={timelineRef}
      className="max-w-6xl mx-auto px-6 py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl"
    >
      <div className="text-center mb-12">
        <div className="mb-6">
          <img
            src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Transformation personnelle par la méditation et les techniques de gestion du stress"
            className="mx-auto rounded-2xl shadow-lg w-64 h-40 object-cover"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Avant / Après : l'impact des techniques
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Découvrez la transformation concrète d'une semaine type grâce à
          l'application des techniques de régulation du stress. Une évolution
          mesurable jour après jour.
        </p>
      </div>

      {/* Week selector */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeWeek === "week1" ? "default" : "outline"}
          onClick={() => setActiveWeek("week1")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-red-500" />
          Semaine sans techniques
        </Button>
        <Button
          variant={activeWeek === "both" ? "default" : "outline"}
          onClick={() => setActiveWeek("both")}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Comparaison
        </Button>
        <Button
          variant={activeWeek === "week2" ? "default" : "outline"}
          onClick={() => setActiveWeek("week2")}
          className="flex items-center gap-2"
        >
          <TrendingDown className="w-4 h-4 text-green-500" />
          Semaine avec techniques
        </Button>
      </div>

      {/* Timeline visualization */}
      <div className="space-y-8 mb-8">
        {(activeWeek === "week1" || activeWeek === "both") && (
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <TrendingUp className="w-5 h-5" />
                {weekData.week1.title}
                <Badge variant="destructive" className="ml-auto">
                  Stress croissant
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimelineSVG week={weekData.week1} weekKey="week1" />
            </CardContent>
          </Card>
        )}

        {(activeWeek === "week2" || activeWeek === "both") && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingDown className="w-5 h-5" />
                {weekData.week2.title}
                <Badge className="ml-auto bg-green-500">Stress maîtrisé</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimelineSVG week={weekData.week2} weekKey="week2" />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Day details */}
      {activeDay !== null && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-6">
            Comparaison détaillée - {weekData.week1.days[activeDay].day}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <DayDetail weekKey="week1" dayIndex={activeDay} />
            <DayDetail weekKey="week2" dayIndex={activeDay} />
          </div>
        </div>
      )}

      {/* Summary stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            Résultats de la transformation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">65%</div>
              <p className="text-gray-600">Stress moyen semaine 1</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">19%</div>
              <p className="text-gray-600">Stress moyen semaine 2</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">-71%</div>
              <p className="text-gray-600">Réduction du stress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={replayAnimation}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Rejouer l'animation
        </Button>
        <Button
          onClick={scrollToTechniques}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Voir les techniques utilisées
        </Button>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes point-appear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-point-appear {
          animation: point-appear 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TransformationTimeline;
