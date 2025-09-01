import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Target,
  AlertTriangle,
  Shield,
  Brain,
  Heart,
  Users,
  Zap,
  Download,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Sequence6 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [personalPlan, setPersonalPlan] = useState({
    triggers: "",
    strategies: [],
    emergencyPlan: "",
    supportNetwork: "",
  });
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const steps = [
    { title: "Introduction", icon: Target },
    { title: "Analyse des situations", icon: AlertTriangle },
    { title: "Stratégies d'adaptation", icon: Shield },
    { title: "Simulation interactive", icon: Brain },
    { title: "Plan personnalisé", icon: Zap },
    { title: "Validation", icon: CheckCircle },
  ];

  const scenarios = [
    {
      id: "presentation",
      title: "Présentation importante",
      description: "Vous devez présenter devant un comité de direction",
      stress: "high",
      strategies: ["Respiration", "Visualisation", "Préparation mentale"],
    },
    {
      id: "conflict",
      title: "Conflit avec un collègue",
      description: "Tension relationnelle dans l'équipe",
      stress: "medium",
      strategies: ["Communication assertive", "Médiation", "Recul émotionnel"],
    },
    {
      id: "deadline",
      title: "Échéance critique",
      description: "Projet urgent avec contraintes multiples",
      stress: "high",
      strategies: ["Priorisation", "Délégation", "Gestion du temps"],
    },
    {
      id: "change",
      title: "Changement organisationnel",
      description: "Restructuration ou nouveau processus",
      stress: "medium",
      strategies: ["Adaptation", "Formation", "Support groupe"],
    },
  ];

  const topStrategies = [
    {
      category: "Physiologique",
      techniques: [
        "Respiration contrôlée 4-6",
        "Relaxation musculaire progressive",
        "Cohérence cardiaque",
        "Ancrage sensoriel",
      ],
      icon: Heart,
      color: "nature",
    },
    {
      category: "Cognitif",
      techniques: [
        "Reframing de situation",
        "Visualisation positive",
        "Auto-dialogue constructif",
        "Focalisation solution",
      ],
      icon: Brain,
      color: "calm",
    },
    {
      category: "Comportemental",
      techniques: [
        "Communication assertive",
        "Gestion du temps",
        "Recherche de soutien",
        "Action graduée",
      ],
      icon: Users,
      color: "serenity",
    },
  ];

  const simulationScenarios = [
    {
      situation: "Vous êtes convoqué pour une réunion urgente",
      emotion: "Anxiété anticipatoire",
      response: "",
      topTechnique: "Respiration contrôlée + reframing",
    },
    {
      situation: "Votre collègue critique votre travail publiquement",
      emotion: "Colère et frustration",
      response: "",
      topTechnique: "Pause + communication assertive",
    },
    {
      situation: "Vous découvrez une erreur majeure dans votre projet",
      emotion: "Stress et panique",
      response: "",
      topTechnique: "Analyse solution + plan d'action",
    },
  ];

  const completeStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const startSimulation = () => {
    setIsSimulationActive(true);
    setSimulationStep(0);
  };

  const nextSimulationStep = () => {
    if (simulationStep < simulationScenarios.length - 1) {
      setSimulationStep(simulationStep + 1);
    } else {
      setIsSimulationActive(false);
      completeStep(3);
    }
  };

  const generatePDF = () => {
    // Simulation de génération PDF
    alert("Plan d'adaptation personnalisé généré ! (Fonctionnalité simulée)");
  };

  const renderIntroduction = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-serenity-50 to-calm-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Zap className="w-6 h-6 text-serenity-500" />
          Préparation aux situations difficiles
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Développez votre résilience et vos stratégies d'adaptation pour faire face aux situations complexes 
          en utilisant les Techniques d'Optimisation du Potentiel (TOP).
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-serenity-200">
            <Shield className="w-8 h-8 text-serenity-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Anticipation</h4>
            <p className="text-sm text-gray-600">Identifier et préparer les défis</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-calm-200">
            <Brain className="w-8 h-8 text-calm-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Adaptation</h4>
            <p className="text-sm text-gray-600">Flexibilité cognitive et émotionnelle</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-nature-200">
            <Target className="w-8 h-8 text-nature-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Action</h4>
            <p className="text-sm text-gray-600">Mise en œuvre des stratégies</p>
          </div>
        </div>
      </div>
      
      <Button
        onClick={() => {
          setCurrentStep(1);
          completeStep(0);
        }}
        className="w-full bg-serenity-500 hover:bg-serenity-600 text-white py-3 text-lg"
      >
        Commencer l'analyse
        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
      </Button>
    </div>
  );

  const renderScenarioAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-orange-500" />
        Analyse des situations difficiles
      </h2>
      
      <p className="text-gray-700 mb-6">
        Sélectionnez les situations qui vous concernent le plus pour personnaliser votre préparation :
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedScenarios.includes(scenario.id)
                ? "border-serenity-300 bg-serenity-25 shadow-lg"
                : "border-gray-200 hover:border-serenity-200"
            }`}
            onClick={() => {
              if (selectedScenarios.includes(scenario.id)) {
                setSelectedScenarios(selectedScenarios.filter(id => id !== scenario.id));
              } else {
                setSelectedScenarios([...selectedScenarios, scenario.id]);
              }
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{scenario.title}</CardTitle>
                <Badge 
                  variant="outline"
                  className={`${
                    scenario.stress === "high" 
                      ? "border-red-300 text-red-600" 
                      : "border-orange-300 text-orange-600"
                  }`}
                >
                  {scenario.stress === "high" ? "Stress élevé" : "Stress modéré"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Stratégies TOP recommandées :</p>
                <div className="flex flex-wrap gap-1">
                  {scenario.strategies.map((strategy, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {strategy}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => {
          setCurrentStep(2);
          completeStep(1);
        }}
        disabled={selectedScenarios.length === 0}
        className="w-full bg-serenity-500 hover:bg-serenity-600 text-white py-3"
      >
        Continuer vers les stratégies ({selectedScenarios.length} situation(s) sélectionnée(s))
      </Button>
    </div>
  );

  const renderStrategies = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Shield className="w-6 h-6 text-green-500" />
        Techniques d'Optimisation du Potentiel (TOP)
      </h2>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          🎯 Principe des TOP en situation difficile
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Les TOP vous permettent d'optimiser vos ressources internes pour maintenir votre performance 
          et votre bien-être même dans l'adversité. L'approche intègre corps, mental et comportement.
        </p>
      </div>

      <div className="space-y-4">
        {topStrategies.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className={`border-${category.color}-200`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Icon className={`w-6 h-6 text-${category.color}-500`} />
                  Techniques {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-2">
                  {category.techniques.map((technique, techIndex) => (
                    <div
                      key={techIndex}
                      className={`p-3 rounded-lg border border-${category.color}-100 bg-${category.color}-25 hover:bg-${category.color}-50 transition-colors cursor-pointer group`}
                      onClick={() => {
                        setPersonalPlan(prev => ({
                          ...prev,
                          strategies: prev.strategies.includes(technique)
                            ? prev.strategies.filter(s => s !== technique)
                            : [...prev.strategies, technique]
                        }));
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{technique}</span>
                        {personalPlan.strategies.includes(technique) && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Conseil :</strong> Sélectionnez 2-3 techniques par cat��gorie pour créer votre boîte à outils personnelle.
          Techniques sélectionnées : {personalPlan.strategies.length}
        </p>
      </div>

      <Button
        onClick={() => {
          setCurrentStep(3);
          completeStep(2);
        }}
        disabled={personalPlan.strategies.length < 3}
        className="w-full bg-serenity-500 hover:bg-serenity-600 text-white py-3"
      >
        Passer à la simulation interactive
      </Button>
    </div>
  );

  const renderSimulation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Brain className="w-6 h-6 text-purple-500" />
        Simulation interactive - Gestion émotionnelle
      </h2>

      {!isSimulationActive ? (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🎭 Entraînement en situation virtuelle
          </h3>
          <p className="text-gray-700 mb-4">
            Pratiquez vos techniques TOP dans des scénarios réalistes. 
            Vous allez vivre 3 situations et appliquer vos stratégies d'adaptation.
          </p>
          <Button
            onClick={startSimulation}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
          >
            <Play className="w-5 h-5 mr-2" />
            Démarrer la simulation
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border-2 border-purple-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Scénario {simulationStep + 1}/3
              </h3>
              <Progress value={((simulationStep + 1) / 3) * 100} className="w-32" />
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Situation :</h4>
                <p className="text-gray-700">{simulationScenarios[simulationStep].situation}</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">😤 Émotion ressentie :</h4>
                <p className="text-gray-700">{simulationScenarios[simulationStep].emotion}</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🛠️ Technique TOP recommandée :</h4>
                <p className="text-gray-700 font-medium">{simulationScenarios[simulationStep].topTechnique}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Votre réaction (décrivez comment vous appliquez la technique) :
                </label>
                <Textarea
                  placeholder="Ex: Je prends 3 respirations profondes, puis je reformule la situation..."
                  className="min-h-20"
                  value={simulationScenarios[simulationStep].response}
                  onChange={(e) => {
                    const updated = [...simulationScenarios];
                    updated[simulationStep].response = e.target.value;
                  }}
                />
              </div>
            </div>
            
            <Button
              onClick={nextSimulationStep}
              className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white"
            >
              {simulationStep < simulationScenarios.length - 1 ? "Scénario suivant" : "Terminer la simulation"}
            </Button>
          </div>
        </div>
      )}

      {completedSteps.includes(3) && (
        <Button
          onClick={() => {
            setCurrentStep(4);
            completeStep(3);
          }}
          className="w-full bg-serenity-500 hover:bg-serenity-600 text-white py-3"
        >
          Créer mon plan personnalisé
        </Button>
      )}
    </div>
  );

  const renderPersonalPlan = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Zap className="w-6 h-6 text-yellow-500" />
        Plan d'adaptation personnalisé
      </h2>

      <div className="space-y-4">
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg">🎯 Mes déclencheurs prioritaires</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Listez vos 3 principales situations déclenchantes de stress..."
              value={personalPlan.triggers}
              onChange={(e) => setPersonalPlan(prev => ({...prev, triggers: e.target.value}))}
              className="min-h-20"
            />
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">🛠️ Ma boîte à outils TOP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Techniques sélectionnées :</p>
              <div className="flex flex-wrap gap-2">
                {personalPlan.strategies.map((strategy, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                    {strategy}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg">🚨 Plan d'urgence</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Que faire en cas de stress intense ? (technique d'urgence, personne à contacter...)"
              value={personalPlan.emergencyPlan}
              onChange={(e) => setPersonalPlan(prev => ({...prev, emergencyPlan: e.target.value}))}
              className="min-h-20"
            />
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">🤝 Réseau de soutien</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Personnes ressources (collègue, mentor, manager...)"
              value={personalPlan.supportNetwork}
              onChange={(e) => setPersonalPlan(prev => ({...prev, supportNetwork: e.target.value}))}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={generatePDF}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger le plan PDF
        </Button>
        <Button
          onClick={() => {
            setCurrentStep(5);
            completeStep(4);
          }}
          className="flex-1 bg-serenity-500 hover:bg-serenity-600 text-white"
        >
          Validation finale
        </Button>
      </div>
    </div>
  );

  const renderValidation = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Félicitations ! 🎉</h2>
        <p className="text-xl text-gray-700">
          Vous maîtrisez maintenant les outils pour gérer les situations difficiles
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Récapitulatif de vos acquis :</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Compréhension des mécanismes de stress</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Maîtrise des techniques TOP</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Stratégies d'adaptation personnalisées</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Entraînement en simulation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Plan d'action personnalisé</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Réseau de soutien identifié</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">🎯 Prochaines étapes :</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Pratiquez vos techniques TOP quotidiennement</li>
          <li>• Testez votre plan dans des situations réelles</li>
          <li>• Ajustez vos stratégies selon vos expériences</li>
          <li>• Maintenez votre réseau de soutien actif</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Link to="/" className="flex-1">
          <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
            Retour au module
          </Button>
        </Link>
        <Button
          onClick={() => setCurrentStep(0)}
          className="flex-1 bg-serenity-500 hover:bg-serenity-600 text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Recommencer
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderIntroduction();
      case 1: return renderScenarioAnalysis();
      case 2: return renderStrategies();
      case 3: return renderSimulation();
      case 4: return renderPersonalPlan();
      case 5: return renderValidation();
      default: return renderIntroduction();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-serenity-50 via-white to-calm-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au module
            </Link>
            <div className="text-center">
              <Badge className="bg-serenity-100 text-serenity-700">
                Séquence 6 - 6 min
              </Badge>
              <h1 className="text-xl font-bold text-gray-900 mt-1">
                Préparation aux situations difficiles
              </h1>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">
                {completedSteps.length}/{steps.length} étapes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 mb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index;
            
            return (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                        ? "bg-serenity-500 border-serenity-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {steps.map((step, index) => (
            <span key={index} className="text-center flex-1">
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default Sequence6;
