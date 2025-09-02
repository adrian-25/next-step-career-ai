import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Target, 
  Award,
  CheckCircle2,
  Lock,
  TrendingUp,
  Zap
} from 'lucide-react';

const GamificationSection = ({ uploadedData }: any) => {
  const profileLevel = {
    current: 3,
    progress: 68,
    nextLevel: 4,
    totalXp: 2680,
    nextLevelXp: 3000,
    title: 'Rising Developer'
  };

  const badges = [
    {
      id: 'resume-master',
      name: 'Resume Master',
      description: 'ATS score above 85%',
      icon: Trophy,
      earned: true,
      rarity: 'gold',
      xp: 150
    },
    {
      id: 'github-active',
      name: 'Code Warrior',
      description: '10+ GitHub repositories',
      icon: Star,
      earned: true,
      rarity: 'silver',
      xp: 100
    },
    {
      id: 'skill-diverse',
      name: 'Skill Collector',
      description: 'Master 15+ technologies',
      icon: Award,
      earned: true,
      rarity: 'bronze',
      xp: 75
    },
    {
      id: 'linkedin-pro',
      name: 'Network Builder',
      description: '500+ LinkedIn connections',
      icon: Target,
      earned: false,
      rarity: 'silver',
      xp: 125
    },
    {
      id: 'interview-ready',
      name: 'Interview Ace',
      description: 'Complete 10 mock interviews',
      icon: CheckCircle2,
      earned: false,
      rarity: 'gold',
      xp: 200
    },
    {
      id: 'placement-success',
      name: 'Job Hunter',
      description: 'Score 90%+ job fit',
      icon: Zap,
      earned: false,
      rarity: 'platinum',
      xp: 300
    }
  ];

  const achievements = [
    { name: 'First Resume Upload', date: '2 days ago', xp: 50 },
    { name: 'GitHub Connected', date: '1 day ago', xp: 75 },
    { name: 'Skills Analysis Complete', date: '6 hours ago', xp: 100 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', level: 7, xp: 5420, title: 'Elite Developer' },
    { rank: 2, name: 'Sarah Kim', level: 6, xp: 4890, title: 'Senior Analyst' },
    { rank: 3, name: 'You', level: 3, xp: 2680, title: 'Rising Developer' },
    { rank: 4, name: 'Mike Ross', level: 3, xp: 2340, title: 'Rising Developer' },
    { rank: 5, name: 'Emma Liu', level: 2, xp: 1890, title: 'Career Starter' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return 'from-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-500 to-orange-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      default: return 'from-orange-600 to-red-600';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'gold': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'silver': return 'bg-gray-500/10 text-gray-600 border-gray-200';
      default: return 'bg-orange-500/10 text-orange-600 border-orange-200';
    }
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Your Career Journey
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Level up your profile, earn badges, and track your progress on the path to career success.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Level */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="card-hover bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Profile Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    Level {profileLevel.current}
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {profileLevel.title}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {profileLevel.nextLevel}</span>
                    <span>{profileLevel.progress}%</span>
                  </div>
                  <Progress value={profileLevel.progress} className="h-3" />
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>{profileLevel.totalXp} XP</span>
                    <span>{profileLevel.nextLevelXp} XP</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Recent Achievements</h5>
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{achievement.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-success">+{achievement.xp} XP</span>
                          <span className="text-text-secondary text-xs">{achievement.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.id}
                        className={`
                          p-4 rounded-lg border transition-all duration-300
                          ${badge.earned 
                            ? 'bg-gradient-to-br ' + getRarityColor(badge.rarity) + ' text-white shadow-lg' 
                            : 'bg-muted/50 opacity-60'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center
                            ${badge.earned ? 'bg-white/20' : 'bg-muted'}
                          `}>
                            {badge.earned ? (
                              <Icon className="w-6 h-6" />
                            ) : (
                              <Lock className="w-6 h-6 text-text-secondary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${badge.earned ? 'text-white' : 'text-text-primary'}`}>
                                {badge.name}
                              </h4>
                              {badge.earned && (
                                <Badge className={getRarityBadge(badge.rarity)}>
                                  {badge.rarity}
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm ${badge.earned ? 'text-white/80' : 'text-text-secondary'}`}>
                              {badge.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs ${badge.earned ? 'text-white/80' : 'text-text-secondary'}`}>
                                +{badge.xp} XP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`
                        flex items-center justify-between p-3 rounded-lg transition-all
                        ${user.name === 'You' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/30 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                          ${user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-muted text-text-secondary'
                          }
                        `}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${user.name === 'You' ? 'text-primary' : ''}`}>
                              {user.name}
                            </span>
                            {user.rank <= 3 && (
                              <Trophy className={`w-4 h-4 ${
                                user.rank === 1 ? 'text-yellow-500' :
                                user.rank === 2 ? 'text-gray-400' :
                                'text-orange-600'
                              }`} />
                            )}
                          </div>
                          <p className="text-sm text-text-secondary">{user.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Level {user.level}</div>
                        <div className="text-sm text-text-secondary">{user.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;