import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, ToggleLeft, ToggleRight, CheckCircle, X, 
  Zap, Eye, Heart, Target
} from 'lucide-react';

const NeuroscienceBrain = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isAfterMode, setIsAfterMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: boolean | null}>({});

  const brainAreas = [
    {
      id: 'amygdala',
      name: 'Amygdale',
      position: { x: 45, y: 65 },
      role: 'Détecte les menaces et déclenche la réponse émotionnelle rapide.',
      underStress: 'Réactivité ↑, vigilance et émotions intenses.',
      whyTechniqueHelps: 'La respiration ralentit le rythme, réduit l\'alarme et facilite le retour au calme.',
      technique: 'Respiration 4-6',
      color: 'red',
      beforeIntensity: 90,
      afterIntensity: 30
    },
    {
      id: 'hippocampus',
      name: 'Hippocampe',
      position: { x: 50, y: 70 },
      role: 'Encode les souvenirs et le contexte.',
      underStress: 'Le cortisol prolongé peut altérer la mémoire et la contextualisation.',
      whyTechniqueHelps: 'Sommeil/pause ↓ cortisol, protège la mémoire.',
      technique: 'Récup��ration',
      color: 'purple',
      beforeIntensity: 70,
      afterIntensity: 85
    },
    {
      id: 'prefrontal',
      name: 'Cortex préfrontal',
      position: { x: 25, y: 30 },
      role: 'Planifie, priorise, inhibe les impulsions.',
      underStress: 'Surcharge → baisse du contrôle et des décisions fines.',
      whyTechniqueHelps: 'La priorisation réduit la charge, rend la planification possible.',
      technique: 'Priorisation',
      color: 'blue',
      beforeIntensity: 40,
      afterIntensity: 85
    },
    {
      id: 'hpa-axis',
      name: 'Axe HHS/HPA',
      position: { x: 60, y: 50 },
      role: 'Cascade hypothalamus → hypophyse → surrénales (cortisol).',
      underStress: 'Activation prolongée → fatigue et dérèglements.',
      whyTechniqueHelps: 'La relaxation favorise la désactivation et la récupération.',
      technique: 'Relaxation',
      color: 'orange',
      beforeIntensity: 80,
      afterIntensity: 35
    },
    {
      id: 'autonomic',
      name: 'Système autonome',
      position: { x: 70, y: 60 },
      role: 'Sympathique (accélère), parasympathique (apaise).',
      underStress: 'Sympathique dominant (FC/FR ↑).',
      whyTechniqueHelps: 'Respiration 4-6 allonge l\'expiration → active le parasympathique.',
      technique: 'Respiration 4-6',
      color: 'green',
      beforeIntensity: 85,
      afterIntensity: 25
    }
  ];

  const glossaryTerms = [
    { term: 'Cortisol', definition: 'Hormone du stress libérée par les surrénales' },
    { term: 'Adrénaline', definition: 'Hormone de l\'action immédiate (fight-or-flight)' },
    { term: 'Neuroplasticité', definition: 'Capacité du cerveau à se réorganiser et s\'adapter' },
    { term: 'Sympathique', definition: 'Système qui accélère (stress, action)' },
    { term: 'Parasympathique', definition: 'Système qui apaise (repos, récupération)' }
  ];

  const quizQuestions = [
    {
      id: 0,
      question: 'Allonger l\'expiration active le parasympathique.',
      answer: true,
      explanation: 'Correct ! L\'expiration longue stimule le nerf vague et active le système parasympathique.'
    },
    {
      id: 1,
      question: 'Sous stress, le cortex préfrontal est plus performant.',
      answer: false,
      explanation: 'Faux. Sous stress, le cortex préfrontal est moins efficace car l\'énergie va vers les réponses automatiques.'
    }
  ];

  const getAreaIntensity = (area: typeof brainAreas[0]) => {
    return isAfterMode ? area.afterIntensity : area.beforeIntensity;
  };

  const getAreaOpacity = (area: typeof brainAreas[0]) => {
    const intensity = getAreaIntensity(area);
    return 0.3 + (intensity / 100) * 0.7;
  };

  const handleQuizAnswer = (questionId: number, answer: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const BrainSVG = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full max-w-md mx-auto">
      {/* Brain outline */}
      <path
        d="M80 120 C60 80, 100 60, 140 70 C180 60, 220 70, 260 80 C300 90, 320 120, 310 160 C300 200, 280 220, 240 230 C200 240, 160 235, 120 225 C90 215, 70 180, 80 120 Z"
        fill="#f3f4f6"
        stroke="#9ca3af"
        strokeWidth="2"
        className="transition-all duration-500"
      />
      
      {/* Brain stem */}
      <rect x="180" y="220" width="20" height="40" fill="#e5e7eb" rx="10" />
      
      {/* Hotspots */}
      {brainAreas.map((area) => (
        <g key={area.id}>
          <circle
            cx={area.position.x * 4}
            cy={area.position.y * 3}
            r="12"
            fill={`hsl(var(--${area.color === 'red' ? 'destructive' : 
                          area.color === 'blue' ? 'calm-500' :
                          area.color === 'green' ? 'nature-500' :
                          area.color === 'purple' ? 'serenity-500' :
                          'orange-500'}))`}
            opacity={getAreaOpacity(area)}
            stroke={`hsl(var(--${area.color === 'red' ? 'destructive' : 
                               area.color === 'blue' ? 'calm-600' :
                               area.color === 'green' ? 'nature-600' :
                               area.color === 'purple' ? 'serenity-600' :
                               'orange-600'}))`}
            strokeWidth="2"
            className="cursor-pointer transition-all duration-300 hover:scale-110"
            onClick={() => setActiveHotspot(activeHotspot === area.id ? null : area.id)}
            role="button"
            tabIndex={0}
            aria-label={`${area.name} - ${area.role}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveHotspot(activeHotspot === area.id ? null : area.id);
              }
            }}
          />
          
          {/* Activity indicator */}
          <rect
            x={area.position.x * 4 - 8}
            y={area.position.y * 3 + 20}
            width="16"
            height="3"
            fill={`hsl(var(--${area.color === 'red' ? 'destructive' : 
                               area.color === 'blue' ? 'calm-500' :
                               area.color === 'green' ? 'nature-500' :
                               area.color === 'purple' ? 'serenity-500' :
                               'orange-500'}))`}
            opacity={getAreaOpacity(area)}
            className="transition-all duration-500"
            transform={`scale(${getAreaIntensity(area) / 100}, 1)`}
            transformOrigin={`${area.position.x * 4} ${area.position.y * 3 + 21.5}`}
          />
        </g>
      ))}
    </svg>
  );

  const scrollToTechniques = () => {
    const techniquesSection = document.querySelector('[data-scroll-target="techniques"]');
    if (techniquesSection) {
      techniquesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-900/5 to-purple-900/5 rounded-3xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Dimension neuroscientifique – Zoom cerveau
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez pourquoi vos techniques anti-stress fonctionnent : 
          plongée dans les mécanismes cérébraux du stress et de la régulation.
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
                  {isAfterMode ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
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
              {activeHotspot ? 
                brainAreas.find(area => area.id === activeHotspot)?.name : 
                "Cliquez sur une zone du cerveau"
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeHotspot ? (
              <div className="space-y-4">
                {(() => {
                  const area = brainAreas.find(a => a.id === activeHotspot)!;
                  return (
                    <>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700 mb-1">Rôle :</h5>
                        <p className="text-gray-600 text-sm">{area.role}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700 mb-1">Sous stress :</h5>
                        <p className="text-gray-600 text-sm">{area.underStress}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700 mb-1">
                          Pourquoi {area.technique} aide :
                        </h5>
                        <p className="text-gray-600 text-sm">{area.whyTechniqueHelps}</p>
                      </div>
                      
                      {/* Activity indicator */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Niveau d'activité</span>
                          <span className="text-sm text-gray-600">{getAreaIntensity(area)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              area.color === 'red' ? 'bg-red-500' :
                              area.color === 'blue' ? 'bg-blue-500' :
                              area.color === 'green' ? 'bg-green-500' :
                              area.color === 'purple' ? 'bg-purple-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${getAreaIntensity(area)}%` }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Explorez les différentes zones du cerveau pour comprendre leur rôle dans le stress.</p>
                <p className="text-sm mt-2">Utilisez le toggle "Avant/Après" pour voir l'effet des techniques.</p>
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
                    variant={quizAnswers[question.id] === true ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleQuizAnswer(question.id, true)}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Vrai
                  </Button>
                  <Button
                    variant={quizAnswers[question.id] === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleQuizAnswer(question.id, false)}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Faux
                  </Button>
                </div>
                {quizAnswers[question.id] !== undefined && (
                  <div className={`p-3 rounded text-sm ${
                    quizAnswers[question.id] === question.answer
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    <p className="font-medium mb-1">
                      {quizAnswers[question.id] === question.answer ? '✓ Correct !' : '✗ Incorrect.'}
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

      {/* CTA */}
      <div className="text-center">
        <Button 
          onClick={scrollToTechniques}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          <Zap className="w-4 h-4 mr-2" />
          Voir les techniques associées
        </Button>
      </div>
    </div>
  );
};

export default NeuroscienceBrain;
