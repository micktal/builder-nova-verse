import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  ArrowLeft,
  CheckCircle,
  Home,
  MessageSquare,
  Play,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
} from "lucide-react";

const Sequence4 = () => {
  const [currentStep, setCurrentStep] = useState<
    "intro" | "learning" | "practice" | "completion"
  >("intro");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioChoices, setScenarioChoices] = useState<{
    [key: number]: string;
  }>({});
  const [communicationStyleQuiz, setCommunicationStyleQuiz] = useState<{
    [key: number]: string;
  }>({});
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const descModel = [
    {
      letter: "D",
      title: "Décrire",
      description: "Les faits objectifs sans jugement ni interprétation",
      example: '"Quand tu arrives en retard aux réunions..."',
      color: "red",
    },
    {
      letter: "E",
      title: "Exprimer",
      description: "Vos émotions et sentiments personnels",
      example: '"...je me sens frustré car cela retarde nos décisions..."',
      color: "orange",
    },
    {
      letter: "S",
      title: "Spécifier",
      description: "Ce que vous souhaitez concrètement",
      example: "\"...j'aimerais que nous puissions tous arriver à l'heure...\"",
      color: "green",
    },
    {
      letter: "C",
      title: "Conséquences",
      description: "Les bénéfices positifs du changement",
      example:
        '"...pour que nos réunions soient plus efficaces et respectueuses."',
      color: "blue",
    },
  ];

  const communicationStyles = [
    {
      style: "Passif",
      characteristics:
        "Évite les conflits, n'exprime pas ses besoins, dit toujours oui",
      consequence:
        "Frustration interne, stress accumulé, perte d'estime de soi",
      example: '"Bon... d\'accord... je vais le faire..."',
      color: "gray",
    },
    {
      style: "Agressif",
      characteristics:
        "Impose ses idées, ne respecte pas les autres, ton directif",
      consequence: "Relations détériorées, conflits, isolement",
      example: '"Tu vas faire ce que je dis, point final !"',
      color: "red",
    },
    {
      style: "Assertif",
      characteristics: "Exprime ses besoins tout en respectant les autres",
      consequence: "Relations saines, respect mutuel, efficacité",
      example: '"J\'ai besoin de... et je propose que nous..."',
      color: "green",
    },
  ];

  const scenarios = [
    {
      id: 1,
      title: "Refuser une demande de votre manager",
      context:
        "Votre manager vous demande de rester tard pour finir un projet non urgent, mais vous avez des engagements personnels importants.",
      choices: [
        {
          id: "passive",
          text: "D'accord... je vais rester... (en soupirant)",
          style: "Passif",
          feedback:
            "Vous acceptez au détriment de votre équilibre. Cela peut créer de la frustration et du ressentiment.",
          consequences: "Stress, surcharge, déséquilibre vie privée/pro",
        },
        {
          id: "aggressive",
          text: "Non ! J'ai déjà assez travaillé aujourd'hui !",
          style: "Agressif",
          feedback:
            "Votre refus est trop brutal et peut créer des tensions avec votre hiérarchie.",
          consequences: "Relations tendues, image professionnelle dégradée",
        },
        {
          id: "assertive",
          text: "Je comprends l'importance du projet. Puis-je proposer de commencer tôt demain matin ?",
          style: "Assertif",
          feedback:
            "Parfait ! Vous reconnaissez la demande tout en proposant une alternative constructive.",
          consequences: "Respect mutuel, solution gagnant-gagnant",
        },
      ],
    },
    {
      id: 2,
      title: "Gérer les interruptions constantes",
      context:
        "Un collègue vous interrompt régulièrement pendant vos tâches importantes, ce qui nuit à votre concentration.",
      choices: [
        {
          id: "passive",
          text: "Je continue à l'écouter en espérant qu'il comprenne...",
          style: "Passif",
          feedback:
            "Ignorer le problème ne le résout pas. Votre productivité et votre stress en pâtissent.",
          consequences: "Productivité réduite, frustration croissante",
        },
        {
          id: "assertive",
          text: "J'apprécie nos échanges. Puis-je te proposer qu'on se voie à 16h pour discuter ?",
          style: "Assertif",
          feedback:
            "Excellent ! Vous valorisez la relation tout en protégeant votre temps de travail.",
          consequences: "Respect du temps, relations préservées",
        },
        {
          id: "aggressive",
          text: "Tu ne vois pas que je suis occupé ? Arrête de me déranger !",
          style: "Agressif",
          feedback:
            "Votre frustration est compréhensible mais cette réaction peut blesser et détériorer la relation.",
          consequences: "Relations dégradées, ambiance tendue",
        },
      ],
    },
    {
      id: 3,
      title: "Demander une augmentation",
      context:
        "Vous souhaitez négocier une augmentation avec votre manager après une année de bons résultats.",
      choices: [
        {
          id: "passive",
          text: "Euh... je me demandais si... peut-être... une petite augmentation...",
          style: "Passif",
          feedback:
            "Votre manque de confiance ne valorise pas vos compétences. Soyez plus affirmatif.",
          consequences: "Demande peu convaincante, résultat incertain",
        },
        {
          id: "aggressive",
          text: "Je mérite une augmentation ! Regardez tout ce que j'ai fait !",
          style: "Agressif",
          feedback:
            "Le ton est trop exigeant. Une approche plus collaborative sera mieux reçue.",
          consequences: "Réaction défensive du manager",
        },
        {
          id: "assertive",
          text: "J'aimerais discuter de mon évolution salariale en me basant sur mes résultats de cette année.",
          style: "Assertif",
          feedback:
            "Parfait ! Vous êtes direct, factuel et vous ouvrez le dialogue de manière professionnelle.",
          consequences: "Discussion constructive, respect professionnel",
        },
      ],
    },
  ];

  const quizQuestions = [
    {
      question:
        "Dans quelle situation la communication assertive est-elle la plus appropriée ?",
      options: [
        "Quand on veut éviter tout conflit",
        "Quand on veut imposer son point de vue",
        "Quand on veut exprimer ses besoins tout en respectant les autres",
        "Quand on est en colère",
      ],
      correct: 2,
    },
    {
      question: 'Que signifie le "S" dans le modèle DESC ?',
      options: ["Soutenir", "Spécifier", "Simplifier", "Solliciter"],
      correct: 1,
    },
    {
      question:
        "Quelle est la principale différence entre assertif et agressif ?",
      options: [
        "L'assertif respecte les autres, l'agressif non",
        "L'assertif est plus fort que l'agressif",
        "Il n'y a pas de différence",
        "L'agressif est plus efficace",
      ],
      correct: 0,
    },
  ];

  const handleScenarioChoice = (choiceId: string) => {
    setScenarioChoices((prev) => ({ ...prev, [currentScenario]: choiceId }));
    if (!completedExercises.includes("scenarios")) {
      setCompletedExercises((prev) => [...prev, "scenarios"]);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario((prev) => prev - 1);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setCommunicationStyleQuiz((prev) => ({ ...prev, [questionIndex]: answer }));
    if (
      Object.keys(communicationStyleQuiz).length + 1 === quizQuestions.length &&
      !completedExercises.includes("quiz")
    ) {
      setCompletedExercises((prev) => [...prev, "quiz"]);
    }
  };

  const isSequenceComplete =
    completedExercises.includes("scenarios") &&
    completedExercises.includes("quiz");

  useEffect(() => {
    if (isSequenceComplete && currentStep === "practice") {
      setTimeout(() => setCurrentStep("completion"), 1000);
    }
  }, [isSequenceComplete, currentStep]);

  const IntroStep = () => (
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-calm-200">
        <Users className="w-16 h-16 text-calm-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Séquence 4: Communication assertive
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Apprenez à vous affirmer positivement, exprimer vos besoins et gérer
          les relations difficiles avec le modèle DESC et des techniques
          d'assertivité.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-calm-50 rounded-lg">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-calm-600" />
            <h4 className="font-semibold text-sm text-gray-900">Modèle DESC</h4>
            <p className="text-xs text-gray-600 mt-1">
              Structure de communication
            </p>
          </div>
          <div className="text-center p-4 bg-calm-50 rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-2 text-calm-600" />
            <h4 className="font-semibold text-sm text-gray-900">3 Styles</h4>
            <p className="text-xs text-gray-600 mt-1">
              Passif, Agressif, Assertif
            </p>
          </div>
          <div className="text-center p-4 bg-calm-50 rounded-lg">
            <Play className="w-8 h-8 mx-auto mb-2 text-calm-600" />
            <h4 className="font-semibold text-sm text-gray-900">Scénarios</h4>
            <p className="text-xs text-gray-600 mt-1">Situations réelles</p>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Dans cette séquence :
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Découvrir le modèle DESC pour structurer vos messages</li>
            <li>• Distinguer les 3 styles de communication</li>
            <li>• Pratiquer avec des scénarios interactifs</li>
            <li>• Développer votre assertivité en situation</li>
          </ul>
        </div>
        <Button
          onClick={() => setCurrentStep("learning")}
          className="bg-calm-500 hover:bg-calm-600 text-white text-lg px-8 py-3"
        >
          Découvrir l'assertivité
        </Button>
      </div>
    </div>
  );

  const LearningStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Les fondamentaux de la communication assertive
        </h2>
      </div>

      {/* Modèle DESC */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-calm-500" />
            Le Modèle DESC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Structure simple et efficace pour exprimer vos besoins de manière
            claire et respectueuse, particulièrement utile dans les situations
            délicates.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {descModel.map((step, index) => (
              <div
                key={step.letter}
                className={`text-center p-6 bg-${step.color}-50 rounded-lg border border-${step.color}-200`}
              >
                <div
                  className={`w-16 h-16 bg-${step.color}-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4`}
                >
                  {step.letter}
                </div>
                <h4 className={`font-bold text-${step.color}-700 mb-2`}>
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                <div
                  className={`bg-${step.color}-100 p-3 rounded text-xs italic text-${step.color}-800`}
                >
                  {step.example}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800 mb-3">
              Exemple complet :
            </h5>
            <div className="text-green-700 text-sm space-y-2">
              <p>
                <strong>D :</strong> "Quand tu arrives en retard aux
                réunions..."
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

      {/* Styles de communication */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-calm-500" />
            Les 3 Styles de Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {communicationStyles.map((style, index) => (
              <div
                key={style.style}
                className={`p-6 rounded-lg border-2 border-${style.color}-200 bg-${style.color}-50`}
              >
                <h4
                  className={`font-bold text-${style.color}-700 text-lg mb-3`}
                >
                  {style.style}
                </h4>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">
                    Caractéristiques :
                  </h5>
                  <p className="text-gray-600 text-sm">
                    {style.characteristics}
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">
                    Exemple :
                  </h5>
                  <div
                    className={`bg-white p-3 rounded border border-${style.color}-300 text-${style.color}-800 text-sm italic`}
                  >
                    {style.example}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-sm mb-2">
                    Conséquences :
                  </h5>
                  <p className="text-gray-600 text-sm">{style.consequence}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h5 className="font-semibold text-yellow-800 mb-2">
              💡 Point clé :
            </h5>
            <p className="text-yellow-700 text-sm">
              L'assertivité n'est ni de la passivité ni de l'agressivité. C'est
              l'art de s'affirmer tout en respectant les autres, créant ainsi
              des relations saines et efficaces.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={() => setCurrentStep("practice")}
          className="bg-calm-500 hover:bg-calm-600 text-white"
        >
          Pratiquer avec des scénarios
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
            Pratique avec scénarios interactifs
          </h2>
          <Badge
            variant={isSequenceComplete ? "default" : "outline"}
            className="text-lg px-4 py-2"
          >
            {completedExercises.length}/2 exercices
          </Badge>
        </div>
        <Progress
          value={(completedExercises.length / 2) * 100}
          className="h-3 mb-4"
        />
      </div>

      {/* Scénarios */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Sc��nario {currentScenario + 1}/{scenarios.length}:{" "}
            {scenarios[currentScenario].title}
            {completedExercises.includes("scenarios") && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Situation :</h4>
              <p className="text-blue-800">
                {scenarios[currentScenario].context}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Comment réagissez-vous ?
              </h4>
              {scenarios[currentScenario].choices.map((choice) => (
                <div key={choice.id} className="space-y-3">
                  <button
                    onClick={() => handleScenarioChoice(choice.id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      scenarioChoices[currentScenario] === choice.id
                        ? choice.style === "Assertif"
                          ? "border-green-500 bg-green-50"
                          : choice.style === "Passif"
                            ? "border-gray-500 bg-gray-50"
                            : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{choice.text}</span>
                      <Badge
                        variant="outline"
                        className={
                          choice.style === "Assertif"
                            ? "border-green-500 text-green-700"
                            : choice.style === "Passif"
                              ? "border-gray-500 text-gray-700"
                              : "border-red-500 text-red-700"
                        }
                      >
                        {choice.style}
                      </Badge>
                    </div>
                  </button>

                  {scenarioChoices[currentScenario] === choice.id && (
                    <div
                      className={`p-4 rounded-lg border ${
                        choice.style === "Assertif"
                          ? "bg-green-50 border-green-200"
                          : choice.style === "Passif"
                            ? "bg-gray-50 border-gray-200"
                            : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="space-y-3">
                        <div>
                          <h6
                            className={`font-semibold text-sm ${
                              choice.style === "Assertif"
                                ? "text-green-800"
                                : choice.style === "Passif"
                                  ? "text-gray-800"
                                  : "text-red-800"
                            }`}
                          >
                            Feedback :
                          </h6>
                          <p
                            className={`text-sm ${
                              choice.style === "Assertif"
                                ? "text-green-700"
                                : choice.style === "Passif"
                                  ? "text-gray-700"
                                  : "text-red-700"
                            }`}
                          >
                            {choice.feedback}
                          </p>
                        </div>
                        <div>
                          <h6
                            className={`font-semibold text-sm ${
                              choice.style === "Assertif"
                                ? "text-green-800"
                                : choice.style === "Passif"
                                  ? "text-gray-800"
                                  : "text-red-800"
                            }`}
                          >
                            Conséquences possibles :
                          </h6>
                          <p
                            className={`text-sm ${
                              choice.style === "Assertif"
                                ? "text-green-700"
                                : choice.style === "Passif"
                                  ? "text-gray-700"
                                  : "text-red-700"
                            }`}
                          >
                            {choice.consequences}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                onClick={prevScenario}
                disabled={currentScenario === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              <span className="text-sm text-gray-500">
                {currentScenario + 1} / {scenarios.length}
              </span>

              <Button
                onClick={nextScenario}
                disabled={
                  currentScenario === scenarios.length - 1 ||
                  !scenarioChoices[currentScenario]
                }
                className="flex items-center gap-2"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quiz de validation
            {completedExercises.includes("quiz") && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
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
                      onClick={() => handleQuizAnswer(qIndex, option)}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        communicationStyleQuiz[qIndex] === option
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
                {communicationStyleQuiz[qIndex] && (
                  <div
                    className={`p-3 rounded border text-sm ${
                      communicationStyleQuiz[qIndex] ===
                      question.options[question.correct]
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    {communicationStyleQuiz[qIndex] ===
                    question.options[question.correct]
                      ? "✓ Correct !"
                      : "✗ Incorrect."}
                    {communicationStyleQuiz[qIndex] ===
                    question.options[question.correct]
                      ? " Vous maîtrisez bien les concepts de l'assertivité."
                      : ` La bonne réponse était : "${question.options[question.correct]}"`}
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
              Communication assertive maîtrisée !
            </h3>
            <p className="text-green-700 mb-4">
              Vous savez maintenant communiquer de manière assertive et gérer
              les relations difficiles. Prêt pour créer votre plan d'action
              personnel ?
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CompletionStep = () => (
    <div className="max-w-4xl mx-auto text-center">
      <Card className="bg-gradient-to-br from-green-50 to-calm-50 border-green-200">
        <CardContent className="p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Séquence 4 terminée avec succès !
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Vous maîtrisez maintenant la communication assertive et les
            techniques de gestion relationnelle. Ces compétences vous
            permettront de gérer efficacement les situations interpersonnelles
            stressantes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">
                Compétences développées :
              </h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Modèle DESC pour structurer vos messages</li>
                <li>• Distinction des 3 styles de communication</li>
                <li>• Gestion des situations relationnelles délicates</li>
                <li>• Techniques d'affirmation respectueuse</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">Dernière étape :</h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Plan d'action personnalisé</li>
                <li>• Routine anti-stress quotidienne</li>
                <li>• Export PDF de votre stratégie</li>
                <li>• Quiz final du module complet</li>
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
            <Link to="/sequence/5">
              <Button className="bg-nature-500 hover:bg-nature-600 text-white">
                Séquence finale
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
          <Badge className="bg-calm-100 text-calm-700">Séquence 4/5</Badge>
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

export default Sequence4;
