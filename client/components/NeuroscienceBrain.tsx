import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  X,
  Zap,
  Eye,
  Heart,
  Target,
} from "lucide-react";

const NeuroscienceBrain = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isAfterMode, setIsAfterMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{
    [key: number]: boolean | null;
  }>({});

  const brainAreas = [
    {
      id: "amygdala",
      name: "🚨 Amygdale - L'Alarme",
      position: { x: 45, y: 65 },
      role: "Votre système d'alarme personnel ! Scanne en permanence votre environnement pour détecter le moindre danger.",
      underStress:
        'Mode panique activé ! Elle hurle "DANGER !" même pour un email urgent, transformant votre cerveau en bunker.',
      whyTechniqueHelps:
        'La respiration profonde murmure à votre amygdale : "Tout va bien, on peut se détendre". Elle écoute et baisse le volume.',
      technique: "Respiration 4-6",
      color: "red",
      beforeIntensity: 95,
      afterIntensity: 25,
      emoji: "🚨",
      funFact: "Réagit en 12 millisecondes !",
    },
    {
      id: "hippocampus",
      name: "📚 Hippocampe - Le Bibliothécaire",
      position: { x: 50, y: 70 },
      role: "Votre bibliothécaire personnel qui classe vos souvenirs et vous aide à comprendre le contexte de chaque situation.",
      underStress:
        "Comme un bibliothécaire submergé, il mélange les fiches ! Confond le présent avec de vieux souvenirs stressants.",
      whyTechniqueHelps:
        "Les pauses permettent au bibliothécaire de ranger correctement. Moins de cortisol = meilleure mémoire.",
      technique: "Micro-pauses",
      color: "purple",
      beforeIntensity: 65,
      afterIntensity: 90,
      emoji: "📚",
      funFact: "Stocke jusqu'à 2,5 pétaoctets !",
    },
    {
      id: "prefrontal",
      name: "🎯 Cortex préfrontal - Le PDG",
      position: { x: 25, y: 30 },
      role: "Le PDG de votre cerveau ! Prend les décisions importantes, planifie l'avenir et garde votre sang-froid.",
      underStress:
        "Le PDG craque sous la pression ! Plus de vision claire, il délègue tout aux émotions primitives.",
      whyTechniqueHelps:
        "La priorisation donne au PDG un planning clair. Il retrouve son leadership et reprend le contrôle.",
      technique: "Matrice d'Eisenhower",
      color: "blue",
      beforeIntensity: 35,
      afterIntensity: 90,
      emoji: "🎯",
      funFact: "Représente 30% de votre cerveau !",
    },
    {
      id: "thalamus",
      name: "📡 Thalamus - Le Standard",
      position: { x: 55, y: 55 },
      role: "Votre standard téléphonique ! Filtre et redirige toutes les informations sensorielles vers les bonnes zones.",
      underStress:
        "Standard saturé ! Transfère tout en urgence, même les appels non-importants perturbent le bureau.",
      whyTechniqueHelps:
        'La méditation apprend au standard à trier : "Cet appel peut attendre, celui-ci est prioritaire".',
      technique: "Attention focalisée",
      color: "cyan",
      beforeIntensity: 80,
      afterIntensity: 45,
      emoji: "📡",
      funFact: "Traite 11 millions de bits/seconde !",
    },
    {
      id: "hypothalamus",
      name: "🎛️ Hypothalamus - Le Contrôleur",
      position: { x: 60, y: 50 },
      role: "Votre thermostat et chef d'orchestre hormonal ! Régule faim, soif, sommeil et déclenche la cascade du stress.",
      underStress:
        "Thermostat déréglé ! Produit du cortisol en continu comme un radiateur cassé qui chauffe tout le temps.",
      whyTechniqueHelps:
        'La relaxation recalibre le thermostat. Il apprend à doser : "On chauffe quand il faut, on se calme sinon".',
      technique: "Relaxation progressive",
      color: "orange",
      beforeIntensity: 85,
      afterIntensity: 30,
      emoji: "🎛️",
      funFact: "Pèse seulement 4 grammes !",
    },
    {
      id: "cerebellum",
      name: "🤹 Cervelet - L'Équilibriste",
      position: { x: 75, y: 75 },
      role: "Votre coach sportif intégré ! Coordonne vos mouvements et maintient votre équilibre physique et mental.",
      underStress:
        "Coach stressé = coordination perturbée ! Vous tremblez, vous êtes maladroit, l'équilibre vacille.",
      whyTechniqueHelps:
        "Les étirements et mouvements doux redonnent confiance au coach. Il retrouve sa précision naturelle.",
      technique: "Étirements conscients",
      color: "green",
      beforeIntensity: 70,
      afterIntensity: 40,
      emoji: "🤹",
      funFact: "Contient 69 milliards de neurones !",
    },
    {
      id: "brainstem",
      name: "⚡ Tronc cérébral - L'Ingénieur",
      position: { x: 65, y: 80 },
      role: "Votre ingénieur de maintenance ! Gère respiration, rythme cardiaque et toutes les fonctions vitales automatiques.",
      underStress:
        "Ingénieur en panique ! Accélère tout : cœur qui bat, respiration rapide, tension qui monte.",
      whyTechniqueHelps:
        'La respiration contrôlée donne des instructions claires à l\'ingénieur : "Ralentis, respire calmement".',
      technique: "Respiration 4-7-8",
      color: "indigo",
      beforeIntensity: 90,
      afterIntensity: 35,
      emoji: "⚡",
      funFact: "Fonctionne même pendant le sommeil !",
    },
    {
      id: "insula",
      name: "🌡️ Insula - Le Capteur",
      position: { x: 40, y: 50 },
      role: "Votre capteur interne ! Ressent l'état de votre corps et transforme les sensations en émotions conscientes.",
      underStress:
        'Capteur hypersensible ! Amplifie chaque petit malaise : "Attention, le cœur bat vite = danger imminent !"',
      whyTechniqueHelps:
        "La pleine conscience calibre le capteur. Il apprend à distinguer sensation normale et vraie alerte.",
      technique: "Scan corporel",
      color: "pink",
      beforeIntensity: 75,
      afterIntensity: 50,
      emoji: "🌡️",
      funFact: "Unique chez les humains et grands singes !",
    },
    {
      id: "nucleus-accumbens",
      name: "🎁 Noyau accumbens - Le Récompenseur",
      position: { x: 48, y: 58 },
      role: "Votre système de récompense ! Libère la dopamine quand vous atteignez vos objectifs et vous motive à continuer.",
      underStress:
        "Système de récompense cassé ! Plus rien ne fait plaisir, motivation en berne, cercle vicieux du stress.",
      whyTechniqueHelps:
        "Les petites victoires (tâches accomplies) relancent la machine à récompenses. Dopamine = motivation retrouvée !",
      technique: "3 tâches essentielles",
      color: "yellow",
      beforeIntensity: 30,
      afterIntensity: 75,
      emoji: "🎁",
      funFact: "Actif même en anticipant la récompense !",
    },
  ];

  const glossaryTerms = [
    {
      term: "Cortisol",
      definition: "Hormone du stress libérée par les surrénales",
    },
    {
      term: "Adrénaline",
      definition: "Hormone de l'action immédiate (fight-or-flight)",
    },
    {
      term: "Neuroplasticité",
      definition: "Capacité du cerveau à se réorganiser et s'adapter",
    },
    {
      term: "Sympathique",
      definition: "Système qui accélère (stress, action)",
    },
    {
      term: "Parasympathique",
      definition: "Système qui apaise (repos, récupération)",
    },
  ];

  const quizQuestions = [
    {
      id: 0,
      question: "Allonger l'expiration active le parasympathique.",
      answer: true,
      explanation:
        "Correct ! L'expiration longue stimule le nerf vague et active le système parasympathique.",
    },
    {
      id: 1,
      question: "Sous stress, le cortex préfrontal est plus performant.",
      answer: false,
      explanation:
        "Faux. Sous stress, le cortex préfrontal est moins efficace car l'énergie va vers les réponses automatiques.",
    },
  ];

  const getAreaIntensity = (area: (typeof brainAreas)[0]) => {
    return isAfterMode ? area.afterIntensity : area.beforeIntensity;
  };

  const getAreaOpacity = (area: (typeof brainAreas)[0]) => {
    const intensity = getAreaIntensity(area);
    return 0.3 + (intensity / 100) * 0.7;
  };

  const handleQuizAnswer = (questionId: number, answer: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const getColorByName = (colorName: string) => {
    const colorMap = {
      red: { fill: "#ef4444", stroke: "#dc2626" },
      blue: "#3b82f6",
      green: "#10b981",
      purple: "#8b5cf6",
      orange: "#f97316",
      cyan: "#06b6d4",
      indigo: "#6366f1",
      pink: "#ec4899",
      yellow: "#eab308",
    };
    return colorMap[colorName as keyof typeof colorMap] || "#6b7280";
  };

  const BrainSVG = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg mx-auto">
      <defs>
        {/* Gradients for brain regions */}
        <radialGradient id="brainGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        {/* Glowing effects */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Brain background shadow */}
      <path
        d="M85 125 C65 85, 105 65, 145 75 C185 65, 225 75, 265 85 C305 95, 325 125, 315 165 C305 205, 285 225, 245 235 C205 245, 165 240, 125 230 C95 220, 75 185, 85 125 Z"
        fill="#1e293b"
        opacity="0.3"
        transform="translate(3, 3)"
      />

      {/* Main brain outline */}
      <path
        d="M80 120 C60 80, 100 60, 140 70 C180 60, 220 70, 260 80 C300 90, 320 120, 310 160 C300 200, 280 220, 240 230 C200 240, 160 235, 120 225 C90 215, 70 180, 80 120 Z"
        fill="url(#brainGradient)"
        stroke="#64748b"
        strokeWidth="2"
        className="transition-all duration-500"
      />

      {/* Brain folds/sulci for realism */}
      <path
        d="M100 95 Q140 90, 180 95 Q220 100, 250 110"
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M90 140 Q130 135, 170 140 Q210 145, 240 155"
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M110 180 Q150 175, 190 180 Q220 185, 250 190"
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />

      {/* Cerebellum */}
      <ellipse
        cx="280"
        cy="200"
        rx="35"
        ry="25"
        fill="#e2e8f0"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />
      <path
        d="M265 190 Q280 185, 295 190 M265 200 Q280 195, 295 200 M265 210 Q280 205, 295 210"
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />

      {/* Brain stem */}
      <rect
        x="175"
        y="220"
        width="25"
        height="45"
        fill="url(#stemGradient)"
        rx="12"
      />

      {/* Corpus callosum (internal structure hint) */}
      <ellipse
        cx="200"
        cy="140"
        rx="60"
        ry="8"
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="3,2"
      />

      {/* Hotspots with enhanced visuals */}
      {brainAreas.map((area) => {
        const intensity = getAreaIntensity(area);
        const baseRadius = 8;
        const glowRadius = baseRadius + (intensity / 100) * 6;
        const color = getColorByName(area.color);

        return (
          <g
            key={area.id}
            className="cursor-pointer"
            onClick={() =>
              setActiveHotspot(activeHotspot === area.id ? null : area.id)
            }
          >
            {/* Pulsing glow effect */}
            <circle
              cx={area.position.x * 4}
              cy={area.position.y * 3}
              r={glowRadius}
              fill={color}
              opacity={0.2 + (intensity / 100) * 0.3}
              className="transition-all duration-500"
              style={{
                animation:
                  isAfterMode && intensity > 60 ? "pulse 2s infinite" : "none",
              }}
            />

            {/* Main hotspot */}
            <circle
              cx={area.position.x * 4}
              cy={area.position.y * 3}
              r={baseRadius}
              fill={color}
              opacity={0.7 + (intensity / 100) * 0.3}
              stroke="#ffffff"
              strokeWidth="2"
              className="transition-all duration-300 hover:scale-125 focus:scale-125"
              filter={activeHotspot === area.id ? "url(#glow)" : "none"}
              role="button"
              tabIndex={0}
              aria-label={`${area.name} - ${area.role}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveHotspot(activeHotspot === area.id ? null : area.id);
                }
              }}
            />

            {/* Emoji label */}
            <text
              x={area.position.x * 4}
              y={area.position.y * 3 + 2}
              textAnchor="middle"
              fontSize="10"
              className="pointer-events-none select-none"
            >
              {area.emoji}
            </text>

            {/* Neural pathways/connections */}
            {activeHotspot === area.id && (
              <g opacity="0.4">
                <line
                  x1={area.position.x * 4}
                  y1={area.position.y * 3}
                  x2="200"
                  y2="140"
                  stroke={color}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />
              </g>
            )}

            {/* Activity bar */}
            <rect
              x={area.position.x * 4 - 12}
              y={area.position.y * 3 + baseRadius + 5}
              width={24}
              height="3"
              fill="#e5e7eb"
              rx="1.5"
            />
            <rect
              x={area.position.x * 4 - 12}
              y={area.position.y * 3 + baseRadius + 5}
              width={24 * (intensity / 100)}
              height="3"
              fill={color}
              rx="1.5"
              className="transition-all duration-500"
            />
          </g>
        );
      })}

      {/* Floating particles for visual appeal */}
      {isAfterMode &&
        [1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={150 + i * 30}
            cy={100 + i * 20}
            r="1"
            fill="#10b981"
            opacity="0.6"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
    </svg>
  );

  const scrollToTechniques = () => {
    const techniquesSection = document.querySelector(
      '[data-scroll-target="techniques"]',
    );
    if (techniquesSection) {
      techniquesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-900/5 to-purple-900/5 rounded-3xl">
      <div className="text-center mb-8">
        <div className="mb-6">
          <img
            src="https://images.pexels.com/photos/8378747/pexels-photo-8378747.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Schéma neuroscientifique du cerveau pour comprendre le stress"
            className="mx-auto rounded-2xl shadow-lg w-64 h-40 object-cover"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Dimension neuroscientifique – Zoom cerveau
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez pourquoi vos techniques anti-stress fonctionnent : plongée
          dans les mécanismes cérébraux du stress et de la régulation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Brain Diagram */}
        <Card className="bg-gradient-to-br from-slate-900 to-blue-900 text-white border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Cerveau interactif</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">Avant</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAfterMode(!isAfterMode)}
                  className="p-1 bg-transparent border-slate-600 text-white hover:bg-slate-800"
                >
                  {isAfterMode ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </Button>
                <span className="text-sm text-slate-300">Après</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-slate-800/50 rounded-xl p-8">
              <BrainSVG />
              <div className="mt-4 text-center">
                <Badge className={isAfterMode ? "bg-green-600" : "bg-red-600"}>
                  {isAfterMode ? "Après techniques" : "Sous stress"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeHotspot
                ? brainAreas.find((area) => area.id === activeHotspot)?.name
                : "Cliquez sur une zone du cerveau"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeHotspot ? (
              <div className="space-y-4">
                {(() => {
                  const area = brainAreas.find((a) => a.id === activeHotspot)!;
                  const intensity = getAreaIntensity(area);

                  return (
                    <>
                      {/* Emoji and title */}
                      <div className="text-center pb-4 border-b border-gray-100">
                        <div className="text-4xl mb-2">{area.emoji}</div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {area.name}
                        </h4>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Rôle :
                        </h5>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          {area.role}
                        </p>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Sous stress :
                        </h5>
                        <p className="text-red-700 text-sm leading-relaxed">
                          {area.underStress}
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Pourquoi {area.technique} aide :
                        </h5>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {area.whyTechniqueHelps}
                        </p>
                      </div>

                      {/* Fun fact */}
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Le saviez-vous ?
                        </h5>
                        <p className="text-purple-700 text-sm italic">
                          {area.funFact}
                        </p>
                      </div>

                      {/* Enhanced activity indicator */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-semibold flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                intensity > 70
                                  ? "bg-red-500 animate-pulse"
                                  : intensity > 40
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            ></div>
                            Niveau d'activité
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">
                              {intensity}%
                            </span>
                            <span className="text-xs text-gray-500">
                              {intensity > 70
                                ? "🔥 Intense"
                                : intensity > 40
                                  ? "⚡ Modéré"
                                  : "😌 Calme"}
                            </span>
                          </div>
                        </div>

                        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              area.color === "red"
                                ? "bg-gradient-to-r from-red-400 to-red-600"
                                : area.color === "blue"
                                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                                  : area.color === "green"
                                    ? "bg-gradient-to-r from-green-400 to-green-600"
                                    : area.color === "purple"
                                      ? "bg-gradient-to-r from-purple-400 to-purple-600"
                                      : area.color === "cyan"
                                        ? "bg-gradient-to-r from-cyan-400 to-cyan-600"
                                        : area.color === "orange"
                                          ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                          : area.color === "indigo"
                                            ? "bg-gradient-to-r from-indigo-400 to-indigo-600"
                                            : area.color === "pink"
                                              ? "bg-gradient-to-r from-pink-400 to-pink-600"
                                              : "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            }`}
                            style={{ width: `${intensity}%` }}
                          >
                            <div className="h-full w-full bg-white/20 animate-pulse"></div>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-600 text-center">
                          {isAfterMode
                            ? "🧘‍♀️ Après application des techniques"
                            : "😰 État de stress"}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>
                  Explorez les différentes zones du cerveau pour comprendre leur
                  rôle dans le stress.
                </p>
                <p className="text-sm mt-2">
                  Utilisez le toggle "Avant/Après" pour voir l'effet des
                  techniques.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mini Quiz */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Mini-quiz : Testez vos connaissances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {quizQuestions.map((question) => (
              <div key={question.id} className="border rounded-lg p-4">
                <h5 className="font-medium mb-3">{question.question}</h5>
                <div className="flex gap-3 mb-3">
                  <Button
                    variant={
                      quizAnswers[question.id] === true ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleQuizAnswer(question.id, true)}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Vrai
                  </Button>
                  <Button
                    variant={
                      quizAnswers[question.id] === false ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleQuizAnswer(question.id, false)}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Faux
                  </Button>
                </div>
                {quizAnswers[question.id] !== undefined && (
                  <div
                    className={`p-3 rounded text-sm ${
                      quizAnswers[question.id] === question.answer
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    <p className="font-medium mb-1">
                      {quizAnswers[question.id] === question.answer
                        ? "✓ Correct !"
                        : "✗ Incorrect."}
                    </p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Glossary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Glossaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {glossaryTerms.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <h6 className="font-semibold text-gray-900">{item.term}</h6>
                <p className="text-gray-600 text-sm">{item.definition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default NeuroscienceBrain;
