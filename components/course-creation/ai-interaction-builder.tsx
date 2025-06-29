"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Clock,
  Target,
  Zap,
  Brain,
  Play,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Check,
  BookOpen,
  Users,
  BarChart3,
} from "lucide-react"

interface AIInteractionBuilderProps {
  onClose: () => void
  onInteractionCreated?: (interactionData: any) => void
  courseContent?: string
}

export function AIInteractionBuilder({ onClose, onInteractionCreated, courseContent }: AIInteractionBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0: select type, 1: configure, 2: generate, 3: preview
  const [selectedInteraction, setSelectedInteraction] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  const [interactionConfig, setInteractionConfig] = useState({
    type: "",
    title: "",
    description: "",
    difficulty: "medium",
    duration: 5,
    autoGenerate: true,
    customContent: "",
    engagementLevel: "high",
  })

  const interactionTypes = [
    {
      id: "timeline",
      title: "Linha do Tempo Interativa",
      description: "Cronologia dinâmica com eventos clicáveis e detalhes expandíveis",
      icon: Clock,
      color: "from-blue-500 to-blue-700",
      features: ["Eventos cronológicos", "Detalhes expandíveis", "Navegação interativa"],
      estimatedTime: "3-5 min",
    },
    {
      id: "matching-game",
      title: "Jogo de Correspondência",
      description: "Associe conceitos, definições ou imagens de forma interativa",
      icon: Target,
      color: "from-green-500 to-green-700",
      features: ["Drag & Drop", "Feedback instantâneo", "Pontuação automática"],
      estimatedTime: "2-4 min",
    },
    {
      id: "flashcards",
      title: "Flashcards Inteligentes",
      description: "Cartões de estudo adaptativos com repetição espaçada",
      icon: BookOpen,
      color: "from-purple-500 to-purple-700",
      features: ["Repetição espaçada", "Progresso adaptativo", "Múltiplos formatos"],
      estimatedTime: "5-10 min",
    },
    {
      id: "interactive-poll",
      title: "Enquete Interativa",
      description: "Colete opiniões e feedback dos alunos em tempo real",
      icon: BarChart3,
      color: "from-orange-500 to-orange-700",
      features: ["Resultados em tempo real", "Múltiplos tipos", "Análise automática"],
      estimatedTime: "1-2 min",
    },
    {
      id: "scenario-simulation",
      title: "Simulação de Cenário",
      description: "Cenários interativos com tomada de decisão e consequências",
      icon: Users,
      color: "from-red-500 to-red-700",
      features: ["Múltiplos caminhos", "Consequências realistas", "Feedback contextual"],
      estimatedTime: "10-15 min",
    },
    {
      id: "knowledge-check",
      title: "Verificação de Conhecimento",
      description: "Mini-avaliações contextuais integradas ao conteúdo",
      icon: Zap,
      color: "from-indigo-500 to-indigo-700",
      features: ["Integração contextual", "Feedback imediato", "Progresso visual"],
      estimatedTime: "2-3 min",
    },
  ]

  const handleInteractionSelect = (interactionId: string) => {
    setSelectedInteraction(interactionId)
    setInteractionConfig({ ...interactionConfig, type: interactionId })
    setCurrentStep(1)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setCurrentStep(2)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 4000))

    const interactionData = {
      type: selectedInteraction,
      config: interactionConfig,
      timestamp: new Date().toISOString(),
    }

    setIsGenerating(false)
    setCurrentStep(3)
  }

  const renderTypeSelection = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Construtor de Interação com IA</h2>
        <p className="text-gray-600">Escolha o tipo de atividade interativa para seu curso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interactionTypes.map((interaction) => (
          <Card
            key={interaction.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 relative overflow-hidden group"
            onClick={() => handleInteractionSelect(interaction.id)}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${interaction.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardContent className="p-6 space-y-4 relative">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {interaction.icon && <interaction.icon className="w-6 h-6 text-gray-600" />}
                </div>
                <Badge variant="outline" className="text-xs">
                  {interaction.estimatedTime}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{interaction.title}</h3>
                <p className="text-sm text-gray-600">{interaction.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Recursos</h4>
                <div className="flex flex-wrap gap-1">
                  {interaction.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">IA Inteligente</h4>
            <p className="text-sm text-blue-700">
              Nossa IA analisa seu conteúdo e sugere as melhores atividades interativas para maximizar o engajamento dos
              alunos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderConfiguration = () => {
    const selectedType = interactionTypes.find((t) => t.id === selectedInteraction)

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setCurrentStep(0)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Configurar {selectedType ? selectedType.title : ""}</h2>
            <p className="text-gray-600">Personalize sua atividade interativa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedType && <selectedType.icon className="w-5 h-5" />}
                  Configurações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Título da Atividade</Label>
                  <Input
                    placeholder={`Ex: ${selectedType ? selectedType.title : ""} - Conceitos Fundamentais`}
                    value={interactionConfig.title}
                    onChange={(e) => setInteractionConfig({ ...interactionConfig, title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Descrição</Label>
                  <Textarea
                    placeholder="Descreva o objetivo e contexto desta atividade..."
                    value={interactionConfig.description}
                    onChange={(e) => setInteractionConfig({ ...interactionConfig, description: e.target.value })}
                    className="min-h-[80px] mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Nível de Dificuldade</Label>
                    <Select
                      value={interactionConfig.difficulty}
                      onValueChange={(value) => setInteractionConfig({ ...interactionConfig, difficulty: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Fácil</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="hard">Difícil</SelectItem>
                        <SelectItem value="adaptive">Adaptativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Duração Estimada (min)</Label>
                    <Select
                      value={interactionConfig.duration.toString()}
                      onValueChange={(value) =>
                        setInteractionConfig({ ...interactionConfig, duration: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 minutos</SelectItem>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Geração Automática por IA</h4>
                    <p className="text-sm text-gray-600">Deixe a IA criar o conteúdo baseado no material do curso</p>
                  </div>
                  <Switch
                    checked={interactionConfig.autoGenerate}
                    onCheckedChange={(checked) => setInteractionConfig({ ...interactionConfig, autoGenerate: checked })}
                  />
                </div>

                {!interactionConfig.autoGenerate && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Conteúdo Personalizado</Label>
                    <Textarea
                      placeholder="Digite o conteúdo específico para esta atividade..."
                      value={interactionConfig.customContent}
                      onChange={(e) => setInteractionConfig({ ...interactionConfig, customContent: e.target.value })}
                      className="min-h-[120px] mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Type-specific configurations */}
            {selectedInteraction === "timeline" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Linha do Tempo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Número de Eventos</Label>
                      <Select defaultValue="5">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 eventos</SelectItem>
                          <SelectItem value="5">5 eventos</SelectItem>
                          <SelectItem value="8">8 eventos</SelectItem>
                          <SelectItem value="10">10 eventos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Estilo Visual</Label>
                      <Select defaultValue="modern">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Moderno</SelectItem>
                          <SelectItem value="classic">Clássico</SelectItem>
                          <SelectItem value="minimal">Minimalista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedInteraction === "matching-game" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Jogo de Correspondência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Número de Pares</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 pares</SelectItem>
                          <SelectItem value="6">6 pares</SelectItem>
                          <SelectItem value="8">8 pares</SelectItem>
                          <SelectItem value="10">10 pares</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Tipo de Correspondência</Label>
                      <Select defaultValue="concept-definition">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concept-definition">Conceito-Definição</SelectItem>
                          <SelectItem value="image-text">Imagem-Texto</SelectItem>
                          <SelectItem value="question-answer">Pergunta-Resposta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Prévia da Atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {selectedType && <selectedType.icon className="w-12 h-12 text-gray-400" />}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{selectedType ? selectedType.title : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-medium">{interactionConfig.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dificuldade:</span>
                    <span className="font-medium capitalize">{interactionConfig.difficulty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dicas da IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-gray-600">Esta atividade é ideal para reforçar conceitos-chave</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-gray-600">Engajamento estimado: Alto</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-gray-600">Melhor posicionamento: Após conteúdo teórico</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!interactionConfig.title}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Gerar Atividade Interativa
        </Button>
      </div>
    )
  }

  const renderGeneration = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Criando Atividade Interativa...</h2>
          <p className="text-gray-600">A IA está analisando seu conteúdo e criando uma experiência envolvente</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Analisando conteúdo do curso...</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Criando elementos interativos...</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Otimizando engajamento...</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreview = () => {
    const selectedType = interactionTypes.find((t) => t.id === selectedInteraction)

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Atividade Criada com Sucesso!</h2>
            <p className="text-gray-600">Sua atividade interativa está pronta para engajar os alunos</p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedType && <selectedType.icon className="w-6 h-6 text-blue-600" />}
                <div>
                  <CardTitle>{interactionConfig.title || (selectedType ? selectedType.title : "")}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{interactionConfig.description}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Pronto
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center space-y-4">
                {selectedType && <selectedType.icon className="w-16 h-16 text-blue-500 mx-auto" />}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Prévia Interativa</h3>
                  <p className="text-gray-600">A atividade será renderizada aqui no curso final</p>
                </div>
                <Button variant="outline" className="mt-4">
                  <Play className="w-4 h-4 mr-2" />
                  Testar Atividade
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{interactionConfig.duration}</div>
                <div className="text-sm text-gray-600">Minutos</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Engajamento</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 capitalize">{interactionConfig.difficulty}</div>
                <div className="text-sm text-gray-600">Dificuldade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 max-w-md mx-auto">
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
            Editar
          </Button>
          <Button
            onClick={() => {
              onInteractionCreated?.({
                type: selectedInteraction,
                config: interactionConfig,
                timestamp: new Date().toISOString(),
              })
              onClose()
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Adicionar ao Curso
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fechar
            </Button>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Construtor de Interação com IA</span>
            </div>
            <div className="text-sm text-gray-500">Passo {currentStep + 1} de 4</div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 0 && renderTypeSelection()}
          {currentStep === 1 && renderConfiguration()}
          {currentStep === 2 && renderGeneration()}
          {currentStep === 3 && renderPreview()}
        </div>
      </div>
    </div>
  )
}
