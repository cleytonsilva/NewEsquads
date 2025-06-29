"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Type,
  ImageIcon,
  Video,
  CheckCircle,
  Sparkles,
  Edit,
  Copy,
  GripVertical,
  Trash2,
  Brain,
  Zap,
  Clock,
  Target,
  Share,
  Play,
  Download,
  Link,
  Code,
  FileText,
  BookOpen,
  Puzzle,
  ListChecks,
  BarChart,
} from "lucide-react"

interface Block {
  id: string
  type:
    | "text"
    | "image"
    | "video"
    | "quiz"
    | "timeline"
    | "matching"
    | "interaction"
    | "flashcards"
    | "interactive-timeline"
    | "matching-game"
    | "poll"
    | "survey"
  content: any
  order: number
}

export function EnhancedWYSIWYGEditor() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "1",
      type: "text",
      content: { title: "Definition Of Basic Technology", text: "Basic technology refers to..." },
      order: 0,
    },
  ])
  const [selectedBlock, setSelectedBlock] = useState<string | null>("1")
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [pageTitle, setPageTitle] = useState("Definition Of Basic Technology")
  const draggedBlock = useRef<string | null>(null)

  const blockTypes = [
    {
      type: "text",
      icon: Type,
      label: "Texto e Título",
      description: "Conteúdo de texto simples",
      color: "bg-blue-50 text-blue-600",
    },
    {
      type: "image",
      icon: ImageIcon,
      label: "Imagem",
      description: "Adicionar imagens ao curso",
      color: "bg-green-50 text-green-600",
    },
    {
      type: "video",
      icon: Video,
      label: "Vídeo",
      description: "Incorporar vídeos",
      color: "bg-purple-50 text-purple-600",
    },
    {
      type: "quiz",
      icon: CheckCircle,
      label: "Quiz Interativo",
      description: "Perguntas e respostas",
      color: "bg-orange-50 text-orange-600",
    },
    {
      type: "timeline",
      icon: Clock,
      label: "Linha do Tempo",
      description: "Cronologia interativa",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      type: "matching",
      icon: Target,
      label: "Jogo de Correspondência",
      description: "Associar conceitos",
      color: "bg-pink-50 text-pink-600",
    },
    {
      type: "flashcards",
      icon: BookOpen,
      label: "Flashcards",
      description: "Cartões de estudo interativos",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      type: "interactive-timeline",
      icon: Clock,
      label: "Linha do Tempo Interativa",
      description: "Cronologia com eventos detalhados",
      color: "bg-teal-50 text-teal-600",
    },
    {
      type: "matching-game",
      icon: Puzzle,
      label: "Jogo de Correspondência",
      description: "Arraste e combine os pares",
      color: "bg-lime-50 text-lime-600",
    },
    {
      type: "poll",
      icon: BarChart,
      label: "Enquete",
      description: "Crie enquetes de múltipla escolha",
      color: "bg-sky-50 text-sky-600",
    },
    {
      type: "survey",
      icon: ListChecks,
      label: "Pesquisa",
      description: "Colete feedback com perguntas abertas",
      color: "bg-rose-50 text-rose-600",
    },
  ]

  const aiActions = [
    { action: "improve", label: "Melhorar Escrita", icon: Edit },
    { action: "summarize", label: "Resumir", icon: FileText },
    { action: "simplify", label: "Simplificar", icon: Zap },
    { action: "paraphrase", label: "Parafrasear", icon: Copy },
    { action: "expand", label: "Expandir Conteúdo", icon: Plus },
    { action: "translate", label: "Traduzir", icon: Type },
    { action: "complete", label: "Completar Texto", icon: Brain },
    { action: "shorten", label: "Encurtar Texto", icon: Trash2 },
    { action: "lengthen", label: "Alongar Texto", icon: GripVertical },
    { action: "grammar", label: "Verificar Gramática", icon: CheckCircle },
    { action: "tone-adjust", label: "Ajustar Tom", icon: Sparkles },
  ]

  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: type as any,
      content: getDefaultContent(type),
      order: blocks.length,
    }
    setBlocks([...blocks, newBlock])
    setSelectedBlock(newBlock.id)
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case "text":
        return { title: "Novo Título", text: "Digite seu conteúdo aqui..." }
      case "image":
        return { src: "/placeholder.svg", alt: "Nova imagem", caption: "" }
      case "video":
        return { url: "", title: "Novo Vídeo", description: "" }
      case "quiz":
        return { question: "Sua pergunta aqui?", options: ["Opção 1", "Opção 2"], correct: 0 }
      case "timeline":
        return { events: [{ date: "2024", title: "Evento", description: "Descrição" }] }
      case "matching":
        return { pairs: [{ left: "Conceito", right: "Definição" }] }
      case "flashcards":
        return { cards: [{ front: "Frente", back: "Verso" }] }
      case "interactive-timeline":
        return { events: [{ date: "2024", title: "Evento", description: "Descrição detalhada" }] }
      case "matching-game":
        return { pairs: [{ left: "Item A", right: "Item B" }] }
      case "poll":
        return { question: "Qual sua opção?", options: ["Sim", "Não"] }
      case "survey":
        return { question: "Deixe seu feedback:" }
      default:
        return {}
    }
  }

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    draggedBlock.current = blockId
    e.dataTransfer.effectAllowed = "move"
    e.currentTarget.classList.add("opacity-50") // Visual feedback
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault()
    if (!draggedBlock.current) return

    const draggedIndex = blocks.findIndex((b) => b.id === draggedBlock.current)
    const targetIndex = blocks.findIndex((b) => b.id === targetBlockId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newBlocks = [...blocks]
    const [draggedItem] = newBlocks.splice(draggedIndex, 1)
    newBlocks.splice(targetIndex, 0, draggedItem)

    // Update order
    newBlocks.forEach((block, index) => {
      block.order = index
    })

    setBlocks(newBlocks)
    draggedBlock.current = null
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId))
    if (selectedBlock === blockId) {
      setSelectedBlock(blocks[0]?.id || null)
    }
  }

  const processAIAction = async (action: string, content: string) => {
    // Simulate AI processing
    setAiPrompt(`Processando: ${action}...`)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI responses
    const responses = {
      improve: "Versão melhorada do texto com melhor clareza e fluidez...",
      summarize: "Resumo: Os pontos principais são...",
      simplify: "Versão simplificada: Em termos simples...",
      paraphrase: "Reformulação: Uma maneira diferente de expressar...",
      expand: "Versão expandida com mais detalhes e exemplos...",
      translate: "Translated version: The main concepts are...",
      complete: "O texto foi completado com sugestões da IA...",
      shorten: "O texto foi encurtado para melhor concisão...",
      lengthen: "O texto foi alongado com mais detalhes...",
      grammar: "A gramática foi verificada e corrigida...",
      "tone-adjust": "O tom do texto foi ajustado para ser mais adequado...",
    }

    setAiPrompt(responses[action as keyof typeof responses] || "Processado com sucesso!")
  }

  const renderBlock = (block: Block) => {
    const isSelected = selectedBlock === block.id

    return (
      <div
        key={block.id}
        className={`relative group border-2 rounded-lg p-4 transition-all ${
          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => setSelectedBlock(block.id)}
        draggable
        onDragStart={(e) => handleDragStart(e, block.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, block.id)}
        onDragEnd={handleDragEnd}
      >
        {/* Drag Handle */}
        <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
        </div>

        {/* Delete Button */}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              deleteBlock(block.id)
            }}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Block Content */}
        <div className="mt-6">
          {block.type === "text" && (
            <div className="space-y-3">
              <Input
                value={block.content.title}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, title: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
                className="font-semibold text-lg"
                placeholder="Título da seção"
              />
              <Textarea
                value={block.content.text}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, text: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
                className="min-h-[100px]"
                placeholder="Conteúdo do texto..."
              />
            </div>
          )}

          {block.type === "image" && (
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <Input
                placeholder="Legenda da imagem"
                value={block.content.caption}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, caption: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
              />
            </div>
          )}

          {block.type === "quiz" && (
            <div className="space-y-3">
              <Input
                placeholder="Pergunta do quiz"
                value={block.content.question}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, question: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
              />
              {block.content.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`quiz-${block.id}`}
                    checked={block.content.correct === index}
                    onChange={() => {
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, correct: index } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...block.content.options]
                      newOptions[index] = e.target.value
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, options: newOptions } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                    placeholder={`Opção ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "timeline" && (
            <div className="space-y-3">
              <h4 className="font-medium">Linha do Tempo Interativa</h4>
              {block.content.events.map((event: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Data"
                    value={event.date}
                    className="w-24"
                    onChange={(e) => {
                      const newEvents = [...block.content.events]
                      newEvents[index] = { ...event, date: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, events: newEvents } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Input
                    placeholder="Título do evento"
                    value={event.title}
                    onChange={(e) => {
                      const newEvents = [...block.content.events]
                      newEvents[index] = { ...event, title: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, events: newEvents } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "flashcards" && (
            <div className="space-y-3">
              <h4 className="font-medium">Flashcards</h4>
              {block.content.cards.map((card: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <Textarea
                    placeholder="Frente do cartão"
                    value={card.front}
                    onChange={(e) => {
                      const newCards = [...block.content.cards]
                      newCards[index] = { ...card, front: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, cards: newCards } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Textarea
                    placeholder="Verso do cartão"
                    value={card.back}
                    onChange={(e) => {
                      const newCards = [...block.content.cards]
                      newCards[index] = { ...card, back: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, cards: newCards } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "interactive-timeline" && (
            <div className="space-y-3">
              <h4 className="font-medium">Linha do Tempo Interativa</h4>
              {block.content.events.map((event: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Data"
                    value={event.date}
                    className="w-24"
                    onChange={(e) => {
                      const newEvents = [...block.content.events]
                      newEvents[index] = { ...event, date: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, events: newEvents } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Input
                    placeholder="Título do evento"
                    value={event.title}
                    onChange={(e) => {
                      const newEvents = [...block.content.events]
                      newEvents[index] = { ...event, title: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, events: newEvents } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Textarea
                    placeholder="Descrição detalhada"
                    value={event.description}
                    onChange={(e) => {
                      const newEvents = [...block.content.events]
                      newEvents[index] = { ...event, description: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, events: newEvents } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "matching-game" && (
            <div className="space-y-3">
              <h4 className="font-medium">Jogo de Correspondência</h4>
              {block.content.pairs.map((pair: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Item A"
                    value={pair.left}
                    onChange={(e) => {
                      const newPairs = [...block.content.pairs]
                      newPairs[index] = { ...pair, left: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, pairs: newPairs } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                  <Input
                    placeholder="Item B"
                    value={pair.right}
                    onChange={(e) => {
                      const newPairs = [...block.content.pairs]
                      newPairs[index] = { ...pair, right: e.target.value }
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, pairs: newPairs } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "poll" && (
            <div className="space-y-3">
              <Input
                placeholder="Pergunta da Enquete"
                value={block.content.question}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, question: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
              />
              {block.content.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...block.content.options]
                      newOptions[index] = e.target.value
                      const newBlocks = blocks.map((b) =>
                        b.id === block.id ? { ...b, content: { ...b.content, options: newOptions } } : b,
                      )
                      setBlocks(newBlocks)
                    }}
                    placeholder={`Opção ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {block.type === "survey" && (
            <div className="space-y-3">
              <Textarea
                placeholder="Pergunta da Pesquisa"
                value={block.content.question}
                onChange={(e) => {
                  const newBlocks = blocks.map((b) =>
                    b.id === block.id ? { ...b, content: { ...b.content, question: e.target.value } } : b,
                  )
                  setBlocks(newBlocks)
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Editor Avançado de Curso</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Ativa
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Select defaultValue="link">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Link
                  </div>
                </SelectItem>
                <SelectItem value="embed">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Incorporar
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </div>
                </SelectItem>
                <SelectItem value="scorm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    SCORM
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              Publicar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Block Types */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <Tabs defaultValue="blocks" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blocks">Blocos</TabsTrigger>
                <TabsTrigger value="ai">IA</TabsTrigger>
              </TabsList>

              <TabsContent value="blocks" className="space-y-4">
                <h3 className="font-medium text-gray-900">Adicionar Bloco</h3>
                <div className="space-y-2">
                  {blockTypes.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${blockType.color}`}>
                        <blockType.icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{blockType.label}</div>
                        <div className="text-xs text-gray-500">{blockType.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Assistente IA</h3>
                  </div>

                  <div className="space-y-2">
                    {aiActions.map((action) => (
                      <Button
                        key={action.action}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => processAIAction(action.action, "")}
                      >
                        <action.icon className="w-4 h-4 mr-2 text-blue-600" />
                        {action.label}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Descreva o que você quer que a IA faça..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Processar com IA
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Title */}
            <Card>
              <CardContent className="p-6">
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="text-3xl font-bold border-none p-0 focus-visible:ring-0"
                  placeholder="Título da página"
                />
              </CardContent>
            </Card>

            {/* Blocks */}
            <div className="space-y-4">{blocks.sort((a, b) => a.order - b.order).map(renderBlock)}</div>

            {/* Add Block Button */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={() => addBlock("text")}>
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Novo Bloco
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - AI Assistant Panel */}
        {showAIAssistant && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Assistente IA na Página</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAIAssistant(false)}>
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">IA Sugestão</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Posso ajudar a melhorar este conteúdo. Selecione um bloco e escolha uma ação.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Ações Rápidas</h4>
                  {aiActions.slice(0, 4).map((action) => (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => processAIAction(action.action, "")}
                    >
                      <action.icon className="w-4 h-4 mr-2" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Assistant Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
        onClick={() => setShowAIAssistant(!showAIAssistant)}
      >
        <Brain className="w-5 h-5" />
      </Button>
    </div>
  )
}
