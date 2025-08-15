import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  ArrowLeft,
  MousePointer,
  CheckCircle,
  Home,
  AlertCircle,
  Users,
  Building,
  User,
  Zap,
} from "lucide-react";

const Sequence1 = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [viewedHotspots, setViewedHotspots] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "intro" | "exploration" | "completion"
  >("intro");

  const hotspots = [
    {
      id: 1,
      x: 25,
      y: 30,
      category: "Environnementaux",
      icon: Building,
      color: "red",
      description:
        "Facteurs physiques et matériels de votre environnement de travail",
      details:
        "Bruit constant, température inadéquate, éclairage insuffisant, espace de travail mal organisé, interruptions fréquentes...",
      example:
        "Open space bruyant, bureau mal éclairé, climatisation trop forte",
      impact: "Fatigue, difficultés de concentration, irritabilité",
    },
    {
      id: 2,
      x: 60,
      y: 45,
      category: "Organisationnels",
      icon: Zap,
      color: "orange",
      description: "Structure et fonctionnement de votre organisation",
      details:
        "Surcharge de travail, délais irréalistes, manque de clarté sur les objectifs, changements fréquents, manque de ressources...",
      example:
        "Réunions back-to-back, objectifs flous, restructurations permanentes",
      impact: "Sentiment de débordement, frustration, perte de sens",
    },
    {
      id: 3,
      x: 80,
      y: 25,
      category: "Relationnels",
      icon: Users,
      color: "blue",
      description: "Interactions avec vos collègues, hiérarchie et clients",
      details:
        "Conflits interpersonnels, communication difficile, isolement, manque de reconnaissance, relations toxiques...",
      example:
        "Tensions avec un collègue, feedback négatif constant, manque de soutien",
      impact: "Anxiété sociale, démotivation, épuisement émotionnel",
    },
    {
      id: 4,
      x: 40,
      y: 70,
      category: "Internes",
      icon: User,
      color: "purple",
      description: "Vos pensées, émotions et habitudes personnelles",
      details:
        "Perfectionnisme excessif, auto-critique constante, ruminations, peur de l'échec, procrastination...",
      example: "Doute permanent sur ses compétences, besoin de tout contrôler",
      impact: "Stress chronique, baisse d'estime de soi, troubles du sommeil",
    },
  ];

  const handleHotspotClick = (hotspotId: number) => {
    setActiveHotspot(hotspotId);
    if (!viewedHotspots.includes(hotspotId)) {
      setViewedHotspots((prev) => [...prev, hotspotId]);
    }
  };

  const getColorClass = (color: string) => {
    const colors = {
      red: "border-red-500 bg-red-50",
      orange: "border-orange-500 bg-orange-50",
      blue: "border-blue-500 bg-blue-50",
      purple: "border-purple-500 bg-purple-50",
    };
    return colors[color as keyof typeof colors] || "border-gray-500 bg-gray-50";
  };

  const isComplete = viewedHotspots.length === hotspots.length;
  const progress = (viewedHotspots.length / hotspots.length) * 100;

  useEffect(() => {
    if (isComplete && currentStep === "exploration") {
      setTimeout(() => setCurrentStep("completion"), 1000);
    }
  }, [isComplete, currentStep]);

  const IntroStep = () => (
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-calm-200">
        <Brain className="w-16 h-16 text-calm-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Séquence 1: Comprendre ses déclencheurs
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Bienvenue dans cette séquence interactive ! Vous allez découvrir les 4
          catégories principales de déclencheurs de stress et apprendre à les
          identifier dans votre environnement professionnel.
        </p>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {hotspots.map((hotspot, index) => {
            const Icon = hotspot.icon;
            return (
              <div
                key={hotspot.id}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-2 text-${hotspot.color}-500`}
                />
                <h4 className="font-semibold text-sm text-gray-900">
                  {hotspot.category}
                </h4>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => setCurrentStep("exploration")}
          className="bg-calm-500 hover:bg-calm-600 text-white text-lg px-8 py-3"
        >
          Commencer l'exploration
        </Button>
      </div>
    </div>
  );

  const ExplorationStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Explorez cette scène de bureau
          </h2>
          <Badge
            variant={isComplete ? "default" : "outline"}
            className="text-lg px-4 py-2"
          >
            {viewedHotspots.length}/4 zones explorées
          </Badge>
        </div>
        <Progress value={progress} className="h-3 mb-4" />
        <p className="text-gray-600">
          Cliquez sur les points interactifs pour découvrir les différents types
          de déclencheurs de stress.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-lg p-8 min-h-[500px] overflow-hidden">
            {/* Office scene background */}
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                {/* Office floor */}
                <rect x="0" y="350" width="800" height="50" fill="#e5e7eb" />

                {/* Desks */}
                <rect
                  x="80"
                  y="280"
                  width="120"
                  height="60"
                  fill="#9ca3af"
                  rx="4"
                />
                <rect
                  x="450"
                  y="280"
                  width="120"
                  height="60"
                  fill="#9ca3af"
                  rx="4"
                />

                {/* Computers */}
                <rect
                  x="90"
                  y="260"
                  width="40"
                  height="25"
                  fill="#374151"
                  rx="2"
                />
                <rect
                  x="460"
                  y="260"
                  width="40"
                  height="25"
                  fill="#374151"
                  rx="2"
                />

                {/* Chairs */}
                <circle cx="170" cy="320" r="15" fill="#6b7280" />
                <circle cx="540" cy="320" r="15" fill="#6b7280" />

                {/* Person silhouettes */}
                <circle cx="320" cy="250" r="20" fill="#9ca3af" />
                <rect
                  x="310"
                  y="270"
                  width="20"
                  height="50"
                  fill="#9ca3af"
                  rx="10"
                />

                <circle cx="650" cy="200" r="15" fill="#9ca3af" />
                <rect
                  x="642"
                  y="215"
                  width="16"
                  height="40"
                  fill="#9ca3af"
                  rx="8"
                />

                {/* Meeting table */}
                <ellipse cx="400" cy="350" rx="80" ry="30" fill="#9ca3af" />

                {/* Office plants */}
                <circle cx="700" cy="300" r="8" fill="#10b981" />
                <rect x="698" y="305" width="4" height="15" fill="#065f46" />

                {/* Windows */}
                <rect x="0" y="50" width="800" height="4" fill="#60a5fa" />
                <rect
                  x="100"
                  y="50"
                  width="80"
                  height="120"
                  fill="#bfdbfe"
                  opacity="0.5"
                />
                <rect
                  x="300"
                  y="50"
                  width="80"
                  height="120"
                  fill="#bfdbfe"
                  opacity="0.5"
                />
                <rect
                  x="500"
                  y="50"
                  width="80"
                  height="120"
                  fill="#bfdbfe"
                  opacity="0.5"
                />

                {/* Ceiling lights */}
                <ellipse
                  cx="200"
                  cy="30"
                  rx="25"
                  ry="8"
                  fill="#fbbf24"
                  opacity="0.7"
                />
                <ellipse
                  cx="400"
                  cy="30"
                  rx="25"
                  ry="8"
                  fill="#fbbf24"
                  opacity="0.7"
                />
                <ellipse
                  cx="600"
                  cy="30"
                  rx="25"
                  ry="8"
                  fill="#fbbf24"
                  opacity="0.7"
                />

                {/* Filing cabinets */}
                <rect
                  x="650"
                  y="250"
                  width="30"
                  height="80"
                  fill="#6b7280"
                  rx="2"
                />
                <rect
                  x="50"
                  y="250"
                  width="25"
                  height="70"
                  fill="#6b7280"
                  rx="2"
                />

                {/* Whiteboards */}
                <rect
                  x="750"
                  y="150"
                  width="40"
                  height="60"
                  fill="#f3f4f6"
                  stroke="#9ca3af"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Interactive hotspots */}
            {hotspots.map((hotspot) => {
              const Icon = hotspot.icon;
              const isViewed = viewedHotspots.includes(hotspot.id);
              const isActive = activeHotspot === hotspot.id;

              return (
                <div key={hotspot.id}>
                  <button
                    className={`absolute w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                      isViewed
                        ? "bg-green-500 border-green-600 animate-pulse"
                        : `bg-${hotspot.color}-400 border-${hotspot.color}-500 hover:scale-110`
                    } ${isActive ? "scale-125 shadow-xl z-20" : "z-10"}`}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onClick={() => handleHotspotClick(hotspot.id)}
                  >
                    {isViewed ? (
                      <CheckCircle className="w-6 h-6 text-white mx-auto" />
                    ) : (
                      <Icon className="w-6 h-6 text-white mx-auto" />
                    )}
                  </button>

                  {isActive && (
                    <div
                      className={`absolute bg-white rounded-xl shadow-2xl p-6 w-80 z-30 border-2 ${getColorClass(hotspot.color)} animate-fadeInUp`}
                      style={{
                        left: `${Math.min(hotspot.x + 8, 60)}%`,
                        top: `${Math.max(hotspot.y - 15, 5)}%`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className={`w-8 h-8 text-${hotspot.color}-600`} />
                        <h4 className="font-bold text-lg text-gray-900">
                          {hotspot.category}
                        </h4>
                      </div>

                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {hotspot.description}
                      </p>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <h5 className="font-semibold text-sm text-gray-800 mb-1">
                          Détails:
                        </h5>
                        <p className="text-xs text-gray-600">
                          {hotspot.details}
                        </p>
                      </div>

                      <div
                        className={`bg-${hotspot.color}-50 p-3 rounded-lg mb-3`}
                      >
                        <h5 className="font-semibold text-sm text-gray-800 mb-1">
                          Exemple concret:
                        </h5>
                        <p className="text-xs text-gray-700">
                          {hotspot.example}
                        </p>
                      </div>

                      <div className="bg-red-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm text-red-800 mb-1">
                          Impact possible:
                        </h5>
                        <p className="text-xs text-red-700">{hotspot.impact}</p>
                      </div>

                      <Button
                        onClick={() => setActiveHotspot(null)}
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                      >
                        Fermer
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {isComplete && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Félicitations ! Exploration terminée
            </h3>
            <p className="text-green-700 mb-4">
              Vous avez exploré les 4 catégories de déclencheurs de stress. Vous
              êtes maintenant prêt à passer aux techniques de gestion.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CompletionStep = () => (
    <div className="max-w-4xl mx-auto text-center">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Séquence 1 terminée avec succès !
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Vous maîtrisez maintenant les 4 catégories de déclencheurs de
            stress. Cette connaissance est la première étape cruciale pour une
            gestion efficace du stress.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Ce que vous avez appris:
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Identifier les déclencheurs environnementaux</li>
                <li>• Reconnaître les facteurs organisationnels</li>
                <li>• Comprendre l'impact relationnel</li>
                <li>• Analyser vos réactions internes</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Prochaines étapes:
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Techniques de respiration</li>
                <li>• Relaxation musculaire</li>
                <li>• Gestion cognitive</li>
                <li>• Communication assertive</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-calm-500 hover:bg-calm-600 text-white">
                <Home className="w-4 h-4 mr-2" />
                Retour au module
              </Button>
            </Link>
            <Link to="/sequence/2">
              <Button className="bg-nature-500 hover:bg-nature-600 text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-serenity-50 via-white to-calm-50 py-8">
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
          <Badge className="bg-calm-100 text-calm-700">Séquence 1/5</Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {currentStep === "intro" && <IntroStep />}
        {currentStep === "exploration" && <ExplorationStep />}
        {currentStep === "completion" && <CompletionStep />}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Sequence1;
