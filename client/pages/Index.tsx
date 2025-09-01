import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Clock,
  Target,
  CheckCircle,
  Brain,
  Heart,
  Users,
  Lightbulb,
  FileText,
  Zap,
  TrendingUp,
} from "lucide-react";
import NeuroscienceBrain from "@/components/NeuroscienceBrain";
import TransformationTimeline from "@/components/TransformationTimeline";
import InteractiveConclusion from "@/components/InteractiveConclusion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StressRegulationModule = () => {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSequences, setCompletedSequences] = useState<number[]>([]);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const breathingRef = useRef<HTMLDivElement>(null);

  const sequences = [
    {
      id: 1,
      title: "Comprendre stress & émotions",
      duration: "7 min",
      icon: Brain,
      description: "Mécanismes du stress et émotions en situation complexe avec TOP",
      color: "calm",
    },
    {
      id: 2,
      title: "Techniques physiologiques TOP",
      duration: "8 min",
      icon: Heart,
      description: "Techniques d'Optimisation du Potentiel pour la régulation physiologique",
      color: "nature",
    },
    {
      id: 3,
      title: "Techniques cognitives avancées",
      duration: "7 min",
      icon: Lightbulb,
      description: "Outils cognitifs TOP pour situations difficiles et reframing émotionnel",
      color: "serenity",
    },
    {
      id: 4,
      title: "Processus motivationnel",
      duration: "6 min",
      icon: TrendingUp,
      description: "Comprendre et maîtriser la motivation en contexte stressant",
      color: "nature",
    },
    {
      id: 5,
      title: "Communication & assertivité",
      duration: "6 min",
      icon: Users,
      description: "Gestion relationnelle et communication en situation complexe",
      color: "calm",
    },
    {
      id: 6,
      title: "Préparation aux situations difficiles",
      duration: "6 min",
      icon: Zap,
      description: "Plan d'action personnalisé et stratégies d'adaptation",
      color: "serenity",
    },
  ];

  const startBreathingAnimation = () => {
    setIsBreathingActive(true);
    setTimeout(() => setIsBreathingActive(false), 30000); // 30 seconds demo
  };

  const completeSequence = (sequenceId: number) => {
    setCompletedSequences((prev) => [...prev, sequenceId]);
    setProgress(Math.round((completedSequences.length + 1) * (100 / 6)));
  };

  const ModuleHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-calm-50 via-serenity-50 to-nature-50 px-6 py-12 md:py-20">
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span style={{color: "rgb(144, 19, 254)"}}>
            Module 2-Appréhender le Stress & ses émotions en situation complexe
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Acquérez les connaissances pour comprendre vos émotions, maîtriser les Techniques d'Optimisation du Potentiel et vous préparer à affronter les situations difficiles.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-calm-500" />
            <span className="font-medium">40 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-5 h-5 text-nature-500" />
            <span className="font-medium">Niveau Appliquer/Analyser</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-serenity-500" />
            <span className="font-medium">6 séquences interactives</span>
          </div>
        </div>
        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>
    </div>
  );

  const SequenceCard = ({
    sequence,
    index,
  }: {
    sequence: (typeof sequences)[0];
    index: number;
  }) => {
    const Icon = sequence.icon;
    const isCompleted = completedSequences.includes(sequence.id);
    const isCurrent = currentSequence === index;

    return (
      <Card
        className={`group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-2 animate-fadeInUp ${
          isCurrent
            ? `border-${sequence.color}-300 shadow-lg scale-105`
            : isCompleted
              ? `border-${sequence.color}-200 bg-${sequence.color}-25`
              : "border-gray-200"
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div
              className={`p-3 rounded-lg bg-${sequence.color}-100 text-${sequence.color}-600`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs">
                {sequence.duration}
              </Badge>
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500 mt-2" />
              )}
            </div>
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
            Séquence {sequence.id}: {sequence.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {sequence.description}
          </p>
          {sequence.id === 1 ? (
            <Link to="/sequence/1" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : sequence.id === 2 ? (
            <Link to="/sequence/2" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : sequence.id === 3 ? (
            <Link to="/sequence/3" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : sequence.id === 4 ? (
            <Link to="/sequence/4" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : sequence.id === 5 ? (
            <Link to="/sequence/5" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : sequence.id === 6 ? (
            <Link to="/sequence/6" className="block w-full">
              <Button
                className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              >
                <Play className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                setCurrentSequence(index);
                if (!isCompleted) {
                  completeSequence(sequence.id);
                }
              }}
              className={`w-full bg-${sequence.color}-500 hover:bg-${sequence.color}-600 text-white transition-colors`}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminé
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {isCurrent ? "Continuer" : "Commencer"}
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  const BreathingDemo = () => (
    <div className="bg-gradient-to-br from-calm-50 to-nature-50 rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Pratiquons la respiration guidée ensemble
      </h3>
      <p className="text-gray-600 mb-6">
        Inspirez et expirez en suivant le mouvement du cercle pour pratiquer la technique de respiration 4-6
      </p>
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <div
            ref={breathingRef}
            className={`w-full h-full rounded-full bg-gradient-to-br from-calm-400 to-calm-600 shadow-lg transition-all duration-1000 ${
              isBreathingActive
                ? "animate-pulse-gentle shadow-calm-300/50"
                : "scale-100 hover:scale-105"
            }`}
            style={{
              animation: isBreathingActive ? "breathe 10s infinite" : "none",
              boxShadow: isBreathingActive
                ? "0 0 30px rgba(59, 130, 246, 0.5)"
                : "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
      <Button
        onClick={startBreathingAnimation}
        className="bg-calm-500 hover:bg-calm-600 text-white"
        disabled={isBreathingActive}
      >
        {isBreathingActive ? "En cours..." : "Démarrer l'exercice"}
      </Button>
    </div>
  );

  const StressAssessmentQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);

    const questions = [
      "Je me sens souvent débordé(e) par mes responsabilités",
      "J'ai du mal à gérer mes émotions en situation de pression",
      "Les conflits relationnels m'affectent beaucoup",
      "Je ressens des tensions physiques (maux de tête, dos, etc.)",
      "J'ai tendance à procrastiner face aux tâches difficiles",
      "Je perds facilement mes moyens lors de présentations",
      "Le changement m'angoisse et me déstabilise",
      "J'ai du mal à dire non aux demandes supplémentaires"
    ];

    const handleAnswer = (score: number) => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    };

    const getTotalScore = () => answers.reduce((sum, score) => sum + score, 0);
    const getStressLevel = () => {
      const total = getTotalScore();
      if (total <= 16) return { level: "Faible", color: "green", message: "Vous gérez bien votre stress !" };
      if (total <= 24) return { level: "Modéré", color: "yellow", message: "Quelques ajustements seraient bénéfiques" };
      return { level: "Élevé", color: "red", message: "Ce module va vous aider significativement" };
    };

    const resetQuiz = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResult(false);
    };

    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          🎯 Évaluez votre niveau de stress
        </h2>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            {!showResult ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Question {currentQuestion + 1}/{questions.length}</span>
                  <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {questions[currentQuestion]}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { score: 1, label: "Jamais", color: "green" },
                    { score: 2, label: "Parfois", color: "yellow" },
                    { score: 3, label: "Souvent", color: "orange" },
                    { score: 4, label: "Toujours", color: "red" }
                  ].map((option) => (
                    <Button
                      key={option.score}
                      onClick={() => handleAnswer(option.score)}
                      variant="outline"
                      className={`h-16 flex flex-col items-center justify-center border-2 hover:border-${option.color}-300 hover:bg-${option.color}-50`}
                    >
                      <span className="font-medium">{option.score}</span>
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Votre profil de stress</h3>
                  <div className={`inline-block px-4 py-2 rounded-full bg-${getStressLevel().color}-100 text-${getStressLevel().color}-800 font-semibold`}>
                    Niveau {getStressLevel().level} ({getTotalScore()}/32 points)
                  </div>
                  <p className="text-gray-600 mt-3">{getStressLevel().message}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Recommandations personnalisées :</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    {getTotalScore() > 24 && <p>• Priorisez les techniques physiologiques (séquence 2)</p>}
                    {getTotalScore() > 20 && <p>• Travaillez sur la gestion émotionnelle (séquence 1)</p>}
                    {getTotalScore() > 16 && <p>• Développez vos stratégies cognitives (séquence 3)</p>}
                    <p>• Créez votre plan d'action personnalisé (séquence 6)</p>
                  </div>
                </div>

                <Button onClick={resetQuiz} variant="outline" className="mr-3">
                  Refaire le test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const EmotionWheelInteractive = () => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const emotions = [
      {
        name: "Colère",
        color: "#ef4444",
        icon: "🔥",
        description: "Émotion intense face à une frustration ou injustice",
        techniques: ["Respiration profonde", "Pause reflexive", "Exercice physique"],
        intensity: "Haute"
      },
      {
        name: "Peur",
        color: "#8b5cf6",
        icon: "😰",
        description: "Réaction d'alerte face au danger ou à l'inconnu",
        techniques: ["Ancrage 5-4-3-2-1", "Visualisation positive", "Planification"],
        intensity: "Variable"
      },
      {
        name: "Tristesse",
        color: "#06b6d4",
        icon: "😢",
        description: "Émotion liée à la perte ou à la déception",
        techniques: ["Expression créative", "Soutien social", "Auto-compassion"],
        intensity: "Modérée"
      },
      {
        name: "Joie",
        color: "#eab308",
        icon: "😊",
        description: "État de bien-être et de satisfaction",
        techniques: ["Gratitude", "Partage", "Ancrage positif"],
        intensity: "Positive"
      },
      {
        name: "Stress",
        color: "#f97316",
        icon: "😤",
        description: "Tension face aux exigences de l'environnement",
        techniques: ["Cohérence cardiaque", "Priorisation", "Délégation"],
        intensity: "Élevée"
      },
      {
        name: "Anxiété",
        color: "#84cc16",
        icon: "😟",
        description: "Inquiétude anticipatoire face à l'avenir",
        techniques: ["Mindfulness", "Reframing", "Action graduée"],
        intensity: "Variable"
      }
    ];

    const handleEmotionClick = (emotionName: string) => {
      setIsAnimating(true);
      setSelectedEmotion(selectedEmotion === emotionName ? null : emotionName);
      setTimeout(() => setIsAnimating(false), 300);
    };

    const getSegmentPath = (index: number, radius: number) => {
      const segmentAngle = 360 / emotions.length;
      const startAngle = index * segmentAngle - 90; // Start from top
      const endAngle = startAngle + segmentAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const innerRadius = 40;
      const outerRadius = radius;

      const x1 = 100 + innerRadius * Math.cos(startRad);
      const y1 = 100 + innerRadius * Math.sin(startRad);
      const x2 = 100 + outerRadius * Math.cos(startRad);
      const y2 = 100 + outerRadius * Math.sin(startRad);
      const x3 = 100 + outerRadius * Math.cos(endRad);
      const y3 = 100 + outerRadius * Math.sin(endRad);
      const x4 = 100 + innerRadius * Math.cos(endRad);
      const y4 = 100 + innerRadius * Math.sin(endRad);

      const largeArc = segmentAngle > 180 ? 1 : 0;

      return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1} Z`;
    };

    const getLabelPosition = (index: number) => {
      const segmentAngle = 360 / emotions.length;
      const angle = index * segmentAngle + segmentAngle / 2 - 90;
      const radian = (angle * Math.PI) / 180;
      const radius = 65;

      return {
        x: 100 + radius * Math.cos(radian),
        y: 100 + radius * Math.sin(radian)
      };
    };

    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          🎭 Roue des émotions interactive
        </h2>

        <div className="flex flex-col xl:flex-row items-start gap-8">
          {/* Roue des émotions */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-96 h-96 mx-auto mb-6">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                {/* Segments des émotions */}
                {emotions.map((emotion, index) => {
                  const isSelected = selectedEmotion === emotion.name;
                  const isHovered = hoveredEmotion === emotion.name;
                  const labelPos = getLabelPosition(index);

                  return (
                    <g key={emotion.name}>
                      {/* Segment principal */}
                      <path
                        d={getSegmentPath(index, isSelected || isHovered ? 82 : 78)}
                        fill={isSelected || isHovered ? emotion.color : `${emotion.color}CC`}
                        stroke="white"
                        strokeWidth="3"
                        className={`cursor-pointer transition-all duration-300 ${
                          isAnimating ? 'animate-pulse' : ''
                        } hover:drop-shadow-xl`}
                        style={{
                          filter: isSelected || isHovered
                            ? `drop-shadow(0 0 10px ${emotion.color}50)`
                            : 'none',
                          transform: isSelected || isHovered ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: '100px 100px'
                        }}
                        onMouseEnter={() => setHoveredEmotion(emotion.name)}
                        onMouseLeave={() => setHoveredEmotion(null)}
                        onClick={() => handleEmotionClick(emotion.name)}
                      />

                      {/* Icône et texte */}
                      <g className="pointer-events-none">
                        <text
                          x={labelPos.x}
                          y={labelPos.y - 8}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-lg"
                        >
                          {emotion.icon}
                        </text>
                        <text
                          x={labelPos.x}
                          y={labelPos.y + 6}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className={`text-xs font-bold transition-all duration-300 ${
                            isSelected || isHovered ? 'fill-white' : 'fill-gray-800'
                          }`}
                        >
                          {emotion.name}
                        </text>
                      </g>

                      {/* Effet de pulse pour l'émotion sélectionnée */}
                      {isSelected && (
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke={emotion.color}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-spin"
                          style={{ animationDuration: '3s' }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Centre de la roue */}
                <circle cx="100" cy="100" r="35" fill="white" stroke="#e5e7eb" strokeWidth="3" />
                <text x="100" y="95" textAnchor="middle" dominantBaseline="middle" className="text-sm font-bold fill-gray-700">
                  Émotions
                </text>
                <text x="100" y="105" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-500">
                  Interactives
                </text>
              </svg>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 max-w-md text-center">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Instructions :</span> Cliquez sur une émotion pour découvrir
                les techniques TOP adaptées et des informations détaillées.
              </p>
            </div>
          </div>

          {/* Panneau d'informations */}
          <div className="flex-1 space-y-6">
            <div className="min-h-[400px]">
              {selectedEmotion ? (
                <div className="space-y-4 animate-fadeInUp">
                  {/* En-tête de l'émotion */}
                  <div className="flex items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300"
                       style={{
                         borderColor: emotions.find(e => e.name === selectedEmotion)?.color,
                         backgroundColor: `${emotions.find(e => e.name === selectedEmotion)?.color}10`
                       }}>
                    <div className="text-4xl">
                      {emotions.find(e => e.name === selectedEmotion)?.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedEmotion}
                      </h3>
                      <p className="text-gray-600">
                        {emotions.find(e => e.name === selectedEmotion)?.description}
                      </p>
                      <Badge
                        className="mt-2"
                        style={{
                          backgroundColor: emotions.find(e => e.name === selectedEmotion)?.color,
                          color: 'white'
                        }}
                      >
                        Intensité: {emotions.find(e => e.name === selectedEmotion)?.intensity}
                      </Badge>
                    </div>
                  </div>

                  {/* Techniques TOP */}
                  <Card className="border-2" style={{ borderColor: `${emotions.find(e => e.name === selectedEmotion)?.color}40` }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" style={{ color: emotions.find(e => e.name === selectedEmotion)?.color }} />
                        Techniques TOP recommandées
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {emotions.find(e => e.name === selectedEmotion)?.techniques.map((technique, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group"
                          >
                            <div
                              className="w-3 h-3 rounded-full group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: emotions.find(e => e.name === selectedEmotion)?.color }}
                            />
                            <span className="font-medium text-gray-900 group-hover:text-gray-700">
                              {technique}
                            </span>
                            <Button size="sm" variant="ghost" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                              Essayer
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Conseils pratiques */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      💡 Conseil pratique
                    </h4>
                    <p className="text-sm text-gray-700">
                      {selectedEmotion === "Colère" && "Prenez 3 respirations profondes avant de réagir. La colère diminue naturellement après 6 secondes."}
                      {selectedEmotion === "Peur" && "Utilisez la technique 5-4-3-2-1 : nommez 5 choses que vous voyez, 4 que vous touchez, etc."}
                      {selectedEmotion === "Tristesse" && "Accordez-vous le droit d'être triste. L'expression créative peut aider à traiter cette émotion."}
                      {selectedEmotion === "Joie" && "Savourez ce moment ! Pratiquez la gratitude pour ancrer cette émotion positive."}
                      {selectedEmotion === "Stress" && "Identifiez ce qui est sous votre contrôle. Priorisez vos actions et déléguez quand possible."}
                      {selectedEmotion === "Anxiété" && "Concentrez-vous sur le moment présent. L'anxiété vient souvent d'anticipations négatives."}
                    </p>
                  </div>

                  {/* Navigation vers les séquences */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-3">
                      🎯 <strong>Approfondissez vos connaissances :</strong>
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="text-xs">
                        Séquence 1: Déclencheurs
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Séquence 2: Techniques physio
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Séquence 3: Techniques cognitives
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-12 space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Cliquez sur une émotion
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Explorez les différentes émotions et découvrez les techniques TOP adaptées
                    pour chaque situation émotionnelle.
                  </p>
                  <div className="flex justify-center gap-2 pt-4">
                    {emotions.map((emotion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleEmotionClick(emotion.name)}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-gray-300
                                 flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ backgroundColor: `${emotion.color}20` }}
                      >
                        <span className="text-lg">{emotion.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TOPTechniquesPreview = () => {
    const [activeCategory, setActiveCategory] = useState<string>("physiologique");

    const categories = {
      physiologique: {
        icon: Heart,
        color: "nature",
        title: "Techniques Physiologiques TOP",
        description: "Régulation par le corps et la respiration",
        techniques: [
          { name: "Cohérence cardiaque", demo: "Respiration 5-5", difficulty: "Facile" },
          { name: "Relaxation progressive", demo: "Tensions-détente", difficulty: "Moyen" },
          { name: "Ancrage sensoriel", demo: "5-4-3-2-1", difficulty: "Facile" },
          { name: "Respiration contrôlée", demo: "4-6-2", difficulty: "Facile" }
        ]
      },
      cognitif: {
        icon: Brain,
        color: "calm",
        title: "Techniques Cognitives TOP",
        description: "Optimisation mentale et reframing",
        techniques: [
          { name: "Reframing positif", demo: "Recadrage situation", difficulty: "Moyen" },
          { name: "Visualisation TOP", demo: "Imagerie mentale", difficulty: "Moyen" },
          { name: "Auto-dialogue", demo: "Coaching interne", difficulty: "Facile" },
          { name: "Matrice Eisenhower", demo: "Priorisation", difficulty: "Facile" }
        ]
      },
      comportemental: {
        icon: Users,
        color: "serenity",
        title: "Techniques Comportementales TOP",
        description: "Action et communication efficace",
        techniques: [
          { name: "Communication assertive", demo: "Modèle DESC", difficulty: "Moyen" },
          { name: "Gestion du temps", demo: "Planification TOP", difficulty: "Moyen" },
          { name: "Résolution problème", demo: "Méthode 6 étapes", difficulty: "Avancé" },
          { name: "Leadership positif", demo: "Influence bienveillante", difficulty: "Avancé" }
        ]
      }
    };

    return (
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl my-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          🛠️ Aperçu des Techniques d'Optimisation du Potentiel
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(categories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <Button
                key={key}
                onClick={() => setActiveCategory(key)}
                variant={activeCategory === key ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeCategory === key
                    ? `bg-${category.color}-500 hover:bg-${category.color}-600 text-white`
                    : `hover:bg-${category.color}-50 hover:border-${category.color}-300`
                }`}
              >
                <Icon className="w-4 h-4" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {categories[activeCategory as keyof typeof categories].title}
            </h3>
            <p className="text-gray-600">
              {categories[activeCategory as keyof typeof categories].description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories[activeCategory as keyof typeof categories].techniques.map((technique, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{technique.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{technique.demo}</p>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        technique.difficulty === "Facile" ? "border-green-300 text-green-600" :
                        technique.difficulty === "Moyen" ? "border-yellow-300 text-yellow-600" :
                        "border-red-300 text-red-600"
                      }`}
                    >
                      {technique.difficulty}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-xs p-1 h-6">
                      Essayer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Les TOP</strong> sont des techniques validées scientifiquement pour optimiser vos performances
                physiques, mentales et émotionnelles en situation de stress.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Découvrir toutes les techniques dans les séquences
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ObjectivesSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Objectifs d'apprentissage
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            icon: Brain,
            color: "nature",
            title: "Appréhender",
            desc: "Acquérir les connaissances de base sur le stress et cibler le contexte d'utilisation des TOP",
          },
          {
            icon: Heart,
            color: "calm",
            title: "Comprendre",
            desc: "Analyser le fonctionnement de ses émotions et développer ses propres outils",
          },
          {
            icon: TrendingUp,
            color: "serenity",
            title: "Se préparer",
            desc: "Affronter des situations difficiles en appréhendant le processus motivationnel",
          },
          {
            icon: Zap,
            color: "nature",
            title: "Réguler",
            desc: "Maîtriser la mécanique du stress et développer ses outils de régulation en situation difficile",
          },
        ].map((obj, index) => {
          const Icon = obj.icon;
          return (
            <Card
              key={index}
              className={`border-${obj.color}-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slideInLeft`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6">
                <Icon
                  className={`w-8 h-8 text-${obj.color}-500 mb-3 transition-transform duration-300 group-hover:scale-110`}
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {obj.title}
                </h3>
                <p className="text-gray-600 text-sm">{obj.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-serenity-50 via-white to-calm-50">
      <ModuleHeader />

      <ObjectivesSection />

      <StressAssessmentQuiz />

      <EmotionWheelInteractive />

      <NeuroscienceBrain />

      <TOPTechniquesPreview />

      <div
        className="max-w-6xl mx-auto px-6 py-12"
        data-scroll-target="techniques"
      >
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {sequences.map((sequence, index) => (
            <SequenceCard key={sequence.id} sequence={sequence} index={index} />
          ))}
        </div>

        <div className="mb-12">
          <BreathingDemo />
        </div>
      </div>

      <TransformationTimeline />

      <InteractiveConclusion />

      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-pulse-gentle {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StressRegulationModule;
