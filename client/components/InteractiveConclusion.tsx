import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Star, Download, Share2, Calendar, Zap, CheckCircle, 
  Brain, Heart, Users, Lightbulb, FileText, Target, Clock,
  Award, TrendingUp, Sparkles, Rocket, Gift, Crown
} from 'lucide-react';

const InteractiveConclusion = () => {
  const [currentView, setCurrentView] = useState<'celebration' | 'certificate' | 'skills' | 'roadmap'>('celebration');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [skillsRevealed, setSkillsRevealed] = useState<string[]>([]);
  const confettiRef = useRef<HTMLDivElement>(null);

  const userStats = {
    name: "Apprenant",
    completionDate: new Date().toLocaleDateString('fr-FR'),
    totalTime: "30 minutes",
    sequencesCompleted: 5,
    skillsAcquired: 12,
    stressReduction: 71,
    techniques: 8
  };

  const skillsData = [
    {
      id: 'triggers',
      category: 'Identification',
      icon: Brain,
      title: 'Maîtrise des déclencheurs',
      description: 'Capacité à identifier les 4 types de déclencheurs de stress',
      level: 'Expert',
      color: 'red',
      progress: 95
    },
    {
      id: 'breathing',
      category: 'Physiologique',
      icon: Heart,
      title: 'Techniques de respiration',
      description: 'Respiration 4-6, 4-7-8 et relaxation progressive',
      level: 'Avancé',
      color: 'blue',
      progress: 88
    },
    {
      id: 'cognitive',
      category: 'Cognitif',
      icon: Lightbulb,
      title: 'Restructuration cognitive',
      description: 'Matrice d\'Eisenhower et reframing mental',
      level: 'Confirmé',
      color: 'green',
      progress: 82
    },
    {
      id: 'communication',
      category: 'Relationnel',
      icon: Users,
      title: 'Communication assertive',
      description: 'Modèle DESC et gestion des conflits',
      level: 'Avancé',
      color: 'purple',
      progress: 90
    },
    {
      id: 'planning',
      category: 'Organisation',
      icon: FileText,
      title: 'Plan d\'action personnel',
      description: 'Routine anti-stress et stratégie personnalisée',
      level: 'Expert',
      color: 'orange',
      progress: 92
    }
  ];

  const achievements = [
    { id: 'neuroscience', title: 'Explorateur du cerveau', description: 'Toutes les zones cérébrales explorées', icon: Brain },
    { id: 'techniques', title: 'Maître des techniques', description: '8 techniques maîtrisées', icon: Zap },
    { id: 'timeline', title: 'Transformation visualisée', description: 'Impact des techniques compris', icon: TrendingUp },
    { id: 'completion', title: 'Module complété', description: '5 séquences terminées', icon: Trophy },
    { id: 'dedication', title: 'Dédication totale', description: '30 minutes d\'apprentissage', icon: Clock },
    { id: 'expert', title: 'Expert en gestion du stress', description: 'Toutes les compétences acquises', icon: Crown }
  ];

  const roadmapSteps = [
    {
      phase: 'Semaine 1-2',
      title: 'Intégration des bases',
      tasks: ['Pratiquer la respiration 4-6 quotidiennement', 'Identifier vos déclencheurs personnels', 'Appliquer la matrice d\'Eisenhower'],
      color: 'blue'
    },
    {
      phase: 'Semaine 3-4', 
      title: 'Approfondissement',
      tasks: ['Maîtriser la relaxation progressive', 'Pratiquer le reframing cognitif', 'Utiliser DESC dans vos communications'],
      color: 'green'
    },
    {
      phase: 'Mois 2',
      title: 'Automatisation',
      tasks: ['Routine anti-stress automatisée', 'Gestion préventive du stress', 'Partage avec votre entourage'],
      color: 'purple'
    },
    {
      phase: 'Long terme',
      title: 'Maîtrise avancée',
      tasks: ['Formation d\'autres personnes', 'Adaptation des techniques', 'Développement personnel continu'],
      color: 'gold'
    }
  ];

  useEffect(() => {
    const intervals = [
      setTimeout(() => setAnimationPhase(1), 500),
      setTimeout(() => setAnimationPhase(2), 1500),
      setTimeout(() => setAnimationPhase(3), 2500),
      setTimeout(() => setAnimationPhase(4), 3500)
    ];

    return () => intervals.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (currentView === 'skills') {
      skillsData.forEach((skill, index) => {
        setTimeout(() => {
          setSkillsRevealed(prev => [...prev, skill.id]);
        }, index * 300);
      });
    }
  }, [currentView]);

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, '#f0f9ff');
      gradient.addColorStop(1, '#dbeafe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Border
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, 760, 560);
      
      // Title
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICAT DE RÉUSSITE', 400, 100);
      
      // Module title
      ctx.font = '24px Arial';
      ctx.fillText('Module "Réguler le stress"', 400, 150);
      
      // Name
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = '#059669';
      ctx.fillText(`Félicitations ${userStats.name} !`, 400, 250);
      
      // Content
      ctx.font = '18px Arial';
      ctx.fillStyle = '#374151';
      ctx.fillText('Vous avez terminé avec succès ce module de formation', 400, 300);
      ctx.fillText(`${userStats.sequencesCompleted} séquences complétées • ${userStats.skillsAcquired} compétences acquises`, 400, 330);
      ctx.fillText(`Réduction du stress de ${userStats.stressReduction}%`, 400, 360);
      
      // Date
      ctx.font = '16px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`Délivré le ${userStats.completionDate}`, 400, 450);
      
      // Signature line
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(300, 500);
      ctx.lineTo(500, 500);
      ctx.stroke();
      ctx.fillText('Builder.io Learning', 400, 520);
    }
    
    // Download
    const link = document.createElement('a');
    link.download = `certificat-stress-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'J\'ai terminé le module "Réguler le stress" !',
        text: `J'ai acquis ${userStats.skillsAcquired} nouvelles compétences et réduit mon stress de ${userStats.stressReduction}% grâce à ce module e-learning interactif.`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`J'ai terminé le module "Réguler le stress" ! ${userStats.skillsAcquired} compétences acquises, ${userStats.stressReduction}% de stress en moins. ${window.location.href}`);
    }
  };

  const CelebrationView = () => (
    <div className="text-center space-y-8">
      {/* Confetti Animation */}
      <div ref={confettiRef} className="relative h-32 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${
              ['bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400', 'bg-purple-400'][i % 5]
            } ${animationPhase >= 1 ? 'animate-confetti' : 'opacity-0'}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Trophy */}
      <div className={`transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="relative">
          <Trophy className="w-32 h-32 text-yellow-500 mx-auto animate-bounce" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        </div>
      </div>

      {/* Congratulations Text */}
      <div className={`transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
          🎉 FÉLICITATIONS ! 🎉
        </h1>
        <p className="text-2xl text-gray-700 mb-2">
          Vous avez terminé le module "Réguler le stress" !
        </p>
        <p className="text-lg text-gray-600">
          Une transformation remarquable vous attend...
        </p>
      </div>

      {/* Stats Cards */}
      <div className={`grid md:grid-cols-4 gap-4 transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {[
          { icon: Trophy, value: userStats.sequencesCompleted, label: 'Séquences', color: 'yellow' },
          { icon: Zap, value: userStats.skillsAcquired, label: 'Compétences', color: 'blue' },
          { icon: TrendingUp, value: `${userStats.stressReduction}%`, label: 'Stress ↓', color: 'green' },
          { icon: Clock, value: userStats.totalTime, label: 'Investis', color: 'purple' }
        ].map((stat, index) => (
          <Card key={index} className={`border-2 border-${stat.color}-200 bg-${stat.color}-50 hover:scale-105 transition-transform`}>
            <CardContent className="p-6 text-center">
              <stat.icon className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`} />
              <div className={`text-3xl font-bold text-${stat.color}-700`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-1500 ${animationPhase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Button onClick={() => setCurrentView('certificate')} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Award className="w-4 h-4 mr-2" />
          Voir mon certificat
        </Button>
        <Button onClick={() => setCurrentView('skills')} className="bg-green-600 hover:bg-green-700 text-white">
          <Star className="w-4 h-4 mr-2" />
          Mes compétences
        </Button>
        <Button onClick={() => setCurrentView('roadmap')} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Rocket className="w-4 h-4 mr-2" />
          Ma roadmap
        </Button>
      </div>
    </div>
  );

  const CertificateView = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 border-4">
        <CardContent className="p-12 text-center">
          {/* Certificate Header */}
          <div className="border-b-4 border-blue-300 pb-8 mb-8">
            <div className="flex justify-center mb-4">
              <Award className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-800 mb-2">CERTIFICAT DE RÉUSSITE</h1>
            <p className="text-xl text-blue-600">Module "Réguler le stress"</p>
          </div>

          {/* Certificate Body */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Ce certificat atteste que
            </p>
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{userStats.name}</h2>
              <p className="text-gray-600">a terminé avec succès ce module de formation</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold">{userStats.sequencesCompleted}/5</div>
                <div className="text-sm text-gray-600">Séquences complétées</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="font-bold">{userStats.skillsAcquired}</div>
                <div className="text-sm text-gray-600">Compétences acquises</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-bold">{userStats.stressReduction}%</div>
                <div className="text-sm text-gray-600">Réduction du stress</div>
              </div>
            </div>

            <p className="text-gray-600">
              Délivré le {userStats.completionDate}
            </p>
            <div className="border-t border-gray-300 pt-4">
              <p className="text-sm text-gray-500">Builder.io Learning Platform</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={generateCertificate} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button onClick={shareResults} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SkillsView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compétences acquises</h2>
        <p className="text-lg text-gray-600">Votre arsenal anti-stress est maintenant complet !</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;
          const isRevealed = skillsRevealed.includes(skill.id);
          
          return (
            <Card 
              key={skill.id} 
              className={`transition-all duration-500 ${
                isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              } border-2 border-${skill.color}-200 hover:shadow-lg`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-${skill.color}-100`}>
                    <Icon className={`w-6 h-6 text-${skill.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{skill.title}</h3>
                      <Badge className={`bg-${skill.color}-500 text-white`}>
                        {skill.level}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{skill.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Maîtrise</span>
                        <span className="font-semibold">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${skill.color}-500 transition-all duration-1000`}
                          style={{ 
                            width: isRevealed ? `${skill.progress}%` : '0%',
                            transitionDelay: `${index * 300}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Crown className="w-6 h-6 text-yellow-600" />
            Badges débloqués
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`text-center p-4 bg-white rounded-lg border-2 border-yellow-200 transition-all duration-500 hover:scale-105 ${
                    skillsRevealed.length > index ? 'animate-bounce' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RoadmapView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Votre roadmap personnalisée</h2>
        <p className="text-lg text-gray-600">Le chemin vers la maîtrise complète du stress</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-purple-500 to-yellow-500"></div>
        
        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className={`relative z-10 w-16 h-16 rounded-full bg-${step.color}-500 flex items-center justify-center text-white font-bold border-4 border-white shadow-lg`}>
                {index + 1}
              </div>
              
              {/* Content */}
              <Card className={`flex-1 border-2 border-${step.color}-200 bg-${step.color}-50 animate-slide-in-right`} style={{ animationDelay: `${index * 300}ms` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className={`text-${step.color}-600 font-medium`}>{step.phase}</p>
                    </div>
                    <Badge className={`bg-${step.color}-500 text-white`}>
                      {index === 0 ? 'Démarrer maintenant' : 'À venir'}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className={`w-4 h-4 text-${step.color}-500`} />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <Rocket className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Prêt(e) à commencer votre transformation ?</h3>
          <p className="mb-6">Votre boîte à outils anti-stress est complète. Il ne reste plus qu'à passer à l'action !</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="w-4 h-4 mr-2" />
              Planifier ma routine
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Share2 className="w-4 h-4 mr-2" />
              Partager mes résultats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-green-900/5 rounded-3xl">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg border">
          {[
            { key: 'celebration', label: 'Célébration', icon: Trophy },
            { key: 'certificate', label: 'Certificat', icon: Award },
            { key: 'skills', label: 'Compétences', icon: Star },
            { key: 'roadmap', label: 'Roadmap', icon: Rocket }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={currentView === key ? 'default' : 'ghost'}
              onClick={() => setCurrentView(key as any)}
              className="rounded-full mx-1"
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Views */}
      <div className="min-h-[600px]">
        {currentView === 'celebration' && <CelebrationView />}
        {currentView === 'certificate' && <CertificateView />}
        {currentView === 'skills' && <SkillsView />}
        {currentView === 'roadmap' && <RoadmapView />}
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out infinite;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InteractiveConclusion;
