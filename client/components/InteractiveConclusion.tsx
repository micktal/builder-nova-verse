import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Star,
  Calendar,
  Zap,
  CheckCircle,
  Brain,
  Heart,
  Users,
  Lightbulb,
  FileText,
  Target,
  Clock,
  TrendingUp,
  Sparkles,
  Rocket,
  Crown,
} from "lucide-react";

const InteractiveConclusion = () => {
  const [currentView, setCurrentView] = useState<
    "celebration" | "skills" | "roadmap" | "conclusion"
  >("celebration");
  const [animationPhase, setAnimationPhase] = useState(0);
  const [skillsRevealed, setSkillsRevealed] = useState<string[]>([]);
  const confettiRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (view: "celebration" | "skills" | "roadmap" | "conclusion") => {
    setCurrentView(view);

    // Wait for state update and DOM change
    setTimeout(() => {
      let targetRef;
      switch (view) {
        case "celebration":
          targetRef = celebrationRef;
          break;
        case "skills":
          targetRef = skillsRef;
          break;
        case "roadmap":
          targetRef = roadmapRef;
          break;
        case "conclusion":
          targetRef = conclusionRef;
          break;
      }

      if (targetRef?.current) {
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const userStats = {
    name: "Apprenant",
    completionDate: new Date().toLocaleDateString("fr-FR"),
    totalTime: "30 minutes",
    sequencesCompleted: 5,
    skillsAcquired: 12,
    stressReduction: 71,
    techniques: 8,
  };

  const skillsData = [
    {
      id: "triggers",
      category: "Identification",
      icon: Brain,
      title: "Maîtrise des déclencheurs",
      description:
        "Capacité à identifier les 4 types de déclencheurs de stress",
      level: "Expert",
      color: "red",
      progress: 95,
    },
    {
      id: "breathing",
      category: "Physiologique",
      icon: Heart,
      title: "Techniques de respiration",
      description: "Respiration 4-6, 4-7-8 et relaxation progressive",
      level: "Avancé",
      color: "blue",
      progress: 88,
    },
    {
      id: "cognitive",
      category: "Cognitif",
      icon: Lightbulb,
      title: "Restructuration cognitive",
      description: "Matrice d'Eisenhower et reframing mental",
      level: "Confirmé",
      color: "green",
      progress: 82,
    },
    {
      id: "communication",
      category: "Relationnel",
      icon: Users,
      title: "Communication assertive",
      description: "Modèle DESC et gestion des conflits",
      level: "Avancé",
      color: "purple",
      progress: 90,
    },
    {
      id: "planning",
      category: "Organisation",
      icon: FileText,
      title: "Plan d'action personnel",
      description: "Routine anti-stress et stratégie personnalisée",
      level: "Expert",
      color: "orange",
      progress: 92,
    },
  ];

  const achievements = [
    {
      id: "neuroscience",
      title: "Explorateur du cerveau",
      description: "Toutes les zones cérébrales explorées",
      icon: Brain,
    },
    {
      id: "techniques",
      title: "Maître des techniques",
      description: "8 techniques maîtrisées",
      icon: Zap,
    },
    {
      id: "timeline",
      title: "Transformation visualisée",
      description: "Impact des techniques compris",
      icon: TrendingUp,
    },
    {
      id: "completion",
      title: "Module complété",
      description: "5 séquences terminées",
      icon: Trophy,
    },
    {
      id: "dedication",
      title: "Dédication totale",
      description: "30 minutes d'apprentissage",
      icon: Clock,
    },
    {
      id: "expert",
      title: "Expert en gestion du stress",
      description: "Toutes les compétences acquises",
      icon: Crown,
    },
  ];

  const roadmapSteps = [
    {
      phase: "Semaine 1-2",
      title: "Intégration des bases",
      tasks: [
        "Pratiquer la respiration 4-6 quotidiennement",
        "Identifier vos déclencheurs personnels",
        "Appliquer la matrice d'Eisenhower",
      ],
      color: "blue",
    },
    {
      phase: "Semaine 3-4",
      title: "Approfondissement",
      tasks: [
        "Maîtriser la relaxation progressive",
        "Pratiquer le reframing cognitif",
        "Utiliser DESC dans vos communications",
      ],
      color: "green",
    },
    {
      phase: "Mois 2",
      title: "Automatisation",
      tasks: [
        "Routine anti-stress automatisée",
        "Gestion préventive du stress",
        "Partage avec votre entourage",
      ],
      color: "purple",
    },
    {
      phase: "Long terme",
      title: "Maîtrise avancée",
      tasks: [
        "Formation d'autres personnes",
        "Adaptation des techniques",
        "Développement personnel continu",
      ],
      color: "gold",
    },
  ];

  useEffect(() => {
    const intervals = [
      setTimeout(() => setAnimationPhase(1), 500),
      setTimeout(() => setAnimationPhase(2), 1500),
      setTimeout(() => setAnimationPhase(3), 2500),
      setTimeout(() => setAnimationPhase(4), 3500),
    ];

    return () => intervals.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (currentView === "skills") {
      skillsData.forEach((skill, index) => {
        setTimeout(() => {
          setSkillsRevealed((prev) => [...prev, skill.id]);
        }, index * 300);
      });
    }
  }, [currentView]);

  const CelebrationView = () => (
    <div className="text-center space-y-8">
      {/* Confetti Animation */}
      <div ref={confettiRef} className="relative h-32 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${
              [
                "bg-yellow-400",
                "bg-blue-400",
                "bg-green-400",
                "bg-red-400",
                "bg-purple-400",
              ][i % 5]
            } ${animationPhase >= 1 ? "animate-confetti" : "opacity-0"}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Trophy */}
      <div
        className={`transition-all duration-1000 ${animationPhase >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        <div className="relative">
          <Trophy className="w-32 h-32 text-yellow-500 mx-auto animate-bounce" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        </div>
      </div>

      {/* Congratulations Text */}
      <div
        className={`transition-all duration-1000 delay-500 ${animationPhase >= 2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="mb-6">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Équipe célébrant le succès et l'accomplissement"
            className="mx-auto rounded-2xl shadow-lg w-80 h-48 object-cover"
          />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
          🎉 FÉLICITATIONS ! 🎉
        </h1>
        <p className="text-2xl text-gray-700 mb-2">
          Vous avez terminé le module "Appréhender le stress et ses émotions en situation complexe" !
        </p>
        <h1 className="text-lg text-gray-600">
          Une transformation remarquable vous attend...
        </h1>
      </div>

      {/* Stats Cards */}
      <div
        className={`grid md:grid-cols-4 gap-4 transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {[
          {
            icon: Trophy,
            value: userStats.sequencesCompleted,
            label: "Séquences",
            color: "yellow",
          },
          {
            icon: Zap,
            value: userStats.skillsAcquired,
            label: "Compétences",
            color: "blue",
          },
          {
            icon: TrendingUp,
            value: `${userStats.stressReduction}%`,
            label: "Stress ↓",
            color: "green",
          },
          {
            icon: Clock,
            value: userStats.totalTime,
            label: "Investis",
            color: "purple",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className={`border-2 border-${stat.color}-200 bg-${stat.color}-50 hover:scale-105 transition-transform`}
          >
            <CardContent className="p-6 text-center">
              <stat.icon
                className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`}
              />
              <div className={`text-3xl font-bold text-${stat.color}-700`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div
        className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-1500 ${animationPhase >= 4 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <Button
          onClick={() => scrollToSection("skills")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Star className="w-4 h-4 mr-2" />
          Mes compétences
        </Button>
        <Button
          onClick={() => scrollToSection("roadmap")}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Ma roadmap
        </Button>
        <Button
          onClick={() => scrollToSection("conclusion")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Synthèse du module
        </Button>
      </div>
    </div>
  );

  const SkillsView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Compétences acquises
        </h2>
        <p className="text-lg text-gray-600">
          Votre arsenal anti-stress est maintenant complet !
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;
          const isRevealed = skillsRevealed.includes(skill.id);

          return (
            <Card
              key={skill.id}
              className={`transition-all duration-500 ${
                isRevealed
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
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
                    <p className="text-gray-600 text-sm mb-3">
                      {skill.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Maîtrise</span>
                        <span className="font-semibold">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-${skill.color}-500 transition-all duration-1000`}
                          style={{
                            width: isRevealed ? `${skill.progress}%` : "0%",
                            transitionDelay: `${index * 300}ms`,
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
                    skillsRevealed.length > index ? "animate-bounce" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ConclusionView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Synthèse de votre apprentissage
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Vous venez de terminer un parcours complet de formation à la gestion
          du stress. Retour sur cette transformation remarquable.
        </p>
      </div>

      {/* Journey Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Votre parcours de transformation
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Ce que vous avez découvert
              </h4>
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Les mécanismes du stress</p>
                  <p className="text-sm text-gray-600">
                    Comment votre cerveau réagit au stress et pourquoi certaines
                    techniques fonctionnent
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">Les 4 types de déclencheurs</p>
                  <p className="text-sm text-gray-600">
                    Environnementaux, organisationnels, relationnels et internes
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">L'impact de vos choix</p>
                  <p className="text-sm text-gray-600">
                    Une semaine sans techniques vs avec techniques : -71% de
                    stress
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Ce que vous maîtrisez maintenant
              </h4>
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-medium">Techniques physiologiques</p>
                  <p className="text-sm text-gray-600">
                    Respiration 4-6, 4-7-8, relaxation progressive, micro-pauses
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-medium">Outils cognitifs</p>
                  <p className="text-sm text-gray-600">
                    Matrice d'Eisenhower, reframing, méthode des 3 tâches
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-medium">Communication assertive</p>
                  <p className="text-sm text-gray-600">
                    Modèle DESC, gestion des conflits, affirmation respectueuse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6">
            Points clés à retenir
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-green-800 mb-2">
                Le stress n'est pas une fatalité
              </h4>
              <p className="text-green-700 text-sm">
                Avec les bonnes techniques, vous pouvez transformer votre
                relation au stress
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-blue-800 mb-2">
                La régularité prime sur l'intensité
              </h4>
              <p className="text-blue-700 text-sm">
                5 minutes par jour de pratique valent mieux qu'une session
                intense par semaine
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-purple-800 mb-2">
                L'assertivité libère
              </h4>
              <p className="text-purple-700 text-sm">
                Exprimer ses besoins clairement réduit considérablement les
                tensions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Reflection */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center text-orange-800 mb-6">
            Votre nouvelle réalité
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
              Vous n'êtes plus la même personne qu'au début de ce module. Vous
              disposez maintenant d'un
              <span className="font-bold text-orange-700">
                {" "}
                arsenal complet de techniques scientifiquement prouvées
              </span>
              pour gérer efficacement votre stress.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Avant ce module :</span> Le
                stress vous submergeait, vous réagissiez impulsivement, les
                priorités étaient floues.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Maintenant :</span> Vous
                comprenez vos déclencheurs, vous avez des techniques concrètes,
                vous communiquez avec assertivité et vous planifiez sereinement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4">
            L'aventure ne fait que commencer
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            Ce module vous a donné les{" "}
            <span className="font-bold text-indigo-700">
              fondations solides
            </span>
            . Maintenant, c'est à vous de construire votre nouvelle relation au
            stress, jour après jour, technique après technique.
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-indigo-200">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-indigo-800">
              Votre transformation commence maintenant
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RoadmapView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Votre roadmap personnalisée
        </h2>
        <p className="text-lg text-gray-600">
          Le chemin vers la maîtrise complète du stress
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-purple-500 to-yellow-500"></div>

        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full bg-${step.color}-500 flex items-center justify-center text-white font-bold border-4 border-white shadow-lg`}
              >
                {index + 1}
              </div>

              {/* Content */}
              <Card
                className={`flex-1 border-2 border-${step.color}-200 bg-${step.color}-50 animate-slide-in-right`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className={`text-${step.color}-600 font-medium`}>
                        {step.phase}
                      </p>
                    </div>
                    <Badge className={`bg-${step.color}-500 text-white`}>
                      {index === 0 ? "Démarrer maintenant" : "À venir"}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle
                          className={`w-4 h-4 text-${step.color}-500`}
                        />
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
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-green-900/5 rounded-3xl">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-lg border">
          {[
            { key: "celebration", label: "Célébration", icon: Trophy },
            { key: "skills", label: "Compétences", icon: Star },
            { key: "roadmap", label: "Roadmap", icon: Rocket },
            { key: "conclusion", label: "Synthèse", icon: FileText },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={currentView === key ? "default" : "ghost"}
              onClick={() => scrollToSection(key as any)}
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
        {currentView === "celebration" && (
          <div ref={celebrationRef} id="celebration">
            <CelebrationView />
          </div>
        )}
        {currentView === "skills" && (
          <div ref={skillsRef} id="competence">
            <SkillsView />
          </div>
        )}
        {currentView === "roadmap" && (
          <div ref={roadmapRef} id="roadmap">
            <RoadmapView />
          </div>
        )}
        {currentView === "conclusion" && (
          <div ref={conclusionRef} id="synthese">
            <ConclusionView />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
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
