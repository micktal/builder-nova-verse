import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Target, CheckCircle, Brain, Heart, Users, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const StressRegulationModule = () => {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSequences, setCompletedSequences] = useState<number[]>([]);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const breathingRef = useRef<HTMLDivElement>(null);

  const sequences = [
    {
      id: 1,
      title: "Comprendre ses déclencheurs",
      duration: "5 min",
      icon: Brain,
      description: "Identification des 4 catégories de déclencheurs de stress",
      color: "calm"
    },
    {
      id: 2,
      title: "Techniques physiologiques",
      duration: "7 min", 
      icon: Heart,
      description: "Respiration et relaxation musculaire progressive",
      color: "nature"
    },
    {
      id: 3,
      title: "Techniques cognitives",
      duration: "8 min",
      icon: Lightbulb,
      description: "Matrice d'Eisenhower et reframing cognitif",
      color: "serenity"
    },
    {
      id: 4,
      title: "Communication assertive",
      duration: "5 min",
      icon: Users,
      description: "Modèle DESC et gestion relationnelle",
      color: "calm"
    },
    {
      id: 5,
      title: "Plan d'action personnel",
      duration: "5 min",
      icon: FileText,
      description: "Routine anti-stress et tableau personnalisé",
      color: "nature"
    }
  ];

  const startBreathingAnimation = () => {
    setIsBreathingActive(true);
    setTimeout(() => setIsBreathingActive(false), 30000); // 30 seconds demo
  };

  const completeSequence = (sequenceId: number) => {
    setCompletedSequences(prev => [...prev, sequenceId]);
    setProgress((completedSequences.length + 1) * 20);
  };

  const ModuleHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-calm-50 via-serenity-50 to-nature-50 px-6 py-12 md:py-20">
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <Badge className="mb-4 bg-calm-100 text-calm-700 hover:bg-calm-200">
          Module 2 - Formation Gestion du Stress
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Réguler le stress
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Apprenez des techniques concrètes pour identifier vos déclencheurs, 
          maîtriser votre physiologie et développer votre assertivité.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-calm-500" />
            <span className="font-medium">30 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-5 h-5 text-nature-500" />
            <span className="font-medium">Niveau Appliquer/Analyser</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-serenity-500" />
            <span className="font-medium">5 séquences interactives</span>
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

  const SequenceCard = ({ sequence, index }: { sequence: typeof sequences[0], index: number }) => {
    const Icon = sequence.icon;
    const isCompleted = completedSequences.includes(sequence.id);
    const isCurrent = currentSequence === index;
    
    return (
      <Card className={`group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-2 animate-fadeInUp ${
        isCurrent ? `border-${sequence.color}-300 shadow-lg scale-105` :
        isCompleted ? `border-${sequence.color}-200 bg-${sequence.color}-25` : 'border-gray-200'
      }`} style={{ animationDelay: `${index * 0.1}s` }}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-lg bg-${sequence.color}-100 text-${sequence.color}-600`}>
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
                  {isCurrent ? 'Continuer' : 'Commencer'}
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
        Démonstration: Respiration guidée
      </h3>
      <p className="text-gray-600 mb-6">
        Suivez le cercle pour pratiquer la technique de respiration 4-6
      </p>
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <div
            ref={breathingRef}
            className={`w-full h-full rounded-full bg-gradient-to-br from-calm-400 to-calm-600 shadow-lg transition-all duration-1000 ${
              isBreathingActive ? 'animate-pulse-gentle shadow-calm-300/50' : 'scale-100 hover:scale-105'
            }`}
            style={{
              animation: isBreathingActive ? 'breathe 10s infinite' : 'none',
              boxShadow: isBreathingActive ? '0 0 30px rgba(59, 130, 246, 0.5)' : '0 10px 25px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
      <Button 
        onClick={startBreathingAnimation}
        className="bg-calm-500 hover:bg-calm-600 text-white"
        disabled={isBreathingActive}
      >
        {isBreathingActive ? 'En cours...' : 'Démarrer l\'exercice'}
      </Button>
    </div>
  );

  const ObjectivesSection = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Objectifs d'apprentissage
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { icon: Target, color: 'nature', title: 'Identifier', desc: 'Reconnaître vos déclencheurs personnels de stress dans différents contextes' },
          { icon: Heart, color: 'calm', title: 'Appliquer', desc: 'Utiliser des techniques physiologiques et cognitives de régulation' },
          { icon: Lightbulb, color: 'serenity', title: 'Analyser', desc: 'Évaluer l\'efficacité des différentes stratégies selon les situations' },
          { icon: FileText, color: 'nature', title: 'Créer', desc: 'Élaborer votre plan d\'action personnel adapté à votre contexte' }
        ].map((obj, index) => {
          const Icon = obj.icon;
          return (
            <Card
              key={index}
              className={`border-${obj.color}-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slideInLeft`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6">
                <Icon className={`w-8 h-8 text-${obj.color}-500 mb-3 transition-transform duration-300 group-hover:scale-110`} />
                <h3 className="font-semibold text-gray-900 mb-2">{obj.title}</h3>
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
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {sequences.map((sequence, index) => (
            <SequenceCard key={sequence.id} sequence={sequence} index={index} />
          ))}
        </div>
        
        <div className="mb-12">
          <BreathingDemo />
        </div>
      </div>
      
      <ObjectivesSection />
      
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
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
          0%, 100% {
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
