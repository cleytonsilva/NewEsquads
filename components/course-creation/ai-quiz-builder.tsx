"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Brain,
  CheckCircle,
  Circle,
  Plus,
  Trash2,
  RefreshCw,
  Target,
  FileText,
  Sparkles,
  ArrowLeft,
} from "lucide-react"

interface AIQuizBuilderProps {
  onClose: () => void
  onQuizCreated?: (quizData: any) => void
  existingContent?: string
}

export function AIQuizBuilder({ onClose, onQuizCreated, existingContent }: AIQuizBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0: source, 1: configure, 2: generate, 3: review
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const [quizConfig, setQuizConfig] = useState({
    source: "content", // 'content', 'upload', 'knowledge'
    numberOfQuestions: 10,
    questionTypes: ["multiple-choice", "true-false"],
    difficulty: "medium",
    focusAreas: [] as string[],
    includeExplanations: true,
    randomizeOrder: true,
  })

  const [generatedQuiz, setGeneratedQuiz] = useState({
    title: "Quiz Gerado por IA",
    questions: [] as any[],
  })

  const sourceOptions = [
    {
      id: "content",
      title: "Conteúdo Existente",
      description: "Criar quiz baseado no conteúdo do curso atual (com seleção de seções)",
      icon: FileText,
    },
    {
      id: "upload",
      title: "Upload de Arquivo",
      description: "Fazer upload de material para gerar perguntas",
      icon: Plus,
    },
    {
      id: "knowledge",
      title: "Base de Conhecimento IA",
      description: "Usar conhecimento especializado da IA (tópicos específicos)",
      icon: Brain,
    },
  ]

  const questionTypes = [
    { id: "multiple-choice", label: "Múltipla Escolha", icon: CheckCircle },
    { id: "true-false", label: "Verdadeiro/Falso", icon: Circle },
    { id: "open-ended", label: "Resposta Aberta", icon: FileText },
  ]

  const availableSections = [
    "Introdução à Tecnologia Básica",
    "Definição de Tecnologia Básica",
    "Contexto Histórico",
    "Conceitos Fundamentais",
    "Aplicações da Tecnologia",
  ]

  const handleGenerateQuiz = async () => {
    setIsGenerating(true)
    setCurrentStep(2)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated quiz
    const mockQuestions = [
      {
        id: 1,
        type: "multiple-choice",
        question: "O que é tecnologia básica?",
        options: [
          "Conceitos fundamentais que formam a base das aplicações tecnológicas",
          "Apenas computadores e smartphones",
          "Tecnologia avançada simplificada",
          "Ferramentas antigas",
        ],
        correct: 0,
        explanation:
          "Tecnologia básica refere-se aos conceitos fundamentais, ferramentas e processos que formam a base de várias aplicações tecnológicas.",
        quality: 0.8, // Question quality indicator
        difficultyLevel: "medium", // Difficulty level
        contentAlignment: 0.9, // Content alignment score
      },
      {
        id: 2,
        type: "true-false",
        question: "A tecnologia básica é essencial para entender sistemas mais complexos.",
        correct: true,
        explanation: "Sim, dominar os fundamentos é crucial para compreender e inovar em tecnologias mais avançadas.",
        quality: 0.9,
        difficultyLevel: "easy",
        contentAlignment: 0.95,
      },
    ]

    setGeneratedQuiz({
      title: "Quiz: Introdução à Tecnologia Básica",
      questions: mockQuestions,
    })

    setIsGenerating(false)
    setCurrentStep(3)
  }

  const renderSourceSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Construtor de Quiz com IA</h2>
        <p className="text-gray-600">Escolha a fonte do conteúdo para gerar perguntas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sourceOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 ${
              quizConfig.source === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setQuizConfig({ ...quizConfig, source: option.id })}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <option.icon className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quizConfig.source === "content" && (
        <div className="p-4 border rounded-md bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-700">Conteúdo Disponível:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {availableSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        onClick={() => setCurrentStep(1)}
        disabled={!quizConfig.source}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        Continuar
      </Button>
    </div>
  )

  const renderConfiguration = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setCurrentStep(0)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Configurar Quiz</h2>
          <p className="text-gray-600">Personalize as opções do seu quiz</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Número de Perguntas: {quizConfig.numberOfQuestions}
              </Label>
              <Slider
                value={[quizConfig.numberOfQuestions]}
                onValueChange={(value) => setQuizConfig({ ...quizConfig, numberOfQuestions: value[0] })}
                max={50}
                min={5}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipos de Pergunta</Label>
              <div className="space-y-2">
                {questionTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={quizConfig.questionTypes.includes(type.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setQuizConfig({
                            ...quizConfig,
                            questionTypes: [...quizConfig.questionTypes, type.id],
                          })
                        } else {
                          setQuizConfig({
                            ...quizConfig,
                            questionTypes: quizConfig.questionTypes.filter((t) => t !== type.id),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={type.id} className="flex items-center gap-2 cursor-pointer">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </Label>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-2">
                  Tipos selecionados: {quizConfig.questionTypes.join(", ") || "Nenhum"}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Dificuldade</Label>
              <Select
                value={quizConfig.difficulty}
                onValueChange={(value) => setQuizConfig({ ...quizConfig, difficulty: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                  <SelectItem value="mixed">Misto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seções do Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Selecione as seções específicas para extrair perguntas:</p>
            <div className="space-y-2">
              {availableSections.map((section) => (
                <div key={section} className="flex items-center space-x-2">
                  <Checkbox
                    id={section}
                    checked={selectedSections.includes(section)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSections([...selectedSections, section])
                      } else {
                        setSelectedSections(selectedSections.filter((s) => s !== section))
                      }
                    }}
                  />
                  <Label htmlFor={section} className="cursor-pointer text-sm">
                    {section}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Seções selecionadas: {selectedSections.join(", ") || "Nenhuma"}
            </p>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="explanations"
                  checked={quizConfig.includeExplanations}
                  onCheckedChange={(checked) => setQuizConfig({ ...quizConfig, includeExplanations: !!checked })}
                />
                <Label htmlFor="explanations" className="cursor-pointer text-sm">
                  Incluir explicações nas respostas
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="randomize"
                  checked={quizConfig.randomizeOrder}
                  onCheckedChange={(checked) => setQuizConfig({ ...quizConfig, randomizeOrder: !!checked })}
                />
                <Label htmlFor="randomize" className="cursor-pointer text-sm">
                  Randomizar ordem das perguntas
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        onClick={handleGenerateQuiz}
        disabled={quizConfig.questionTypes.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Gerar Quiz com IA
      </Button>
    </div>
  )

  const renderGeneration = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Gerando Quiz...</h2>
          <p className="text-gray-600">A IA está analisando o conteúdo e criando perguntas personalizadas</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Analisando conteúdo...</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Gerando perguntas...</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Criando explicações...</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Revisar Quiz Gerado</h2>
          <p className="text-gray-600">Revise e edite as perguntas antes de finalizar</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {generatedQuiz.questions.length} perguntas geradas
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{generatedQuiz.title}</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {generatedQuiz.questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Pergunta {index + 1}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {question.type === "multiple-choice" ? "Múltipla Escolha" : "Verdadeiro/Falso"}
                    </Badge>
                    <Badge variant="ghost" className="text-xs">
                      Qualidade: {question.quality?.toFixed(2) || "N/A"}
                    </Badge>
                    <Badge variant="ghost" className="text-xs">
                      Alinhamento: {question.contentAlignment?.toFixed(2) || "N/A"}
                    </Badge>
                    <Badge variant="ghost" className="text-xs">
                      Dificuldade: {question.difficultyLevel || "N/A"}
                    </Badge>
                  </div>
                  <Textarea
                    value={question.question}
                    onChange={(e) => {
                      const newQuestions = [...generatedQuiz.questions]
                      newQuestions[index] = { ...question, question: e.target.value }
                      setGeneratedQuiz({ ...generatedQuiz, questions: newQuestions })
                    }}
                    className="font-medium mb-3"
                  />
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {question.type === "multiple-choice" && (
                <div className="space-y-2">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={question.correct === optionIndex}
                        onChange={() => {
                          const newQuestions = [...generatedQuiz.questions]
                          newQuestions[index] = { ...question, correct: optionIndex }
                          setGeneratedQuiz({ ...generatedQuiz, questions: newQuestions })
                        }}
                      />
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options]
                          newOptions[optionIndex] = e.target.value
                          const newQuestions = [...generatedQuiz.questions]
                          newQuestions[index] = { ...question, options: newOptions }
                          setGeneratedQuiz({ ...generatedQuiz, questions: newQuestions })
                        }}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              {question.type === "true-false" && (
                <RadioGroup
                  value={question.correct.toString()}
                  onValueChange={(value) => {
                    const newQuestions = [...generatedQuiz.questions]
                    newQuestions[index] = { ...question, correct: value === "true" }
                    setGeneratedQuiz({ ...generatedQuiz, questions: newQuestions })
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id={`true-${question.id}`} />
                    <Label htmlFor={`true-${question.id}`}>Verdadeiro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id={`false-${question.id}`} />
                    <Label htmlFor={`false-${question.id}`}>Falso</Label>
                  </div>
                </RadioGroup>
              )}

              {question.explanation && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Label className="text-sm font-medium text-blue-900 mb-1 block">Explicação:</Label>
                  <Textarea
                    value={question.explanation}
                    onChange={(e) => {
                      const newQuestions = [...generatedQuiz.questions]
                      newQuestions[index] = { ...question, explanation: e.target.value }
                      setGeneratedQuiz({ ...generatedQuiz, questions: newQuestions })
                    }}
                    className="text-sm bg-white border-blue-200"
                  />
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Add new question logic
              const newQuestion = {
                id: Date.now(),
                type: "multiple-choice",
                question: "Nova pergunta...",
                options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
                correct: 0,
                explanation: "Explicação da resposta...",
                quality: 0.7,
                difficultyLevel: "medium",
                contentAlignment: 0.8,
              }
              setGeneratedQuiz({
                ...generatedQuiz,
                questions: [...generatedQuiz.questions, newQuestion],
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Pergunta
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          Voltar
        </Button>
        <Button
          onClick={() => {
            onQuizCreated?.(generatedQuiz)
            onClose()
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          <Target className="w-4 h-4 mr-2" />
          Finalizar Quiz
        </Button>
      </div>
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
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Construtor de Quiz com IA</span>
            </div>
            <div className="text-sm text-gray-500">Passo {currentStep + 1} de 4</div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 0 && renderSourceSelection()}
          {currentStep === 1 && renderConfiguration()}
          {currentStep === 2 && renderGeneration()}
          {currentStep === 3 && renderReview()}
        </div>
      </div>
    </div>
  )
}
