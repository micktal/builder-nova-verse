import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  ArrowLeft,
  CheckCircle,
  Home,
  ThumbsUp,
  ThumbsDown,
  Target,
  Zap,
  Grid3X3,
  MessageSquare,
} from "lucide-react";

const Sequence3 = () => {
  const [currentStep, setCurrentStep] = useState<
    "intro" | "learning" | "practice" | "completion"
  >("intro");
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [matrixTasks, setMatrixTasks] = useState<{ [key: string]: string[] }>({
    "urgent-important": [],
    "urgent-not-important": [],
    "not-urgent-important": [],
    "not-urgent-not-important": [],
  });
  const [reframingChoices, setReframingChoices] = useState<{
    [key: string]: boolean;
  }>({});
  const [essentialTasks, setEssentialTasks] = useState<string[]>(["", "", ""]);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});

  const tasks = [
    "Répondre aux emails urgents",
    "Planifier la stratégie trimestrielle",
    "Réorganiser le bureau",
    "Formation sur nouveau logiciel",
    "Appel client mécontent",
    "Lecture d'articles métier",
  ];

  const matrixQuadrants = [
    {
      id: "urgent-important",
      title: "Urgent & Important",
      subtitle: "À faire immédiatement",
      color: "red",
      bgColor: "red-50",
      borderColor: "red-200",
      examples: "Crises, urgences médicales, deadlines critiques",
    },
    {
      id: "urgent-not-important",
      title: "Urgent & Pas Important",
      subtitle: "À déléguer",
      color: "orange",
      bgColor: "orange-50",
      borderColor: "orange-200",
      examples: "Interruptions, certains emails, appels non-critiques",
    },
    {
      id: "not-urgent-important",
      title: "Pas Urgent & Important",
      subtitle: "À planifier",
      color: "green",
      bgColor: "green-50",
      borderColor: "green-200",
      examples: "Formation, prévention, planification stratégique",
    },
    {
      id: "not-urgent-not-important",
      title: "Pas Urgent & Pas Important",
      subtitle: "À éliminer",
      color: "gray",
      bgColor: "gray-50",
      borderColor: "gray-200",
      examples: "Réseaux sociaux, certaines réunions, activités futiles",
    },
  ];

  const reframingScenarios = [
    {
      id: "perfectionism",
      before: "Je dois faire un travail parfait, sinon c'est un échec",
      after: "Je vais faire de mon mieux avec le temps disponible",
      explanation:
        "Cette reformulation réduit la pression et permet d'accepter les contraintes réalistes.",
      isPositive: true,
    },
    {
      id: "criticism",
      before: "Mon chef m'a fait une remarque, je suis nul",
      after: "Cette remarque peut m'aider à m'améliorer",
      explanation:
        "Transformer la critique en opportunité d'apprentissage plutôt qu'en attaque personnelle.",
      isPositive: true,
    },
    {
      id: "overload",
      before: "J'ai trop de travail, je n'y arriverai jamais",
      after: "Je vais prioriser et traiter une tâche à la fois",
      explanation:
        "Focus sur l'action constructive plutôt que sur l'émotion paralysante.",
      isPositive: true,
    },
    {
      id: "failure",
      before: "Si j'échoue, tout le monde va me juger",
      after: "L'échec fait partie de l'apprentissage",
      explanation: "Normaliser l'échec comme étape vers la réussite.",
      isPositive: true,
    },
  ];

  const quizQuestions = [
    {
      question:
        "Dans quelle catégorie placeriez-vous 'Préparer une présentation importante pour demain' ?",
      options: [
        "Urgent & Important",
        "Urgent & Pas Important",
        "Pas Urgent & Important",
        "Pas Urgent & Pas Important",
      ],
      correct: 0,
      explanation:
        "Une présentation importante avec deadline proche est à la fois urgente et importante.",
    },
    {
      question: "Quel est l'objectif principal du reframing cognitif ?",
      options: [
        "Ignorer les problèmes",
        "Changer sa perspective sur la situation",
        "Éviter toute situation stressante",
        "Critiquer les autres",
      ],
      correct: 1,
      explanation:
        "Le reframing consiste à modifier sa façon de percevoir et d'interpréter une situation.",
    },
    {
      question:
        "Combien de tâches essentielles maximum devriez-vous définir par jour ?",
      options: ["1", "3", "5", "10"],
      correct: 1,
      explanation:
        "3 tâches essentielles permettent de rester focalisé sans se disperser.",
    },
  ];

  const handleTaskDrop = useCallback((quadrantId: string) => {
    if (draggedTask) {
      setMatrixTasks((prev) => ({
        ...prev,
        [quadrantId]: [...prev[quadrantId], draggedTask],
      }));
      setDraggedTask(null);
    }
  }, [draggedTask]);

  const handleReframingChoice = useCallback((scenarioId: string, isPositive: boolean) => {
    setReframingChoices((prev) => ({
      ...prev,
      [scenarioId]: isPositive,
    }));
  }, []);

  const handleTaskInput = useCallback((index: number, value: string) => {
    setEssentialTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index] = value;
      return newTasks;
    });
  }, []);

  const correctPlacements = useMemo(() => ({
    "urgent-important": [
      "Répondre aux emails urgents",
      "Appel client mécontent",
    ],
    "urgent-not-important": [],
    "not-urgent-important": [
      "Planifier la stratégie trimestrielle",
      "Formation sur nouveau logiciel",
    ],
    "not-urgent-not-important": [
      "Réorganiser le bureau",
      "Lecture d'articles métier",
    ],
  }), []);

  const getTaskFeedback = useCallback((quadrantId: string, task: string) => {
    const correctQuadrant = correctPlacements[quadrantId as keyof typeof correctPlacements];
    const isCorrect = correctQuadrant.includes(task);

    // Check if the task is placed in wrong quadrant
    const correctQuadrantId = Object.entries(correctPlacements).find(([_, tasks]) =>
      tasks.includes(task)
    )?.[0];

    return {
      isCorrect,
      correctQuadrantId,
      shouldBeIn: correctQuadrantId !== quadrantId ?
        matrixQuadrants.find(q => q.id === correctQuadrantId)?.title : null
    };
  }, [correctPlacements]);

  const isMatrixComplete = useMemo(
    () => Object.values(matrixTasks).flat().length === tasks.length,
    [matrixTasks]
  );

  const reframingComplete = useMemo(
    () => Object.keys(reframingChoices).length === reframingScenarios.length,
    [reframingChoices]
  );

  const tasksComplete = useMemo(
    () => essentialTasks.filter((task) => task.trim().length > 0).length === 3,
    [essentialTasks]
  );

  const quizComplete = useMemo(
    () => Object.keys(quizAnswers).length === quizQuestions.length,
    [quizAnswers]
  );

  const isSequenceComplete = useMemo(
    () => isMatrixComplete && reframingComplete && tasksComplete && quizComplete,
    [isMatrixComplete, reframingComplete, tasksComplete, quizComplete]
  );

  useEffect(() => {
    if (isSequenceComplete && currentStep === "practice") {
      const timer = setTimeout(() => setCurrentStep("completion"), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSequenceComplete, currentStep]);

  const IntroStep = () => (
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-serenity-200">
        <Lightbulb className="w-16 h-16 text-serenity-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          S��quence 3: Techniques cognitives
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Apprenez à structurer votre pensée, prioriser efficacement et
          transformer vos schémas mentaux pour une gestion optimale du stress.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-serenity-50 rounded-lg">
            <Grid3X3 className="w-8 h-8 mx-auto mb-2 text-serenity-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              Matrice d'Eisenhower
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Priorisation Urgent/Important
            </p>
          </div>
          <div className="text-center p-4 bg-serenity-50 rounded-lg">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-serenity-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              Reframing cognitif
            </h4>
            <p className="text-xs text-gray-600 mt-1">Changer de perspective</p>
          </div>
          <div className="text-center p-4 bg-serenity-50 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-serenity-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              3 tâches essentielles
            </h4>
            <p className="text-xs text-gray-600 mt-1">Focus quotidien</p>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Objectifs de cette séquence :
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Maîtriser la matrice de priorisation d'Eisenhower</li>
            <li>• Pratiquer le reframing pour changer de perspective</li>
            <li>• Apprendre la méthode des 3 tâches essentielles</li>
            <li>• Évaluer vos connaissances par un quiz interactif</li>
          </ul>
        </div>
        <Button
          onClick={() => setCurrentStep("learning")}
          className="bg-serenity-500 hover:bg-serenity-600 text-white text-lg px-8 py-3"
        >
          Découvrir les concepts
        </Button>
      </div>
    </div>
  );

  const LearningStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Les 3 piliers des techniques cognitives
        </h2>
      </div>

      {/* Matrice d'Eisenhower */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="w-6 h-6 text-serenity-500" />
            La Matrice d'Eisenhower
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Cet outil de priorisation divise les tâches selon deux critères :
            urgence et importance. Il permet de mieux gérer son temps et réduire
            le stress lié à la surcharge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {matrixQuadrants.map((quadrant) => (
              <div
                key={quadrant.id}
                className={`p-6 rounded-lg border-2 bg-${quadrant.bgColor} border-${quadrant.borderColor}`}
              >
                <h4 className={`font-bold text-${quadrant.color}-700 mb-2`}>
                  {quadrant.title}
                </h4>
                <p
                  className={`text-${quadrant.color}-600 text-sm mb-3 font-medium`}
                >
                  {quadrant.subtitle}
                </p>
                <p className="text-gray-600 text-xs">
                  <strong>Exemples :</strong> {quadrant.examples}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reframing Cognitif */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-serenity-500" />
            Le Reframing Cognitif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Technique qui consiste à modifier sa façon de percevoir une
            situation stressante pour réduire son impact émotionnel et favoriser
            des réactions plus constructives.
          </p>
          <div className="bg-serenity-50 p-6 rounded-lg mb-4">
            <h5 className="font-semibold text-serenity-800 mb-3">
              Processus de reframing :
            </h5>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  1
                </div>
                <p className="text-sm font-medium">
                  Identifier la pensée négative
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  2
                </div>
                <p className="text-sm font-medium">Questionner sa validité</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  3
                </div>
                <p className="text-sm font-medium">Chercher des alternatives</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  4
                </div>
                <p className="text-sm font-medium">
                  Adopter la nouvelle perspective
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Méthode des 3 tâches */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-serenity-500" />
            La Méthode des 3 Tâches Essentielles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Chaque matin, identifiez 3 tâches qui auront le plus d'impact sur
            vos objectifs. Cette limitation force la priorisation et évite la
            dispersion.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h5 className="font-semibold text-green-800 mb-1">
                Impact maximum
              </h5>
              <p className="text-green-700 text-sm">
                Choisissez les tâches les plus importantes
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800 mb-1">
                Énergie optimale
              </h5>
              <p className="text-blue-700 text-sm">
                Commencez quand vous êtes au top
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h5 className="font-semibold text-purple-800 mb-1">
                Satisfaction garantie
              </h5>
              <p className="text-purple-700 text-sm">
                Sentiment d'accomplissement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={() => setCurrentStep("practice")}
          className="bg-serenity-500 hover:bg-serenity-600 text-white"
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
          <h2 className="text-2xl font-bold text-gray-900">
            Pratique interactive
          </h2>
          <Badge
            variant={isSequenceComplete ? "default" : "outline"}
            className="text-lg px-4 py-2"
          >
            {
              [
                isMatrixComplete,
                reframingComplete,
                tasksComplete,
                quizComplete,
              ].filter(Boolean).length
            }
            /4 exercices
          </Badge>
        </div>
        <Progress
          value={
            ([
              isMatrixComplete,
              reframingComplete,
              tasksComplete,
              quizComplete,
            ].filter(Boolean).length /
              4) *
            100
          }
          className="h-3 mb-4"
        />
      </div>

      {/* Matrice Interactive */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5" />
            Exercice 1: Classez les tâches dans la matrice
            {isMatrixComplete && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold mb-3">Tâches à classer :</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {tasks
                .filter(
                  (task) => !Object.values(matrixTasks).flat().includes(task),
                )
                .map((task) => (
                  <div
                    key={task}
                    draggable
                    onDragStart={() => setDraggedTask(task)}
                    className="p-3 bg-blue-100 rounded-lg cursor-move hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    {task}
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matrixQuadrants.map((quadrant) => (
              <div
                key={quadrant.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleTaskDrop(quadrant.id)}
                className={`p-4 border-2 border-dashed rounded-lg min-h-[120px] bg-${quadrant.bgColor} border-${quadrant.borderColor} transition-colors`}
              >
                <h5 className={`font-semibold text-${quadrant.color}-700 mb-1`}>
                  {quadrant.title}
                </h5>
                <p className={`text-xs text-${quadrant.color}-600 mb-3`}>
                  {quadrant.subtitle}
                </p>
                <div className="space-y-2">
                  {matrixTasks[quadrant.id].map((task, index) => (
                    <div
                      key={index}
                      className={`p-2 bg-white rounded text-sm shadow-sm border border-${quadrant.color}-200`}
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isMatrixComplete && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Excellent !</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Vous avez classé toutes les tâches. Cette méthode vous aide à
                prioriser efficacement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reframing Exercise */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Exercice 2: Évaluez ces exemples de reframing
            {reframingComplete && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reframingScenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-red-700">
                      Pensée négative :
                    </h5>
                    <div className="p-3 bg-red-50 rounded border border-red-200 text-sm">
                      "{scenario.before}"
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-green-700">
                      Pensée reformulée :
                    </h5>
                    <div className="p-3 bg-green-50 rounded border border-green-200 text-sm">
                      "{scenario.after}"
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mb-3">
                  <Button
                    variant={
                      reframingChoices[scenario.id] === true
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleReframingChoice(scenario.id, true)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Bonne reformulation
                  </Button>
                  <Button
                    variant={
                      reframingChoices[scenario.id] === false
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleReframingChoice(scenario.id, false)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" />À améliorer
                  </Button>
                </div>
                {reframingChoices[scenario.id] === true && (
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-700 text-sm">
                      ✓ <strong>Parfait !</strong> {scenario.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3 Essential Tasks */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Exercice 3: Définissez vos 3 tâches essentielles d'aujourd'hui
            {tasksComplete && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Identifiez 3 tâches qui, une fois accomplies, vous donneront le
            sentiment d'avoir eu une journée productive :
          </p>
          <div className="space-y-4" style={{ scrollMarginTop: '0px', scrollBehavior: 'auto' }}>
            {[1, 2, 3].map((num, index) => (
              <div key={num} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {num}
                </div>
                <Input
                  placeholder={`Tâche essentielle ${num}...`}
                  value={essentialTasks[index]}
                  onChange={(e) => handleTaskInput(index, e.target.value)}
                  onFocus={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
          {tasksComplete && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Excellent focus !</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                Vous avez défini vos priorités. Commencez par la tâche la plus
                difficile.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Exercice 4: Quiz de validation
            {quizComplete && <CheckCircle className="w-5 h-5 text-green-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {quizQuestions.map((question, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Question {qIndex + 1}: {question.question}
                </h5>
                <div className="space-y-2 mb-3">
                  {question.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() =>
                        setQuizAnswers((prev) => ({
                          ...prev,
                          [qIndex]: oIndex,
                        }))
                      }
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        quizAnswers[qIndex] === oIndex
                          ? oIndex === question.correct
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {quizAnswers[qIndex] !== undefined && (
                  <div
                    className={`p-3 rounded border ${
                      quizAnswers[qIndex] === question.correct
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    <p className="text-sm">
                      {quizAnswers[qIndex] === question.correct
                        ? "✓ Correct !"
                        : "✗ Incorrect."}{" "}
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isSequenceComplete && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Tous les exercices terminés !
            </h3>
            <p className="text-green-700 mb-4">
              Vous maîtrisez maintenant les techniques cognitives essentielles.
              Prêt pour la communication assertive ?
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CompletionStep = () => (
    <div className="max-w-4xl mx-auto text-center">
      <Card className="bg-gradient-to-br from-green-50 to-serenity-50 border-green-200">
        <CardContent className="p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Séquence 3 terminée avec succès !
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Vous maîtrisez maintenant les techniques cognitives fondamentales
            pour gérer le stress. Ces outils vous permettront de structurer
            votre pensée et prioriser efficacement.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Compétences acquises :
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Matrice d'Eisenhower pour la priorisation</li>
                <li>• Reframing cognitif pour changer de perspective</li>
                <li>• Méthode des 3 tâches essentielles</li>
                <li>• Évaluation et application des concepts</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Prochaines étapes :
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Communication assertive</li>
                <li>• Modèle DESC</li>
                <li>• Gestion des relations difficiles</li>
                <li>• Scénarios de communication</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-serenity-500 hover:bg-serenity-600 text-white">
                <Home className="w-4 h-4 mr-2" />
                Retour au module
              </Button>
            </Link>
            <Link to="/sequence/4">
              <Button className="bg-calm-500 hover:bg-calm-600 text-white">
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
          <Badge className="bg-serenity-100 text-serenity-700">
            Séquence 3/5
          </Badge>
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

export default Sequence3;
