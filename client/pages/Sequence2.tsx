import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Home,
  Zap,
  RotateCcw,
  Volume2,
  Timer,
  Waves,
} from "lucide-react";

const Sequence2 = () => {
  const [currentStep, setCurrentStep] = useState<
    "intro" | "learning" | "practice" | "completion"
  >("intro");
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [breathingCount, setBreathingCount] = useState(0);
  const [completedTechniques, setCompletedTechniques] = useState<string[]>([]);
  const [dragDropComplete, setDragDropComplete] = useState(false);
  const breathingInterval = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeout = useRef<NodeJS.Timeout | null>(null);

  const techniques = [
    {
      id: "breathing-4-6",
      name: "Respiration 4-6",
      description: "Inspirez 4 secondes, expirez 6 secondes",
      details:
        "Technique simple et efficace pour calmer le système nerveux autonome. L'expiration plus longue active le système parasympathique.",
      instructions: [
        "Asseyez-vous confortablement",
        "Inspirez par le nez pendant 4 secondes",
        "Expirez par la bouche pendant 6 secondes",
        "Répétez 10 cycles",
      ],
      benefits:
        "Réduction immédiate du stress, amélioration de la concentration",
      color: "calm",
      duration: 60,
    },
    {
      id: "breathing-4-7-8",
      name: "Respiration 4-7-8",
      description: "Inspirez 4s, retenez 7s, expirez 8s",
      details:
        "Technique avancée développée par le Dr. Andrew Weil. Très efficace pour l'endormissement et la gestion de l'anxiété.",
      instructions: [
        "Placez la langue derrière les dents",
        "Inspirez par le nez pendant 4 secondes",
        "Retenez votre souffle pendant 7 secondes",
        "Expirez complètement pendant 8 secondes",
      ],
      benefits: "Endormissement rapide, réduction de l'anxiété profonde",
      color: "nature",
      duration: 90,
    },
    {
      id: "progressive-relaxation",
      name: "Relaxation musculaire progressive",
      description: "Contractez puis relâchez chaque groupe musculaire",
      details:
        "Technique de Jacobson qui permet de distinguer tension et relaxation musculaire pour un relâchement profond.",
      instructions: [
        "Commencez par les pieds",
        "Contractez le muscle 5 secondes",
        "Relâchez brutalement",
        "Observez la différence de sensation",
      ],
      benefits: "Relâchement des tensions physiques, amélioration du sommeil",
      color: "serenity",
      duration: 120,
    },
    {
      id: "micro-breaks",
      name: "Micro-pauses actives",
      description: "Exercices de 30 secondes toutes les heures",
      details:
        "Courtes pauses préventives pour éviter l'accumulation de stress et maintenir l'énergie tout au long de la journée.",
      instructions: [
        "Levez-vous et étirez-vous",
        "Respirez profondément 3 fois",
        "Bougez les épaules en cercle",
        "Hydratez-vous",
      ],
      benefits: "Prévention de la fatigue, maintien de l'énergie",
      color: "calm",
      duration: 30,
    },
  ];

  const dragDropPairs = [
    { technique: "Respiration 4-6", effect: "Calme le système nerveux" },
    {
      technique: "Relaxation progressive",
      effect: "Relâche les tensions musculaires",
    },
    { technique: "Micro-pauses", effect: "Prévient la fatigue mentale" },
    { technique: "Respiration 4-7-8", effect: "Améliore la concentration" },
  ];

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});

  const startBreathing = (techniqueId: string) => {
    const technique = techniques.find((t) => t.id === techniqueId);
    if (!technique) return;

    setActiveTechnique(techniqueId);
    setIsBreathing(true);
    setBreathingCount(0);
    setBreathingPhase("inhale");

    const phases =
      techniqueId === "breathing-4-7-8"
        ? [
            { phase: "inhale", duration: 4000 },
            { phase: "hold", duration: 7000 },
            { phase: "exhale", duration: 8000 },
          ]
        : [
            { phase: "inhale", duration: 4000 },
            { phase: "exhale", duration: 6000 },
          ];

    let currentPhaseIndex = 0;
    let cycleCount = 0;
    const maxCycles = 6;

    const runPhase = () => {
      if (cycleCount >= maxCycles) {
        stopBreathing(techniqueId);
        return;
      }

      const currentPhase = phases[currentPhaseIndex];
      setBreathingPhase(currentPhase.phase as any);

      phaseTimeout.current = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        if (currentPhaseIndex === 0) {
          cycleCount++;
          setBreathingCount(cycleCount);
        }
        runPhase();
      }, currentPhase.duration);
    };

    runPhase();
  };

  const stopBreathing = (techniqueId: string) => {
    setIsBreathing(false);
    setActiveTechnique(null);
    if (phaseTimeout.current) clearTimeout(phaseTimeout.current);
    if (!completedTechniques.includes(techniqueId)) {
      setCompletedTechniques((prev) => [...prev, techniqueId]);
    }
  };

  const handleDrop = (effect: string) => {
    if (draggedItem) {
      setMatches((prev) => ({ ...prev, [draggedItem]: effect }));
      setDraggedItem(null);

      if (Object.keys(matches).length + 1 === dragDropPairs.length) {
        setDragDropComplete(true);
      }
    }
  };

  const getBreathingAnimation = () => {
    if (!isBreathing) return "scale-100";

    switch (breathingPhase) {
      case "inhale":
        return "scale-125";
      case "hold":
        return "scale-125";
      case "exhale":
        return "scale-90";
      default:
        return "scale-100";
    }
  };

  const getPhaseText = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Inspirez";
      case "hold":
        return "Retenez";
      case "exhale":
        return "Expirez";
      default:
        return "Prêt";
    }
  };

  const isSequenceComplete =
    completedTechniques.length >= 2 && dragDropComplete;

  useEffect(() => {
    if (isSequenceComplete && currentStep === "practice") {
      setTimeout(() => setCurrentStep("completion"), 1000);
    }
  }, [isSequenceComplete, currentStep]);

  const IntroStep = () => (
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-nature-200">
        <Heart className="w-16 h-16 text-nature-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Séquence 2: Techniques physiologiques
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Apprenez à maîtriser votre respiration et à relâcher vos tensions
          corporelles grâce à des techniques scientifiquement prouvées.
        </p>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {techniques.map((technique, index) => (
            <div
              key={technique.id}
              className="text-center p-4 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-8 h-8 mx-auto mb-2 bg-${technique.color}-100 text-${technique.color}-600 rounded-full flex items-center justify-center`}
              >
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-gray-900">
                {technique.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {technique.duration}s
              </p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Ce que vous allez apprendre :
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Techniques de respiration contrôlée</li>
            <li>• Relaxation musculaire progressive</li>
            <li>• Micro-pauses préventives</li>
            <li>• Association technique-effet thérapeutique</li>
          </ul>
        </div>
        <Button
          onClick={() => setCurrentStep("learning")}
          className="bg-nature-500 hover:bg-nature-600 text-white text-lg px-8 py-3"
        >
          Commencer l'apprentissage
        </Button>
      </div>
    </div>
  );

  const LearningStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Découvrez les 4 techniques physiologiques
        </h2>
        <p className="text-gray-600 mb-4">
          Cliquez sur chaque technique pour découvrir ses instructions
          détaillées et ses bénéfices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {techniques.map((technique, index) => (
          <Card
            key={technique.id}
            className={`border-2 border-${technique.color}-200 hover:border-${technique.color}-300 transition-all`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-lg bg-${technique.color}-100 text-${technique.color}-600`}
                >
                  <Heart className="w-6 h-6" />
                </div>
                <Badge
                  className={`bg-${technique.color}-100 text-${technique.color}-700`}
                >
                  {technique.duration}s
                </Badge>
              </div>
              <CardTitle className="text-lg">{technique.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                {technique.description}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h5 className="font-semibold text-sm mb-2">Instructions :</h5>
                <ol className="text-xs text-gray-600 space-y-1">
                  {technique.instructions.map((instruction, i) => (
                    <li key={i}>
                      {i + 1}. {instruction}
                    </li>
                  ))}
                </ol>
              </div>
              <div className={`bg-${technique.color}-50 p-3 rounded-lg`}>
                <h5 className="font-semibold text-sm mb-1">Bénéfices :</h5>
                <p className="text-xs text-gray-700">{technique.benefits}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={() => setCurrentStep("practice")}
          className="bg-nature-500 hover:bg-nature-600 text-white"
        >
          Passer à la pratique
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const PracticeStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Pratique guidée</h2>
          <Badge
            variant={isSequenceComplete ? "default" : "outline"}
            className="text-lg px-4 py-2"
          >
            {completedTechniques.length}/2 techniques pratiquées
          </Badge>
        </div>
        <Progress
          value={
            (completedTechniques.length / 2) * 50 + (dragDropComplete ? 50 : 0)
          }
          className="h-3 mb-4"
        />
      </div>

      {/* Breathing Animation Center */}
      <Card className="mb-8">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-6">
            Animation de respiration guidée
          </h3>
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <div
                className={`w-full h-full rounded-full transition-all duration-1000 ${getBreathingAnimation()} ${
                  isBreathing
                    ? breathingPhase === "inhale"
                      ? "bg-gradient-to-br from-calm-400 to-calm-600"
                      : breathingPhase === "hold"
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : "bg-gradient-to-br from-nature-400 to-nature-600"
                    : "bg-gradient-to-br from-gray-300 to-gray-400"
                }`}
                style={{
                  boxShadow: isBreathing
                    ? "0 0 40px rgba(59, 130, 246, 0.6)"
                    : "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                <span className="text-xl">{getPhaseText()}</span>
                {isBreathing && (
                  <span className="text-sm mt-1">Cycle {breathingCount}/6</span>
                )}
              </div>
            </div>
          </div>

          {activeTechnique && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {techniques.find((t) => t.id === activeTechnique)?.name}
              </h4>
              <p className="text-gray-600 text-sm">
                {techniques.find((t) => t.id === activeTechnique)?.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technique Practice Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {techniques.slice(0, 2).map((technique) => (
          <Card
            key={technique.id}
            className={`border-2 transition-all ${
              completedTechniques.includes(technique.id)
                ? `border-green-300 bg-green-50`
                : `border-${technique.color}-200 hover:border-${technique.color}-300`
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-gray-900">
                  {technique.name}
                </h4>
                {completedTechniques.includes(technique.id) && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {technique.description}
              </p>
              <Button
                onClick={() => startBreathing(technique.id)}
                disabled={isBreathing}
                className={`w-full ${
                  isBreathing && activeTechnique === technique.id
                    ? "bg-red-500 hover:bg-red-600"
                    : `bg-${technique.color}-500 hover:bg-${technique.color}-600`
                } text-white`}
              >
                {isBreathing && activeTechnique === technique.id ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Arrêter
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Pratiquer ({technique.duration}s)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drag & Drop Exercise */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Associez chaque technique à son effet principal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Techniques :</h4>
              <div className="space-y-3">
                {dragDropPairs.map((pair, index) => (
                  <div
                    key={pair.technique}
                    draggable
                    onDragStart={() => setDraggedItem(pair.technique)}
                    className={`p-4 rounded-lg cursor-move transition-all ${
                      Object.keys(matches).includes(pair.technique)
                        ? "bg-green-100 text-green-800 opacity-50"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                  >
                    {pair.technique}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Effets :</h4>
              <div className="space-y-3">
                {dragDropPairs.map((pair, index) => (
                  <div
                    key={pair.effect}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(pair.effect)}
                    className={`p-4 border-2 border-dashed rounded-lg min-h-[60px] transition-all ${
                      Object.values(matches).includes(pair.effect)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-nature-400 bg-gray-50"
                    }`}
                  >
                    {Object.values(matches).includes(pair.effect) ? (
                      <div className="text-green-700 font-medium">
                        <span className="text-sm">
                          {Object.keys(matches).find(
                            (key) => matches[key] === pair.effect,
                          )}
                        </span>
                        <br />
                        <span className="text-green-600">→ {pair.effect}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">{pair.effect}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {dragDropComplete && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Excellent !</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Vous maîtrisez maintenant l'association entre techniques et
                effets thérapeutiques.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {isSequenceComplete && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Pratique terminée avec succès !
            </h3>
            <p className="text-green-700 mb-4">
              Vous avez maîtrisé les techniques physiologiques de base. Prêt
              pour les techniques cognitives ?
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CompletionStep = () => (
    <div className="max-w-4xl mx-auto text-center">
      <Card className="bg-gradient-to-br from-green-50 to-nature-50 border-green-200">
        <CardContent className="p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Séquence 2 terminée avec succès !
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Vous maîtrisez maintenant les techniques physiologiques de gestion
            du stress. Ces outils vous permettront de réguler votre système
            nerveux en toutes circonstances.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Techniques acquises :
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Respiration 4-6 pour la relaxation</li>
                <li>• Respiration 4-7-8 pour l'anxiété</li>
                <li>• Relaxation musculaire progressive</li>
                <li>• Micro-pauses préventives</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Prochaines étapes :
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Techniques cognitives</li>
                <li>• Matrice d'Eisenhower</li>
                <li>• Reframing mental</li>
                <li>• Gestion des priorités</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-nature-500 hover:bg-nature-600 text-white">
                <Home className="w-4 h-4 mr-2" />
                Retour au module
              </Button>
            </Link>
            <Link to="/sequence/3">
              <Button className="bg-serenity-500 hover:bg-serenity-600 text-white">
                Séquence suivante
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-serenity-50 via-white to-nature-50 py-8">
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au module
          </Link>
          <Badge className="bg-nature-100 text-nature-700">Séquence 2/5</Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {currentStep === "intro" && <IntroStep />}
        {currentStep === "learning" && <LearningStep />}
        {currentStep === "practice" && <PracticeStep />}
        {currentStep === "completion" && <CompletionStep />}
      </div>
    </div>
  );
};

export default Sequence2;
