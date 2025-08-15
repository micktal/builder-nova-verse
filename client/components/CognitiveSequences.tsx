import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Lightbulb,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Save,
} from "lucide-react";

// Sequence 3: Cognitive and Organizational Techniques
export const CognitiveSequence = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [matrixTasks, setMatrixTasks] = useState<{ [key: string]: string[] }>({
    "urgent-important": [],
    "urgent-not-important": [],
    "not-urgent-important": [],
    "not-urgent-not-important": [],
  });
  const [reframingExamples, setReframingExamples] = useState<{
    [key: string]: boolean;
  }>({});
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

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
    },
    {
      id: "urgent-not-important",
      title: "Urgent & Pas Important",
      subtitle: "À déléguer",
      color: "orange",
      bgColor: "orange-50",
      borderColor: "orange-200",
    },
    {
      id: "not-urgent-important",
      title: "Pas Urgent & Important",
      subtitle: "À planifier",
      color: "green",
      bgColor: "green-50",
      borderColor: "green-200",
    },
    {
      id: "not-urgent-not-important",
      title: "Pas Urgent & Pas Important",
      subtitle: "À éliminer",
      color: "gray",
      bgColor: "gray-50",
      borderColor: "gray-200",
    },
  ];

  const reframingScenarios = [
    {
      id: "perfectionism",
      before: "Je dois faire un travail parfait, sinon c'est un échec",
      after: "Je vais faire de mon mieux avec le temps disponible",
      isCorrect: true,
    },
    {
      id: "criticism",
      before: "Mon chef m'a fait une remarque, je suis nul",
      after: "Cette remarque peut m'aider à m'améliorer",
      isCorrect: true,
    },
    {
      id: "overload",
      before: "J'ai trop de travail, je n'y arriverai jamais",
      after: "Je vais prioriser et traiter une tâche à la fois",
      isCorrect: true,
    },
  ];

  const handleTaskDrop = (quadrantId: string) => {
    if (draggedTask) {
      setMatrixTasks((prev) => ({
        ...prev,
        [quadrantId]: [...prev[quadrantId], draggedTask],
      }));
      setDraggedTask(null);
    }
  };

  const handleReframingChoice = (scenarioId: string, isPositive: boolean) => {
    setReframingExamples((prev) => ({
      ...prev,
      [scenarioId]: isPositive,
    }));
  };

  const EisenhowerMatrix = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-serenity-500" />
          Matrice d'Eisenhower - Classez les tâches
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
                  className="p-3 bg-blue-100 rounded-lg cursor-move hover:bg-blue-200 transition-colors text-sm"
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

        {Object.values(matrixTasks).flat().length === tasks.length && (
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
  );

  const ReframingExercise = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-calm-500" />
          Reframing cognitif - Transformez vos pensées
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reframingScenarios.map((scenario) => (
            <div key={scenario.id} className="border rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-red-700">
                    Pensée négative :
                  </h5>
                  <div className="p-3 bg-red-50 rounded border border-red-200 text-sm">
                    {scenario.before}
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-green-700">
                    Pensée reformulée :
                  </h5>
                  <div className="p-3 bg-green-50 rounded border border-green-200 text-sm">
                    {scenario.after}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  variant={
                    reframingExamples[scenario.id] === true
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
                    reframingExamples[scenario.id] === false
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
              {reframingExamples[scenario.id] === true && (
                <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-blue-700 text-sm">
                    ✓ Excellent ! Cette reformulation aide à réduire le stress
                    et encourage l'action constructive.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const PrioritizationTips = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Méthode des 3 tâches essentielles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Chaque matin, identifiez 3 tâches qui auront le plus d'impact sur
            vos objectifs :
          </p>
          <div className="grid gap-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-serenity-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {num}
                </div>
                <Input
                  placeholder={`Tâche essentielle ${num}...`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              💡 <strong>Astuce :</strong> Commencez toujours par la tâche la
              plus difficile ou importante quand votre énergie est au maximum.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const isSequenceComplete =
    Object.values(matrixTasks).flat().length === tasks.length &&
    Object.keys(reframingExamples).length === reframingScenarios.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Lightbulb className="w-12 h-12 text-serenity-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Techniques cognitives et organisationnelles
        </h2>
        <p className="text-gray-600">
          Structurez votre pensée et organisez vos priorités efficacement
        </p>
      </div>

      <EisenhowerMatrix />
      <ReframingExercise />
      <PrioritizationTips />

      {isSequenceComplete && (
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-serenity-500 hover:bg-serenity-600 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Passer à la communication assertive
          </Button>
        </div>
      )}
    </div>
  );
};

// Sequence 4: Assertive Communication
export const AssertiveSequence = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userChoices, setUserChoices] = useState<{ [key: number]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      id: 1,
      context:
        "Votre manager vous demande de rester tard pour finir un projet non urgent",
      options: [
        {
          id: "aggressive",
          text: "Non, j'ai déjà assez travaillé aujourd'hui !",
          type: "Agressif",
          feedback:
            "Cette réponse peut créer des tensions. L'assertivité cherche un équilibre.",
        },
        {
          id: "passive",
          text: "D'accord... je vais rester...",
          type: "Passif",
          feedback:
            "Vous acceptez au détriment de votre bien-être. Il faut apprendre à dire non.",
        },
        {
          id: "assertive",
          text: "Je comprends l'importance du projet. Puis-je proposer de commencer tôt demain matin ?",
          type: "Assertif",
          feedback:
            "Parfait ! Vous reconnaissez la demande tout en proposant une alternative.",
        },
      ],
    },
    {
      id: 2,
      context:
        "Un collègue vous interrompt constamment pendant vos explications en réunion",
      options: [
        {
          id: "passive",
          text: "Je continue à parler en espérant qu'il s'arrête",
          type: "Passif",
          feedback:
            "Ignorer le problème ne le résout pas. Il faut exprimer vos besoins.",
        },
        {
          id: "assertive",
          text: "J'aimerais finir mon point avant d'entendre ton retour",
          type: "Assertif",
          feedback:
            "Excellent ! Vous exprimez clairement votre besoin de manière respectueuse.",
        },
        {
          id: "aggressive",
          text: "Tu peux me laisser parler s'il te plaît !",
          type: "Agressif",
          feedback:
            "Le ton est trop directif. L'assertivité reste respectueuse même dans l'affirmation.",
        },
      ],
    },
  ];

  const handleChoice = (optionId: string) => {
    setUserChoices((prev) => ({ ...prev, [currentScenario]: optionId }));
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  const DESC_Model = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-calm-500" />
          Le modèle DESC
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-calm-50 rounded-lg">
            <div className="w-12 h-12 bg-calm-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
              D
            </div>
            <h4 className="font-semibold text-calm-700 mb-2">Décrire</h4>
            <p className="text-sm text-gray-600">
              Les faits objectifs sans jugement
            </p>
          </div>
          <div className="text-center p-4 bg-nature-50 rounded-lg">
            <div className="w-12 h-12 bg-nature-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
              E
            </div>
            <h4 className="font-semibold text-nature-700 mb-2">Exprimer</h4>
            <p className="text-sm text-gray-600">Vos émotions et sentiments</p>
          </div>
          <div className="text-center p-4 bg-serenity-50 rounded-lg">
            <div className="w-12 h-12 bg-serenity-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
              S
            </div>
            <h4 className="font-semibold text-serenity-700 mb-2">Spécifier</h4>
            <p className="text-sm text-gray-600">Ce que vous souhaitez</p>
          </div>
          <div className="text-center p-4 bg-calm-50 rounded-lg">
            <div className="w-12 h-12 bg-calm-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
              C
            </div>
            <h4 className="font-semibold text-calm-700 mb-2">Conséquences</h4>
            <p className="text-sm text-gray-600">Positives du changement</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-800 mb-2">
            Exemple concret :
          </h5>
          <div className="space-y-2 text-sm">
            <p>
              <strong>D :</strong> "Quand tu arrives en retard aux réunions..."
            </p>
            <p>
              <strong>E :</strong> "...je me sens frustré car cela retarde nos
              décisions..."
            </p>
            <p>
              <strong>S :</strong> "...j'aimerais que nous puissions tous
              arriver à l'heure..."
            </p>
            <p>
              <strong>C :</strong> "...pour que nos réunions soient plus
              efficaces et respectueuses du temps de chacun."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ScenarioPlayer = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          Scénario {currentScenario + 1}/{scenarios.length} - Choisissez votre
          réponse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">
              {scenarios[currentScenario].context}
            </p>
          </div>

          <div className="space-y-3">
            {scenarios[currentScenario].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleChoice(option.id)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  userChoices[currentScenario] === option.id
                    ? option.type === "Assertif"
                      ? "border-green-500 bg-green-50"
                      : option.type === "Passif"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <Badge variant="outline" className="text-xs">
                    {option.type}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          {showFeedback && userChoices[currentScenario] && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h6 className="font-semibold text-blue-800 mb-2">Retour :</h6>
              <p className="text-blue-700 text-sm">
                {
                  scenarios[currentScenario].options.find(
                    (opt) => opt.id === userChoices[currentScenario],
                  )?.feedback
                }
              </p>
              {currentScenario < scenarios.length - 1 ? (
                <Button
                  onClick={nextScenario}
                  className="mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Scénario suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onComplete}
                  className="mt-3 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminer la séquence
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-calm-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Communication assertive & gestion relationnelle
        </h2>
        <p className="text-gray-600">
          Apprenez à vous affirmer tout en maintenant de bonnes relations
        </p>
      </div>

      <DESC_Model />
      <ScenarioPlayer />
    </div>
  );
};

// Sequence 5: Personal Action Plan
export const ActionPlanSequence = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [actionPlan, setActionPlan] = useState<{ [key: string]: any }>({
    triggers: "",
    techniques: "",
    moments: "",
    results: "",
  });
  const [routineElements, setRoutineElements] = useState<string[]>([]);

  const routineOptions = [
    "2 min de respiration profonde",
    "Définir 3 priorités du jour",
    "Étirements au bureau",
    "Pause sans écran",
    "Gratitude express",
    "Check émotionnel",
  ];

  const generatePDF = () => {
    // Simulated PDF generation
    const content = `
PLAN D'ACTION PERSONNEL - GESTION DU STRESS

Mes déclencheurs identifiés: ${actionPlan.triggers}
Techniques préférées: ${actionPlan.techniques}  
Moments d'application: ${actionPlan.moments}
Résultats attendus: ${actionPlan.results}

Ma routine anti-stress 5 min/jour:
${routineElements.map((el) => `• ${el}`).join("\n")}

Date: ${new Date().toLocaleDateString("fr-FR")}
    `;

    // Create downloadable file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plan-action-stress.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const QuizFinal = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
      {
        question: "Quelle est la première étape pour gérer le stress ?",
        options: [
          "Respirer profondément",
          "Identifier ses déclencheurs",
          "Faire du sport",
          "Prendre des vacances",
        ],
        correct: 1,
      },
      {
        question:
          "Dans la matrice d'Eisenhower, que faire des tâches urgentes et importantes ?",
        options: [
          "Les déléguer",
          "Les planifier",
          "Les faire immédiatement",
          "Les éliminer",
        ],
        correct: 2,
      },
      {
        question: "Que signifie le 'E' dans le modèle DESC ?",
        options: ["Écouter", "Exprimer", "Éliminer", "Évaluer"],
        correct: 1,
      },
      {
        question:
          "Quelle technique de respiration aide à calmer le système nerveux ?",
        options: [
          "Respiration rapide",
          "Retenir son souffle",
          "Respiration 4-6",
          "Respiration par la bouche",
        ],
        correct: 2,
      },
      {
        question: "Combien de tâches essentielles maximum par jour ?",
        options: ["1", "3", "5", "10"],
        correct: 1,
      },
    ];

    const handleAnswer = (answerIndex: number) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: answerIndex.toString(),
      }));
    };

    const nextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    };

    const score = Object.entries(answers).reduce((total, [qIndex, answer]) => {
      return (
        total +
        (parseInt(answer) === questions[parseInt(qIndex)].correct ? 1 : 0)
      );
    }, 0);

    if (showResults) {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Résultats du quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-gray-600 mb-4">
                {score >= 4
                  ? "Excellent ! Vous maîtrisez les concepts."
                  : score >= 3
                    ? "Bien ! Quelques révisions et ce sera parfait."
                    : "Bon début ! Relisez les modules pour consolider."}
              </p>
              <Badge
                className={
                  score >= 4
                    ? "bg-green-500"
                    : score >= 3
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                }
              >
                {score >= 4 ? "Expert" : score >= 3 ? "Confirmé" : "Débutant"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Quiz final - Question {currentQuestion + 1}/{questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              {questions[currentQuestion].question}
            </h4>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    answers[currentQuestion] === index.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {answers[currentQuestion] !== undefined && (
              <Button onClick={nextQuestion} className="w-full">
                {currentQuestion < questions.length - 1
                  ? "Question suivante"
                  : "Voir les résultats"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-nature-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Plan d'action personnel
        </h2>
        <p className="text-gray-600">
          Créez votre routine anti-stress personnalisée
        </p>
      </div>

      {/* Action Plan Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Votre plan d'action personnalisé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">
                Mes principaux déclencheurs :
              </label>
              <Textarea
                value={actionPlan.triggers}
                onChange={(e) =>
                  setActionPlan((prev) => ({
                    ...prev,
                    triggers: e.target.value,
                  }))
                }
                placeholder="Ex: Réunions imprévues, surcharge de mails..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Techniques préférées :
              </label>
              <Textarea
                value={actionPlan.techniques}
                onChange={(e) =>
                  setActionPlan((prev) => ({
                    ...prev,
                    techniques: e.target.value,
                  }))
                }
                placeholder="Ex: Respiration 4-6, matrice d'Eisenhower..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Moments d'application :
              </label>
              <Input
                value={actionPlan.moments}
                onChange={(e) =>
                  setActionPlan((prev) => ({
                    ...prev,
                    moments: e.target.value,
                  }))
                }
                placeholder="Ex: Début de journée, avant réunions importantes..."
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Résultats attendus :
              </label>
              <Input
                value={actionPlan.results}
                onChange={(e) =>
                  setActionPlan((prev) => ({
                    ...prev,
                    results: e.target.value,
                  }))
                }
                placeholder="Ex: Plus de sérénité, meilleure concentration..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routine Builder */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ma routine anti-stress (5 min/jour)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Sélectionnez 3-4 éléments pour créer votre routine quotidienne :
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {routineOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (routineElements.includes(option)) {
                    setRoutineElements((prev) =>
                      prev.filter((el) => el !== option),
                    );
                  } else if (routineElements.length < 4) {
                    setRoutineElements((prev) => [...prev, option]);
                  }
                }}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  routineElements.includes(option)
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {routineElements.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">
                Votre routine sélectionnée :
              </h5>
              <ul className="space-y-1">
                {routineElements.map((element, index) => (
                  <li key={index} className="text-blue-700 text-sm">
                    • {element}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Button */}
      {(actionPlan.triggers ||
        actionPlan.techniques ||
        routineElements.length > 0) && (
        <div className="text-center mb-6">
          <Button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger mon plan d'action
          </Button>
        </div>
      )}

      <QuizFinal />

      <div className="text-center">
        <Button
          onClick={onComplete}
          className="bg-nature-500 hover:bg-nature-600 text-white"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Terminer le module
        </Button>
      </div>
    </div>
  );
};

export { CognitiveSequence, AssertiveSequence, ActionPlanSequence };
