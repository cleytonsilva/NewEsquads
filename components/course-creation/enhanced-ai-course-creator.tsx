"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Sparkles,
  Upload,
  FileText,
  Brain,
  Zap,
  Target,
  RefreshCw,
  Check,
  Download,
  Link,
  Code,
  Share2,
} from "lucide-react"

interface EnhancedAICourseCreatorProps {
  onClose: () => void
  onCourseCreated?: (courseData: any) => void
}

export function EnhancedAICourseCreator({ onClose, onCourseCreated }: EnhancedAICourseCreatorProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0: method, 1: upload/describe, 2: customize, 3: generate
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    // Basic settings
    language: "Portuguese",
    focus: "",
    targetAudience: "",
    tone: "professional",
    description: "",

    // Advanced customization
    quizQuestions: 5,
    feedbackQuestions: 3,
    imageStyle: "modern",
    includeTimeline: false,
    includeMatchingGame: false,
    includeInteractiveElements: true,

    // Delivery options
    deliveryMethod: "link",
    generateImages: true,
    antiHallucination: true,
  })

  const creationMethods = [
    {
      id: "pdf-upload",
      title: "PDF para Criador de Curso",
      description: "Faça upload de um PDF e a IA criará um mini-curso interativo com 95% de precisão",
      icon: Upload,
      badge: "95% Precisão",
      color: "from-blue-600 to-blue-800",
    },
    {
      id: "ai-guide",
      title: "Criação Guiada por IA",
      description: "IA à prova de alucinações que garante fidelidade ao conteúdo original",
      icon: Brain,
      badge: "Anti-alucinação",
      color: "from-purple-600 to-purple-800",
    },
    {
      id: "knowledge-base",
      title: "Base de Conhecimento IA",
      description: "Acesse nossa base especializada para criar cursos com precisão garantida",
      icon: Zap,
      badge: "Especializado",
      color: "from-green-600 to-green-800",
    },
  ]

  const toneOptions = [
    { value: "professional", label: "Profissional", description: "Tom formal e técnico" },
    { value: "casual", label: "Casual", description: "Tom descontraído e acessível" },
    { value: "academic", label: "Acadêmico", description: "Tom científico e detalhado" },
    { value: "friendly", label: "Amigável", description: "Tom caloroso e pessoal" },
  ]

  const imageStyles = [
    { value: "modern", label: "Moderno", preview: "🎨" },
    { value: "minimalist", label: "Minimalista", preview: "⚪" },
    { value: "colorful", label: "Colorido", preview: "🌈" },
    { value: "professional", label: "Profissional", preview: "💼" },
    { value: "illustrated", label: "Ilustrado", preview: "🖼️" },
  ]

  const deliveryOptions = [
    { value: "link", label: "Link Compartilhável", icon: Link, description: "Compartilhe via URL" },
    { value: "embed", label: "Incorporar no Site", icon: Code, description: "Código para incorporar" },
    { value: "pdf", label: "Download PDF", icon: Download, description: "Baixar como PDF" },
    { value: "scorm", label: "Exportar SCORM", icon: Share2, description: "Para LMS compatível" },
  ]

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }, [])

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
    setCurrentStep(1)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    try {
      const token = localStorage.getItem('authToken')
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      
      // Prepare the data for AI generation
      const aiGenerationData = {
        method: selectedMethod,
        language: formData.language,
        focus: formData.focus,
        targetAudience: formData.targetAudience,
        tone: formData.tone,
        description: formData.description,
        quizQuestions: formData.quizQuestions,
        feedbackQuestions: formData.feedbackQuestions,
        includeInteractiveElements: formData.includeInteractiveElements,
        includeTimeline: formData.includeTimeline,
        includeMatchingGame: formData.includeMatchingGame,
        generateImages: formData.generateImages,
        antiHallucination: formData.antiHallucination,
        fileName: uploadedFile?.name
      }

      const response = await fetch(`${API_BASE_URL}/ai/generate-course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aiGenerationData)
      })

      if (!response.ok) {
        throw new Error('Failed to generate course')
      }

      const courseData = await response.json()
      
      setIsGenerating(false)
      onCourseCreated?.(courseData)
      onClose()
    } catch (error) {
      console.error('Error generating course:', error)
      setIsGenerating(false)
      // You might want to show an error message to the user here
    }
  }

  const renderMethodSelection = () => (
    <div className="text-center space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Criador de Cursos com IA</h2>
        <p className="text-gray-600">Escolha como deseja criar seu mini-curso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {creationMethods.map((method) => (
          <Card
            key={method.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 relative overflow-hidden"
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-5`} />
            <CardContent className="p-6 text-center space-y-4 relative">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <method.icon className="w-8 h-8 text-gray-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-semibold text-gray-900">{method.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {method.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderUploadStep = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setCurrentStep(0)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-xl font-semibold">
            {selectedMethod === "pdf-upload" ? "Upload do PDF" : "Descreva seu Curso"}
          </h2>
          <p className="text-gray-600">
            {selectedMethod === "pdf-upload"
              ? "Faça upload do seu PDF para conversão automática"
              : "Forneça detalhes sobre o curso que deseja criar"}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-8 space-y-6">
          {selectedMethod === "pdf-upload" ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload" />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Clique para fazer upload do PDF</p>
                  <p className="text-gray-600">Ou arraste e solte o arquivo aqui</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-900">{uploadedFile.name}</p>
                      <p className="text-sm text-green-700">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>

                  {uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processando PDF...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">IA Anti-alucinação</h4>
                    <p className="text-sm text-blue-700">
                      Nossa IA garante 95% de precisão ao converter seu PDF em curso, mantendo fidelidade ao conteúdo
                      original.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Foco Principal do Curso</Label>
                <Input
                  placeholder="Ex: Tecnologia Básica, Marketing Digital, Gestão de Projetos"
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Público-Alvo</Label>
                <Input
                  placeholder="Ex: Iniciantes em tecnologia, Profissionais de marketing"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Descrição Detalhada</Label>
                <Textarea
                  placeholder="Descreva o conteúdo e objetivos do seu curso..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px] mt-1"
                />
              </div>
            </div>
          )}

          <Button
            onClick={() => setCurrentStep(2)}
            disabled={selectedMethod === "pdf-upload" ? !uploadedFile : !formData.focus}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continuar para Personalização
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderCustomizationStep = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setCurrentStep(1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Personalização do Curso</h2>
          <p className="text-gray-600">Configure as opções avançadas do seu curso</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="interactive">Interativo</TabsTrigger>
          <TabsTrigger value="delivery">Entrega</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Configurações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Idioma do Curso</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Portuguese">Português</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Tom de Voz</Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          <div>
                            <div className="font-medium">{tone.label}</div>
                            <div className="text-xs text-gray-500">{tone.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Configurações de Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Número de Perguntas do Quiz: {formData.quizQuestions}
                  </Label>
                  <Slider
                    value={[formData.quizQuestions]}
                    onValueChange={(value) => setFormData({ ...formData, quizQuestions: value[0] })}
                    max={20}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Perguntas de Feedback: {formData.feedbackQuestions}
                  </Label>
                  <Slider
                    value={[formData.feedbackQuestions]}
                    onValueChange={(value) => setFormData({ ...formData, feedbackQuestions: value[0] })}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Estilo das Imagens IA</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {imageStyles.map((style) => (
                      <div
                        key={style.value}
                        className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                          formData.imageStyle === style.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData({ ...formData, imageStyle: style.value })}
                      >
                        <div className="text-2xl mb-1">{style.preview}</div>
                        <div className="text-xs font-medium">{style.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="generate-images"
                    checked={formData.generateImages}
                    onCheckedChange={(checked) => setFormData({ ...formData, generateImages: checked })}
                  />
                  <Label htmlFor="generate-images" className="text-sm font-medium">
                    Gerar imagens com IA
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Elementos Interativos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Linha do Tempo Interativa</h4>
                    <p className="text-sm text-gray-600">Adiciona cronologia visual ao conteúdo</p>
                  </div>
                  <Switch
                    checked={formData.includeTimeline}
                    onCheckedChange={(checked) => setFormData({ ...formData, includeTimeline: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Jogo de Correspondência</h4>
                    <p className="text-sm text-gray-600">Atividade de associar conceitos</p>
                  </div>
                  <Switch
                    checked={formData.includeMatchingGame}
                    onCheckedChange={(checked) => setFormData({ ...formData, includeMatchingGame: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Elementos Interativos Gerais</h4>
                    <p className="text-sm text-gray-600">Botões, animações e transições</p>
                  </div>
                  <Switch
                    checked={formData.includeInteractiveElements}
                    onCheckedChange={(checked) => setFormData({ ...formData, includeInteractiveElements: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Opções de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Como deseja entregar o curso?</Label>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                >
                  {deliveryOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <option.icon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <Label htmlFor={option.value} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={() => setCurrentStep(3)} className="w-full bg-blue-600 hover:bg-blue-700">
        Gerar Curso com IA
      </Button>
    </div>
  )

  const renderGenerationStep = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          {isGenerating ? (
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          ) : (
            <Check className="w-8 h-8 text-green-600" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {isGenerating ? "Gerando seu Curso..." : "Curso Criado com Sucesso!"}
          </h2>
          <p className="text-gray-600">
            {isGenerating
              ? "Nossa IA está processando seu conteúdo com precisão de 95%"
              : "Seu mini-curso está pronto para ser usado"}
          </p>
        </div>
      </div>

      {isGenerating && (
        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analisando conteúdo...</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Criando estrutura...</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Gerando quizzes...</span>
              <span>45%</span>
            </div>
            <Progress value={45} />
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <Button variant="outline" onClick={onClose}>
              Ver Curso
            </Button>
            <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
              Criar Outro
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fechar
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Criador de Cursos com IA</span>
            </div>
            <div className="text-sm text-gray-500">Passo {currentStep + 1} de 4</div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 0 && renderMethodSelection()}
          {currentStep === 1 && renderUploadStep()}
          {currentStep === 2 && renderCustomizationStep()}
          {currentStep === 3 && renderGenerationStep()}
        </div>
      </div>
    </div>
  )
}
