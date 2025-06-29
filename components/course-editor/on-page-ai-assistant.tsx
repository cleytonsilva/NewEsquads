"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Sparkles,
  Edit,
  Scissors,
  Plus,
  RotateCcw,
  FileText,
  Type,
  Zap,
  Check,
  Copy,
  RefreshCw,
  Wand2,
  Languages,
  Volume2,
} from "lucide-react"

interface OnPageAIAssistantProps {
  selectedText?: string
  onTextUpdate?: (newText: string) => void
  isVisible: boolean
  position?: { x: number; y: number }
}

export function OnPageAIAssistant({ selectedText = "", onTextUpdate, isVisible, position }: OnPageAIAssistantProps) {
  const [activeTab, setActiveTab] = useState("improve")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState("")
  const [inputText, setInputText] = useState(selectedText)
  const assistantRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputText(selectedText)
  }, [selectedText])

  const aiActions = [
    {
      id: "improve",
      label: "Melhorar",
      icon: Edit,
      description: "Aprimorar clareza e fluidez",
      color: "text-blue-600",
    },
    {
      id: "shorten",
      label: "Encurtar",
      icon: Scissors,
      description: "Tornar mais conciso",
      color: "text-green-600",
    },
    {
      id: "lengthen",
      label: "Alongar",
      icon: Plus,
      description: "Expandir com detalhes",
      color: "text-purple-600",
    },
    {
      id: "simplify",
      label: "Simplificar",
      icon: Zap,
      description: "Linguagem mais simples",
      color: "text-orange-600",
    },
    {
      id: "summarize",
      label: "Resumir",
      icon: FileText,
      description: "Pontos principais",
      color: "text-indigo-600",
    },
    {
      id: "complete",
      label: "Completar",
      icon: Wand2,
      description: "Finalizar texto",
      color: "text-pink-600",
    },
    {
      id: "paraphrase",
      label: "Parafrasear",
      icon: RotateCcw,
      description: "Reformular conteúdo",
      color: "text-teal-600",
    },
    {
      id: "tone",
      label: "Ajustar Tom",
      icon: Volume2,
      description: "Modificar estilo",
      color: "text-red-600",
    },
    {
      id: "grammar",
      label: "Gramática",
      icon: Type,
      description: "Corrigir erros",
      color: "text-yellow-600",
    },
    {
      id: "translate",
      label: "Traduzir",
      icon: Languages,
      description: "Outros idiomas",
      color: "text-cyan-600",
    },
  ]

  const processText = async (action: string) => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    setResult("")

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI responses based on action
    const responses = {
      improve: `Versão aprimorada: ${inputText} [com melhor clareza e estrutura]`,
      shorten: `Versão concisa: ${inputText.substring(0, Math.floor(inputText.length * 0.7))}...`,
      lengthen: `Versão expandida: ${inputText} [com exemplos adicionais e contexto detalhado]`,
      simplify: `Versão simplificada: ${inputText.replace(/\b\w{8,}\b/g, "termo simples")}`,
      summarize: `Resumo: Os pontos principais são... [baseado em: ${inputText.substring(0, 50)}...]`,
      complete: `${inputText} [continuação gerada pela IA com contexto relevante]`,
      paraphrase: `Reformulação: [versão alternativa de: ${inputText}]`,
      tone: `Tom ajustado: ${inputText} [adaptado para o público-alvo]`,
      grammar: `Correção: ${inputText} [com gramática e ortografia corrigidas]`,
      translate: `Translation: ${inputText} [translated to English]`,
    }

    setResult(responses[action as keyof typeof responses] || "Processamento concluído")
    setIsProcessing(false)
  }

  const applyResult = () => {
    if (result && onTextUpdate) {
      onTextUpdate(result)
      setResult("")
      setInputText("")
    }
  }

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result)
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={assistantRef}
      className="fixed z-50 w-96 bg-white rounded-lg shadow-2xl border border-gray-200"
      style={{
        left: position?.x || 20,
        top: position?.y || 20,
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Assistente IA</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Sparkles className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Input Text */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Texto para processar:</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole ou digite o texto que deseja melhorar..."
              className="min-h-[80px] text-sm"
            />
          </div>

          {/* AI Actions */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="improve">Melhorar</TabsTrigger>
              <TabsTrigger value="actions">Ações</TabsTrigger>
            </TabsList>

            <TabsContent value="improve" className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-2">
                {aiActions.slice(0, 6).map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => processText(action.id)}
                    disabled={isProcessing || !inputText.trim()}
                    className="h-auto p-3 flex flex-col items-start gap-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-xs font-medium">{action.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 text-left">{action.description}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-2">
                {aiActions.slice(6).map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => processText(action.id)}
                    disabled={isProcessing || !inputText.trim()}
                    className="h-auto p-3 flex flex-col items-start gap-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-xs font-medium">{action.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 text-left">{action.description}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Processing State */}
          {isProcessing && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-800">Processando com IA...</span>
            </div>
          )}

          {/* Result */}
          {result && !isProcessing && (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Resultado:</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{result}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={applyResult} size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Check className="w-4 h-4 mr-2" />
                  Aplicar
                </Button>
                <Button onClick={copyResult} variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-xs font-medium text-gray-700 mb-2">💡 Dicas Rápidas:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Selecione texto na página para edição rápida</li>
              <li>• Use "Completar" para finalizar frases</li>
              <li>• "Simplificar" torna o texto mais acessível</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
