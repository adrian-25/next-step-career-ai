import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Code } from 'lucide-react';

const GitHubAnalysisTab = ({ uploadedData }: any) => {
  const githubData = {
    repos: 24,
    stars: 156,
    commits: 342,
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
    topRepos: [
      { name: 'react-dashboard', stars: 45, language: 'TypeScript' },
      { name: 'api-gateway', stars: 23, language: 'Node.js' },
      { name: 'ml-toolkit', stars: 18, language: 'Python' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Github className="w-6 h-6 text-text-primary" />
        <div>
          <h3 className="text-xl font-semibold">GitHub Analysis</h3>
          <p className="text-text-secondary">Code activity and repository insights</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Code className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{githubData.repos}</div>
            <div className="text-sm text-text-secondary">Repositories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{githubData.stars}</div>
            <div className="text-sm text-text-secondary">Total Stars</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <GitFork className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{githubData.commits}</div>
            <div className="text-sm text-text-secondary">Commits</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {githubData.topRepos.map((repo, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-light rounded-lg">
                <div>
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-sm text-text-secondary">{repo.language}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="text-sm">{repo.stars}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubAnalysisTab;