import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Heart,
  Lightbulb,
  Users,
  FileText,
  Play,
  Pause,
  MousePointer,
  DragHandleDots2Icon,
  CheckCircle,
  AlertCircle,
  Download,
  RotateCcw,
  Volume2,
} from "lucide-react";

// Sequence 1: Understanding Triggers
export const TriggersSequence = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [viewedHotspots, setViewedHotspots] = useState<number[]>([]);

  const hotspots = [
    {
      id: 1,
      x: 25,
      y: 30,
      category: "Environnementaux",
      description: "Bruit, température, espace de travail mal organisé...",
      example: "Open space bruyant, bureau mal éclairé",
    },
    {
      id: 2,
      x: 60,
      y: 45,
      category: "Organisationnels",
      description: "Surcharge de travail, délais serrés, manque de clarté...",
      example: "Réunions back-to-back, objectifs flous",
    },
    {
      id: 3,
      x: 80,
      y: 25,
      category: "Relationnels",
      description: "Conflits, communication difficile, isolement...",
      example: "Tensions avec un collègue, feedback négatif",
    },
    {
      id: 4,
      x: 40,
      y: 70,
      category: "Internes",
      description: "Perfectionnisme, auto-critique, ruminations...",
      example: "Doute sur ses compétences, peur de l'échec",
    },
  ];

  const handleHotspotClick = (hotspotId: number) => {
    setActiveHotspot(hotspotId);
    if (!viewedHotspots.includes(hotspotId)) {
      setViewedHotspots((prev) => [...prev, hotspotId]);
    }
  };

  const isComplete = viewedHotspots.length === hotspots.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Brain className="w-12 h-12 text-calm-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Comprendre ses déclencheurs
        </h2>
        <p className="text-gray-600">
          Explorez cette scène de bureau pour découvrir les 4 catégories de
          déclencheurs
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 min-h-[400px]">
            {/* Office scene background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjdmOWZjIi8+CjxyZWN0IHg9IjUwIiB5PSIxMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNlNWU3ZWIiLz4KPHN2ZyB4PSIyMDAiIHk9IjgwIiB3aWR0aD0iODAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZDFkNWRiIi8+CjxyZWN0IHg9IjMwMCIgeT0iMTIwIiB3aWR0aD0iNzAiIGhlaWdodD0iNDAiIGZpbGw9IiNmM2Y0ZjYiLz4KPC9zdmc+')] bg-center bg-no-repeat opacity-30" />

            {/* Interactive hotspots */}
            {hotspots.map((hotspot) => (
              <div key={hotspot.id}>
                <button
                  className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    viewedHotspots.includes(hotspot.id)
                      ? "bg-green-500 border-green-600 animate-pulse"
                      : "bg-calm-400 border-calm-500 hover:scale-110"
                  } ${activeHotspot === hotspot.id ? "scale-125 shadow-lg" : ""}`}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onClick={() => handleHotspotClick(hotspot.id)}
                >
                  <MousePointer className="w-4 h-4 text-white mx-auto" />
                </button>

                {activeHotspot === hotspot.id && (
                  <div
                    className="absolute bg-white rounded-lg shadow-lg p-4 w-64 z-10 border border-gray-200"
                    style={{
                      left: `${Math.min(hotspot.x + 5, 70)}%`,
                      top: `${Math.max(hotspot.y - 10, 5)}%`,
                    }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {hotspot.category}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {hotspot.description}
                    </p>
                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                      <strong>Exemple:</strong> {hotspot.example}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Zones explorées: {viewedHotspots.length}/4
              </span>
              <Badge variant={isComplete ? "default" : "outline"}>
                {isComplete ? "Terminé" : "En cours"}
              </Badge>
            </div>
            <Progress
              value={(viewedHotspots.length / 4) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {isComplete && (
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-calm-500 hover:bg-calm-600 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Passer à la séquence suivante
          </Button>
        </div>
      )}
    </div>
  );
};

// Sequence 2: Physiological Techniques
export const PhysiologicalSequence = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const breathingRef = useRef<NodeJS.Timeout | null>(null);

  const techniques = [
    {
      id: "breathing-4-6",
      name: "Respiration 4-6",
      description: "Inspirez 4 secondes, expirez 6 secondes",
      color: "calm",
    },
    {
      id: "breathing-4-7-8",
      name: "Respiration 4-7-8",
      description: "Inspirez 4s, retenez 7s, expirez 8s",
      color: "nature",
    },
    {
      id: "progressive-relaxation",
      name: "Relaxation progressive",
      description: "Contractez puis relâchez chaque groupe musculaire",
      color: "serenity",
    },
    {
      id: "micro-breaks",
      name: "Micro-pauses actives",
      description: "Exercices de 30 secondes toutes les heures",
      color: "calm",
    },
  ];

  const startBreathingExercise = (technique: string) => {
    setActiveExercise(technique);
    setIsBreathing(true);
    setBreathingPhase("inhale");

    if (technique === "breathing-4-6") {
      breathingRef.current = setInterval(
        () => {
          setBreathingPhase((prev) =>
            prev === "inhale" ? "exhale" : "inhale",
          );
        },
        technique === "breathing-4-6" ? 5000 : 6000,
      );
    }

    setTimeout(() => {
      setIsBreathing(false);
      if (breathingRef.current) clearInterval(breathingRef.current);
      if (!completedExercises.includes(technique)) {
        setCompletedExercises((prev) => [...prev, technique]);
      }
    }, 60000); // 1 minute demo
  };

  const DragDropExercise = () => {
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [matches, setMatches] = useState<{ [key: string]: string }>({});

    const techniques = [
      "Respiration 4-6",
      "Relaxation progressive",
      "Micro-pauses",
      "Respiration 4-7-8",
    ];

    const effects = [
      "Calme le système nerveux",
      "Relâche les tensions musculaires",
      "Prévient la fatigue mentale",
      "Améliore la concentration",
    ];

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DragHandleDots2Icon className="w-5 h-5" />
            Associez chaque technique à son effet principal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Techniques</h4>
              <div className="space-y-2">
                {techniques.map((technique, index) => (
                  <div
                    key={technique}
                    draggable
                    onDragStart={() => setDraggedItem(technique)}
                    className="p-3 bg-calm-100 rounded-lg cursor-move hover:bg-calm-200 transition-colors"
                  >
                    {technique}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Effets</h4>
              <div className="space-y-2">
                {effects.map((effect, index) => (
                  <div
                    key={effect}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (draggedItem) {
                        setMatches((prev) => ({
                          ...prev,
                          [draggedItem]: effect,
                        }));
                        setDraggedItem(null);
                      }
                    }}
                    className={`p-3 border-2 border-dashed rounded-lg min-h-[50px] transition-colors ${
                      Object.values(matches).includes(effect)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-calm-400"
                    }`}
                  >
                    {Object.values(matches).includes(effect) ? (
                      <span className="text-green-700 font-medium">
                        {Object.keys(matches).find(
                          (key) => matches[key] === effect,
                        )}{" "}
                        → {effect}
                      </span>
                    ) : (
                      <span className="text-gray-500">{effect}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-nature-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Techniques physiologiques
        </h2>
        <p className="text-gray-600">
          Maîtrisez votre respiration et relâchez vos tensions corporelles
        </p>
      </div>

      {/* Breathing Animation */}
      <Card className="mb-6">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Animation guidée</h3>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <div
                className={`w-full h-full rounded-full transition-all duration-1000 ${
                  isBreathing
                    ? breathingPhase === "inhale"
                      ? "bg-calm-400 scale-110"
                      : "bg-nature-400 scale-90"
                    : "bg-gray-300 scale-100"
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                {isBreathing
                  ? breathingPhase === "inhale"
                    ? "Inspirez"
                    : "Expirez"
                  : "Prêt"}
              </div>
            </div>
          </div>
          {activeExercise && (
            <p className="text-sm text-gray-600 mb-4">
              Exercice en cours:{" "}
              {techniques.find((t) => t.id === activeExercise)?.name}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Technique Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {techniques.map((technique) => (
          <Card
            key={technique.id}
            className={`border-2 transition-all ${
              completedExercises.includes(technique.id)
                ? "border-green-300 bg-green-50"
                : `border-${technique.color}-200 hover:border-${technique.color}-300`
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">
                  {technique.name}
                </h4>
                {completedExercises.includes(technique.id) && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {technique.description}
              </p>
              <Button
                onClick={() => startBreathingExercise(technique.id)}
                disabled={isBreathing}
                className={`w-full bg-${technique.color}-500 hover:bg-${technique.color}-600 text-white`}
              >
                {isBreathing && activeExercise === technique.id ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    En cours...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Pratiquer
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <DragDropExercise />

      {completedExercises.length >= 2 && (
        <div className="text-center mt-6">
          <Button
            onClick={onComplete}
            className="bg-nature-500 hover:bg-nature-600 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Continuer vers les techniques cognitives
          </Button>
        </div>
      )}
    </div>
  );
};

// Export all sequences
export { TriggersSequence, PhysiologicalSequence };
