import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, ArrowLeft, CheckCircle, Home, 
  Download, Target, Clock, Star, Trophy, Zap
} from 'lucide-react';

const Sequence5 = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'synthesis' | 'action-plan' | 'quiz' | 'completion'>('intro');
  
  // Action Plan State
  const [actionPlan, setActionPlan] = useState({
    triggers: '',
    favoriteTechniques: '',
    applicationMoments: '',
    expectedResults: ''
  });
  
  // Routine State
  const [selectedRoutine, setSelectedRoutine] = useState<string[]>([]);
  const [customRoutine, setCustomRoutine] = useState('');
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  
  const routineOptions = [
    { id: 'breathing', name: '2 min de respiration profonde', time: '2 min', icon: '🫁' },
    { id: 'priorities', name: 'Définir 3 priorités du jour', time: '2 min', icon: '🎯' },
    { id: 'stretching', name: 'Étirements au bureau', time: '1 min', icon: '🤸' },
    { id: 'screen-break', name: 'Pause sans écran', time: '30s', icon: '📵' },
    { id: 'gratitude', name: 'Note de gratitude express', time: '1 min', icon: '🙏' },
    { id: 'emotional-check', name: 'Check émotionnel', time: '30s', icon: '💭' },
    { id: 'posture', name: 'Correction de posture', time: '30s', icon: '🚶' },
    { id: 'hydration', name: 'Pause hydratation mindful', time: '1 min', icon: '💧' }
  ];

  const finalQuiz = [
    {
      question: 'Quelle est la première étape cruciale dans la gestion du stress ?',
      options: [
        'Prendre des médicaments',
        'Identifier ses déclencheurs personnels',
        'Faire du sport intensif',
        'Éviter toutes les situations stressantes'
      ],
      correct: 1,
      explanation: 'Identifier ses déclencheurs permet de comprendre les sources de stress et d\'adapter ses stratégies.'
    },
    {
      question: 'Dans la matrice d\'Eisenhower, que faire en priorité ?',
      options: [
        'Les tâches urgentes et importantes',
        'Les tâches pas urgentes et pas importantes',
        'Les tâches urgentes mais pas importantes',
        'Toutes les tâches en même temps'
      ],
      correct: 0,
      explanation: 'Les tâches urgentes ET importantes doivent être traitées en premier (quadrant 1).'
    },
    {
      question: 'Quelle technique de respiration est recommandée pour l\'anxiété ?',
      options: [
        'Respiration rapide et superficielle',
        'Retenir son souffle le plus longtemps possible',
        'Respiration 4-7-8 (inspirer 4s, retenir 7s, expirer 8s)',
        'Respirer uniquement par la bouche'
      ],
      correct: 2,
      explanation: 'La technique 4-7-8 active le système parasympathique et réduit l\'anxiété efficacement.'
    },
    {
      question: 'Dans le modèle DESC, que signifie le "E" ?',
      options: [
        'Éliminer',
        'Exprimer (ses émotions)',
        'Évaluer',
        'Éviter'
      ],
      correct: 1,
      explanation: 'Le "E" signifie Exprimer ses émotions et sentiments de manière authentique.'
    },
    {
      question: 'Combien de tâches essentielles maximum par jour pour rester efficace ?',
      options: [
        '1',
        '3',
        '7',
        'Pas de limite'
      ],
      correct: 1,
      explanation: '3 tâches essentielles permettent de maintenir le focus sans se disperser.'
    }
  ];

  const moduleProgress = {
    sequence1: 'Déclencheurs identifiés',
    sequence2: 'Techniques physiologiques',
    sequence3: 'Stratégies cognitives',
    sequence4: 'Communication assertive',
    sequence5: 'Plan d\'action personnel'
  };

  const handleRoutineToggle = (routineId: string) => {
    setSelectedRoutine(prev => 
      prev.includes(routineId) 
        ? prev.filter(id => id !== routineId)
        : prev.length < 4 ? [...prev, routineId] : prev
    );
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const generatePDF = () => {
    const routineText = selectedRoutine
      .map(id => routineOptions.find(opt => opt.id === id)?.name)
      .filter(Boolean)
      .concat(customRoutine ? [customRoutine] : [])
      .map((item, index) => `${index + 1}. ${item}`)
      .join('\n');

    const content = `
PLAN D'ACTION PERSONNEL - MODULE GESTION DU STRESS
=====================================================

📊 ANALYSE PERSONNELLE
Mes déclencheurs identifiés: ${actionPlan.triggers || 'Non spécifié'}
Techniques préférées: ${actionPlan.favoriteTechniques || 'Non spécifié'}
Moments d'application: ${actionPlan.applicationMoments || 'Non spécifié'}
Résultats attendus: ${actionPlan.expectedResults || 'Non spécifié'}

⏰ MA ROUTINE ANTI-STRESS QUOTIDIENNE (5 MIN)
${routineText || 'Aucune routine définie'}

📈 RÉSULTATS QUIZ FINAL
Score: ${Object.entries(quizAnswers).filter(([qIndex, answer]) => answer === finalQuiz[parseInt(qIndex)].correct).length}/${finalQuiz.length}

🎯 PLAN D'ACTION
□ Pratiquer ma routine quotidienne
□ Identifier les déclencheurs en temps réel
□ Appliquer les techniques selon la situation
□ Évaluer mes progrès chaque semaine

Date de création: ${new Date().toLocaleDateString('fr-FR')}
Module "Réguler le stress" - Builder.io Learning
    `;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plan-action-stress-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTotalRoutineTime = () => {
    const selectedTime = selectedRoutine.reduce((total, id) => {
      const option = routineOptions.find(opt => opt.id === id);
      if (option) {
        const minutes = parseInt(option.time.match(/(\d+)/)?.[1] || '0');
        const isSeconds = option.time.includes('s');
        return total + (isSeconds ? minutes / 60 : minutes);
      }
      return total;
    }, 0);
    
    return Math.round(selectedTime * 10) / 10;
  };

  const getQuizScore = () => {
    return Object.entries(quizAnswers).filter(([qIndex, answer]) => 
      answer === finalQuiz[parseInt(qIndex)].correct
    ).length;
  };

  const isActionPlanComplete = actionPlan.triggers && actionPlan.favoriteTechniques && selectedRoutine.length > 0;
  const isQuizComplete = Object.keys(quizAnswers).length === finalQuiz.length;
  const isSequenceComplete = isActionPlanComplete && isQuizComplete;

  useEffect(() => {
    if (isSequenceComplete && currentStep === 'quiz') {
      setTimeout(() => setCurrentStep('completion'), 1000);
    }
  }, [isSequenceComplete, currentStep]);

  const IntroStep = () => (
    <div className="max-w-4xl mx-auto text-center mb-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-nature-200">
        <FileText className="w-16 h-16 text-nature-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Séquence 5: Plan d'action personnel
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Créez votre stratégie personnalisée de gestion du stress, établissez votre routine 
          quotidienne et validez vos connaissances avec le quiz final du module.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-nature-50 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-nature-600" />
            <h4 className="font-semibold text-sm text-gray-900">Synthèse</h4>
            <p className="text-xs text-gray-600 mt-1">Récapitulatif du parcours</p>
          </div>
          <div className="text-center p-4 bg-nature-50 rounded-lg">
            <FileText className="w-8 h-8 mx-auto mb-2 text-nature-600" />
            <h4 className="font-semibold text-sm text-gray-900">Plan d'action</h4>
            <p className="text-xs text-gray-600 mt-1">Stratégie personnalisée</p>
          </div>
          <div className="text-center p-4 bg-nature-50 rounded-lg">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-nature-600" />
            <h4 className="font-semibold text-sm text-gray-900">Validation</h4>
            <p className="text-xs text-gray-600 mt-1">Quiz final</p>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Objectifs de cette séquence finale :</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Faire le bilan de votre apprentissage</li>
            <li>• Créer votre plan d'action personnalisé</li>
            <li>• Établir une routine anti-stress de 5 min/jour</li>
            <li>• Valider vos connaissances avec le quiz final</li>
            <li>• Obtenir votre certificat de réussite</li>
          </ul>
        </div>
        <Button 
          onClick={() => setCurrentStep('synthesis')}
          className="bg-nature-500 hover:bg-nature-600 text-white text-lg px-8 py-3"
        >
          Commencer la synthèse
        </Button>
      </div>
    </div>
  );

  const SynthesisStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Synthèse de votre parcours
        </h2>
        <p className="text-gray-600">
          Félicitations ! Vous avez terminé les 4 premières séquences. Voici un récapitulatif de votre apprentissage.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-nature-500" />
            Votre progression dans le module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(moduleProgress).map(([key, title], index) => (
              <div key={key} className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm text-green-800 mb-1">Séquence {index + 1}</h4>
                <p className="text-xs text-green-600">{title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">🎯 Compétences développées :</h5>
            <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
              <ul className="space-y-1">
                <li>• Identification des 4 types de déclencheurs</li>
                <li>• Maîtrise de 4 techniques physiologiques</li>
                <li>• Application de la matrice d'Eisenhower</li>
              </ul>
              <ul className="space-y-1">
                <li>• Pratique du reframing cognitif</li>
                <li>• Communication assertive avec DESC</li>
                <li>• Gestion des relations difficiles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Techniques Recap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Boîte à outils anti-stress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                🧠
              </div>
              <h5 className="font-semibold text-red-800 mb-2">Déclencheurs</h5>
              <p className="text-red-700 text-xs">Environnementaux, Organisationnels, Relationnels, Internes</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                🫁
              </div>
              <h5 className="font-semibold text-blue-800 mb-2">Physiologique</h5>
              <p className="text-blue-700 text-xs">Respiration 4-6, 4-7-8, Relaxation progressive, Micro-pauses</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                🎯
              </div>
              <h5 className="font-semibold text-green-800 mb-2">Cognitif</h5>
              <p className="text-green-700 text-xs">Matrice Eisenhower, Reframing, 3 tâches essentielles</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                💬
              </div>
              <h5 className="font-semibold text-purple-800 mb-2">Relationnel</h5>
              <p className="text-purple-700 text-xs">Modèle DESC, Communication assertive</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => setCurrentStep('action-plan')}
          className="bg-nature-500 hover:bg-nature-600 text-white"
        >
          Créer mon plan d'action
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const ActionPlanStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Créez votre plan d'action personnalisé
        </h2>
        <p className="text-gray-600">
          Définissez votre stratégie personnelle et votre routine quotidienne anti-stress.
        </p>
      </div>

      {/* Personal Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Analyse personnelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-900">
                Mes principaux déclencheurs de stress :
              </label>
              <Textarea
                value={actionPlan.triggers}
                onChange={(e) => setActionPlan(prev => ({ ...prev, triggers: e.target.value }))}
                placeholder="Ex: Réunions imprévues, surcharge d'emails, conflits interpersonnels..."
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2 text-gray-900">
                Mes techniques préférées :
              </label>
              <Textarea
                value={actionPlan.favoriteTechniques}
                onChange={(e) => setActionPlan(prev => ({ ...prev, favoriteTechniques: e.target.value }))}
                placeholder="Ex: Respiration 4-6, matrice d'Eisenhower, modèle DESC..."
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2 text-gray-900">
                Moments d'application idéaux :
              </label>
              <Input
                value={actionPlan.applicationMoments}
                onChange={(e) => setActionPlan(prev => ({ ...prev, applicationMoments: e.target.value }))}
                placeholder="Ex: Début de journée, avant réunions importantes, en fin de journée..."
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2 text-gray-900">
                Résultats attendus :
              </label>
              <Input
                value={actionPlan.expectedResults}
                onChange={(e) => setActionPlan(prev => ({ ...prev, expectedResults: e.target.value }))}
                placeholder="Ex: Plus de sérénité, meilleure concentration, relations apaisées..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routine Builder */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Ma routine anti-stress quotidienne
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Sélectionnez 3-4 éléments pour créer votre routine de 5 minutes maximum :
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {routineOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleRoutineToggle(option.id)}
                  disabled={!selectedRoutine.includes(option.id) && selectedRoutine.length >= 4}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    selectedRoutine.includes(option.id)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedRoutine.length >= 4
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium">{option.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {option.time}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedRoutine.length > 0 && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">Votre routine sélectionnée :</h5>
              <ul className="space-y-1 text-green-700 text-sm mb-3">
                {selectedRoutine.map((id, index) => {
                  const option = routineOptions.find(opt => opt.id === id);
                  return option ? (
                    <li key={id}>
                      {index + 1}. {option.icon} {option.name} ({option.time})
                    </li>
                  ) : null;
                })}
              </ul>
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>Temps total estimé: {getTotalRoutineTime()} minutes</span>
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold mb-2 text-gray-900">
              Routine personnalisée (optionnel) :
            </label>
            <Input
              value={customRoutine}
              onChange={(e) => setCustomRoutine(e.target.value)}
              placeholder="Ajoutez votre propre élément de routine..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      {isActionPlanComplete && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Download className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-bold text-blue-900 mb-2">Plan d'action prêt !</h4>
            <p className="text-blue-800 mb-4">
              Téléchargez votre plan d'action personnalisé au format PDF.
            </p>
            <Button 
              onClick={generatePDF}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger mon plan d'action
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button 
          onClick={() => setCurrentStep('quiz')}
          disabled={!isActionPlanComplete}
          className="bg-nature-500 hover:bg-nature-600 text-white"
        >
          Passer au quiz final
          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
        </Button>
      </div>
    </div>
  );

  const QuizStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Quiz final du module
        </h2>
        <p className="text-gray-600 mb-4">
          Validez vos connaissances avec ce quiz de 5 questions sur l'ensemble du module.
        </p>
        <Progress value={(Object.keys(quizAnswers).length / finalQuiz.length) * 100} className="h-3" />
      </div>

      <div className="space-y-6">
        {finalQuiz.map((question, qIndex) => (
          <Card key={qIndex}>
            <CardHeader>
              <CardTitle className="text-lg">
                Question {qIndex + 1}/{finalQuiz.length}: {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {question.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleQuizAnswer(qIndex, oIndex)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      quizAnswers[qIndex] === oIndex
                        ? (oIndex === question.correct 
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-red-500 bg-red-50 text-red-700')
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {quizAnswers[qIndex] !== undefined && (
                <div className={`p-4 rounded-lg border text-sm ${
                  quizAnswers[qIndex] === question.correct
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="font-semibold mb-1">
                    {quizAnswers[qIndex] === question.correct ? '✓ Correct !' : '✗ Incorrect.'}
                  </p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isQuizComplete && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Quiz terminé !
            </h3>
            <p className="text-green-700 mb-4">
              Score: {getQuizScore()}/{finalQuiz.length} ({Math.round((getQuizScore() / finalQuiz.length) * 100)}%)
            </p>
            <Badge className={getQuizScore() >= 4 ? "bg-green-500" : getQuizScore() >= 3 ? "bg-blue-500" : "bg-yellow-500"}>
              {getQuizScore() >= 4 ? "Expert en gestion du stress" : 
               getQuizScore() >= 3 ? "Bonne maîtrise" : "En progression"}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const CompletionStep = () => (
    <div className="max-w-4xl mx-auto text-center">
      <Card className="bg-gradient-to-br from-green-50 to-nature-50 border-green-200">
        <CardContent className="p-8">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Module terminé avec succès !
          </h2>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Félicitations ! Vous avez terminé le module "Réguler le stress" et acquis 
            toutes les compétences nécessaires pour une gestion efficace du stress.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">Votre parcours :</h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ 5 séquences interactives complétées</li>
                <li>✅ {Object.keys(quizAnswers).length} questions de quiz réussies</li>
                <li>✅ Plan d'action personnel créé</li>
                <li>✅ Routine anti-stress établie</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">Vos résultats :</h4>
              <ul className="text-left space-y-2 text-gray-600">
                <li>🏆 Score final: {getQuizScore()}/{finalQuiz.length}</li>
                <li>⏱️ Routine: {getTotalRoutineTime()} min/jour</li>
                <li>📋 Plan d'action téléchargé</li>
                <li>🎯 Prêt(e) pour l'application</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">🚀 Prochaines étapes recommandées :</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Pratiquez votre routine quotidienne pendant 21 jours</li>
              <li>• Appliquez vos techniques dans des situations réelles</li>
              <li>• Évaluez vos progrès chaque semaine</li>
              <li>• Ajustez votre plan selon vos besoins</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-nature-500 hover:bg-nature-600 text-white">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
            <Button 
              onClick={generatePDF}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger le bilan
            </Button>
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
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour au module
          </Link>
          <Badge className="bg-nature-100 text-nature-700">
            Séquence 5/5 - FINALE
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {currentStep === 'intro' && <IntroStep />}
        {currentStep === 'synthesis' && <SynthesisStep />}
        {currentStep === 'action-plan' && <ActionPlanStep />}
        {currentStep === 'quiz' && <QuizStep />}
        {currentStep === 'completion' && <CompletionStep />}
      </div>
    </div>
  );
};

export default Sequence5;
