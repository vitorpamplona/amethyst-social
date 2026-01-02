import { Play, Download, Settings, CheckCircle, ExternalLink, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    number: 1,
    icon: Download,
    title: 'Download Obtainium',
    description: 'Get Obtainium from GitHub. It\'s an open-source app that lets you install and update apps directly from source releases.',
    action: {
      label: 'Get Obtainium',
      href: 'https://github.com/ImranR98/Obtainium',
    },
  },
  {
    number: 2,
    icon: Settings,
    title: 'Add Amethyst Repository',
    description: 'In Obtainium, tap "Add App" and paste the Amethyst GitHub repository URL. Obtainium will find the latest release automatically.',
    code: 'https://github.com/vitorpamplona/amethyst',
  },
  {
    number: 3,
    icon: Play,
    title: 'Install & Enjoy',
    description: 'Obtainium will download and install Amethyst. You\'ll receive notifications when new updates are available.',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Automatic Updates',
    description: 'Obtainium checks for updates regularly and notifies you when a new version is released. Update with a single tap!',
  },
];

export function ObtainiumGuide() {
  return (
    <section id="obtainium-guide" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-purple-200 dark:border-purple-800 mb-6">
            <Download className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Installation Guide</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-foreground">Install via</span>
            <br />
            <span className="text-gradient">Obtainium</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground">
            Obtainium is an open-source app that helps you install and update apps directly from 
            their official release pages. Perfect for staying up-to-date without app store delays.
          </p>
        </div>

        {/* Video Tutorial */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Video className="w-5 h-5 text-primary" />
                <CardTitle className="font-serif">Video Tutorial</CardTitle>
              </div>
              <CardDescription>
                Watch this step-by-step guide to install Amethyst using Obtainium
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/obtainium-poster.jpg"
                >
                  <source
                    src="https://blob.satellite.earth/2bd7e308c1797d64fca09b1d61e9bde24c68dd45e501c7383eff1e85392df11f"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step by Step Guide */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-semibold text-center mb-10">
            Step-by-Step Guide
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card
                key={step.number}
                className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                      {step.number}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-lg text-foreground">
                          {step.title}
                        </h4>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      
                      {step.code && (
                        <code className="block w-full p-3 bg-muted rounded-lg text-sm font-mono text-foreground overflow-x-auto">
                          {step.code}
                        </code>
                      )}
                      
                      {step.action && (
                        <a
                          href={step.action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="mt-2 gap-2">
                            {step.action.label}
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Obtainium */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h3 className="text-xl font-serif font-semibold mb-4">
            Why Use Obtainium?
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">No Delays</h4>
              <p className="text-sm text-muted-foreground">
                Get updates immediately when released
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Privacy First</h4>
              <p className="text-sm text-muted-foreground">
                No app store tracking or accounts
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Open Source</h4>
              <p className="text-sm text-muted-foreground">
                Fully transparent and community-driven
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
